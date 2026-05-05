// Utility: SHA-256 Hashing
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// State
let currentUser = null;
let currentCourse = null;
let currentSlideIndex = 0;

// Exam State
let examQuestions = [];
let currentExamIndex = 0;
let examAnswers = [];
let examTimerInterval = null;
let examTimeSeconds = 0;
let examMode = false;
let examSubmitted = false;

// Router
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Auth Login
async function handleLogin() {
    const pin = document.getElementById('pinInput').value;
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('loginError');

    // Find user by PIN first (simulating local lookup)
    const user = appData.users.find(u => u.pin === pin);

    if (!user) {
        errorMsg.textContent = "Invalid PIN or Password";
        return;
    }

    // Verify Password Hash
    // Note: For this demo, valid password is 'password123'
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

// Dashboard
function initDashboard() {
    const grid = document.getElementById('courseGrid');
    grid.innerHTML = '';

    appData.courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => loadCourse(course.id);
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: 0%"></div>
            </div>
            <span style="font-size: 0.8rem; color: var(--primary); display: block; margin-top: 10px;">Click to Start</span>
        `;
        grid.appendChild(card);
    });
}

// Course Player
function loadCourse(courseId) {
    currentCourse = appData.courses.find(c => c.id === courseId);
    currentSlideIndex = 0;
    renderSlide();
    showPage('learnPage');

    // Fill Sidebar
    const sidebarList = document.getElementById('slideList');
    sidebarList.innerHTML = '';
    currentCourse.slides.forEach((slide, index) => {
        const item = document.createElement('div');
        item.className = 'sidebar-item ' + (index === 0 ? 'active' : '');
        item.textContent = slide.title || `Slide ${index + 1}`;
        item.onclick = () => {
            currentSlideIndex = index;
            renderSlide();
        };
        sidebarList.appendChild(item);
    });
}

function renderSlide() {
    const slide = currentCourse.slides[currentSlideIndex];
    const container = document.getElementById('slideContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Update Sidebar Active State
    document.querySelectorAll('.sidebar-item').forEach((item, idx) => {
        if (idx === currentSlideIndex) item.classList.add('active');
        else item.classList.remove('active');
    });

    // Render Content
    let htmlContent = `<h1>${slide.title}</h1>`;

    if (slide.type === 'quiz') {
        // Pass the explanation to the checkAnswer function (escaped for safety)
        const explanationSafe = slide.explanation ? slide.explanation.replace(/'/g, "\\'") : "No detailed explanation available.";

        htmlContent += `<div class="quiz-container" style="margin-top: 20px;">
            <h3>${slide.question}</h3>
            <div id="quizOptions">
                ${slide.options.map((opt, i) =>
            `<div class="quiz-option" onclick="checkAnswer(${i}, ${slide.correctAnswer}, this, '${explanationSafe}')">${opt}</div>`
        ).join('')}
            </div>
            <div id="quizResult" class="error-msg" style="font-size: 1.1rem; margin-top: 15px; white-space: pre-wrap;"></div>
        </div>`;
    } else {
        htmlContent += `<div style="margin-top: 20px; font-size: 1.1rem; line-height: 1.6;">${slide.content}</div>`;
    }

    // Real Life Example
    if (slide.realLifeExample) {
        htmlContent += `
        <div class="real-life-example">
            <h4><span style="margin-right: 10px;">💡</span>Real Life Application</h4>
            <p>${slide.realLifeExample}</p>
        </div>`;
    }

    // Key Points
    if (slide.keyPoints && slide.keyPoints.length > 0) {
        htmlContent += `
        <div style="margin-top: 30px; background: rgba(0, 240, 255, 0.05); padding: 20px; border-radius: 10px; border: 1px solid var(--glass-border);">
            <h4 style="color: var(--primary); margin-bottom: 10px;">🔑 Key Takeaways</h4>
            <ul style="padding-left: 20px; color: var(--text-main);">
                ${slide.keyPoints.map(point => `<li style="margin-bottom: 5px;">${point}</li>`).join('')}
            </ul>
        </div>`;
    }

    // Notes
    const notesPanel = document.getElementById('notesContent');
    if (slide.notes) {
        notesPanel.textContent = slide.notes;
    } else {
        notesPanel.textContent = "No notes for this slide.";
    }

    container.innerHTML = htmlContent;

    // Nav Buttons
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === currentCourse.slides.length - 1;
    if (currentSlideIndex === currentCourse.slides.length - 1) {
        nextBtn.textContent = 'Finish';
        nextBtn.onclick = () => showPage('dashboardPage');
    } else {
        nextBtn.textContent = 'Next >';
        nextBtn.onclick = () => {
            currentSlideIndex++;
            renderSlide();
        };
    }
}

function checkAnswer(selected, correct, element, explanation) {
    const resultDiv = document.getElementById('quizResult');
    const allOptions = document.querySelectorAll('.quiz-option');

    allOptions.forEach(opt => opt.style.pointerEvents = 'none'); // Lock options

    let feedback = "";
    if (selected === correct) {
        element.style.background = 'rgba(0, 255, 157, 0.2)';
        element.style.borderColor = '#00ff9d';
        resultDiv.style.color = "#00ff9d";
        feedback = "<strong>Correct!</strong>\n\n";
    } else {
        element.style.background = 'rgba(255, 0, 85, 0.2)';
        element.style.borderColor = '#ff0055';
        resultDiv.style.color = "#ff0055";
        feedback = "<strong>Incorrect.</strong>\n\n";
    }

    // Append explanation
    resultDiv.innerHTML = feedback + `<span style="color: var(--text-muted); font-size: 0.9em;">${explanation}</span>`;
}

// Prev Button Logic
document.getElementById('prevBtn').onclick = () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
    }
};

// --- TCA EXAM LOGIC ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTCAExam() {
    examMode = true;
    examSubmitted = false;
    currentExamIndex = 0;
    examAnswers = [];
    
    // Load and shuffle questions
    if (typeof window.tcaQuestions === 'undefined') {
        alert("Exam questions failed to load.");
        return;
    }
    
    // Copy and shuffle the global array
    examQuestions = JSON.parse(JSON.stringify(window.tcaQuestions));
    shuffleArray(examQuestions);
    
    // Initialize answers array
    examAnswers = new Array(examQuestions.length).fill(null);
    
    // UI Reset
    document.getElementById('examScore').classList.add('hidden');
    document.getElementById('examSubmitBtn').classList.add('hidden');
    document.getElementById('examNextBtn').classList.remove('hidden');
    
    // Start Timer (e.g., 60 mins for full exam)
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
    document.getElementById('examProgressText').textContent = `Question ${currentExamIndex + 1} of ${examQuestions.length} | ${q.module}`;
    const progressPct = ((currentExamIndex + 1) / examQuestions.length) * 100;
    document.getElementById('examProgressBar').style.width = `${progressPct}%`;
    
    // Nav Buttons
    document.getElementById('examPrevBtn').disabled = (currentExamIndex === 0);
    
    if (currentExamIndex === examQuestions.length - 1) {
        document.getElementById('examNextBtn').classList.add('hidden');
        if (!examSubmitted) document.getElementById('examSubmitBtn').classList.remove('hidden');
    } else {
        document.getElementById('examNextBtn').classList.remove('hidden');
        document.getElementById('examSubmitBtn').classList.add('hidden');
    }

    let html = `<h3 style="margin-bottom: 30px; font-size: 1.3rem; line-height: 1.5;">${currentExamIndex + 1}. ${q.question}</h3>`;
    html += `<div id="examOptions">`;
    
    // Check if the user has already answered this specific question
    const hasAnswered = examAnswers[currentExamIndex] !== null;
    
    q.options.forEach((opt, idx) => {
        const isSelected = examAnswers[currentExamIndex] === idx;
        let optStyle = "quiz-option";
        
        // Immediate feedback logic
        if (hasAnswered || examSubmitted) {
            optStyle += " disabled";
            if (idx === q.correctAnswer) {
                optStyle += " correct-ans"; // Highlight the correct answer in green
            } else if (isSelected) {
                optStyle += " wrong-ans"; // Highlight their wrong choice in red
            }
        }
        
        html += `<div class="${optStyle}" onclick="selectExamOption(${idx})" style="cursor: ${hasAnswered ? 'default' : 'pointer'};">
            <span style="font-weight: bold; margin-right: 10px;">${String.fromCharCode(65 + idx)}.</span> ${opt}
        </div>`;
    });
    
    html += `</div>`;
    
    // Show explanation immediately if they have answered it
    if (hasAnswered || examSubmitted) {
        const isCorrect = examAnswers[currentExamIndex] === q.correctAnswer;
        const feedbackColor = isCorrect ? "#00ff9d" : "#ff0055";
        const feedbackText = isCorrect ? "✅ Correct!" : "❌ Incorrect.";
        
        html += `<div style="margin-top: 20px; padding: 20px; background: rgba(0,0,0,0.3); border-left: 4px solid ${feedbackColor}; border-radius: 5px;">
            <h4 style="color: ${feedbackColor}; margin-bottom: 10px; font-size: 1.2rem;">${feedbackText}</h4>
            <h5 style="color: var(--text-main); margin-bottom: 8px;">Explanation:</h5>
            <p style="color: var(--text-muted); line-height: 1.6; font-size: 1.05rem;">${q.explanation}</p>
        </div>`;
    }
    
    container.innerHTML = html;
}

function selectExamOption(idx) {
    if (examSubmitted || examAnswers[currentExamIndex] !== null) return; // Prevent changing answer
    examAnswers[currentExamIndex] = idx;
    renderExamQuestion(); // Re-render to show immediate feedback
}

function navExam(dir) {
    currentExamIndex += dir;
    renderExamQuestion();
}

function submitExam() {
    if (!examSubmitted && !confirm("Are you sure you want to submit your exam?")) return;
    
    clearInterval(examTimerInterval);
    examSubmitted = true;
    
    let score = 0;
    examAnswers.forEach((ans, idx) => {
        if (ans === examQuestions[idx].correctAnswer) score++;
    });
    
    const percentage = Math.round((score / examQuestions.length) * 100);
    const scoreEl = document.getElementById('examScore');
    scoreEl.textContent = `Score: ${percentage}% (${score}/${examQuestions.length})`;
    scoreEl.classList.remove('hidden');
    
    if (percentage >= 80) {
        scoreEl.style.color = "#00ff9d";
    } else {
        scoreEl.style.color = "#ff0055";
    }
    
    // Jump back to 1st question for review
    currentExamIndex = 0;
    renderExamQuestion();
}

function exitExam() {
    if (!examSubmitted && !confirm("Exit exam? All progress will be lost.")) return;
    clearInterval(examTimerInterval);
    examMode = false;
    showPage('dashboardPage');
}

// Start
showPage('loginPage');
