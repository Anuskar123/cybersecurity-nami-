// ===== UTILITY: SHA-256 HASHING =====
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// ===== STATE =====
let currentUser = null;
let currentCourse = null;
let currentSlideIndex = 0;

// Exam State
let examQuestions = [];
let currentExamIndex = 0;
let examAnswers = [];
let examTimerInterval = null;
let examTimeSeconds = 0;
let examSubmitted = false;
let selectedMcqModule = 'all';

// ===== PAGE ROUTER =====
function showPage(pageId) {
    document.querySelectorAll('#loginPage, #dashboardPage, #notesPage, #examPage').forEach(el => {
        el.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// ===== AUTH =====
async function handleLogin() {
    const pin = document.getElementById('pinInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('loginError');

    const user = appData.users.find(u => u.pin === pin);
    if (!user) {
        errorMsg.textContent = "Invalid PIN or Password";
        return;
    }

    const inputHash = await sha256(password);
    if (inputHash === user.passwordHash) {
        currentUser = user;
        errorMsg.textContent = "";
        initDashboard();
        showPage('dashboardPage');
    } else {
        errorMsg.textContent = "Invalid PIN or Password";
    }
}

// ===== TABS =====
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding panel
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
            document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');

            if (btn.dataset.tab === 'terminology') {
                ensureTerminologySection();
            }
            if (btn.dataset.tab === 'cheatsheet') {
                loadCheatSheet();
            }
        });
    });
}

// ===== DASHBOARD =====
function initDashboard() {
    initTabs();
    buildNotesGrid();
    buildMCQFilters();
    buildScenarioSection();
    buildMockTestSection();
    // Terminology loads when user opens the tab (faster login on GitHub Pages / mobile)
}

// ===== NOTES GRID =====
function buildNotesGrid() {
    const grid = document.getElementById('notesGrid');
    grid.innerHTML = '';

    appData.courses.forEach(course => {
        const contentSlides = course.slides.filter(s => s.type === 'content');
        const quizSlides = course.slides.filter(s => s.type === 'quiz');

        const card = document.createElement('div');
        card.className = 'module-card';
        card.onclick = () => openNotes(course.id);
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="card-meta">${contentSlides.length} topics · ${quizSlides.length} quizzes</div>
        `;
        grid.appendChild(card);
    });
}

// ===== NOTES READER =====
function openNotes(courseId) {
    currentCourse = appData.courses.find(c => c.id === courseId);
    currentSlideIndex = 0;

    // Build sidebar
    const sidebar = document.getElementById('notesSidebarList');
    const title = document.getElementById('notesSidebarTitle');
    title.textContent = currentCourse.title;
    sidebar.innerHTML = '';

    currentCourse.slides.forEach((slide, i) => {
        const item = document.createElement('div');
        item.className = 'topic-item' + (i === 0 ? ' active' : '');
        item.textContent = slide.title || (slide.type === 'quiz' ? `Quiz ${i}` : `Topic ${i + 1}`);
        item.onclick = () => {
            currentSlideIndex = i;
            renderNote();
        };
        sidebar.appendChild(item);
    });

    renderNote();
    showPage('notesPage');
}

function renderNote() {
    const slide = currentCourse.slides[currentSlideIndex];
    const container = document.getElementById('notesContentArea');

    // Update sidebar active
    document.querySelectorAll('.topic-item').forEach((item, idx) => {
        item.classList.toggle('active', idx === currentSlideIndex);
    });

    let html = '';

    if (slide.type === 'quiz') {
        // Render inline quiz
        const explanationSafe = slide.explanation ? slide.explanation.replace(/'/g, "\\'") : "No explanation available.";
        html = `
            <h1>Quiz</h1>
            <div style="margin-top: 20px;">
                <p class="question-text">${slide.question}</p>
                <div id="inlineQuizOptions">
                    ${slide.options.map((opt, i) =>
                        `<button class="option-btn" onclick="checkInlineAnswer(${i}, ${slide.correctAnswer}, this, '${explanationSafe}')">
                            <span class="option-label">${String.fromCharCode(65 + i)}.</span> ${opt}
                        </button>`
                    ).join('')}
                </div>
                <div id="inlineQuizResult"></div>
            </div>
        `;
    } else {
        html = `<h1>${slide.title}</h1>`;
        html += `<div style="margin-top: 20px;">${slide.content}</div>`;

        if (slide.realLifeExample) {
            html += `
                <div class="real-life-box">
                    <h4>💡 Real-World Example</h4>
                    <p>${slide.realLifeExample}</p>
                </div>
            `;
        }

        if (slide.keyPoints && slide.keyPoints.length > 0) {
            html += `
                <div class="key-points">
                    <h4>Key Takeaways</h4>
                    <ul>
                        ${slide.keyPoints.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (slide.notes) {
            html += `
                <div style="margin-top: 24px; padding: 16px; background: #f8f8fa; border-radius: 8px; border: 1px solid var(--border);">
                    <h4 style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">📝 Study Note</h4>
                    <p style="font-size: 0.9rem; color: var(--text);">${slide.notes}</p>
                </div>
            `;
        }
    }

    container.innerHTML = html;

    // Nav buttons
    document.getElementById('notesPrevBtn').disabled = currentSlideIndex === 0;
    const nextBtn = document.getElementById('notesNextBtn');
    if (currentSlideIndex === currentCourse.slides.length - 1) {
        nextBtn.textContent = 'Done ✓';
        nextBtn.onclick = () => exitNotes();
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = () => navNote(1);
    }
}

function checkInlineAnswer(selected, correct, element, explanation) {
    const allBtns = document.querySelectorAll('#inlineQuizOptions .option-btn');
    allBtns.forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;
    });

    // Highlight correct
    allBtns[correct].classList.add('correct');

    const resultDiv = document.getElementById('inlineQuizResult');
    if (selected === correct) {
        element.classList.add('correct');
        resultDiv.innerHTML = `
            <div class="explanation-box" style="margin-top: 16px;">
                <h4 style="color: var(--success);">✅ Correct!</h4>
                <p>${explanation}</p>
            </div>
        `;
    } else {
        element.classList.add('wrong');
        resultDiv.innerHTML = `
            <div class="explanation-box wrong" style="margin-top: 16px;">
                <h4 style="color: var(--danger);">❌ Incorrect</h4>
                <p>${explanation}</p>
            </div>
        `;
    }
}

function navNote(dir) {
    currentSlideIndex += dir;
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    if (currentSlideIndex >= currentCourse.slides.length) currentSlideIndex = currentCourse.slides.length - 1;
    renderNote();
}

function exitNotes() {
    showPage('dashboardPage');
}

// ===== MCQ FILTER =====
function buildMCQFilters() {
    const bar = document.getElementById('mcqFilterBar');
    // Get all unique modules
    const allQ = getAllQuestions();
    const modules = [...new Set(allQ.map(q => q.module))];

    // Clear existing pills except "All"
    bar.innerHTML = '<button class="filter-pill active" data-module="all" onclick="selectMcqModule(\'all\', this)">All Modules</button>';

    modules.forEach(mod => {
        const count = allQ.filter(q => q.module === mod).length;
        const pill = document.createElement('button');
        pill.className = 'filter-pill';
        pill.dataset.module = mod;
        pill.textContent = `${mod} (${count})`;
        pill.onclick = () => selectMcqModule(mod, pill);
        bar.appendChild(pill);
    });

    updateMcqCount();
}

function selectMcqModule(mod, pill) {
    selectedMcqModule = mod;
    document.querySelectorAll('#mcqFilterBar .filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    updateMcqCount();
}

function updateMcqCount() {
    const allQ = getAllQuestions();
    const filtered = selectedMcqModule === 'all' ? allQ : allQ.filter(q => q.module === selectedMcqModule);
    document.getElementById('mcqCount').textContent = `${filtered.length} questions available`;
}

function getAllQuestions() {
    // All question parts are already merged into window.tcaQuestions by the individual files
    return (typeof window.tcaQuestions !== 'undefined') ? window.tcaQuestions : [];
}

function startModuleMCQ() {
    const allQ = getAllQuestions();
    let filtered = selectedMcqModule === 'all' ? allQ : allQ.filter(q => q.module === selectedMcqModule);
    
    if (filtered.length === 0) {
        alert("No questions available for this module.");
        return;
    }

    examSubmitted = false;
    currentExamIndex = 0;
    examQuestions = JSON.parse(JSON.stringify(filtered));
    shuffleArray(examQuestions);
    examAnswers = new Array(examQuestions.length).fill(null);

    document.getElementById('examTitle').textContent = selectedMcqModule === 'all' ? 'MCQ Practice — All Modules' : `MCQ Practice — ${selectedMcqModule}`;
    document.getElementById('examScore').classList.add('hidden');
    document.getElementById('examScoreCard').classList.add('hidden');
    document.getElementById('examSubmitBtn').classList.add('hidden');
    document.getElementById('examNextBtn').classList.remove('hidden');

    // No timer for practice mode
    clearInterval(examTimerInterval);
    examTimeSeconds = 0;
    document.getElementById('examTimer').textContent = 'Practice';

    showPage('examPage');
    renderExamQuestion();
}

// ===== SCENARIO SECTION =====
function buildScenarioSection() {
    if (typeof window.scenarioQuestions === 'undefined') return;

    const bar = document.getElementById('scenarioFilterBar');
    const topics = [...new Set(scenarioQuestions.map(s => s.topic))];

    bar.innerHTML = '<button class="filter-pill active" data-topic="all" onclick="filterScenarios(\'all\', this)">All Topics</button>';
    topics.forEach(topic => {
        const pill = document.createElement('button');
        pill.className = 'filter-pill';
        pill.textContent = topic;
        pill.onclick = () => filterScenarios(topic, pill);
        bar.appendChild(pill);
    });

    renderScenarios('all');
}

function filterScenarios(topic, pill) {
    document.querySelectorAll('#scenarioFilterBar .filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderScenarios(topic);
}

function renderScenarios(topic) {
    const list = document.getElementById('scenarioList');
    const filtered = topic === 'all' ? scenarioQuestions : scenarioQuestions.filter(s => s.topic === topic);

    list.innerHTML = '';
    filtered.forEach((scenario) => {
        const card = document.createElement('div');
        card.className = 'scenario-card';

        const questionsId = `sq-${scenario.id}`;
        const qHtml = scenario.questions.map((item) => {
            const expHtml = item.exp
                ? `<div class="mock-example">
                       <span class="mock-example-label">Example</span>
                       <p>${escapeHtml(item.exp)}</p>
                   </div>`
                : '';
            const pointsHtml = (item.points && item.points.length)
                ? `<div class="mock-points">
                       <h4>Key Points</h4>
                       <ul>${item.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
                   </div>`
                : '';
            return `
                    <li class="scenario-q-item">
                        <strong class="scenario-q-text">Q: ${escapeHtml(item.q)}</strong>
                        <div class="mock-answer scenario-answer">
                            <h4>Answer</h4>
                            <p>${escapeHtml(item.a)}</p>
                        </div>
                        ${expHtml}
                        ${pointsHtml}
                    </li>`;
        }).join('');

        card.innerHTML = `
            <h3>${escapeHtml(scenario.title)}</h3>
            <div class="scenario-context">${escapeHtml(scenario.context)}</div>
            <button type="button" class="scenario-toggle" onclick="toggleScenarioQ('${questionsId}', this)">Show Questions & Answers ▼</button>
            <ol id="${questionsId}" class="scenario-q-list hidden">
                ${qHtml}
            </ol>
        `;
        list.appendChild(card);
    });
}

function toggleScenarioQ(id, btn) {
    const el = document.getElementById(id);
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        btn.textContent = 'Hide Questions & Answers ▲';
    } else {
        el.classList.add('hidden');
        btn.textContent = 'Show Questions & Answers ▼';
    }
}

// ===== MOCK TEST (CSY3023 — May 2025) =====
function buildMockTestSection() {
    if (typeof window.mockTestQuestions === 'undefined') return;

    const bar = document.getElementById('mockFilterBar');
    if (bar) {
        bar.innerHTML = '<button class="filter-pill active" data-mocknum="all" onclick="filterMockTest(\'all\', this)">All Questions</button>';
        mockTestQuestions.forEach(mt => {
            const pill = document.createElement('button');
            pill.className = 'filter-pill';
            pill.dataset.mocknum = mt.number;
            pill.textContent = `${mt.number} · ${mt.topic}`;
            pill.onclick = () => filterMockTest(mt.number, pill);
            bar.appendChild(pill);
        });
    }

    renderMockTest('all');
}

function filterMockTest(num, pill) {
    document.querySelectorAll('#mockFilterBar .filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderMockTest(num);
}

function renderMockTest(num) {
    const list = document.getElementById('mockTestList');
    if (!list) return;
    const filtered = num === 'all' ? mockTestQuestions : mockTestQuestions.filter(m => m.number === num);

    list.innerHTML = '';

    if (filtered.length > 1) {
        const controls = document.createElement('div');
        controls.className = 'mock-controls';
        controls.innerHTML = `
            <span class="mock-count">${filtered.length} question${filtered.length > 1 ? 's' : ''}</span>
            <div class="mock-control-btns">
                <button class="mock-action-btn" onclick="expandAllMock(true)">Expand all</button>
                <button class="mock-action-btn" onclick="expandAllMock(false)">Collapse all</button>
            </div>
        `;
        list.appendChild(controls);
    }

    filtered.forEach(mt => {
        const card = document.createElement('div');
        card.className = 'mock-card';

        let subQHtml = '';
        mt.questions.forEach((sub, i) => {
            const subId = `${mt.id}-sub-${i}`;
            const letter = String.fromCharCode(97 + i); // a, b, c
            const pointsHtml = (sub.points && sub.points.length)
                ? `<div class="mock-points">
                       <h4>Key Points</h4>
                       <ul>${sub.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
                   </div>`
                : '';
            const expHtml = sub.exp
                ? `<div class="mock-example">
                       <span class="mock-example-label">Example</span>
                       <p>${escapeHtml(sub.exp)}</p>
                   </div>`
                : '';

            // strip leading "(a) " etc from question text since we show our own letter badge
            const qText = sub.q.replace(/^\([a-z]\)\s*/i, '');

            subQHtml += `
                <div class="mock-sub">
                    <button class="mock-sub-toggle" onclick="toggleMockSub('${subId}', this)">
                        <span class="mock-sub-letter">${letter}</span>
                        <span class="mock-sub-q">${escapeHtml(qText)}</span>
                        <span class="mock-sub-arrow">+</span>
                    </button>
                    <div id="${subId}" class="mock-sub-body hidden">
                        <div class="mock-answer">
                            <h4>Answer</h4>
                            <p>${escapeHtml(sub.a)}</p>
                        </div>
                        ${expHtml}
                        ${pointsHtml}
                    </div>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="mock-card-header">
                <span class="mock-badge">${escapeHtml(mt.number)}</span>
                <div class="mock-card-titles">
                    <h3>${escapeHtml(mt.title)}</h3>
                    <span class="mock-topic">${escapeHtml(mt.topic)}</span>
                </div>
            </div>
            <div class="mock-context">${escapeHtml(mt.context)}</div>
            <div class="mock-subs">${subQHtml}</div>
        `;
        list.appendChild(card);
    });
}

function toggleMockSub(id, btn) {
    const el = document.getElementById(id);
    const arrow = btn.querySelector('.mock-sub-arrow');
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (arrow) arrow.textContent = '−';
        btn.classList.add('open');
    } else {
        el.classList.add('hidden');
        if (arrow) arrow.textContent = '+';
        btn.classList.remove('open');
    }
}

function expandAllMock(open) {
    document.querySelectorAll('#mockTestList .mock-sub-toggle').forEach(btn => {
        const id = btn.getAttribute('onclick').match(/'([^']+)'/);
        if (!id) return;
        const body = document.getElementById(id[1]);
        const arrow = btn.querySelector('.mock-sub-arrow');
        if (open) {
            body.classList.remove('hidden');
            btn.classList.add('open');
            if (arrow) arrow.textContent = '−';
        } else {
            body.classList.add('hidden');
            btn.classList.remove('open');
            if (arrow) arrow.textContent = '+';
        }
    });
}

// ===== TERMINOLOGY GLOSSARY =====
let terminologyCategory = 'all';
let terminologyQuery = '';
let terminologySectionReady = false;
let terminologyRenderToken = 0;

function ensureTerminologySection() {
    const list = document.getElementById('terminologyList');
    if (!list) return;

    if (typeof window.terminologyEntries === 'undefined') {
        list.innerHTML = '<p class="terminology-empty">Terminology data failed to load. Hard-refresh the page (Ctrl+F5) or wait 2–3 minutes after a site update, then try again.</p>';
        return;
    }

    if (terminologySectionReady) return;

    list.innerHTML = '<p class="terminology-loading">Loading terminology…</p>';
    requestAnimationFrame(() => buildTerminologySection());
}

function buildTerminologySection() {
    if (typeof window.terminologyEntries === 'undefined') {
        ensureTerminologySection();
        return;
    }

    const bar = document.getElementById('terminologyFilterBar');
    if (!bar) return;

    const categories = [...new Set(terminologyEntries.map(t => t.category))].sort();
    bar.innerHTML = '<button class="filter-pill active" data-termcat="all" onclick="filterTerminologyCategory(\'all\', this)">All Terms</button>';
    categories.forEach(cat => {
        const pill = document.createElement('button');
        pill.className = 'filter-pill';
        pill.dataset.termcat = cat;
        pill.textContent = cat;
        pill.onclick = () => filterTerminologyCategory(cat, pill);
        bar.appendChild(pill);
    });

    const search = document.getElementById('terminologySearch');
    if (search) search.value = '';
    terminologyCategory = 'all';
    terminologyQuery = '';
    terminologySectionReady = true;
    renderTerminology();
}

function filterTerminologyCategory(cat, pill) {
    terminologyCategory = cat;
    document.querySelectorAll('#terminologyFilterBar .filter-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    renderTerminology();
}

function filterTerminology() {
    const search = document.getElementById('terminologySearch');
    terminologyQuery = search ? search.value.trim().toLowerCase() : '';
    renderTerminology();
}

function getFilteredTerminology() {
    let list = terminologyEntries;
    if (terminologyCategory !== 'all') {
        list = list.filter(t => t.category === terminologyCategory);
    }
    if (terminologyQuery) {
        const q = terminologyQuery;
        list = list.filter(t =>
            t.term.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q) ||
            (t.example && t.example.toLowerCase().includes(q)) ||
            (t.points && t.points.some(p => p.toLowerCase().includes(q)))
        );
    }
    return list;
}

function renderTerminology() {
    const list = document.getElementById('terminologyList');
    const countEl = document.getElementById('terminologyCount');
    if (!list) return;

    const filtered = getFilteredTerminology();
    if (countEl) {
        countEl.textContent = filtered.length === terminologyEntries.length
            ? `${filtered.length} terms`
            : `${filtered.length} of ${terminologyEntries.length} terms`;
    }

    const token = ++terminologyRenderToken;
    list.innerHTML = '';

    if (!filtered.length) {
        list.innerHTML = '<p class="terminology-empty">No terms match your search. Try another keyword or clear filters.</p>';
        return;
    }

    const controls = document.createElement('div');
    controls.className = 'term-controls';
    controls.innerHTML = `
        <div class="term-control-btns">
            <button class="term-action-btn" onclick="expandAllTerms(true)">Expand all</button>
            <button class="term-action-btn" onclick="expandAllTerms(false)">Collapse all</button>
        </div>
    `;
    list.appendChild(controls);

    const loadingNote = document.createElement('p');
    loadingNote.className = 'terminology-loading';
    loadingNote.textContent = 'Rendering terms…';
    list.appendChild(loadingNote);

    const BATCH = 12;
    let index = 0;

    function appendBatch() {
        if (token !== terminologyRenderToken) return;
        const end = Math.min(index + BATCH, filtered.length);
        for (; index < end; index++) {
            const entry = filtered[index];
            const card = document.createElement('div');
            card.className = 'term-card';
            const bodyId = entry.id + '-body';
            const pointsHtml = (entry.points && entry.points.length)
                ? `<div class="term-points">
                       <h4>Key Points (exam)</h4>
                       <ul>${entry.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
                   </div>`
                : '';
            const exampleHtml = entry.example
                ? `<div class="term-example">
                       <span class="term-example-label">Example</span>
                       <p>${escapeHtml(entry.example)}</p>
                   </div>`
                : '';

            card.innerHTML = `
                <button class="term-toggle" onclick="toggleTermEntry('${bodyId}', this)">
                    <div class="term-toggle-main">
                        <span class="term-cat-badge">${escapeHtml(entry.category)}</span>
                        <h3 class="term-title">${escapeHtml(entry.term)}</h3>
                    </div>
                    <span class="term-arrow">+</span>
                </button>
                <div id="${bodyId}" class="term-body hidden">
                    <div class="term-definition">
                        <h4>Definition</h4>
                        <p>${escapeHtml(entry.definition)}</p>
                    </div>
                    ${exampleHtml}
                    ${pointsHtml}
                </div>
            `;
            list.appendChild(card);
        }
        if (index < filtered.length) {
            requestAnimationFrame(appendBatch);
        } else if (loadingNote.parentNode) {
            loadingNote.remove();
        }
    }

    requestAnimationFrame(appendBatch);
}

function toggleTermEntry(id, btn) {
    const el = document.getElementById(id);
    const arrow = btn.querySelector('.term-arrow');
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (arrow) arrow.textContent = '−';
        btn.classList.add('open');
    } else {
        el.classList.add('hidden');
        if (arrow) arrow.textContent = '+';
        btn.classList.remove('open');
    }
}

// ===== CHEAT SHEET =====
let cheatSheetLoaded = false;
let cheatSheetFullHtml = '';

function loadCheatSheet() {
    if (cheatSheetLoaded) return;
    const el = document.getElementById('cheatSheetContent');
    if (!el) return;

    function render(md) {
        cheatSheetFullHtml = markdownToHtml(md);
        el.innerHTML = cheatSheetFullHtml;
        buildCheatSheetJumpNav(md);
        cheatSheetLoaded = true;
    }

    if (typeof window.cheatSheetMarkdown === 'string' && window.cheatSheetMarkdown.length > 0) {
        render(window.cheatSheetMarkdown);
        return;
    }

    fetch('CSY3062-Exam-Scenario-Cheat-Sheet.md?v=1')
        .then(r => {
            if (!r.ok) throw new Error('not found');
            return r.text();
        })
        .then(render)
        .catch(() => {
            el.innerHTML = '<p class="terminology-empty">Could not load cheat sheet. Refresh the page or use <strong>Download .md</strong> above.</p>';
        });
}

function buildCheatSheetJumpNav(md) {
    const jump = document.getElementById('cheatSheetJump');
    if (!jump) return;
    const sections = [];
    md.split('\n').forEach(line => {
        const m = line.match(/^## (\d+)\.\s+(.+)$/);
        if (m) sections.push({ num: m[1], title: m[2].trim() });
    });
    if (!sections.length) {
        jump.innerHTML = '';
        return;
    }
    jump.innerHTML = '<span class="cheatsheet-jump-label">Jump to:</span>' +
        sections.map(s => `<button type="button" class="cheat-jump-btn" onclick="scrollToCheatSection('${s.num}')">${s.num}. ${escapeHtml(s.title.length > 28 ? s.title.slice(0, 26) + '…' : s.title)}</button>`).join('');
}

function scrollToCheatSection(num) {
    const h = document.getElementById('cheat-sec-' + num);
    if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filterCheatSheet() {
    const q = (document.getElementById('cheatSheetSearch')?.value || '').trim().toLowerCase();
    const el = document.getElementById('cheatSheetContent');
    if (!el || !cheatSheetFullHtml) return;
    if (!q) {
        el.innerHTML = cheatSheetFullHtml;
        return;
    }
    const md = typeof window.cheatSheetMarkdown === 'string' ? window.cheatSheetMarkdown : '';
    if (!md) {
        el.innerHTML = cheatSheetFullHtml;
        return;
    }
    const parts = md.split(/\n(?=## \d+\.)/);
    const intro = parts[0];
    const matched = parts.filter((block, i) => i === 0 || block.toLowerCase().includes(q));
    el.innerHTML = markdownToHtml(matched.join('\n'));
}

function markdownToHtml(md) {
    const lines = md.split('\n');
    let html = '';
    let inCode = false;
    let listOpen = false;

    function closeList() {
        if (listOpen) { html += '</ul>'; listOpen = false; }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('```')) {
            closeList();
            if (!inCode) { html += '<pre class="cheat-pre">'; inCode = true; }
            else { html += '</pre>'; inCode = false; }
            continue;
        }
        if (inCode) {
            html += escapeHtml(line) + '\n';
            continue;
        }
        if (line.startsWith('### ')) { closeList(); html += '<h4>' + inlineMd(line.slice(4)) + '</h4>'; continue; }
        if (line.startsWith('## ')) {
            closeList();
            const sec = line.match(/^## (\d+)\./);
            const idAttr = sec ? ' id="cheat-sec-' + sec[1] + '"' : '';
            html += '<h3' + idAttr + '>' + inlineMd(line.slice(3)) + '</h3>';
            continue;
        }
        if (line.startsWith('# ')) { closeList(); html += '<h2>' + inlineMd(line.slice(2)) + '</h2>'; continue; }
        if (line.startsWith('- [ ] ')) { closeList(); html += '<p class="cheat-check">☐ ' + inlineMd(line.slice(6)) + '</p>'; continue; }
        if (line.startsWith('- ')) {
            if (!listOpen) { html += '<ul class="cheat-ul">'; listOpen = true; }
            html += '<li>' + inlineMd(line.slice(2)) + '</li>';
            continue;
        }
        if (line.trim() === '---') { closeList(); html += '<hr class="cheat-hr">'; continue; }
        if (line.trim() === '') { closeList(); continue; }
        if (line.startsWith('|')) {
            closeList();
            if (line.match(/^\|[\s\-:|]+\|$/)) continue;
            const cells = line.split('|').slice(1, -1).map(c => c.trim());
            if (!cells.length) continue;
            const nextLine = lines[i + 1] || '';
            const isHeaderRow = nextLine.match(/^\|[\s\-:|]+\|$/);
            if (isHeaderRow) {
                html += '<table class="cheat-table"><thead><tr>';
                cells.forEach(c => { html += '<th>' + inlineMd(c) + '</th>'; });
                html += '</tr></thead><tbody>';
                i++;
            } else {
                if (!html.includes('<table class="cheat-table">') || html.endsWith('</table>')) {
                    html += '<table class="cheat-table"><tbody>';
                }
                html += '<tr>';
                cells.forEach(c => { html += '<td>' + inlineMd(c) + '</td>'; });
                html += '</tr>';
            }
            const after = lines[i + 1] || '';
            if (!after.startsWith('|') || after.match(/^\|[\s\-:|]+\|$/)) {
                html += '</tbody></table>';
            }
            continue;
        }
        closeList();
        html += '<p>' + inlineMd(line) + '</p>';
    }
    closeList();
    if (inCode) html += '</pre>';
    if (html.includes('<table class="cheat-table">') && !html.trimEnd().endsWith('</table>')) {
        html += '</tbody></table>';
    }
    return '<div class="cheat-body">' + html + '</div>';
}

function inlineMd(s) {
    return escapeHtml(s)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

function expandAllTerms(open) {
    document.querySelectorAll('#terminologyList .term-toggle').forEach(btn => {
        const match = btn.getAttribute('onclick').match(/'([^']+)'/);
        if (!match) return;
        const body = document.getElementById(match[1]);
        const arrow = btn.querySelector('.term-arrow');
        if (open) {
            body.classList.remove('hidden');
            btn.classList.add('open');
            if (arrow) arrow.textContent = '−';
        } else {
            body.classList.add('hidden');
            btn.classList.remove('open');
            if (arrow) arrow.textContent = '+';
        }
    });
}

// ===== EXAM ENGINE =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTCAExam() {
    examSubmitted = false;
    currentExamIndex = 0;

    const allQ = getAllQuestions();
    if (allQ.length === 0) {
        alert("No questions loaded.");
        return;
    }

    examQuestions = JSON.parse(JSON.stringify(allQ));
    shuffleArray(examQuestions);
    examAnswers = new Array(examQuestions.length).fill(null);

    document.getElementById('examTitle').textContent = 'TCA Full Exam';
    document.getElementById('examScore').classList.add('hidden');
    document.getElementById('examScoreCard').classList.add('hidden');
    document.getElementById('examSubmitBtn').classList.add('hidden');
    document.getElementById('examNextBtn').classList.remove('hidden');

    // 60 min timer
    examTimeSeconds = 60 * 60;
    clearInterval(examTimerInterval);
    updateTimerDisplay();
    examTimerInterval = setInterval(() => {
        examTimeSeconds--;
        updateTimerDisplay();
        if (examTimeSeconds <= 0) {
            clearInterval(examTimerInterval);
            submitExam();
        }
    }, 1000);

    showPage('examPage');
    renderExamQuestion();
}

function updateTimerDisplay() {
    const h = Math.floor(examTimeSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((examTimeSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (examTimeSeconds % 60).toString().padStart(2, '0');
    document.getElementById('examTimer').textContent = `${h}:${m}:${s}`;
}

function renderExamQuestion() {
    const q = examQuestions[currentExamIndex];
    const container = document.getElementById('examQuestionContainer');

    // Progress
    document.getElementById('examProgressText').textContent = `Question ${currentExamIndex + 1} of ${examQuestions.length} — ${q.module}`;
    const pct = ((currentExamIndex + 1) / examQuestions.length) * 100;
    document.getElementById('examProgressBar').style.width = `${pct}%`;

    // Nav
    document.getElementById('examPrevBtn').disabled = (currentExamIndex === 0);

    if (currentExamIndex === examQuestions.length - 1) {
        document.getElementById('examNextBtn').classList.add('hidden');
        if (!examSubmitted) document.getElementById('examSubmitBtn').classList.remove('hidden');
    } else {
        document.getElementById('examNextBtn').classList.remove('hidden');
        document.getElementById('examSubmitBtn').classList.add('hidden');
    }

    const hasAnswered = examAnswers[currentExamIndex] !== null;

    let html = `<p class="question-text">${currentExamIndex + 1}. ${q.question}</p>`;

    q.options.forEach((opt, idx) => {
        let cls = 'option-btn';
        if (hasAnswered || examSubmitted) {
            cls += ' disabled';
            if (idx === q.correctAnswer) cls += ' correct';
            else if (examAnswers[currentExamIndex] === idx) cls += ' wrong';
        }

        html += `<button class="${cls}" onclick="selectExamOption(${idx})" ${hasAnswered ? 'disabled' : ''}>
            <span class="option-label">${String.fromCharCode(65 + idx)}.</span> ${opt}
        </button>`;
    });

    // Explanation
    if (hasAnswered || examSubmitted) {
        const isCorrect = examAnswers[currentExamIndex] === q.correctAnswer;
        html += `
            <div class="explanation-box ${isCorrect ? '' : 'wrong'}">
                <h4 style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
                    ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                </h4>
                <p>${q.explanation}</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

function selectExamOption(idx) {
    if (examSubmitted || examAnswers[currentExamIndex] !== null) return;
    examAnswers[currentExamIndex] = idx;
    renderExamQuestion();
}

function navExam(dir) {
    currentExamIndex += dir;
    if (currentExamIndex < 0) currentExamIndex = 0;
    if (currentExamIndex >= examQuestions.length) currentExamIndex = examQuestions.length - 1;
    renderExamQuestion();
}

function submitExam() {
    if (!examSubmitted && !confirm("Submit your exam?")) return;

    clearInterval(examTimerInterval);
    examSubmitted = true;

    let score = 0;
    examAnswers.forEach((ans, idx) => {
        if (ans === examQuestions[idx].correctAnswer) score++;
    });

    const percentage = Math.round((score / examQuestions.length) * 100);
    const scoreEl = document.getElementById('examScore');
    scoreEl.textContent = `Score: ${percentage}% (${score}/${examQuestions.length})`;
    scoreEl.style.color = percentage >= 70 ? 'var(--success)' : 'var(--danger)';
    scoreEl.classList.remove('hidden');

    const card = document.getElementById('examScoreCard');
    card.textContent = `Final Score: ${score}/${examQuestions.length} (${percentage}%)`;
    card.style.color = percentage >= 70 ? 'var(--success)' : 'var(--danger)';
    card.classList.remove('hidden');

    currentExamIndex = 0;
    renderExamQuestion();
}

function exitExam() {
    clearInterval(examTimerInterval);
    examSubmitted = false;
    examQuestions = [];
    examAnswers = [];
    currentExamIndex = 0;
    showPage('dashboardPage');
}

// ===== BOOT =====
showPage('loginPage');

// Allow Enter key to submit login
document.addEventListener('DOMContentLoaded', () => {
    const pinInput = document.getElementById('pinInput');
    const passInput = document.getElementById('passwordInput');
    if (pinInput) pinInput.addEventListener('keyup', e => { if (e.key === 'Enter') passInput.focus(); });
    if (passInput) passInput.addEventListener('keyup', e => { if (e.key === 'Enter') handleLogin(); });
});
