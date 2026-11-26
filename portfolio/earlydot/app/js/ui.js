// 화면 공용 조각
import { DISEASES, RISK, riskOf, topOf, sortedProbs } from './data.js';

export const I = (id, cls = 'ic') => `<svg class="${cls}" aria-hidden="true"><use href="../../img/icons.svg#${id}"/></svg>`;
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const md = d => d.slice(5).replace('-', '.');
export const pic = (r, heat = false, cls = '') => `<canvas class="${cls}" data-seed="${r.seed}" data-dark="${r.dark}"${heat ? ' data-heat' : ''} role="img" aria-label="${esc(r.part)} 견본 병변 사진${heat ? ', AI 근거 히트맵' : ''}"></canvas>`;
export const badge = (risk, big = false) => `<span class="risk ${risk}${big ? ' big' : ''}">${big ? '위험도 ' : ''}${RISK[risk]}</span>`;
export const titleOf = r => { const k = topOf(r.probs); return DISEASES[k].kind === '양성' ? DISEASES[k].name : `${DISEASES[k].name} 의심`; };
export const STATUS = { analyzed: ['AI 분석 완료', ''], requested: ['소견 요청 중', 'wait'], reviewed: ['의사 확인 완료', 'ok'] };
export const statusTag = r => `<span class="st ${STATUS[r.status][1]}">${STATUS[r.status][0]}</span>`;
export const finalRisk = r => r.review?.risk || riskOf(r.probs);

export function bars(probs, n = 4) {
  const [first] = sortedProbs(probs);
  return `<div class="bars">${sortedProbs(probs).slice(0, n).map(([k, v]) => `<div><span>${DISEASES[k].name}</span><i style="--w:${(v * 100).toFixed(1)}%${k === first[0] && DISEASES[k].kind !== '양성' ? ';--c:var(--hi)' : ''}"></i><em>${Math.round(v * 100)}%</em></div>`).join('')}</div>`;
}

export function steps(r) {
  const done = r.status === 'reviewed' ? 4 : 2, now = r.status === 'requested' ? 2 : -1;
  return `<ol class="steps" aria-label="진행 단계">${['촬영', 'AI 분석', '의사 소견', '완료'].map((s, i) => `<li class="${i < done ? 'done' : i === now ? 'now' : ''}">${s}</li>`).join('')}</ol>`;
}

// 원본/히트맵 전환이 있는 사진
export const viewer = (r, cls = '') => `<div class="viewer ${cls}">${pic(r)}${pic(r, true, 'heat')}<div class="seg" role="group" aria-label="사진 보기"><button type="button" aria-pressed="false" data-v="raw">원본</button><button type="button" aria-pressed="true" data-v="heat">근거 히트맵</button></div></div>`;
export function bindViewer(root) {
  root.querySelectorAll('.viewer').forEach(v => v.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
    v.classList.toggle('raw', b.dataset.v === 'raw');
    v.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  })));
}

export const head = (title, back, right = '') => `<header class="bar">${back ? `<a class="back" href="${back}" aria-label="뒤로">${I('chevron-left')}</a>` : ''}<h1>${title}</h1>${right}</header>`;
export const empty = (msg, icon = 'search') => `<div class="empty">${I(icon)}<p>${msg}</p></div>`;

let tt;
export function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('on');
  clearTimeout(tt); tt = setTimeout(() => el.classList.remove('on'), 2200);
}
