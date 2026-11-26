// 의사 화면(홈 · 담당 환자 · 환자 기록 · 소견 작성)과 관리자 화면(의사 가입 승인), 공용 계정 화면
import { db, save, patient, record, recordsOf, saveReview, decide, reset, logout, RISK, PLANS, riskOf } from './data.js';
import { I, esc, md, pic, badge, titleOf, statusTag, finalRisk, bars, viewer, bindViewer, head, empty, toast } from './ui.js';

const RANK = { hi: 3, mid: 2, lo: 1 };
const who = p => `${esc(p.name)} · ${p.age}세 ${p.sex}`;
const queue = () => db().records.filter(r => r.status === 'requested').sort((a, b) => RANK[riskOf(b.probs)] - RANK[riskOf(a.probs)] || b.date.localeCompare(a.date));

function qRow(r) {
  const p = patient(r.pid);
  return `<a class="rec" href="#/review/${r.id}">${pic(r)}<div><b>${who(p)}</b><small>${esc(r.part)} · ${md(r.date)} · AI ${titleOf(r)}</small></div>${badge(riskOf(r.probs))}</a>`;
}

export function dHome() {
  const q = queue(), hi = q.filter(r => riskOf(r.probs) === 'hi').length;
  const done = db().records.filter(r => r.status === 'reviewed').sort((a, b) => b.review.date.localeCompare(a.review.date)).slice(0, 3);
  return { html: `
    <header class="bar"><span class="logo">EARLY<i>·</i>DOT</span><span class="pill">의사 · 윤재현</span></header>
    <div class="pad">
      <div class="kpi"><div><b>${q.length}</b><span>소견 대기</span></div><div><b class="hi-t">${hi}</b><span>그중 위험 높음</span></div><div><b>${db().patients.length}</b><span>담당 환자</span></div></div>
      <h2 class="sub">소견 대기 <span>위험도 높은 순</span></h2>
      ${q.map(qRow).join('') || empty('대기 중인 소견 요청이 없습니다', 'circle-check')}
      <h2 class="sub">최근 작성한 소견</h2>
      ${done.map(r => `<a class="rec" href="#/review/${r.id}">${pic(r)}<div><b>${who(patient(r.pid))}</b><small>${esc(r.review.plan)} · ${md(r.review.date)}</small></div>${badge(r.review.risk)}</a>`).join('')}
    </div>` };
}

export function patients() {
  let f = 'all', sex = 'all', kw = '';
  const rows = () => db().patients.map(p => {
    const rs = recordsOf(p.id), need = rs.filter(r => r.status === 'requested').length;
    const top = rs.reduce((a, r) => Math.max(a, RANK[finalRisk(r)]), 0);
    return { p, rs, need, top };
  }).filter(x => (f === 'all' || (f === 'need' ? x.need : x.top === 3)) && (sex === 'all' || x.p.sex === sex) && x.p.name.includes(kw))
    .sort((a, b) => b.need - a.need || b.top - a.top);
  const list = () => rows().map(({ p, rs, need, top }) => `<a class="prow" href="#/patient/${p.id}"><span class="av">${esc(p.name[0])}</span><div><b>${esc(p.name)}</b><small>${p.age}세 · ${p.sex} · 최근 ${rs[0] ? md(rs[0].date) : '-'}</small></div>${need ? `<span class="st wait">소견 필요 ${need}</span>` : ''}${top ? badge(['', 'lo', 'mid', 'hi'][top]) : ''}</a>`).join('') || empty('조건에 맞는 환자가 없습니다');
  return { html: `${head('담당 환자')}
    <div class="pad">
      <label class="search">${I('search')}<input id="kw" placeholder="이름으로 찾기" aria-label="환자 이름 검색"></label>
      <div class="chips" id="f"><button type="button" data-f="all" aria-pressed="true">전체</button><button type="button" data-f="need" aria-pressed="false">소견 필요</button><button type="button" data-f="hi" aria-pressed="false">위험 높음</button></div>
      <div class="seg wide sm" id="sex"><button type="button" data-s="all" aria-pressed="true">남녀 모두</button><button type="button" data-s="남" aria-pressed="false">남</button><button type="button" data-s="여" aria-pressed="false">여</button></div>
      <div id="list">${list()}</div>
    </div>`,
  mount(el) {
    const draw = () => (el.querySelector('#list').innerHTML = list(), window.paint?.(el));
    el.querySelector('#kw').addEventListener('input', e => { kw = e.target.value.trim(); draw(); });
    el.querySelector('#f').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; f = b.dataset.f; el.querySelectorAll('#f button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); draw(); });
    el.querySelector('#sex').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; sex = b.dataset.s; el.querySelectorAll('#sex button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); draw(); });
  } };
}

export function patientDetail([pid]) {
  const p = patient(pid); if (!p) return { html: head('환자', '#/patients') + empty('환자를 찾을 수 없습니다') };
  const rs = recordsOf(pid);
  return { html: `${head(esc(p.name), '#/patients')}
    <div class="pad">
      <div class="card who"><span class="av">${esc(p.name[0])}</span><div><b>${esc(p.name)}</b><small>${p.age}세 · ${p.sex}성 · 가족력 ${p.family} · 기록 ${rs.length}건</small></div></div>
      <h2 class="sub">진단 기록 <span>최신 순</span></h2>
      ${rs.map(r => `<a class="rec" href="#/review/${r.id}">${pic(r)}<div><b>${titleOf(r)}</b><small>${esc(r.part)} · ${md(r.date)} · ${statusTag(r)}</small></div>${badge(finalRisk(r))}</a>`).join('')}
    </div>` };
}

export function review([id]) {
  const r = record(id); if (!r) return { html: head('소견', '#/doctor') + empty('기록을 찾을 수 없습니다') };
  const p = patient(r.pid), ai = riskOf(r.probs), cur = r.review || { risk: ai, plan: PLANS[0], note: '' };
  return { html: `${head('소견 작성', `#/patient/${p.id}`, statusTag(r))}
    ${viewer(r, 'pad-x')}
    <div class="pad">
      <div class="verdict"><div><small>${who(p)} · ${esc(r.part)} · ${md(r.date)}</small><b>AI: ${titleOf(r)}</b></div>${badge(ai, true)}</div>
      ${bars(r.probs)}
      <p class="meta">${I('list-checks')} ${Object.entries(r.symptoms).filter(([, v]) => v !== '없음').map(([k, v]) => `${k} ${v}`).join(' · ') || '특이 증상 없음'} · 처음 생긴 때 ${esc(r.onset)}</p>
      <form class="form card" id="f">
        <h3>${I('stethoscope')}전문의 소견</h3>
        <fieldset><legend>위험도 다시 매기기</legend><div class="seg wide">${Object.entries(RISK).map(([k, v]) => `<label><input type="radio" name="risk" value="${k}" ${k === cur.risk ? 'checked' : ''}><span>${v}</span></label>`).join('')}</div></fieldset>
        <label>후속 조치<select name="plan">${PLANS.map(x => `<option ${x === cur.plan ? 'selected' : ''}>${x}</option>`).join('')}</select></label>
        <label>소견 내용<textarea name="note" rows="4" maxlength="400" placeholder="환자에게 보일 소견을 적어 주세요" required>${esc(cur.note)}</textarea></label>
        <button class="btn solid full" type="submit">${I('check')}${r.review ? '소견 고쳐 저장' : '소견 저장'}</button>
      </form>
    </div>`,
  mount(el, go) {
    bindViewer(el);
    el.querySelector('#f').addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(e.target), note = String(f.get('note')).trim();
      if (note.length < 5) { toast('소견을 5자 이상 적어 주세요.'); return; }
      saveReview(id, { risk: f.get('risk'), plan: f.get('plan'), note });
      toast(`${p.name} 님에게 소견을 보냈습니다.`); go('#/doctor', true);
    });
  } };
}

export function admin(_, q) {
  const tab = q.get('tab') || 'pending', L = { pending: '대기', approved: '승인', rejected: '거부' };
  const all = db().applicants, list = all.filter(a => a.status === tab);
  return { html: `${head('의사 가입 승인')}
    <div class="pad">
      <div class="seg wide">${Object.entries(L).map(([k, v]) => `<a href="#/admin?tab=${k}" aria-pressed="${k === tab}">${v} ${all.filter(a => a.status === k).length}</a>`).join('')}</div>
      ${list.map(a => `<div class="card app"><div class="lic" aria-hidden="true"><b>의사 면허증</b><i></i><i></i><i></i><span>${esc(a.license)}</span></div>
        <div><b>${esc(a.name)}</b><small>${esc(a.hospital)} · ${esc(a.dept)}</small><small>면허 ${esc(a.license)} · 신청 ${md(a.date)}</small></div>
        ${a.status === 'pending' ? `<div class="two"><button class="btn line" type="button" data-no="${a.id}">${I('x')}거부</button><button class="btn solid" type="button" data-ok="${a.id}">${I('check')}승인</button></div>` : `<span class="st ${a.status === 'approved' ? 'ok' : ''}">${L[a.status]}됨</span>`}</div>`).join('') || empty(`${L[tab]} 상태인 신청이 없습니다`, 'id-card')}
      <p class="note">${I('info')} 면허 증빙을 확인한 의사만 환자 기록에 소견을 남길 수 있습니다.</p>
    </div>`,
  mount(el, go) {
    el.addEventListener('click', e => {
      const ok = e.target.closest('[data-ok]'), no = e.target.closest('[data-no]');
      if (!ok && !no) return;
      decide((ok || no).dataset[ok ? 'ok' : 'no'], ok ? 'approved' : 'rejected');
      toast(ok ? '가입을 승인했습니다.' : '가입을 거부했습니다.'); go(`#/admin?tab=${tab}`, true);
    });
  } };
}

export function account() {
  const s = db().session;
  return { html: `${head('내 정보')}
    <div class="pad">
      <div class="card who"><span class="av">${esc(s.label.slice(-3, -2) || '관')}</span><div><b>${esc(s.label)}</b><small>${s.role === 'doctor' ? '이른점피부과 · 피부과 전문의 (견본)' : '서비스 관리자 (견본)'}</small></div></div>
      <button class="btn line full" id="reset" type="button">${I('rotate-ccw')}견본 데이터 처음으로</button>
      <button class="btn line full" id="out" type="button">${I('log-out')}로그아웃</button>
      <a class="btn line full" href="../">${I('chevron-left')}EARLY DOT 사례 페이지로</a>
    </div>`,
  mount(el, go) {
    el.querySelector('#reset').addEventListener('click', () => { reset(); db().session = s; save(); toast('견본 데이터를 처음 상태로 돌렸습니다.'); go(s.role === 'doctor' ? '#/doctor' : '#/admin', true); });
    el.querySelector('#out').addEventListener('click', () => { logout(); go('#/login', true); });
  } };
}
