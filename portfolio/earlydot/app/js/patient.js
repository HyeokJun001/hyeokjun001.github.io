// 환자 화면: 홈 · 부위 선택 · 촬영 · 사진 저장 · 분석 중 · 결과 · 진단 내역 · 내 정보
import { db, save, patient, record, recordsOf, addRecord, requestReview, setFont, reset, logout, DISEASES, PARTS, SYMPTOMS, LEVELS, ONSETS, topOf, riskOf } from './data.js';
import { I, esc, md, pic, badge, titleOf, statusTag, finalRisk, bars, steps, viewer, bindViewer, head, empty, toast } from './ui.js';

const RANK = { hi: 3, mid: 2, lo: 1 };
const me = () => patient(db().session.id);

function recRow(r, href = `#/result/${r.id}`) {
  return `<a class="rec" href="${href}">${pic(r)}<div><b>${titleOf(r)}</b><small>${esc(r.part)} · ${md(r.date)} · ${statusTag(r)}</small></div>${badge(finalRisk(r))}</a>`;
}

export function home() {
  const p = me(), rs = recordsOf(p.id);
  const warn = rs.filter(r => finalRisk(r) === 'hi').length, back = rs.filter(r => r.status === 'reviewed').length;
  return { html: `
    <header class="bar"><span class="logo">EARLY<i>·</i>DOT</span><span class="pill">환자 · ${esc(p.name)}</span></header>
    <div class="pad">
      <div class="kpi"><div><b>${rs.length}</b><span>전체 진단</span></div><div><b class="hi-t">${warn}</b><span>주의 필요</span></div><div><b>${back}</b><span>소견 도착</span></div></div>
      <a class="cta" href="#/body">${I('camera')}<div>새 진단 시작<small>부위 선택 → 촬영 → AI 분석 약 10초</small></div>${I('chevron-right')}</a>
      <h2 class="sub">최근 진단 <a href="#/history">전체 보기</a></h2>
      ${rs.slice(0, 4).map(r => recRow(r)).join('') || empty('아직 진단 내역이 없습니다')}
      <p class="note">${I('info')} AI 결과는 진단이 아니라 참고용입니다. 최종 판단은 담당 의사가 합니다.</p>
    </div>` };
}

// 사람 모양: 앞/뒤에 따라 누를 수 있는 부위가 달라진다
const FIG = {
  front: [['얼굴', 'circle', 'cx="60" cy="22" r="15"'], ['머리/목', 'rect', 'x="53" y="37" width="14" height="9" rx="3"'], ['앞 몸통', 'rect', 'x="38" y="47" width="44" height="58" rx="10"'],
    ['오른쪽 팔', 'rect', 'x="18" y="49" width="16" height="58" rx="8"'], ['왼쪽 팔', 'rect', 'x="86" y="49" width="16" height="58" rx="8"'],
    ['오른쪽 다리', 'rect', 'x="40" y="108" width="18" height="70" rx="8"'], ['왼쪽 다리', 'rect', 'x="62" y="108" width="18" height="70" rx="8"']],
  back: [['머리/목', 'circle', 'cx="60" cy="22" r="15"'], ['뒤 몸통', 'rect', 'x="38" y="47" width="44" height="58" rx="10"'],
    ['왼쪽 팔', 'rect', 'x="18" y="49" width="16" height="58" rx="8"'], ['오른쪽 팔', 'rect', 'x="86" y="49" width="16" height="58" rx="8"'],
    ['왼쪽 다리', 'rect', 'x="40" y="108" width="18" height="70" rx="8"'], ['오른쪽 다리', 'rect', 'x="62" y="108" width="18" height="70" rx="8"']],
};
export function body(_, q) {
  let side = q.get('side') || 'front', pick = q.get('part') || '';
  const svg = () => `<svg viewBox="0 0 120 184" class="fig" role="group" aria-label="${side === 'front' ? '앞' : '뒤'}모습">${FIG[side].map(([n, t, a]) => `<${t} ${a} data-part="${n}" tabindex="0" role="button" aria-label="${n}" class="${n === pick ? 'on' : ''}"/>`).join('')}</svg>`;
  return { html: `${head('신체 부위 선택', '#/home')}
    <div class="pad">
      <p class="lead">어디를 찍을지 골라 주세요.</p>
      <div class="seg wide" role="group" aria-label="보기 방향"><button type="button" data-side="front">앞모습</button><button type="button" data-side="back">뒷모습</button></div>
      <div id="fig">${svg()}</div>
      <div class="chips" id="chips">${PARTS.map(n => `<button type="button" data-part="${n}" aria-pressed="${n === pick}">${n}</button>`).join('')}</div>
      <a class="btn solid full" id="go" aria-disabled="${!pick}">${pick ? `${esc(pick)} 촬영하기` : '부위를 골라 주세요'}</a>
    </div>`,
  mount(el) {
    const sync = () => {
      el.querySelector('#fig').innerHTML = svg();
      el.querySelectorAll('[data-side]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.side === side)));
      el.querySelectorAll('#chips button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.part === pick)));
      const go = el.querySelector('#go'); go.setAttribute('aria-disabled', String(!pick));
      go.textContent = pick ? `${pick} 촬영하기` : '부위를 골라 주세요';
      go.href = pick ? `#/capture?part=${encodeURIComponent(pick)}` : '#/body';
    };
    el.addEventListener('click', e => {
      const s = e.target.closest('[data-side]'), p = e.target.closest('[data-part]');
      if (s) side = s.dataset.side; else if (p) pick = p.dataset.part; else return;
      sync();
    });
    el.addEventListener('keydown', e => { const p = e.target.closest('svg [data-part]'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick = p.dataset.part; sync(); } });
    sync();
  } };
}

export function capture(_, q) {
  const part = q.get('part') || '왼쪽 팔', seed = 100 + Math.floor(Math.random() * 900);
  return { full: true, html: `
    <div class="cam">
      <canvas data-seed="${seed}" data-dark=".7" data-size="720" data-zoom=".36" role="img" aria-label="카메라 화면(견본 병변)"></canvas>
      <div class="cam-top"><a href="#/body?part=${encodeURIComponent(part)}" aria-label="닫기">${I('x')}</a><span>${esc(part)}</span><button type="button" id="flash" aria-pressed="false" aria-label="플래시">${I('zap')}</button></div>
      <div class="guide" aria-hidden="true"></div>
      <ul class="tips"><li>${I('check')}환부를 원 가운데에</li><li>${I('check')}그림자 없이 밝게</li><li>${I('check')}털이 많으면 정리 후</li></ul>
      <button type="button" class="shutter" id="shot" aria-label="촬영"><i></i></button>
      <p class="cam-note">견본 사진으로 진행됩니다. 실제 카메라는 쓰지 않습니다.</p>
      <div class="flashfx"></div>
    </div>`,
  mount(el, go) {
    el.querySelector('#flash').addEventListener('click', e => { const b = e.currentTarget; b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); el.querySelector('.cam').classList.toggle('lit'); });
    el.querySelector('#shot').addEventListener('click', () => { el.querySelector('.cam').classList.add('snap'); setTimeout(() => go(`#/save?part=${encodeURIComponent(part)}&seed=${seed}`), 380); });
  } };
}

export function savePhoto(_, q) {
  const part = q.get('part') || '왼쪽 팔', seed = +q.get('seed') || 123, p = me();
  const today = new Date().toISOString().slice(0, 10);
  return { html: `${head('사진 저장', `#/capture?part=${encodeURIComponent(part)}`)}
    <form class="pad form" id="f">
      <div class="preview">${pic({ seed, dark: .7, part })}<span class="pill">${esc(part)}</span></div>
      <label>사진명<input name="name" value="${esc(part)} ${md(today)}" maxlength="30" required></label>
      <fieldset><legend>증상</legend>${SYMPTOMS.map((s, i) => `<div class="lv"><span>${s}</span><div class="seg sm">${LEVELS.map((l, j) => `<label><input type="radio" name="s${i}" value="${l}" ${j === 0 ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></div>`).join('')}</fieldset>
      <label>처음 생긴 때<select name="onset">${ONSETS.map(o => `<option>${o}</option>`).join('')}</select></label>
      <p class="meta">${I('user-round')} ${p.age}세 · ${p.sex}성 · 가족력 ${p.family} (프로필에서 자동 입력)</p>
      <button class="btn solid full" type="submit">${I('brain')}AI 분석 시작</button>
    </form>`,
  mount(el, go) {
    el.querySelector('#f').addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(e.target), name = String(f.get('name')).trim();
      if (!name) { toast('사진명을 입력해 주세요.'); return; }
      const symptoms = Object.fromEntries(SYMPTOMS.map((s, i) => [s, f.get('s' + i)]));
      const r = addRecord({ part, name, seed, symptoms, onset: f.get('onset') });
      go(`#/analyze/${r.id}`, true);
    });
  } };
}

export function analyze([id]) {
  const r = record(id);
  const STEPS = ['털 지우기 (U-Net 마스크 + LaMa)', '크기·색 맞추기 (512×512)', 'CNN 앙상블 + ViT 예측', '근거 히트맵 만들기 (Grad-CAM)'];
  return { html: `${head('AI 분석 중')}
    <div class="pad center">
      <div class="scan">${pic(r)}<i class="line"></i></div>
      <ol class="prog">${STEPS.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>`,
  mount(el, go) {
    const li = [...el.querySelectorAll('.prog li')]; let k = 0;
    const tick = () => { li.forEach((x, i) => x.className = i < k ? 'done' : i === k ? 'now' : ''); if (k++ < li.length) t = setTimeout(tick, 650); else go(`#/result/${id}`, true); };
    let t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  } };
}

export function result([id]) {
  const r = record(id); if (!r) return { html: head('결과', '#/history') + empty('기록을 찾을 수 없습니다') };
  const k = topOf(r.probs), d = DISEASES[k], ai = riskOf(r.probs);
  const doc = r.status === 'reviewed'
    ? `<div class="card review"><h3>${I('stethoscope')}전문의 최종 소견 ${badge(r.review.risk)}</h3><p>${esc(r.review.note)}</p><dl><dt>후속 조치</dt><dd>${esc(r.review.plan)}</dd><dt>확인</dt><dd>${esc(r.review.doctor)} 전문의 · ${md(r.review.date)}</dd></dl></div>`
    : r.status === 'requested' ? `<div class="card wait">${I('clock')}<div><b>의사 소견 요청 중</b><small>담당 의사가 확인하면 여기에 표시됩니다.</small></div></div>`
    : `<button class="btn solid full" id="ask" type="button">${I('stethoscope')}담당 의사에게 소견 요청</button>`;
  return { html: `${head('진단 결과', `#/history/${encodeURIComponent(r.part)}`, `<span class="pill">${md(r.date)}</span>`)}
    ${viewer(r, 'pad-x')}
    <div class="pad">
      <div class="verdict"><div><small>AI 예측 · ${esc(r.part)}</small><b>${titleOf(r)}</b></div>${badge(ai, true)}</div>
      ${bars(r.probs)}
      <details class="all"><summary>8개 질환 확률 모두 보기</summary>${bars(r.probs, 8)}</details>
      ${steps(r)}
      ${doc}
      <div class="card"><h3>${I('info')}${d.name} · ${d.kind}</h3><p>${d.info}</p><p class="todo">${I('check')}${d.todo}</p></div>
      <div class="card"><h3>${I('list-checks')}증상 정보</h3><dl class="grid">${Object.entries(r.symptoms).map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}<dt>처음 생긴 때</dt><dd>${esc(r.onset)}</dd></dl></div>
      <p class="note">${I('info')} AI 결과는 의료 진단이 아닙니다. 최종 판단은 담당 의사가 합니다.</p>
    </div>`,
  mount(el, go) {
    bindViewer(el);
    el.querySelector('#ask')?.addEventListener('click', () => { requestReview(id); toast('담당 의사에게 소견을 요청했습니다.'); go(`#/result/${id}`, true); });
  } };
}

export function history() {
  const rs = recordsOf(me().id), by = new Map();
  rs.forEach(r => { if (!by.has(r.part)) by.set(r.part, []); by.get(r.part).push(r); });
  return { html: `${head('진단 내역')}
    <div class="pad">
      <p class="lead">부위별로 모아 두면 시간에 따른 변화를 비교할 수 있습니다.</p>
      <div class="folders">${[...by].map(([part, list]) => { const top = list.reduce((a, b) => RANK[finalRisk(b)] > RANK[finalRisk(a)] ? b : a); return `<a class="folder" href="#/history/${encodeURIComponent(part)}">${pic(list[0])}<b>${esc(part)}</b><small>${list.length}건 · 최근 ${md(list[0].date)}</small>${badge(finalRisk(top))}</a>`; }).join('') || empty('아직 진단 내역이 없습니다', 'folder-open')}</div>
    </div>` };
}

export function folder([part]) {
  part = decodeURIComponent(part);
  const list = recordsOf(me().id).filter(r => r.part === part);
  return { html: `${head(esc(part), '#/history')}
    <div class="pad">
      ${list.length > 1 ? `<h2 class="sub">변화 보기 <span>오래된 순</span></h2><div class="timeline">${[...list].reverse().map(r => `<a href="#/result/${r.id}">${pic(r)}<small>${md(r.date)}</small></a>`).join('')}</div>` : ''}
      <h2 class="sub">기록 ${list.length}건</h2>
      ${list.map(r => recRow(r)).join('') || empty('이 폴더에 기록이 없습니다', 'folder-open')}
    </div>` };
}

export function profile() {
  const p = me(), f = db().font;
  return { html: `${head('내 정보')}
    <div class="pad">
      <div class="card who"><span class="av">${esc(p.name[0])}</span><div><b>${esc(p.name)}</b><small>${p.age}세 · ${p.sex}성 · 가족력 ${p.family}</small></div></div>
      <div class="card"><h3>${I('stethoscope')}담당 의사</h3><p><b>윤재현 전문의</b> · 이른점피부과 (견본)</p></div>
      <div class="card"><h3>${I('type')}글자 크기</h3><div class="seg wide" id="font">${[[1, '보통'], [1.12, '크게'], [1.25, '아주 크게']].map(([v, t]) => `<button type="button" data-f="${v}" aria-pressed="${v === f}">${t}</button>`).join('')}</div></div>
      <button class="btn line full" id="reset" type="button">${I('rotate-ccw')}견본 데이터 처음으로</button>
      <button class="btn line full" id="out" type="button">${I('log-out')}로그아웃</button>
      <a class="btn line full" href="../">${I('chevron-left')}EARLY DOT 사례 페이지로</a>
    </div>`,
  mount(el, go) {
    el.querySelector('#font').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; setFont(+b.dataset.f); go('#/me', true); });
    el.querySelector('#reset').addEventListener('click', () => { const s = db().session; reset(); db().session = s; save(); toast('견본 데이터를 처음 상태로 돌렸습니다.'); go('#/home', true); });
    el.querySelector('#out').addEventListener('click', () => { logout(); go('#/login', true); });
  } };
}

