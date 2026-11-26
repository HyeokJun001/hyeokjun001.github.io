// 견본 병변 그림: 실제 환자 사진 대신 코드로 그린다(같은 seed면 같은 그림)
// draw(canvas, { seed, heat, tone, size, zoom }) — heat=true면 Grad-CAM 같은 히트맵, size는 그림 해상도, zoom은 병변 크기
function rng(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const TONES = [['#efc9a8', '#d9a47f'], ['#e6b48f', '#c98d63'], ['#f3d3b8', '#ddb08e'], ['#d6a07a', '#b57a52']];

export function drawLesion(cv, { seed = 1, heat = false, tone, dark = 0.6, size = 320, zoom = 1 } = {}) {
  const S = cv.width = cv.height = size, u = S / 320;
  const g = cv.getContext('2d'), r = rng(seed * 9973);
  const [t1, t2] = TONES[tone ?? Math.floor(r() * TONES.length)];
  // 피부: 부드러운 그라데이션 + 잔무늬
  const bg = g.createRadialGradient(S * .4, S * .35, 10, S / 2, S / 2, S * .8);
  bg.addColorStop(0, t1); bg.addColorStop(1, t2);
  g.fillStyle = bg; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 900 * u * u; i++) { g.fillStyle = `rgba(120,70,40,${r() * .05})`; g.fillRect(r() * S, r() * S, (1 + r() * 2) * u, (1 + r() * 2) * u); }
  // 병변: 울퉁불퉁한 경계
  const cx = S * (.45 + r() * .1), cy = S * (.45 + r() * .1), R = S * (.18 + r() * .1) * zoom;
  const k = [1, 2, 3, 5, 7].map(n => [n, (r() - .5) * (n < 3 ? .22 : .08), r() * 6.28]);
  const path = new Path2D();
  for (let i = 0; i <= 96; i++) {
    const a = i / 96 * Math.PI * 2;
    const rr = R * (1 + k.reduce((s, [n, amp, ph]) => s + amp * Math.sin(n * a + ph), 0));
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * .86;
    i ? path.lineTo(x, y) : path.moveTo(x, y);
  }
  g.save(); g.filter = `blur(${2 * u}px)`;
  const lg = g.createRadialGradient(cx - R * .2, cy - R * .2, 2, cx, cy, R * 1.2);
  lg.addColorStop(0, `rgba(40,22,16,${.75 + dark * .25})`); lg.addColorStop(.55, `rgba(92,52,32,${.6 + dark * .3})`); lg.addColorStop(1, 'rgba(150,95,60,.55)');
  g.fillStyle = lg; g.fill(path); g.restore();
  // 색 얼룩(비대칭 색)
  g.save(); g.clip(path); g.filter = `blur(${6 * u}px)`;
  for (let i = 0; i < 6; i++) { g.fillStyle = ['rgba(30,16,12,.55)', 'rgba(110,60,80,.35)', 'rgba(70,40,30,.5)'][i % 3]; g.beginPath(); g.arc(cx + (r() - .5) * R * 1.3, cy + (r() - .5) * R, R * (.15 + r() * .3), 0, 7); g.fill(); }
  g.restore();
  // 털 몇 가닥
  g.strokeStyle = 'rgba(60,36,24,.45)'; g.lineWidth = 1.2 * u;
  for (let i = 0; i < 5; i++) { const x = r() * S, y = r() * S; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 30 * u, y + (r() - .5) * 40 * u, x + (60 + r() * 40) * u, y + (r() - .5) * 60 * u); g.stroke(); }
  if (heat) {
    // 히트맵: 병변 안 한쪽으로 치우친 뜨거운 점
    const hx = cx + (r() - .5) * R * .6, hy = cy + (r() - .5) * R * .5;
    const off = document.createElement('canvas'); off.width = off.height = S; const h = off.getContext('2d');
    const add = (x, y, rad, a) => { const gr = h.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)'); h.fillStyle = gr; h.fillRect(0, 0, S, S); };
    add(hx, hy, R * 1.25, 1); add(cx, cy, R * 1.6, .45);
    const im = h.getImageData(0, 0, S, S), d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.min(1, d[i + 3] / 255); // 0..1
      const [rr, gg, bb] = jet(v); d[i] = rr; d[i + 1] = gg; d[i + 2] = bb; d[i + 3] = 40 + v * 150;
    }
    h.putImageData(im, 0, 0); g.drawImage(off, 0, 0);
  }
  return cv;
}

function jet(v) { // 파랑 → 초록 → 노랑 → 빨강
  const c = (x) => Math.max(0, Math.min(255, Math.round(x * 255)));
  return [c(1.5 - Math.abs(4 * v - 3)), c(1.5 - Math.abs(4 * v - 2)), c(1.5 - Math.abs(4 * v - 1))];
}

export function paintAll(root = document) {
  root.querySelectorAll('canvas[data-seed]').forEach(cv => drawLesion(cv, { seed: +cv.dataset.seed, heat: cv.hasAttribute('data-heat'), tone: cv.dataset.tone ? +cv.dataset.tone : undefined, dark: cv.dataset.dark ? +cv.dataset.dark : .6, size: +(cv.dataset.size || 320), zoom: +(cv.dataset.zoom || 1) }));
}
