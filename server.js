const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// 데이터 파일 경로
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const STATS_FILE = path.join(DATA_DIR, 'stats.json');
const WRONG_NOTES_FILE = path.join(DATA_DIR, 'wrong_notes.json');

// 데이터 디렉토리 생성
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// JSON 파일 헬퍼 함수
function readJSON(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
    }
    return {};
}

function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
    }
}

// 미들웨어 설정
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: 'engineer-study-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24시간
    }
}));

console.log('Server initialized with JSON file storage');

// ============ API 라우트 ============

// 아이디 유효성 검사: 영어 + 숫자 조합, 4~20자
function validateUsername(username) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,20}$/;
    return regex.test(username);
}

// 비밀번호 유효성 검사: 영어 + 숫자 + 특수문자 각 1개 이상, 8~20자
function validatePassword(password) {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;
    return regex.test(password);
}

// 회원가입
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 유효성 검사
        if (!validateUsername(username)) {
            return res.status(400).json({
                success: false,
                message: '아이디는 영어와 숫자를 조합하여 4~20자로 입력해주세요.'
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: '비밀번호는 영어, 숫자, 특수문자를 각 1개 이상 포함하여 8~20자로 입력해주세요.'
            });
        }

        // 사용자 데이터 로드
        const users = readJSON(USERS_FILE);

        // 중복 확인
        if (users[username]) {
            return res.status(400).json({
                success: false,
                message: '이미 사용 중인 아이디입니다.'
            });
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        users[username] = {
            password: hashedPassword,
            created_at: new Date().toISOString()
        };
        writeJSON(USERS_FILE, users);

        // 학습 통계 초기화
        const stats = readJSON(STATS_FILE);
        stats[username] = {
            total_solved: 0,
            total_correct: 0,
            today_solved: 0,
            today_correct: 0,
            last_date: new Date().toDateString()
        };
        writeJSON(STATS_FILE, stats);

        // 오답노트 초기화
        const wrongNotes = readJSON(WRONG_NOTES_FILE);
        wrongNotes[username] = [];
        writeJSON(WRONG_NOTES_FILE, wrongNotes);

        res.json({
            success: true,
            message: '회원가입이 완료되었습니다!'
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    }
});

// 로그인
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 사용자 조회
        const users = readJSON(USERS_FILE);
        const user = users[username];

        if (!user) {
            return res.status(401).json({
                success: false,
                message: '아이디 또는 비밀번호가 일치하지 않습니다.'
            });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: '아이디 또는 비밀번호가 일치하지 않습니다.'
            });
        }

        // 세션 저장
        req.session.username = username;

        res.json({
            success: true,
            message: '로그인 성공!',
            user: {
                username: username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.'
        });
    }
});

// 로그아웃
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '로그아웃 실패'
            });
        }
        res.json({
            success: true,
            message: '로그아웃 되었습니다.'
        });
    });
});

// 세션 확인 (로그인 상태 확인)
app.get('/api/session', (req, res) => {
    if (req.session.username) {
        res.json({
            loggedIn: true,
            user: {
                username: req.session.username
            }
        });
    } else {
        res.json({
            loggedIn: false
        });
    }
});

// 학습 통계 조회
app.get('/api/stats', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const stats = readJSON(STATS_FILE);
    let userStats = stats[req.session.username];

    if (!userStats) {
        userStats = {
            total_solved: 0,
            total_correct: 0,
            today_solved: 0,
            today_correct: 0,
            last_date: new Date().toDateString()
        };
        stats[req.session.username] = userStats;
        writeJSON(STATS_FILE, stats);
    }

    const today = new Date().toDateString();

    // 날짜가 바뀌었으면 오늘 통계 리셋
    if (userStats.last_date !== today) {
        userStats.today_solved = 0;
        userStats.today_correct = 0;
        userStats.last_date = today;
        stats[req.session.username] = userStats;
        writeJSON(STATS_FILE, stats);
    }

    res.json({
        success: true,
        stats: userStats
    });
});

// 학습 통계 업데이트
app.post('/api/stats', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const { isCorrect } = req.body;
    const today = new Date().toDateString();

    const stats = readJSON(STATS_FILE);
    let userStats = stats[req.session.username];

    if (!userStats) {
        userStats = {
            total_solved: 0,
            total_correct: 0,
            today_solved: 0,
            today_correct: 0,
            last_date: today
        };
    }

    // 날짜가 바뀌었으면 오늘 통계 리셋
    if (userStats.last_date !== today) {
        userStats.today_solved = 0;
        userStats.today_correct = 0;
    }

    // 통계 업데이트
    userStats.total_solved++;
    userStats.today_solved++;
    if (isCorrect) {
        userStats.total_correct++;
        userStats.today_correct++;
    }
    userStats.last_date = today;

    stats[req.session.username] = userStats;
    writeJSON(STATS_FILE, stats);

    res.json({
        success: true,
        stats: userStats
    });
});

// 오답노트 조회
app.get('/api/wrong-notes', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const wrongNotes = readJSON(WRONG_NOTES_FILE);
    const userNotes = wrongNotes[req.session.username] || [];

    res.json({
        success: true,
        wrongNotes: userNotes
    });
});

// 오답노트 추가
app.post('/api/wrong-notes', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const { question, selectedAnswer, subject } = req.body;

    try {
        const wrongNotes = readJSON(WRONG_NOTES_FILE);

        if (!wrongNotes[req.session.username]) {
            wrongNotes[req.session.username] = [];
        }

        // 중복 체크
        const exists = wrongNotes[req.session.username].some(note => note.question.id === question.id);
        if (!exists) {
            wrongNotes[req.session.username].push({
                question,
                selected_answer: selectedAnswer,
                subject,
                created_at: new Date().toISOString()
            });
            writeJSON(WRONG_NOTES_FILE, wrongNotes);
        }

        res.json({
            success: true,
            message: '오답노트에 추가되었습니다.'
        });
    } catch (error) {
        console.error('Add wrong note error:', error);
        res.status(500).json({
            success: false,
            message: '오답노트 저장 실패'
        });
    }
});

// 오답노트 삭제
app.delete('/api/wrong-notes/:questionId', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const questionId = parseInt(req.params.questionId);

    const wrongNotes = readJSON(WRONG_NOTES_FILE);

    if (wrongNotes[req.session.username]) {
        wrongNotes[req.session.username] = wrongNotes[req.session.username].filter(
            note => note.question.id !== questionId
        );
        writeJSON(WRONG_NOTES_FILE, wrongNotes);
    }

    res.json({
        success: true,
        message: '삭제되었습니다.'
    });
});

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`
====================================
  정보처리기사 필기 학습 서버 시작!
  http://localhost:${PORT}
====================================
    `);
});
