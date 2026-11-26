// 견본 데이터와 저장소. 실제 서버 대신 브라우저(localStorage)에 둔다.
// 사람·병원 이름은 모두 지어낸 것이고, 피부 사진은 lesion.js가 코드로 그린다.

export const DISEASES = {
  mel: { name: '흑색종', kind: '악성', info: '멜라닌 세포에서 생기는 피부암입니다. 모양이 비대칭이고 경계가 울퉁불퉁하며 색이 여러 가지로 섞이면 의심합니다.', todo: '가능한 빨리 피부과 전문의 진료를 받으세요.' },
  bcc: { name: '기저세포암', kind: '악성', info: '가장 흔한 피부암으로 천천히 자랍니다. 진주처럼 반짝이는 결절이나 잘 낫지 않는 상처로 보입니다.', todo: '전문의 진료로 조직 검사 여부를 확인하세요.' },
  scc: { name: '편평세포암', kind: '악성', info: '햇빛에 많이 노출된 부위에 생기는 피부암으로, 딱지가 앉은 붉은 결절처럼 보입니다.', todo: '전문의 진료를 받으세요.' },
  ak: { name: '광선각화증', kind: '전암', info: '오랜 햇빛 노출로 생기는 거친 각질 반점입니다. 일부는 편평세포암으로 바뀔 수 있습니다.', todo: '자외선을 피하고, 변화가 있으면 진료를 받으세요.' },
  nev: { name: '모반', kind: '양성', info: '흔히 점이라고 부르는 양성 병변입니다.', todo: '크기·색·모양이 바뀌는지 가끔 다시 찍어 비교하세요.' },
  sk: { name: '지루각화증', kind: '양성', info: '나이가 들며 생기는 갈색 사마귀 모양의 양성 병변입니다.', todo: '대부분 치료가 필요 없습니다. 갑자기 커지면 진료를 받으세요.' },
  df: { name: '피부섬유종', kind: '양성', info: '단단한 작은 결절로, 주로 다리에 생기는 양성 병변입니다.', todo: '특별한 치료가 필요 없습니다.' },
  vasc: { name: '혈관종', kind: '양성', info: '혈관이 뭉쳐 생긴 붉은 양성 병변입니다.', todo: '출혈이 잦으면 진료를 받으세요.' },
};
const ORDER = Object.keys(DISEASES);
export const PARTS = ['머리/목', '얼굴', '앞 몸통', '뒤 몸통', '왼쪽 팔', '오른쪽 팔', '왼쪽 다리', '오른쪽 다리', '손바닥/발바닥', '구강/성기'];
export const SYMPTOMS = ['가려움', '통증', '색 변화', '출혈', '상처로 인한 감염'];
export const LEVELS = ['없음', '약간', '보통', '심함'];
export const ONSETS = ['1주 이내', '1개월 이내', '1년 이내', '1년 이상', '선천성', '모름'];
export const PLANS = ['경과 관찰', '내원 권유', '조직 검사 권유', '이상 없음'];
export const RISK = { hi: '높음', mid: '중간', lo: '낮음' };

// 위험도: 악성·전암이 1위이고 0.7 이상이면 높음, 악성·전암 확률 합이 0.4 이상이면 중간, 아니면 낮음
export function riskOf(probs) {
  const top = topOf(probs);
  const bad = ORDER.filter(k => DISEASES[k].kind !== '양성').reduce((s, k) => s + (probs[k] || 0), 0);
  if (DISEASES[top].kind !== '양성' && probs[top] >= 0.7) return 'hi';
  return bad >= 0.4 ? 'mid' : 'lo';
}
export const topOf = probs => ORDER.reduce((a, b) => (probs[b] || 0) > (probs[a] || 0) ? b : a);
export const sortedProbs = probs => ORDER.map(k => [k, probs[k] || 0]).sort((a, b) => b[1] - a[1]);

// 같은 seed면 같은 결과가 나오는 견본 예측
function rng(a) { return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function predict(seed, top, p) {
  const r = rng(seed * 31 + 7);
  const k = top || ORDER[Math.floor(r() * ORDER.length)];
  const main = p ?? 0.45 + r() * 0.45;
  const rest = ORDER.filter(x => x !== k).map(x => [x, r() ** 2]);
  const sum = rest.reduce((s, [, v]) => s + v, 0);
  const probs = { [k]: +main.toFixed(3) };
  rest.forEach(([x, v]) => (probs[x] = +((1 - main) * v / sum).toFixed(3)));
  return probs;
}
const darkOf = k => ({ mel: .95, bcc: .55, scc: .6, ak: .45, nev: .25, sk: .5, df: .35, vasc: .3 }[k]);

function rec(id, pid, part, date, seed, top, p, status, extra = {}) {
  return { id, pid, part, name: `${part} ${date.slice(5).replace('-', '.')}`, date, seed, dark: darkOf(top), probs: predict(seed, top, p), status, symptoms: { 가려움: '약간', 통증: '없음', '색 변화': top === 'mel' ? '보통' : '없음', 출혈: '없음', '상처로 인한 감염': '없음' }, onset: '1년 이내', ...extra };
}
const rv = (risk, plan, note, date) => ({ risk, plan, note, date, doctor: '윤재현' });

function seed() {
  const patients = [
    { id: 'p1', name: '김민지', sex: '여', age: 34, family: '있음', email: 'patient@earlydot.demo' },
    { id: 'p2', name: '박정우', sex: '남', age: 58, family: '없음' },
    { id: 'p3', name: '이서연', sex: '여', age: 46, family: '없음' },
    { id: 'p4', name: '최동훈', sex: '남', age: 67, family: '있음' },
    { id: 'p5', name: '정하은', sex: '여', age: 29, family: '없음' },
    { id: 'p6', name: '한상철', sex: '남', age: 72, family: '없음' },
  ];
  const records = [
    rec('r1', 'p1', '왼쪽 팔', '2026-11-24', 3, 'mel', .72, 'requested'),
    rec('r2', 'p1', '뒤 몸통', '2026-11-18', 7, 'nev', .81, 'reviewed', { review: rv('lo', '경과 관찰', '전형적인 양성 모반입니다. 3개월 뒤 같은 각도로 다시 찍어 비교해 주세요.', '2026-11-19') }),
    rec('r3', 'p1', '얼굴', '2026-11-02', 12, 'ak', .58, 'reviewed', { review: rv('mid', '내원 권유', '광선각화증이 의심됩니다. 자외선 차단을 하시고 가까운 시일에 내원해 주세요.', '2026-11-03') }),
    rec('r4', 'p1', '왼쪽 팔', '2026-10-20', 4, 'nev', .55, 'analyzed'),
    rec('r5', 'p1', '뒤 몸통', '2026-09-30', 8, 'nev', .77, 'analyzed'),
    rec('r6', 'p1', '오른쪽 다리', '2026-09-12', 15, 'df', .69, 'analyzed'),
    rec('r7', 'p2', '얼굴', '2026-11-25', 21, 'bcc', .74, 'requested'),
    rec('r8', 'p2', '머리/목', '2026-11-10', 22, 'sk', .62, 'reviewed', { review: rv('lo', '이상 없음', '지루각화증으로 보입니다. 치료는 필요하지 않습니다.', '2026-11-11') }),
    rec('r9', 'p3', '앞 몸통', '2026-11-23', 31, 'nev', .66, 'requested'),
    rec('r10', 'p4', '오른쪽 팔', '2026-11-25', 41, 'scc', .71, 'requested'),
    rec('r11', 'p4', '얼굴', '2026-11-04', 42, 'ak', .64, 'reviewed', { review: rv('mid', '조직 검사 권유', '각화성 병변이 넓어 조직 검사를 권합니다.', '2026-11-05') }),
    rec('r12', 'p5', '왼쪽 다리', '2026-11-21', 51, 'vasc', .83, 'analyzed'),
    rec('r13', 'p6', '뒤 몸통', '2026-11-22', 61, 'mel', .48, 'requested'),
  ];
  const applicants = [
    { id: 'a1', name: '강수빈', hospital: '한빛피부과의원', dept: '피부과', license: '제 12841호', date: '2026-11-25', status: 'pending' },
    { id: 'a2', name: '오태민', hospital: '서울중앙병원', dept: '피부과', license: '제 10337호', date: '2026-11-24', status: 'pending' },
    { id: 'a3', name: '윤재현', hospital: '이른점피부과', dept: '피부과', license: '제 09215호', date: '2026-10-02', status: 'approved' },
  ];
  return { v: 1, session: null, font: 1, patients, records, applicants, nextId: 100 };
}

const KEY = 'earlydot-demo-v1';
let state = load();
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch { /* 망가진 값이면 새로 */ } return seed(); }
export const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* 저장 공간이 없으면 메모리로만 */ } };
export const db = () => state;
export function reset() { state = seed(); save(); }

export const DEMO = { patient: { role: 'patient', id: 'p1', label: '환자 김민지' }, doctor: { role: 'doctor', id: 'd1', name: '윤재현', label: '의사 윤재현' }, admin: { role: 'admin', id: 'ad', label: '관리자' } };
export function login(role) { state.session = DEMO[role]; save(); }
export function logout() { state.session = null; save(); }

export const patient = id => state.patients.find(p => p.id === id);
export const record = id => state.records.find(r => r.id === id);
export const recordsOf = pid => state.records.filter(r => r.pid === pid).sort((a, b) => b.date.localeCompare(a.date));

export function addRecord({ part, name, seed: s, symptoms, onset }) {
  const id = 'r' + state.nextId++;
  const probs = predict(s);
  const top = topOf(probs);
  const r = { id, pid: state.session.id, part, name: name || part, date: new Date().toISOString().slice(0, 10), seed: s, dark: darkOf(top), probs, status: 'analyzed', symptoms, onset };
  state.records.push(r); save(); return r;
}
export function requestReview(id) { const r = record(id); if (r && r.status === 'analyzed') { r.status = 'requested'; save(); } }
export function saveReview(id, review) { const r = record(id); r.review = { ...review, date: new Date().toISOString().slice(0, 10), doctor: '윤재현' }; r.status = 'reviewed'; save(); }
export function decide(aid, status) { const a = state.applicants.find(x => x.id === aid); a.status = status; save(); }
export function setFont(v) { state.font = v; save(); }
