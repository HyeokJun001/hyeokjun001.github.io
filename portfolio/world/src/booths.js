// 부스 내용. angle 이 있으면 광장 반원 위에 놓고, 없으면 x·z 자리에 놓는다.
// 이미지는 2D 포트폴리오와 같은 파일을 쓴다(../img/).
const img = (src, alt, cap) => `<figure><img src="../img/${src}" alt="${alt}" loading="lazy">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
// 아이콘 하나(스프라이트 ../img/icons.svg)
const I = id => `<svg class="ic" aria-hidden="true"><use href="../img/icons.svg#${id}"/></svg>`;
// 숫자 칸: [아이콘, 숫자, 설명]
const nums = items => `<ul class="nums">${items.map(([i, b, t]) => `<li><span class="ico">${I(i)}</span><b>${b}</b>${t}</li>`).join('')}</ul>`;
// 구조도: rows = [[ [아이콘|아이콘들, 이름, 설명, 강조?], ... ], ...]
const node = ([ics, b, sm, hot]) => `<div class="nd${hot ? ' hot' : ''}"><span class="nd-i">${[].concat(ics).map(I).join('')}</span><b>${b}</b>${sm ? `<small>${sm}</small>` : ''}</div>`;
const flow = (cap, rows) => `<figure class="flow"><figcaption>${cap}</figcaption>${rows.map(r => `<div class="flow-row">${r.map(node).join(`<span class="ar">${I('arrow-right')}</span>`)}</div>`).join('')}</figure>`;
const STORES = `<span class="stores"><span class="store">${I('android')}<span>Android<small>Google Play</small></span></span><span class="store">${I('ios')}<span>iOS<small>App Store</small></span></span></span>`;

export const BOOTHS = [
  {
    id: 'promotor', staff: 'Ranger', angle: -20, color: '#6d3ce0', title: '프로모터', sub: '행사 인력 플랫폼 · 화면 47개', poster: '../img/promotor-pc.png', more: '../#story',
    reel: { images: [['../img/guide/worker-2-jobs.webp', '행사 찾기'], ['../img/guide/worker-3-applications.webp', '역할 하나로 지원'], ['../img/guide/worker-4-contract.webp', '근로계약서 서명'], ['../img/guide/worker-5-attendance.webp', '현장 출근 체크'], ['../img/guide/worker-6-salary.webp', '급여 내역'], ['../img/promotor-pc.png', '실제 이용 1,500명+ · 채용 확정 100건+']] },
    html: `<p class="lead">공고를 올리면 사람이 지원하고, 계약하고, 출근합니다. 이 흐름의 기업·구직자·관리자 화면 47개를 혼자 설계·구현·배포했습니다.</p>
      <ul class="nums"><li><span class="ico">${I('users')}</span><b>1,500명+</b>실제 이용자 (2026.11.11, 회사 공개 수치)</li><li><span class="ico">${I('file-pen-line')}</span><b>100건+</b>채용 확정</li><li><span class="ico">${I('smartphone')}</span><b>2개 스토어</b>같은 웹 코드로 앱 출시${STORES}</li></ul>
      <div class="shots">${img('guide/worker-2-jobs.webp', '행사 찾기 화면', '행사 찾기')}${img('guide/worker-4-contract.webp', '근로계약서 화면', '계약 서명')}${img('guide/worker-5-attendance.webp', '출퇴근 화면', '출퇴근')}</div>
      ${flow('구조: 화면 하나로 웹·앱, 백엔드를 바꿔도 화면은 그대로', [
        [['monitor-smartphone', 'React 화면', '구직자·기업·관리자 47개'], ['layers', '데이터 훅 + 어댑터', '백엔드 교체를 여기서 흡수', true], ['key-round', 'API 클라이언트', '웹 쿠키 · 앱 토큰'], ['server', 'Spring Boot REST API'], ['database', 'DB']],
        [['globe', '웹', '브라우저'], ['package', 'Capacitor', '같은 코드를 앱으로 포장', true], [['android', 'ios'], 'Google Play · App Store', '2개 스토어 출시']],
      ])}
      <ul><li>Supabase 직접 조회를 Spring Boot REST API로 바꿀 때 어댑터를 두어 화면 코드는 그대로 두고 전환</li><li>웹(쿠키)·앱(토큰) 인증을 하나의 API 클라이언트로 묶고 동시 토큰 갱신을 1회로 정리</li><li>기능 플래그 뒤에서 무중단 리디자인, Capacitor로 Google Play·App Store 출시</li></ul>`,
  },
  {
    id: 'ops', staff: 'Knight', angle: 20, color: '#1f2a3d', ink: '#ffe6b8', title: '운영 관제', sub: '자동 점검 187개 · 장애 추적', poster: null, more: '../#ops',
    reel: { type: 'term', caption: '배포 전 자동 점검 187개 · 실패하면 운영에 올라가지 않습니다', lines: ['$ npm run deploy', '[1/4] e2e 점검 (55개 파일)', '  ✓ 지원 요청은 한 번만 간다', '  ✓ 일찍 출근해도 시작 시각부터 센다', '  ✓ QR 주소로 앱을 연다', '  … 187 passed, 0 failed', '[2/4] vite build  [3/4] deploy', '[4/4] 운영 반영 확인 ✓'] },
    html: `<p class="lead">만든 뒤에는 멈추지 않게 운영했습니다. 배포는 명령 한 줄로 묶었고, 장애가 나면 원인을 끝까지 찾았습니다.</p>
      ${flow('npm run deploy 한 줄이 하는 일 (하나라도 실패하면 멈춤)', [[['terminal', '배포 명령', 'npm run deploy'], ['shield-check', '자동 점검', 'e2e 187개', true], ['package', '빌드', 'vite'], ['cloud-upload', '업로드', 'wrangler'], ['circle-check', '반영 확인', '새 파일 확인']]])}
      <pre class="term">$ npm run deploy
[1/4] 가짜 서버로 e2e 점검 (55개 파일)
  ✓ 역할은 하나만 고를 수 있고, 지원 요청도 한 번만 간다
  ✓ 근무 시작 전에 일찍 출근한 사람은 시작 시각부터 근무 시간을 센다
  … 187 passed, 0 failed
[2/4] vite build
[3/4] wrangler deploy
[4/4] 운영 사이트가 새 파일을 내려주는지 확인 ✓</pre>
      <h3>${I('search')}신규 가입이 실패하던 날, 원인은 두 겹이었습니다</h3>
      <ol><li>응답 코드부터 확인: 가입 요청이 400</li><li>원인 하나: 서버는 약관 동의 이력을 필수로 바꿨는데 프론트엔드가 동의값을 보내지 않음</li><li>원인 둘: DB에 활성 약관이 0건</li><li>조치: 동의값 전송 + 약관 3종 등록, 운영에서 실제 요청으로 확인</li><li>재발 방지: 가입 경로를 바꿀 때마다 동의값 포함 요청으로 확인</li></ol>`,
  },
  {
    id: 'ai', staff: 'Mage', angle: -60, color: '#f2b23a', ink: '#2c2244', title: 'AI 컴퍼니', sub: '에이전트 13명 사내 제작팀', poster: '../img/ai_company_05_meeting.png', more: '../ai-company/', moreLabel: 'AI 컴퍼니 자세히 보기',
    reel: { images: [['../img/ai_company_05_meeting.png', '에이전트 13명이 회의하는 사무실'], ['../img/works/ju-a_t.webp', '회사 홈페이지 시안'], ['../img/works/svc-3_t.webp', '서비스 소개서'], ['../img/works/bi-cheong_t.webp', 'BI 브랜드 보드'], ['../img/works/ir-4_t.webp', 'IR 자료']] },
    html: `<p class="lead">Claude Code로 만든 AI 직원 13명이 하루 세 번 회의하며 기획서·PPT·사이트를 만듭니다. 대표가 실제로 일을 맡기고, 결과물은 제가 검수합니다.</p>
      ${nums([['workflow', '15건', '8주간 프로젝트'], ['circle-check', '262건', '업무 완료'], ['calendar-clock', '시간당 1.7건', '작업이 있던 151시간 기준']])}
      ${flow('일이 흘러가는 순서', [[['user-check', '대표 지시', '채팅 한 줄'], ['messages-square', '회의', '09·13·17시 자동'], ['pen-line', '기획·제작', '6개 팀 에이전트', true], ['shield-check', '검증팀', '반론·수치 확인'], ['circle-check', '대표 승인', '중요 단계만']]])}
      <div class="shots two">${img('works/ju-a_t.webp', '회사 홈페이지 시안', '홈페이지 시안')}${img('works/svc-3_t.webp', '서비스 소개서', '서비스 소개서')}${img('works/bi-cheong_t.webp', '브랜드 보드', 'BI 브랜드 보드')}${img('works/ir-4_t.webp', '투자 소개 자료', 'IR 자료')}</div>
      <p>대표는 지시와 승인만 하고, 기획 → 반론 → 제작 → 검수를 AI 팀이 이어 갑니다. 아래 버튼에서 왜 만들었는지, 조직·절차·사무실 화면 기능·겪은 문제까지 자세히 볼 수 있습니다.</p>`,
  },
  {
    id: 'work', staff: 'Barbarian', angle: 60, color: '#2f8f6a', title: '다른 작업', sub: '회사 홈페이지 · VALORA', poster: '../img/valora-pc.png', more: '../#work',
    reel: { images: [['../img/jucompany-pc.png', '회사 홈페이지 jucompany.co.kr'], ['../img/valora-pc.png', 'VALORA 브랜드 사이트']] },
    html: `<div class="cards">
      <a href="https://jucompany.co.kr" target="_blank" rel="noopener">${img('jucompany-pc.png', '제이유컴퍼니 홈페이지')}<b>회사 홈페이지</b><span>시안 3개 제안 · 문의 메일 직송 · 관리자 화면</span></a>
      <a href="https://valora.kr" target="_blank" rel="noopener">${img('valora-pc.png', 'VALORA')}<b>VALORA 브랜드 사이트</b><span>12개 페이지 한·영 · Three.js 제품 3D · RLS</span></a>
      <p>사주·타로 AI 상담 서비스 '솔이'는 옆의 솔이 부스에 따로 있습니다.</p></div>`,
  },
  {
    id: 'about', staff: 'Rogue_Hooded', x: 7.2, z: 9.5, color: '#e5654a', title: '안내소', sub: '소개 · 연락처', poster: null, more: '../#about',
    reel: { type: 'card', images: [['../img/photo.jpg', '']], name: '양혁준', role: '프론트엔드 개발자', lines: ['프로모터 화면 47개 단독 개발·운영', 'AI 에이전트 팀 설계·운영', 'yhjun5413@gmail.com'], caption: '서울 근무 가능 · 메일로 연락 주세요' },
    html: `<div class="about"><img src="../img/photo.jpg" alt="양혁준 증명사진" width="120" height="168"><div>
      <p class="lead">프론트엔드 개발자 양혁준입니다. 만든 화면을 실제 사용자가 쓰고, 그 사용자가 겪는 문제를 끝까지 추적해 고치는 일을 가장 좋아합니다.</p>
      <ul><li>제이유컴퍼니 개발팀장(프론트엔드 단독) · 2026.05–11</li><li>광주 인공지능사관학교 6기 · 최종 프로젝트 최우수상</li><li>2025 건양 헬스 데이터톤(KHD) 장려상</li><li>React · TypeScript · Next.js · Three.js · Claude Code</li></ul>
      <p class="links"><a href="mailto:yhjun5413@gmail.com">${I('mail')}메일 보내기</a><a href="https://github.com/HyeokJun001" target="_blank" rel="noopener">${I('git-branch')}GitHub</a><a href="../yanghyeokjun-portfolio.pdf" download>${I('download')}PDF 받기</a></p></div></div>`,
  },
  {
    id: 'soli', staff: 'Mage', x: 12.4, z: 3.2, color: '#3b2669', ink: '#ffd98a', title: '솔이 · SOLI', sub: '사주·타로 AI 상담 · 1인 운영', poster: '../img/soli-pc.png', more: 'https://tarosoli.com', moreLabel: '솔이 열어 보기',
    reel: { images: [['../img/soli/home-mo.webp', '가입 없이 무료 사주 풀이'], ['../img/soli-pc.png', '정밀 만세력 + AI 상담'], ['../img/soli/ilju.webp', '60일주 풀이 페이지'], ['../img/soli/tools.webp', '무료 도구 · 만세력 계산기'], ['../img/soli/blog.webp', '명리·타로 지식창고'], ['../img/soli/pricing.webp', '포스 충전 · 카카오페이 결제']] },
    html: `<p class="lead">기획, 개발, 배포, 결제, 고객 응대까지 혼자 만들고 운영하는 사주·타로 AI 상담 서비스입니다. 생년월일과 태어난 시각을 넣으면 실제 천체력 기준 만세력으로 사주를 계산하고, 그 위에 AI 상담을 얹습니다.</p>
      ${nums([['users', '약 40명', '누적 이용자'], ['credit-card', '실결제', '카카오페이 등 간편결제(포트원)'], ['user-check', '1인', '기획부터 고객 응대까지']])}
      <div class="shots">${img('soli/home-mo.webp', '솔이 첫 화면', '첫 화면: 가입 없이 무료 풀이')}${img('soli/ilju.webp', '갑진일주 풀이 페이지', '60일주 풀이')}${img('soli/tools.webp', '무료 도구 모음', '무료 도구')}</div>
      <h3>무엇을 하나</h3>
      <ul><li><b>가입 없이 무료로</b>: 생년월일·성별만 넣으면 사주팔자·일주 풀이·대운까지 바로 보여 줌</li><li><b>정확한 계산</b>: 음력·양력·윤달과 태어난 시각(12지시)을 반영하고, 한국천문연구원 절기 자료로 만세력 계산을 검증</li><li><b>AI 상담</b>: 연애·금전·직장 등 주제를 골라 솔이에게 묻고, 심층 리포트나 타로 뽑기로 이어짐</li><li><b>무료 도구와 지식창고</b>: 만세력 계산기, 내 일주 찾기, 60일주 풀이 페이지, 명리·타로 칼럼</li><li><b>유료 이용권</b>: '포스'를 충전해 상담 콘텐츠를 열람(1,000원~10,000원 4종)</li></ul>
      <h3>어떻게 만들었나</h3>
      ${flow('구조', [[['monitor-smartphone', 'React 화면', 'Cloudflare Pages'], ['server', 'FastAPI 서버', 'Render', true], [['database', 'sparkles', 'credit-card'], 'Supabase · LLM · PortOne', 'DB · AI 상담 · 결제 검증']]])}
      <ul><li>React·TypeScript·Vite 화면(Cloudflare Pages) + FastAPI 서버(Render) + Supabase(PostgreSQL) + LLM API</li><li>결제는 PortOne V2로 받고 서버에서 결제 금액을 다시 검증한 뒤 포스를 적립, 환불까지 처리</li><li>PDF 리포트 생성과 결제 전 미리보기(페이월)</li></ul>
      <h3>운영하며 고친 것</h3>
      <ul><li><b>실결제 첫날 결제 검증 실패</b>: 서버 검증이 401로 막힘 → 응답 코드(402·422·401)를 구분해 추적, 결제사 API 비밀키가 발급되지 않은 것이 원인이었음 → 발급 후 결제·검증·적립·환불을 처음부터 다시 확인</li><li><b>업데이트가 안 보이는 문제</b>: 서비스워커가 옛 화면을 붙잡고 있어서 새 버전을 강제로 받아오게 고침</li><li>사용자 제보로 들어온 점수 계산 오류를 찾아 수정</li></ul>`,
  },
  {
    id: 'awards', staff: 'Ranger', x: -7.2, z: 9.5, color: '#c9902b', ink: '#2c2244', title: '수상 · 교육', sub: 'NIPA 원장상 · 최우수상 · 장려상', poster: null, more: '../#about',
    reel: { type: 'list', head: '수상', caption: 'AI 공부를 시작하고 대회에서 받은 상들', items: [['NIPA 원장상 (최우수상)', 'EARLY DOT · AI 피부암 진단 플랫폼 · 팀장'], ['ESTsoft 최우수상', '실시간 응급 병원 추천'], ['KHD 데이터톤 장려상', 'CT 없이 PET만으로 간·뇌 정량화 · 오차율 4.7%'], ['AI사관학교 6기 1등', '최종 프로젝트 최우수상']] },
    html: `<p class="lead">관광경영학 비전공에서 시작해, AI를 공부하며 나간 대회에서 상을 받았습니다.</p>
      <h3>${I('trophy')}NIPA 원장상(최우수상) · EARLY DOT</h3>
      <ul><li>AI 피부암 진단 + 의사·환자 관리 플랫폼, 팀장. 옆의 EARLY DOT 부스에서 자세히 볼 수 있습니다.</li></ul>
      <h3>${I('trophy')}ESTsoft 최우수상 · 실시간 응급 병원 추천</h3>
      <h3>${I('award')}2025 건양 헬스 데이터톤(KHD) · 장려상</h3>
      <ul><li>건양대의료원 주최, 학습용 의료데이터를 활용하는 대회. 6월 온라인 예선 후 본선 9팀이 7~8월 경합, 팀 '옛날냉커피'(2인)</li>
        <li><b>발표 주제</b>: 딥러닝을 활용한 CT 없이 단독 PET의 정량화 및 Template을 통한 효율적 진단 방식 제공</li>
        <li><b>문제</b>: PET 수치를 정확히 재려면 CT의 해부학 정보가 필요해, 한 사람 영상을 정밀 처리하는 데 약 13시간 이상(CT 9시간 + PET 4시간) 걸림</li>
        <li><b>방법</b>: DICOM → NIfTI 변환(dcm2niix), Nibabel·ANTs로 축·방향 통일과 160³ 자르기·정합, 3D U-Net 장기 분할, 46명 데이터를 정합해 간·뇌 평균 template 생성 → 이후엔 딥러닝 없이 정합만으로 라벨링·정량화</li>
        <li><b>결과</b>: GAAIN-Centiloid 데이터 46개로 테스트해 평균 오차율 4.7% (Dice index로 정합 정확도 검증)</li>
        <li><b>트러블슈팅</b>: 정상인 장기 라벨의 위치·크기 오류를 발견해 간·뇌 template과 뇌 분할로 범위를 다시 잡음</li>
        <li><a href="https://www.goodkyung.com/news/articleView.html?idxno=270883" target="_blank" rel="noopener">관련 기사 (굿모닝경제, 2025.08.27)</a></li></ul>
      <h3>${I('trophy')}광주 인공지능사관학교 6기 · 최종 프로젝트 1등(최우수상)</h3>
      <ul><li>AI 모델링(컴퓨터비전) 과정 수료 (2025.06~12, 이스트소프트 운영)</li></ul>
      <h3>${I('graduation-cap')}학력 · 자격</h3>
      <ul><li>제주대학교 관광경영학 학사 (GPA 4.1/4.5) · ADsP 데이터분석 준전문가 (2025.09)</li></ul>`,
  },
  {
    id: 'earlydot', staff: 'Knight', x: -12.4, z: 3.2, color: '#5b3fd1', title: 'EARLY DOT', sub: 'AI 피부암 진단 · NIPA 원장상', poster: '../img/earlydot/logo.png', more: '../earlydot/', moreLabel: 'EARLY DOT 자세히 보기',
    reel: { type: 'list', head: 'EARLY DOT · 팀장', caption: 'AI 피부암 진단 + 의사·환자 관리 플랫폼 · NIPA 원장상', items: [['4개 서비스로 분리', 'React · Django API · FastAPI 모델 서버 · DB (Docker Compose)'], ['악성 흑색종 F1 65.1% → 84.6%', 'CNN 앙상블 + ViT 하이브리드'], ['진단 근거를 보여 주는 화면', 'Grad-CAM 히트맵 · 의사용 대시보드']] },
    html: `<p class="lead">피부 병변 사진을 올리면 8개 질환으로 분류하고, 의사가 진단 근거와 환자 경과를 함께 보는 플랫폼입니다. 광주 인공지능사관학교 6기 최종 프로젝트로 팀장을 맡아 만들었고, NIPA 원장상(최우수상)을 받았습니다.</p>
      ${nums([['brain', '+19.5%p', '악성 흑색종 F1 (65.1% → 84.6%)'], ['image', '37,919장', 'ISIC 2019·2020·2024 + AI-Hub 학습 데이터'], ['container', '4개 서비스', 'Docker Compose로 분리 배포']])}
      ${flow('진단 한 번이 지나가는 길', [[['camera', '피부 사진', '환자가 업로드'], ['monitor', 'React 화면', '환자·의사'], ['server', 'Django REST', '인증·기록 · MySQL'], ['brain', 'FastAPI 모델 서버', 'CNN + ViT 추론', true], ['stethoscope', '의사 대시보드', 'Grad-CAM 근거 확인']]])}
      <h3>시스템</h3>
      <ul><li>React(의사·환자 화면) · Django REST(인증·진단 기록·후속조치) · FastAPI(모델 추론 서버) · MySQL을 각각 서비스로 나눠 Docker Compose로 배포</li><li>쿠버네티스 배포 구조(Ingress 게이트웨이, 이미지 저장 볼륨, 추론 API만 배포) 설계·검토 참여</li></ul>
      <h3>모델 (팀 공동 설계)</h3>
      <ul><li>ResNet50과 EfficientNet-B4의 특징을 이어 붙인 CNN 앙상블 + ViT-B/16을 확률 평균(Soft Voting)으로 합친 하이브리드</li><li>클래스 불균형(약 17배)은 가중 Focal Loss로, 털은 U-Net 마스크 + LaMa 인페인팅으로 지운 뒤 분류</li><li>Grad-CAM++로 모델이 어디를 보고 판단했는지 의사에게 보여 줌</li></ul>
      <h3>내가 맡은 것</h3>
      <ul><li>의사용 대시보드와 진단 흐름 화면(React)</li><li>담당 환자 목록 API, Grad-CAM 결과 표시 연동</li><li>Docker 환경 구성과 문제 해결, 팀 협업(브랜치·PR) 조율</li></ul>
      <p class="links"><a href="../earlydot/app/">${I('smartphone')}다시 만든 화면 눌러 보기</a><a href="https://github.com/earlydot25-cloud/early-dot-project" target="_blank" rel="noopener">${I('git-branch')}GitHub 저장소</a></p>`,
  },
];
