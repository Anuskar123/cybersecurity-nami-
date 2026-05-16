// ===== UTILITY: SHA-256 HASHING =====
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
    filtered.forEach((scenario, idx) => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        
        const questionsId = `sq-${scenario.id}`;
        card.innerHTML = `
            <h3>${scenario.title}</h3>
            <div class="scenario-context">${scenario.context}</div>
            <button class="scenario-toggle" onclick="toggleScenarioQ('${questionsId}', this)">Show Questions & Answers ▼</button>
            <ol id="${questionsId}" class="hidden" style="margin-top: 16px;">
                ${scenario.questions.map(item => `
                    <li style="margin-bottom: 16px;">
                        <strong>Q: ${item.q}</strong>
                        <div class="explanation-box" style="margin-top: 8px;">
                            <h4 style="color: var(--accent);">Detailed Answer</h4>
                            <p>${item.a}</p>
                        </div>
                    </li>
                `).join('')}
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
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

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
