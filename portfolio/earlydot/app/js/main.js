// 주소(#/...)로 화면을 고르고, 역할에 맞는 아래 탭을 붙인다
import { db, login } from './data.js';
import { I, esc } from './ui.js';
import { paintAll } from './lesion.js';
import * as P from './patient.js';
import * as D from './doctor.js';

const ROUTES = [
  ['login', loginView, null],
  ['home', P.home, 'patient'], ['body', P.body, 'patient'], ['capture', P.capture, 'patient'], ['save', P.savePhoto, 'patient'],
  ['analyze/:id', P.analyze, 'patient'], ['result/:id', P.result, 'patient'], ['history', P.history, 'patient'], ['history/:part', P.folder, 'patient'], ['me', P.profile, 'patient'],
  ['doctor', D.dHome, 'doctor'], ['patients', D.patients, 'doctor'], ['patient/:id', D.patientDetail, 'doctor'], ['review/:id', D.review, 'doctor'], ['account', D.account, 'doctor|admin'],
  ['admin', D.admin, 'admin'],
];
const HOME = { patient: '#/home', doctor: '#/doctor', admin: '#/admin' };
const TABS = {
  patient: [['#/home', 'layout-dashboard', '홈'], ['#/body', 'camera', '촬영'], ['#/history', 'folder-open', '진단 내역'], ['#/me', 'user-round', '내 정보']],
  doctor: [['#/doctor', 'inbox', '소견함'], ['#/patients', 'users', '담당 환자'], ['#/account', 'user-round', '내 정보']],
  admin: [['#/admin', 'id-card', '가입 승인'], ['#/account', 'user-round', '내 정보']],
};
const OWN = { '#/body': ['#/capture', '#/save', '#/analyze'], '#/history': ['#/history', '#/result'], '#/patients': ['#/patients', '#/patient'], '#/doctor': ['#/doctor', '#/review'] };

function loginView() {
  return { full: true, html: `
    <div class="login">
      <div class="brand"><span class="logo big">EARLY<i>·</i>DOT</span><p>피부 사진 한 장으로 위험을 먼저 알리고,<br>담당 의사에게 이어 주는 AI 진단 보조</p></div>
      <div class="pad">
        <p class="lead">견본 계정으로 들어가 보세요</p>
        ${[['patient', 'user-round', '환자 김민지', '촬영하고 결과·소견 확인'], ['doctor', 'stethoscope', '의사 윤재현', '소견 대기함과 담당 환자 관리'], ['admin', 'id-card', '관리자', '의사 가입 신청 승인']]
          .map(([r, ic, t, s]) => `<button type="button" class="acct" data-role="${r}">${I(ic)}<div><b>${t}</b><small>${s}</small></div>${I('chevron-right')}</button>`).join('')}
        <p class="note">${I('info')} 이름·병원·사진은 모두 견본입니다. 입력한 내용은 이 브라우저에만 저장됩니다.</p>
      </div>
    </div>`,
  mount(el, go) { el.addEventListener('click', e => { const b = e.target.closest('[data-role]'); if (b) { login(b.dataset.role); go(HOME[b.dataset.role], true); } }); } };
}

function match(path) {
  const segs = path.split('/').filter(Boolean);
  for (const [pat, fn, role] of ROUTES) {
    const ps = pat.split('/');
    if (ps.length !== segs.length) continue;
    const params = [];
    if (ps.every((p, i) => p.startsWith(':') ? params.push(decodeURIComponent(segs[i])) : p === segs[i])) return { fn, role, params };
  }
  return null;
}

const app = document.getElementById('app');
let cleanup = null;
export function go(hash, replace = false) {
  if (replace) history.replaceState(null, '', hash); else history.pushState(null, '', hash);
  render();
}

function render() {
  cleanup?.(); cleanup = null;
  const raw = location.hash.slice(1) || '/login';
  const [path, qs] = raw.split('?');
  const s = db().session;
  let m = match(path);
  if (!m || (m.role && !s)) return go('#/login', true);
  if (m.role && !m.role.split('|').includes(s.role)) return go(HOME[s.role], true);
  const view = m.fn(m.params, new URLSearchParams(qs || ''));
  const hash = '#' + path, tabs = s && !view.full ? TABS[s.role] : null;
  const on = t => hash === t || (OWN[t] || []).some(x => hash.startsWith(x));
  app.style.setProperty('--fs', db().font);
  app.className = view.full ? 'full' : '';
  app.innerHTML = `<main class="view" id="view">${view.html}</main>${tabs ? `<nav class="tabs" aria-label="주요 메뉴" style="--n:${tabs.length}">${tabs.map(([h, ic, t]) => `<a href="${h}"${on(h) ? ' aria-current="page"' : ''}>${I(ic)}${esc(t)}</a>`).join('')}</nav>` : ''}`;
  const view$ = app.querySelector('#view');
  paintAll(app);
  cleanup = view.mount?.(view$, go) || null;
  view$.scrollTop = 0;
  const h1 = view$.querySelector('h1'); document.title = `${h1 ? h1.textContent + ' · ' : ''}EARLY DOT`;
  window.dispatchEvent(new CustomEvent('ed:route', { detail: { hash, role: s?.role } }));
}

window.paint = el => paintAll(el);
addEventListener('popstate', render);
addEventListener('hashchange', render);
render();
