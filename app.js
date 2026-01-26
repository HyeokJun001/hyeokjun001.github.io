// 정보처리기사 필기 학습 앱 - 메인 로직 (백엔드 연동 버전)

const API_BASE = 'http://localhost:3000/api';

// 상태 관리
let currentSection = 'home';
let currentConcept = null;
let currentUser = null;
let currentQuiz = {
    subject: 0,
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    submitted: false,
    results: []
};

// 오답노트 데이터
let wrongNotes = [];

// 학습 통계
let studyStats = {
    totalSolved: 0,
    totalCorrect: 0,
    todaySolved: 0,
    todayCorrect: 0
};

// ============ 초기화 ============
document.addEventListener('DOMContentLoaded', async () => {
    await checkSession();
    updateStatsDisplay();
    updateWrongBadge();
    updateDDay();
    initSidebar();

    // 브라우저 뒤로가기/앞으로가기 지원
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            if (event.state.type === 'concept') {
                showConceptWithoutHistory(event.state.id);
            } else if (event.state.type === 'section') {
                showSectionWithoutHistory(event.state.id);
            }
        } else {
            showSectionWithoutHistory('home');
        }
    });

    // 초기 상태 저장
    history.replaceState({ type: 'section', id: 'home' }, '', '');
});

// D-Day 계산
function updateDDay() {
    const examDate = new Date('2026-03-01'); // 시험일: 2026년 3월 1일
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayText = document.getElementById('dDayText');
    const homeDDay = document.getElementById('homeDDay');

    if (dDayText) {
        if (diffDays > 0) {
            dDayText.textContent = `D-${diffDays} | 시험일: 2026년 3월 1일`;
        } else if (diffDays === 0) {
            dDayText.textContent = `D-Day! | 시험일: 2026년 3월 1일`;
        } else {
            dDayText.textContent = `시험 종료 | 2026년 3월 1일`;
        }
    }

    if (homeDDay) {
        if (diffDays > 0) {
            homeDDay.textContent = `${diffDays}일`;
        } else if (diffDays === 0) {
            homeDDay.textContent = `오늘`;
        } else {
            homeDDay.textContent = `종료`;
        }
    }
}

// 사이드바 초기화
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('#menuToggle i');

    // 데스크톱에서는 기본으로 열림, 모바일에서는 닫힘
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('closed');
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    } else {
        sidebar.classList.add('closed');
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }

    // 창 크기 변경 시 대응
    window.addEventListener('resize', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const menuIcon = document.querySelector('#menuToggle i');

        if (window.innerWidth >= 1024) {
            overlay.classList.add('hidden');
            sidebar.classList.remove('open');
        }
    });
}

// ============ 인증 관련 함수 ============

// 세션 확인
async function checkSession() {
    try {
        const res = await fetch(`${API_BASE}/session`, {
            credentials: 'include'
        });
        const data = await res.json();

        if (data.loggedIn) {
            currentUser = data.user;
            showLoggedInState();
            await loadUserData();
        } else {
            showLoggedOutState();
            loadLocalData();
        }
    } catch (error) {
        console.log('서버 연결 안됨, 로컬 모드로 동작');
        showLoggedOutState();
        loadLocalData();
    }
}

// 로그인 상태 UI
function showLoggedInState() {
    document.getElementById('loginBtn').classList.add('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('userNameDisplay').textContent = currentUser.username;
}

// 로그아웃 상태 UI
function showLoggedOutState() {
    document.getElementById('loginBtn').classList.remove('hidden');
    document.getElementById('userInfo').classList.add('hidden');
    currentUser = null;
}

// 사용자 데이터 로드 (서버에서)
async function loadUserData() {
    try {
        // 통계 로드
        const statsRes = await fetch(`${API_BASE}/stats`, { credentials: 'include' });
        const statsData = await statsRes.json();
        if (statsData.success) {
            studyStats = {
                totalSolved: statsData.stats.total_solved,
                totalCorrect: statsData.stats.total_correct,
                todaySolved: statsData.stats.today_solved,
                todayCorrect: statsData.stats.today_correct
            };
        }

        // 오답노트 로드
        const wrongRes = await fetch(`${API_BASE}/wrong-notes`, { credentials: 'include' });
        const wrongData = await wrongRes.json();
        if (wrongData.success) {
            wrongNotes = wrongData.wrongNotes.map(note => ({
                question: note.question,
                selectedAnswer: note.selected_answer,
                subject: note.subject
            }));
        }

        updateStatsDisplay();
        updateWrongBadge();
    } catch (error) {
        console.error('데이터 로드 실패:', error);
    }
}

// 로컬 데이터 로드 (비로그인)
function loadLocalData() {
    wrongNotes = JSON.parse(localStorage.getItem('wrongNotes')) || [];
    studyStats = JSON.parse(localStorage.getItem('studyStats')) || {
        totalSolved: 0,
        totalCorrect: 0,
        todaySolved: 0,
        todayCorrect: 0,
        lastDate: new Date().toDateString()
    };

    // 날짜 변경 시 오늘 통계 리셋
    const today = new Date().toDateString();
    if (studyStats.lastDate !== today) {
        studyStats.todaySolved = 0;
        studyStats.todayCorrect = 0;
        studyStats.lastDate = today;
        localStorage.setItem('studyStats', JSON.stringify(studyStats));
    }

    updateStatsDisplay();
    updateWrongBadge();
}

// 모달 표시
function showAuthModal(type) {
    document.getElementById('authModal').classList.remove('hidden');
    document.getElementById('loginError').classList.add('hidden');
    document.getElementById('registerError').classList.add('hidden');
    document.getElementById('registerSuccess').classList.add('hidden');

    if (type === 'login') {
        document.getElementById('authModalTitle').textContent = '로그인';
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
    } else {
        document.getElementById('authModalTitle').textContent = '회원가입';
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }
}

// 모달 닫기
function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
    // 입력 필드 초기화
    document.getElementById('loginId').value = '';
    document.getElementById('loginPw').value = '';
    document.getElementById('registerId').value = '';
    document.getElementById('registerPw').value = '';
    document.getElementById('registerPwConfirm').value = '';
}

// 회원가입
async function register() {
    const username = document.getElementById('registerId').value.trim();
    const password = document.getElementById('registerPw').value;
    const passwordConfirm = document.getElementById('registerPwConfirm').value;
    const errorEl = document.getElementById('registerError');
    const successEl = document.getElementById('registerSuccess');

    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

    // 비밀번호 확인
    if (password !== passwordConfirm) {
        errorEl.textContent = '비밀번호가 일치하지 않습니다.';
        errorEl.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
            successEl.textContent = data.message + ' 로그인해주세요.';
            successEl.classList.remove('hidden');
            setTimeout(() => showAuthModal('login'), 1500);
        } else {
            errorEl.textContent = data.message;
            errorEl.classList.remove('hidden');
        }
    } catch (error) {
        errorEl.textContent = '서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.';
        errorEl.classList.remove('hidden');
    }
}

// 로그인
async function login() {
    const username = document.getElementById('loginId').value.trim();
    const password = document.getElementById('loginPw').value;
    const errorEl = document.getElementById('loginError');

    errorEl.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await res.json();

        if (data.success) {
            currentUser = data.user;
            showLoggedInState();
            await loadUserData();
            closeAuthModal();
            alert(`${currentUser.username}님, 환영합니다!`);
        } else {
            errorEl.textContent = data.message;
            errorEl.classList.remove('hidden');
        }
    } catch (error) {
        errorEl.textContent = '서버 연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.';
        errorEl.classList.remove('hidden');
    }
}

// 로그아웃
async function logout() {
    try {
        await fetch(`${API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.log('로그아웃 요청 실패');
    }

    currentUser = null;
    showLoggedOutState();

    // 로컬 데이터로 전환
    loadLocalData();
    alert('로그아웃 되었습니다.');
}

// ============ 사이드바 ============
document.getElementById('menuToggle')?.addEventListener('click', () => {
    toggleSidebar();
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('#menuToggle i');
    const isCurrentlyOpen = !sidebar.classList.contains('closed');

    if (isCurrentlyOpen) {
        // 사이드바 닫기
        sidebar.classList.add('closed');
        if (window.innerWidth < 1024) {
            overlay.classList.add('hidden');
        }
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else {
        // 사이드바 열기
        sidebar.classList.remove('closed');
        if (window.innerWidth < 1024) {
            overlay.classList.remove('hidden');
        }
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.querySelector('#menuToggle i');

    // 모바일에서만 자동 닫기 (메뉴 클릭 시)
    if (window.innerWidth < 1024) {
        sidebar.classList.add('closed');
        overlay.classList.add('hidden');

        // 아이콘 복원
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
}

// ============ 섹션 전환 ============
function showSectionWithoutHistory(section) {
    // 모든 섹션 숨기기
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('conceptSection').classList.add('hidden');
    document.getElementById('cbtSection').classList.add('hidden');
    document.getElementById('wrongSection').classList.add('hidden');

    // 네비게이션 활성화 업데이트
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });

    // 선택된 섹션 표시
    switch(section) {
        case 'home':
            document.getElementById('homeSection').classList.remove('hidden');
            break;
        case 'cbt':
            document.getElementById('cbtSection').classList.remove('hidden');
            document.getElementById('cbtSelect').classList.remove('hidden');
            document.getElementById('cbtQuiz').classList.add('hidden');
            document.getElementById('cbtResult').classList.add('hidden');
            break;
        case 'wrong':
            document.getElementById('wrongSection').classList.remove('hidden');
            renderWrongNotes();
            break;
    }

    currentSection = section;
    closeSidebar();
}

function showSection(section) {
    showSectionWithoutHistory(section);
    // 브라우저 히스토리에 추가
    history.pushState({ type: 'section', id: section }, '', '');
}

// ============ 개념 페이지 ============
function showConceptWithoutHistory(subjectId) {
    const concept = concepts[subjectId];
    if (!concept) return;

    // 네비게이션 업데이트
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === `concept${subjectId}`) {
            item.classList.add('active');
        }
    });

    // 모든 섹션 숨기기
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('cbtSection').classList.add('hidden');
    document.getElementById('wrongSection').classList.add('hidden');
    document.getElementById('conceptSection').classList.remove('hidden');

    // 색상 클래스
    const colorClasses = {
        'indigo': 'from-indigo-500 to-indigo-600',
        'purple': 'from-purple-500 to-purple-600',
        'blue': 'from-blue-500 to-blue-600',
        'green': 'from-green-500 to-green-600',
        'orange': 'from-orange-500 to-orange-600'
    };

    // 섹션 HTML 생성
    let sectionsHTML = concept.sections.map((section, idx) => `
        <div id="section-${section.id}" class="mb-8">
            <div class="flex items-center gap-3 mb-4">
                <span class="w-8 h-8 rounded-lg bg-${concept.color}-100 text-${concept.color}-600 flex items-center justify-center font-bold">${idx + 1}</span>
                <h3 class="text-xl font-bold text-gray-800">${section.title}</h3>
            </div>
            ${section.content}
        </div>
    `).join('');

    // 목차 HTML
    let tocHTML = concept.sections.map((section, idx) => `
        <a href="#section-${section.id}" class="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-600 hover:text-${concept.color}-600 transition">
            ${idx + 1}. ${section.title}
        </a>
    `).join('');

    document.getElementById('conceptContent').innerHTML = `
        <div class="mb-8">
            <!-- 뒤로가기/홈 버튼 -->
            <div class="flex items-center gap-3 mb-6">
                <button onclick="showSection('home')" class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:shadow-md transition text-gray-700">
                    <i class="fas fa-home"></i>
                    <span>홈으로</span>
                </button>
                <button onclick="goBack()" class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:shadow-md transition text-gray-700">
                    <i class="fas fa-arrow-left"></i>
                    <span>뒤로가기</span>
                </button>
            </div>

            <div class="bg-gradient-to-r ${colorClasses[concept.color]} text-white rounded-2xl p-6 mb-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                        <i class="fas ${concept.icon} text-3xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">${subjectId}과목: ${concept.title}</h2>
                        <p class="opacity-80">핵심 개념 정리</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- 목차 -->
                <div class="lg:w-64 flex-shrink-0">
                    <div class="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24">
                        <h4 class="font-bold text-gray-800 mb-3">📚 목차</h4>
                        ${tocHTML}
                        <hr class="my-3">
                        <button onclick="startCBT(${subjectId})" class="w-full bg-gradient-to-r ${colorClasses[concept.color]} text-white py-2 rounded-lg font-medium hover:opacity-90 transition text-sm">
                            <i class="fas fa-edit mr-2"></i>CBT 풀기
                        </button>
                    </div>
                </div>

                <!-- 본문 -->
                <div class="flex-1">
                    ${sectionsHTML}

                    <!-- 하단 네비게이션 -->
                    <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        ${subjectId > 1 ? `
                            <button onclick="showConcept(${subjectId - 1})" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                                <i class="fas fa-arrow-left"></i>
                                <span>${subjectId - 1}과목</span>
                            </button>
                        ` : '<div></div>'}
                        ${subjectId < 5 ? `
                            <button onclick="showConcept(${subjectId + 1})" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${colorClasses[concept.color]} text-white rounded-xl hover:opacity-90 transition">
                                <span>${subjectId + 1}과목</span>
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        ` : '<div></div>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    currentConcept = subjectId;
    closeSidebar();
    window.scrollTo(0, 0);
}

function showConcept(subjectId) {
    showConceptWithoutHistory(subjectId);
    // 브라우저 히스토리에 추가
    history.pushState({ type: 'concept', id: subjectId }, '', '');
}

// 뒤로가기 (브라우저 히스토리 사용)
function goBack() {
    history.back();
}

// ============ CBT ============
function startCBT(subjectId) {
    // 먼저 CBT 섹션으로 이동
    showSection('cbt');

    currentQuiz.subject = subjectId;
    currentQuiz.currentIndex = 0;
    currentQuiz.selectedAnswer = null;
    currentQuiz.submitted = false;
    currentQuiz.results = [];

    // 문제 가져오기
    if (subjectId === 0) {
        let allQuestions = [];
        for (let i = 1; i <= 5; i++) {
            allQuestions = allQuestions.concat(questions[i]);
        }
        currentQuiz.questions = shuffleArray(allQuestions).slice(0, 100);
    } else {
        currentQuiz.questions = shuffleArray([...questions[subjectId]]);
    }

    document.getElementById('cbtSelect').classList.add('hidden');
    document.getElementById('cbtQuiz').classList.remove('hidden');
    document.getElementById('cbtResult').classList.add('hidden');

    renderQuestion();
}

function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function renderQuestion() {
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const total = currentQuiz.questions.length;
    const current = currentQuiz.currentIndex + 1;

    // 먼저 상태 초기화
    currentQuiz.submitted = false;
    currentQuiz.selectedAnswer = null;

    const subjectNames = {
        0: '전과목 모의고사',
        1: '1과목: 소프트웨어 설계',
        2: '2과목: 소프트웨어 개발',
        3: '3과목: 데이터베이스 구축',
        4: '4과목: 프로그래밍 언어 활용',
        5: '5과목: 정보시스템 구축관리'
    };

    let qSubject = currentQuiz.subject;
    if (currentQuiz.subject === 0) {
        for (let i = 1; i <= 5; i++) {
            if (questions[i].some(item => item.id === q.id)) {
                qSubject = i;
                break;
            }
        }
    }

    document.getElementById('quizSubject').textContent = subjectNames[currentQuiz.subject];
    document.getElementById('quizProgress').textContent = `${current} / ${total}`;
    document.getElementById('quizProgressBar').style.width = `${(current / total) * 100}%`;
    document.getElementById('questionNumber').textContent = `문제 ${current}`;
    document.getElementById('questionYear').textContent = q.year;
    document.getElementById('questionText').innerHTML = q.question.replace(/\n/g, '<br>');

    const optionsHTML = q.options.map((opt, idx) => `
        <button onclick="selectAnswer(${idx})"
                class="answer-option w-full text-left p-4 rounded-xl border-2 transition border-gray-200 hover:border-gray-300"
                data-index="${idx}">
            <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm border-gray-300 text-gray-500">
                    ${idx + 1}
                </span>
                <span class="flex-1">${opt}</span>
            </div>
        </button>
    `).join('');

    document.getElementById('answerOptions').innerHTML = optionsHTML;
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('resultArea').classList.add('hidden');
    document.getElementById('goToConceptBtn').classList.add('hidden');

    currentQuiz.currentConceptId = q.conceptId;
    currentQuiz.currentSubject = qSubject;
}

function selectAnswer(index) {
    if (currentQuiz.submitted) return;

    currentQuiz.selectedAnswer = index;

    document.querySelectorAll('.answer-option').forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.remove('border-gray-200', 'hover:border-gray-300');
            btn.classList.add('border-indigo-500', 'bg-indigo-50');
            btn.querySelector('span').classList.remove('border-gray-300', 'text-gray-500');
            btn.querySelector('span').classList.add('border-indigo-500', 'bg-indigo-500', 'text-white');
        } else {
            btn.classList.remove('border-indigo-500', 'bg-indigo-50');
            btn.classList.add('border-gray-200', 'hover:border-gray-300');
            btn.querySelector('span').classList.remove('border-indigo-500', 'bg-indigo-500', 'text-white');
            btn.querySelector('span').classList.add('border-gray-300', 'text-gray-500');
        }
    });

    document.getElementById('submitBtn').disabled = false;
}

async function submitAnswer() {
    if (currentQuiz.selectedAnswer === null || currentQuiz.submitted) return;

    currentQuiz.submitted = true;
    const q = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = currentQuiz.selectedAnswer === q.answer;

    currentQuiz.results.push({
        question: q,
        selected: currentQuiz.selectedAnswer,
        correct: isCorrect
    });

    // 통계 업데이트
    studyStats.totalSolved++;
    studyStats.todaySolved++;
    if (isCorrect) {
        studyStats.totalCorrect++;
        studyStats.todayCorrect++;
    }

    // 서버에 저장 (로그인 시)
    if (currentUser) {
        try {
            await fetch(`${API_BASE}/stats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCorrect }),
                credentials: 'include'
            });
        } catch (error) {
            console.error('통계 저장 실패:', error);
        }
    } else {
        // 로컬 저장
        localStorage.setItem('studyStats', JSON.stringify(studyStats));
    }

    updateStatsDisplay();

    // 오답 저장
    if (!isCorrect) {
        await addWrongNote(q, currentQuiz.selectedAnswer, currentQuiz.currentSubject);
    }

    // UI 업데이트
    document.querySelectorAll('.answer-option').forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.remove('border-gray-200', 'border-indigo-500', 'bg-indigo-50');
            btn.classList.add('border-green-500', 'bg-green-50');
            btn.querySelector('span').classList.remove('border-gray-300', 'text-gray-500', 'border-indigo-500', 'bg-indigo-500');
            btn.querySelector('span').classList.add('border-green-500', 'bg-green-500', 'text-white');
        } else if (idx === currentQuiz.selectedAnswer && !isCorrect) {
            btn.classList.remove('border-indigo-500', 'bg-indigo-50');
            btn.classList.add('border-red-500', 'bg-red-50');
            btn.querySelector('span').classList.remove('border-indigo-500', 'bg-indigo-500');
            btn.querySelector('span').classList.add('border-red-500', 'bg-red-500', 'text-white');
        }
    });

    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('resultArea').classList.remove('hidden');

    const resultBox = document.getElementById('resultBox');
    if (isCorrect) {
        resultBox.innerHTML = `
            <div class="flex items-center gap-3 text-green-700">
                <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <i class="fas fa-check text-white text-xl"></i>
                </div>
                <div>
                    <p class="font-bold text-lg">정답입니다!</p>
                    <p class="text-sm text-green-600">잘 하셨어요!</p>
                </div>
            </div>
        `;
        resultBox.className = 'rounded-xl p-4 mb-4 bg-green-50 border border-green-200';
    } else {
        resultBox.innerHTML = `
            <div class="flex items-center gap-3 text-red-700">
                <div class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <i class="fas fa-times text-white text-xl"></i>
                </div>
                <div>
                    <p class="font-bold text-lg">오답입니다</p>
                    <p class="text-sm text-red-600">정답: ${q.answer + 1}번 - ${q.options[q.answer]}</p>
                </div>
            </div>
        `;
        resultBox.className = 'rounded-xl p-4 mb-4 bg-red-50 border border-red-200';
        document.getElementById('goToConceptBtn').classList.remove('hidden');
    }

    document.getElementById('explanationText').textContent = q.explanation;
}

function goToConcept() {
    const subject = currentQuiz.currentSubject;
    const conceptId = currentQuiz.currentConceptId;

    showConcept(subject);

    setTimeout(() => {
        const section = document.getElementById(`section-${conceptId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

function nextQuestion() {
    currentQuiz.currentIndex++;
    currentQuiz.selectedAnswer = null;

    if (currentQuiz.currentIndex >= currentQuiz.questions.length) {
        showResult();
    } else {
        renderQuestion();
    }
}

function showResult() {
    document.getElementById('cbtQuiz').classList.add('hidden');
    document.getElementById('cbtResult').classList.remove('hidden');

    const correct = currentQuiz.results.filter(r => r.correct).length;
    const total = currentQuiz.results.length;
    const score = Math.round((correct / total) * 100);

    const subjectNames = {
        0: '전과목 모의고사',
        1: '1과목: 소프트웨어 설계',
        2: '2과목: 소프트웨어 개발',
        3: '3과목: 데이터베이스 구축',
        4: '4과목: 프로그래밍 언어 활용',
        5: '5과목: 정보시스템 구축관리'
    };

    document.getElementById('resultSubject').textContent = subjectNames[currentQuiz.subject];
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultCorrect').textContent = correct;
    document.getElementById('resultWrong').textContent = total - correct;
}

// ============ 오답노트 ============
async function addWrongNote(question, selectedAnswer, subject) {
    const exists = wrongNotes.some(note => note.question.id === question.id);
    if (exists) return;

    const note = { question, selectedAnswer, subject, date: new Date().toLocaleDateString() };
    wrongNotes.push(note);

    if (currentUser) {
        try {
            await fetch(`${API_BASE}/wrong-notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, selectedAnswer, subject }),
                credentials: 'include'
            });
        } catch (error) {
            console.error('오답노트 저장 실패:', error);
        }
    } else {
        localStorage.setItem('wrongNotes', JSON.stringify(wrongNotes));
    }

    updateWrongBadge();
}

function renderWrongNotes() {
    const container = document.getElementById('wrongNoteList');
    const empty = document.getElementById('emptyWrongNote');

    if (wrongNotes.length === 0) {
        container.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');

    const subjectColors = { 1: 'indigo', 2: 'purple', 3: 'blue', 4: 'green', 5: 'orange' };
    const subjectNames = {
        1: '소프트웨어 설계', 2: '소프트웨어 개발', 3: '데이터베이스 구축',
        4: '프로그래밍 언어 활용', 5: '정보시스템 구축관리'
    };

    container.innerHTML = wrongNotes.map((note, idx) => `
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-${subjectColors[note.subject]}-500">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-${subjectColors[note.subject]}-100 text-${subjectColors[note.subject]}-600 rounded-full text-sm font-medium">
                        ${note.subject}과목: ${subjectNames[note.subject]}
                    </span>
                    <span class="text-sm text-gray-500">${note.question.year}</span>
                </div>
                <button onclick="removeWrongNote(${idx}, ${note.question.id})" class="text-gray-400 hover:text-red-500 transition">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>

            <p class="text-gray-800 mb-4 leading-relaxed">${note.question.question.replace(/\n/g, '<br>')}</p>

            <div class="space-y-2 mb-4">
                ${note.question.options.map((opt, i) => `
                    <div class="flex items-center gap-2 p-2 rounded-lg ${
                        i === note.question.answer ? 'bg-green-50 text-green-700' :
                        i === note.selectedAnswer ? 'bg-red-50 text-red-700' : 'text-gray-600'
                    }">
                        <span class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            i === note.question.answer ? 'border-green-500 bg-green-500 text-white' :
                            i === note.selectedAnswer ? 'border-red-500 bg-red-500 text-white' : 'border-gray-300'
                        }">${i + 1}</span>
                        <span>${opt}</span>
                        ${i === note.question.answer ? '<i class="fas fa-check ml-auto text-green-500"></i>' : ''}
                        ${i === note.selectedAnswer && i !== note.question.answer ? '<i class="fas fa-times ml-auto text-red-500"></i>' : ''}
                    </div>
                `).join('')}
            </div>

            <div class="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 class="font-bold text-gray-800 mb-2"><i class="fas fa-book-open mr-2"></i>해설</h4>
                <p class="text-gray-700 text-sm leading-relaxed">${note.question.explanation}</p>
            </div>

            <button onclick="goToConceptFromWrong(${note.subject}, '${note.question.conceptId}')"
                    class="w-full bg-gradient-to-r from-${subjectColors[note.subject]}-500 to-${subjectColors[note.subject]}-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
                <i class="fas fa-book mr-2"></i>관련 개념 보러가기
            </button>
        </div>
    `).join('');
}

function goToConceptFromWrong(subject, conceptId) {
    showConcept(subject);

    setTimeout(() => {
        const section = document.getElementById(`section-${conceptId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

async function removeWrongNote(index, questionId) {
    wrongNotes.splice(index, 1);

    if (currentUser) {
        try {
            await fetch(`${API_BASE}/wrong-notes/${questionId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
        } catch (error) {
            console.error('오답노트 삭제 실패:', error);
        }
    } else {
        localStorage.setItem('wrongNotes', JSON.stringify(wrongNotes));
    }

    updateWrongBadge();
    renderWrongNotes();
}

// ============ 통계/배지 ============
function updateStatsDisplay() {
    const accuracy = studyStats.todaySolved > 0
        ? Math.round((studyStats.todayCorrect / studyStats.todaySolved) * 100)
        : 0;

    document.getElementById('todaySolved').textContent = `${studyStats.todaySolved}문제`;
    document.getElementById('todayAccuracy').textContent = `${accuracy}%`;
    document.getElementById('progressBar').style.width = `${Math.min(accuracy, 100)}%`;

    const studyProgress = studyStats.totalSolved > 0
        ? Math.min(Math.round((studyStats.totalSolved / 500) * 100), 100)
        : 0;
    document.getElementById('studyProgress').textContent = `${studyProgress}%`;
    document.getElementById('wrongCount').textContent = wrongNotes.length;
}

function updateWrongBadge() {
    document.getElementById('wrongBadge').textContent = wrongNotes.length;
}

function showQuestionList() {
    const current = currentQuiz.currentIndex + 1;
    const total = currentQuiz.questions.length;
    const answered = currentQuiz.results.length;
    const correct = currentQuiz.results.filter(r => r.correct).length;

    alert(`📊 진행 상황\n\n현재: ${current} / ${total} 문제\n답변 완료: ${answered} 문제\n정답: ${correct} / ${answered}`);
}
