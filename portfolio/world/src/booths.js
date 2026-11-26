// 부스 내용. angle 이 있으면 광장 반원 위에 놓고, 없으면 x·z 자리에 놓는다.
// 이미지는 2D 포트폴리오와 같은 파일을 쓴다(../img/).
const img = (src, alt, cap) => `<figure><img src="../img/${src}" alt="${alt}" loading="lazy">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

export const BOOTHS = [
  {
    id: 'promotor', staff: 'Ranger', angle: -20, color: '#6d3ce0', title: '프로모터', sub: '행사 인력 플랫폼 · 화면 47개', poster: '../img/promotor-pc.png', more: '../#story',
    reel: { images: [['../img/guide/worker-2-jobs.webp', '행사 찾기'], ['../img/guide/worker-3-applications.webp', '역할 하나로 지원'], ['../img/guide/worker-4-contract.webp', '근로계약서 서명'], ['../img/guide/worker-5-attendance.webp', '현장 출근 체크'], ['../img/guide/worker-6-salary.webp', '급여 내역'], ['../img/promotor-pc.png', '실제 이용 1,500명+ · 채용 확정 100건+']] },
    html: `<p class="lead">공고를 올리면 사람이 지원하고, 계약하고, 출근합니다. 이 흐름의 기업·구직자·관리자 화면 47개를 혼자 설계·구현·배포했습니다.</p>
      <ul class="nums"><li><b>1,500명+</b>실제 이용자 (2026.11.11, 회사 공개 수치)</li><li><b>100건+</b>채용 확정</li><li><b>2개 스토어</b>같은 웹 코드로 앱 출시</li></ul>
      <div class="shots">${img('guide/worker-2-jobs.webp', '행사 찾기 화면', '행사 찾기')}${img('guide/worker-4-contract.webp', '근로계약서 화면', '계약 서명')}${img('guide/worker-5-attendance.webp', '출퇴근 화면', '출퇴근')}</div>
      <ul><li>Supabase 직접 조회를 Spring Boot REST API로 바꿀 때 어댑터를 두어 화면 코드는 그대로 두고 전환</li><li>웹(쿠키)·앱(토큰) 인증을 하나의 API 클라이언트로 묶고 동시 토큰 갱신을 1회로 정리</li><li>기능 플래그 뒤에서 무중단 리디자인, Capacitor로 Google Play·App Store 출시</li></ul>`,
  },
  {
    id: 'ops', staff: 'Knight', angle: 20, color: '#1f2a3d', ink: '#ffe6b8', title: '운영 관제', sub: '자동 점검 187개 · 장애 추적', poster: null, more: '../#ops',
    reel: { type: 'term', caption: '배포 전 자동 점검 187개 · 실패하면 운영에 올라가지 않습니다', lines: ['$ npm run deploy', '[1/4] e2e 점검 (55개 파일)', '  ✓ 지원 요청은 한 번만 간다', '  ✓ 일찍 출근해도 시작 시각부터 센다', '  ✓ QR 주소로 앱을 연다', '  … 187 passed, 0 failed', '[2/4] vite build  [3/4] deploy', '[4/4] 운영 반영 확인 ✓'] },
    html: `<p class="lead">만든 뒤에는 멈추지 않게 운영했습니다. 배포는 명령 한 줄로 묶었고, 장애가 나면 원인을 끝까지 찾았습니다.</p>
      <pre class="term">$ npm run deploy
[1/4] 가짜 서버로 e2e 점검 (55개 파일)
  ✓ 역할은 하나만 고를 수 있고, 지원 요청도 한 번만 간다
  ✓ 근무 시작 전에 일찍 출근한 사람은 시작 시각부터 근무 시간을 센다
  … 187 passed, 0 failed
[2/4] vite build
[3/4] wrangler deploy
[4/4] 운영 사이트가 새 파일을 내려주는지 확인 ✓</pre>
      <h3>신규 가입이 실패하던 날, 원인은 두 겹이었습니다</h3>
      <ol><li>응답 코드부터 확인: 가입 요청이 400</li><li>원인 하나: 서버는 약관 동의 이력을 필수로 바꿨는데 프론트엔드가 동의값을 보내지 않음</li><li>원인 둘: DB에 활성 약관이 0건</li><li>조치: 동의값 전송 + 약관 3종 등록, 운영에서 실제 요청으로 확인</li><li>재발 방지: 가입 경로를 바꿀 때마다 동의값 포함 요청으로 확인</li></ol>`,
  },
  {
    id: 'ai', staff: 'Mage', angle: -60, color: '#f2b23a', ink: '#2c2244', title: 'AI 컴퍼니', sub: '에이전트 13명 사내 제작팀', poster: '../img/ai_company_05_meeting.png', more: '../ai-company/', moreLabel: 'AI 컴퍼니 자세히 보기',
    reel: { images: [['../img/ai_company_05_meeting.png', '에이전트 13명이 회의하는 사무실'], ['../img/works/ju-a_t.webp', '회사 홈페이지 시안'], ['../img/works/svc-3_t.webp', '서비스 소개서'], ['../img/works/bi-cheong_t.webp', 'BI 브랜드 보드'], ['../img/works/ir-4_t.webp', 'IR 자료']] },
    html: `<p class="lead">Claude Code로 만든 AI 직원 13명이 하루 세 번 회의하며 기획서·PPT·사이트를 만듭니다. 대표가 실제로 일을 맡기고, 결과물은 제가 검수합니다.</p>
      <ul class="nums"><li><b>15건</b>8주간 프로젝트</li><li><b>262건</b>업무 완료</li><li><b>시간당 1.7건</b>작업이 있던 151시간 기준</li></ul>
      <div class="shots two">${img('works/ju-a_t.webp', '회사 홈페이지 시안', '홈페이지 시안')}${img('works/svc-3_t.webp', '서비스 소개서', '서비스 소개서')}${img('works/bi-cheong_t.webp', '브랜드 보드', 'BI 브랜드 보드')}${img('works/ir-4_t.webp', '투자 소개 자료', 'IR 자료')}</div>
      <p>대표는 지시와 승인만 하고, 기획 → 반론 → 제작 → 검수를 AI 팀이 이어 갑니다. 아래 버튼에서 왜 만들었는지, 조직·절차·사무실 화면 기능·겪은 문제까지 자세히 볼 수 있습니다.</p>`,
  },
  {
    id: 'work', staff: 'Barbarian', angle: 60, color: '#2f8f6a', title: '다른 작업', sub: '홈페이지 · VALORA · 솔이', poster: '../img/valora-pc.png', more: '../#work',
    reel: { images: [['../img/jucompany-pc.png', '회사 홈페이지 jucompany.co.kr'], ['../img/valora-pc.png', 'VALORA 브랜드 사이트'], ['../img/soli-pc.png', '솔이 · 사주·타로 AI 상담']] },
    html: `<div class="cards">
      <a href="https://jucompany.co.kr" target="_blank" rel="noopener">${img('jucompany-pc.png', '제이유컴퍼니 홈페이지')}<b>회사 홈페이지</b><span>시안 3개 제안 · 문의 메일 직송 · 관리자 화면</span></a>
      <a href="https://valora.kr" target="_blank" rel="noopener">${img('valora-pc.png', 'VALORA')}<b>VALORA 브랜드 사이트</b><span>12개 페이지 한·영 · Three.js 제품 3D · RLS</span></a>
      <a href="https://tarosoli.com" target="_blank" rel="noopener">${img('soli-pc.png', '솔이')}<b>솔이</b><span>사주·타로 AI 상담 · 1인 운영 · 실결제</span></a></div>`,
  },
  {
    id: 'about', staff: 'Rogue_Hooded', x: 7.2, z: 9.5, color: '#e5654a', title: '안내소', sub: '소개 · 연락처', poster: null, more: '../#about',
    reel: { type: 'card', images: [['../img/photo.jpg', '']], name: '양혁준', role: '프론트엔드 개발자', lines: ['프로모터 화면 47개 단독 개발·운영', 'AI 에이전트 팀 설계·운영', 'yhjun5413@gmail.com'], caption: '서울 근무 가능 · 메일로 연락 주세요' },
    html: `<div class="about"><img src="../img/photo.jpg" alt="양혁준 증명사진" width="120" height="168"><div>
      <p class="lead">프론트엔드 개발자 양혁준입니다. 만든 화면을 실제 사용자가 쓰고, 그 사용자가 겪는 문제를 끝까지 추적해 고치는 일을 가장 좋아합니다.</p>
      <ul><li>제이유컴퍼니 개발팀장(프론트엔드 단독) · 2026.05–11</li><li>광주 인공지능사관학교 6기 · 최종 프로젝트 최우수상</li><li>2025 건양 헬스 데이터톤(KHD) 장려상</li><li>React · TypeScript · Next.js · Three.js · Claude Code</li></ul>
      <p class="links"><a href="mailto:yhjun5413@gmail.com">메일 보내기</a><a href="https://github.com/HyeokJun001" target="_blank" rel="noopener">GitHub</a><a href="../yanghyeokjun-portfolio.pdf" download>PDF 받기</a></p></div></div>`,
  },
  {
    id: 'awards', staff: 'Mage', x: -7.2, z: 9.5, color: '#c9902b', ink: '#2c2244', title: '수상 · 교육', sub: '데이터톤 장려상 · 최우수상', poster: null, more: '../#about',
    reel: { type: 'list', head: '수상 · 교육', caption: '배우고, 대회에 나가고, 상을 받았습니다', items: [['2025 건양 헬스 데이터톤(KHD) 장려상', '건양대의료원 주최 · 의료 학습데이터 활용 · 팀 2인'], ['광주 인공지능사관학교 6기 최우수상', 'AI 모델링(컴퓨터비전) 과정 최종 프로젝트'], ['ADsP 데이터분석 준전문가', '2025.09 취득']] },
    html: `<p class="lead">비전공(관광경영학)에서 시작해, 교육 과정과 대회로 실력을 쌓았습니다.</p>
      <h3>2025 건양 헬스 데이터톤(KHD) · 장려상</h3>
      <ul><li>건양대의료원 주최, 'K-Health와 의료데이터 중심 병원' 사업으로 구축된 학습용 의료데이터를 활용하는 대회</li><li>6월 온라인 예선을 거쳐 본선에 오른 9개 팀이 7~8월 경합, 팀 '옛날냉커피'(2인)로 장려상</li><li><a href="https://www.goodkyung.com/news/articleView.html?idxno=270883" target="_blank" rel="noopener">관련 기사 (굿모닝경제, 2025.08.27)</a></li></ul>
      <h3>광주 인공지능사관학교 6기 · 최종 프로젝트 최우수상</h3>
      <ul><li>AI 모델링(컴퓨터비전) 과정 수료 (2025.06~12)</li></ul>
      <h3>자격</h3>
      <ul><li>ADsP 데이터분석 준전문가 (2025.09)</li></ul>`,
  },
];
