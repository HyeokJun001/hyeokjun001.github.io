// 부스 위 전광판: 가까이 가면 튀어나오듯 켜지고, 멀어지면 줄어들며 꺼진다.
// 화면은 캔버스에 그린다(작업 화면 슬라이드 · 터미널 · 소개 카드) + 아래 글자 띠가 흐른다.
import * as THREE from 'three';

const W = 768, H = 432, TICKER = 54;
const SHOW_DIST = 7.5; // m
const Y = 4.75; // 전광판 가운데 높이
const SLIDE = 2.6; // 초
const FADE = 0.45;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOutBack = t => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

// 전광판 느낌: 가는 가로줄 무늬
const scan = (() => {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); g.fillStyle = 'rgba(0,0,0,.16)';
  for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
  return c;
})();

function contain(g, img, x, y, w, h, alpha = 1) {
  if (!img.complete || !img.naturalWidth) return;
  const s = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
  g.globalAlpha = alpha;
  g.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  g.globalAlpha = 1;
}

export function createBillboards(scene, booths) {
  const boards = booths.filter(b => b.reel).map(b => {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    const group = new THREE.Group();
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.75, 2.3), new THREE.MeshBasicMaterial({ color: b.color, transparent: true, opacity: 0.45, toneMapped: false }));
    glow.position.z = -0.08;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.06, 0.12), new THREE.MeshStandardMaterial({ color: '#15111f', roughness: 0.6, transparent: true }));
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 3.3 * H / W), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
    screen.position.z = 0.065;
    group.add(glow, frame, screen);
    // 부스 앞쪽(광장 쪽)으로 조금 당겨 지붕 위에 건다
    const fx = (b.at.x - b.x) / 2.9, fz = (b.at.z - b.z) / 2.9;
    group.position.set(b.x + fx * 0.9, Y, b.z + fz * 0.9);
    group.scale.setScalar(0.001);
    group.visible = false;
    scene.add(group);
    const imgs = (b.reel.images || []).map(([src]) => Object.assign(new Image(), { src }));
    return { b, g: c.getContext('2d'), tex, group, mats: [glow.material, frame.material, screen.material], imgs, show: 0, clock: 0, ticker: W };
  });

  function drawSlides(bd) {
    const { g, imgs, b } = bd;
    const n = imgs.length;
    const i = Math.floor(bd.clock / SLIDE) % n;
    const into = bd.clock % SLIDE;
    const prev = (i + n - 1) % n;
    const a = reduce ? 1 : Math.min(1, into / FADE);
    const tall = im => im.naturalHeight > im.naturalWidth; // 휴대폰 화면
    const put = (k, alpha, dx) => {
      const im = imgs[k];
      g.save(); g.translate(dx, 0);
      if (tall(im)) {
        // 세로 화면: 오른쪽에 크게, 왼쪽엔 무슨 화면인지 큰 글씨로
        contain(g, im, W * 0.5, 8, W * 0.46, H - TICKER - 18, alpha);
        g.globalAlpha = alpha; g.fillStyle = '#ffffff'; g.textBaseline = 'middle';
        g.font = '800 44px Pretendard, sans-serif';
        const words = b.reel.images[k][1].split(' '); let line = '', y = (H - TICKER) / 2 - 30;
        for (const w of words) { if (g.measureText(line + w).width > W * 0.42 && line) { g.fillText(line.trim(), 34, y); y += 54; line = ''; } line += w + ' '; }
        g.fillText(line.trim(), 34, y);
        g.fillStyle = 'rgba(255,255,255,.55)'; g.font = '600 22px Pretendard, sans-serif'; g.fillText(`${k + 1} / ${n}`, 36, y + 50);
        g.globalAlpha = 1;
      } else contain(g, im, 18, 14, W - 36, H - TICKER - 26, alpha);
      g.restore();
    };
    if (a < 1) put(prev, 1 - a, 0);
    put(i, a, reduce ? 0 : (1 - a) * 40); // 새 화면은 살짝 밀려 들어온다
    // 진행 점
    for (let k = 0; k < n; k++) { g.fillStyle = k === i ? '#ffffff' : 'rgba(255,255,255,.3)'; g.beginPath(); g.arc(W / 2 - (n - 1) * 9 + k * 18, H - TICKER - 6, 3.5, 0, 7); g.fill(); }
    return b.reel.images[i][1];
  }

  function drawTerm(bd) {
    const { g, b } = bd;
    const lines = b.reel.lines;
    const per = 0.42, hold = 2.5;
    const cycle = lines.length * per + hold;
    const shown = Math.min(lines.length, Math.floor((bd.clock % cycle) / per) + 1);
    g.font = '600 21px Consolas, "D2Coding", monospace';
    g.textBaseline = 'top';
    lines.slice(0, shown).forEach((l, k) => { g.fillStyle = l.startsWith('$') ? '#ffffff' : l.includes('✓') ? '#6fe0a0' : '#a99cf0'; g.fillText(l, 26, 22 + k * 30); });
    if (Math.floor(bd.clock * 2) % 2 === 0) { g.fillStyle = '#6fe0a0'; g.fillRect(26, 22 + shown * 30, 12, 22); }
    return b.reel.caption;
  }

  function drawCard(bd) {
    const { g, imgs, b } = bd;
    contain(g, imgs[0], 30, 26, 220, H - TICKER - 52);
    g.textBaseline = 'top';
    g.fillStyle = '#ffffff'; g.font = '800 46px Pretendard, sans-serif'; g.fillText(b.reel.name, 280, 52);
    g.fillStyle = '#ffd889'; g.font = '600 25px Pretendard, sans-serif'; g.fillText(b.reel.role, 282, 112);
    g.fillStyle = 'rgba(255,255,255,.85)'; g.font = '500 22px Pretendard, sans-serif';
    b.reel.lines.forEach((l, k) => g.fillText(l, 282, 170 + k * 36));
    return b.reel.caption;
  }

  function draw(bd, dt) {
    const { g, b } = bd;
    bd.clock += dt;
    g.fillStyle = '#0b0816'; g.fillRect(0, 0, W, H);
    const cap = b.reel.type === 'term' ? drawTerm(bd) : b.reel.type === 'card' ? drawCard(bd) : drawSlides(bd);
    // 글자 띠
    g.fillStyle = b.color; g.fillRect(0, H - TICKER, W, TICKER);
    g.font = '700 26px Pretendard, sans-serif'; g.textBaseline = 'middle'; g.fillStyle = b.ink || '#ffffff';
    const text = `${b.title}  ·  ${cap}  ·  `;
    const tw = g.measureText(text).width;
    if (!reduce) bd.ticker -= dt * 90;
    if (bd.ticker < -tw) bd.ticker += tw;
    for (let x = bd.ticker; x < W; x += tw) g.fillText(text, x, H - TICKER / 2);
    g.drawImage(scan, 0, 0);
    bd.tex.needsUpdate = true;
  }

  return {
    // 반환값: 지금 켜진 정도(0~1) — 카메라가 그만큼 위를 올려다본다
    update(dt, t, pos, camera) {
      let near = null, nd = SHOW_DIST;
      for (const bd of boards) { const d = Math.hypot(pos.x - bd.b.x, pos.z - bd.b.z); if (d < nd) { nd = d; near = bd; } }
      let lift = 0;
      for (const bd of boards) {
        const { b, group } = bd;
        const want = bd === near ? 1 : 0;
        bd.show += (want - bd.show) * Math.min(1, dt * (want ? 4.5 : 7));
        if (!want && bd.show < 0.02) { if (group.visible) { group.visible = false; bd.show = 0; bd.clock = 0; } continue; }
        group.visible = true;
        const s = reduce ? bd.show : Math.max(0.001, easeOutBack(bd.show));
        group.scale.set(s, s, s);
        bd.mats.forEach((m, k) => (m.opacity = (k === 0 ? 0.45 : 1) * Math.min(1, bd.show * 1.4)));
        group.position.y = Y + (reduce ? 0 : Math.sin(t * 1.6 + b.x) * 0.06);
        group.rotation.y = Math.atan2(camera.position.x - group.position.x, camera.position.z - group.position.z); // 늘 카메라를 본다
        draw(bd, dt);
        lift = Math.max(lift, bd.show);
      }
      return lift;
    },
  };
}
