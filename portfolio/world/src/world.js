// 노을 진 야외 행사장: 광장, 부스, 입구 아치, 안내소, 나무, 줄 전구
// 물리 엔진 없이 원 목록으로 부딪힘을 판정한다(소원숲 방식).
import * as THREE from 'three';

export const WALK_RADIUS = 19;
const blockers = []; // { x, z, r }
export const groundY = () => 0;
export const heightAt = groundY;
export function canStand(x, z) {
  if (Math.hypot(x, z) > WALK_RADIUS) return false;
  for (const b of blockers) if (Math.hypot(x - b.x, z - b.z) < b.r + 0.3) return false;
  return true;
}

const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...o });

// 글자 판(캔버스 텍스처)
export function textPlane(lines, { w = 3, h = 0.8, bg = '#fff8ee', fg = '#241c33', size = 64, sub } = {}) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = Math.round(1024 * h / w);
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 ${size}px Pretendard, "Malgun Gothic", sans-serif`;
  const y = sub ? c.height * 0.42 : c.height / 2;
  g.fillText(lines, c.width / 2, y);
  if (sub) { g.font = `500 ${Math.round(size * 0.5)}px Pretendard, sans-serif`; g.globalAlpha = 0.7; g.fillText(sub, c.width / 2, c.height * 0.74); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
}

function booth(b, texLoader) {
  const g = new THREE.Group();
  const W = 3.4, D = 2.6, H = 2.4;
  const postM = mat('#efe6d8');
  for (const [x, z] of [[-W / 2, -D / 2], [W / 2, -D / 2], [-W / 2, D / 2], [W / 2, D / 2]]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, H, 8), postM);
    p.position.set(x, H / 2, z); p.castShadow = true; g.add(p);
  }
  // 지붕: 네모뿔 천막
  const roof = new THREE.Mesh(new THREE.ConeGeometry(W * 0.78, 1.1, 4, 1), mat(b.color, { roughness: 0.7 }));
  roof.rotation.y = Math.PI / 4; roof.scale.z = D / W; roof.position.y = H + 0.85; roof.castShadow = true; g.add(roof);
  // 천막 띠: 간판을 붙이는 자리(지붕은 그 위에서 시작해 간판을 가리지 않는다)
  const valance = new THREE.Mesh(new THREE.BoxGeometry(W + 0.1, 0.7, D + 0.1), mat(b.color));
  valance.position.y = H - 0.05; valance.castShadow = true; g.add(valance);
  // 뒷벽 + 작업 화면 포스터
  const wall = new THREE.Mesh(new THREE.BoxGeometry(W, H - 0.3, 0.08), mat('#fbf7f0'));
  wall.position.set(0, (H - 0.3) / 2, -D / 2 + 0.05); wall.castShadow = true; wall.receiveShadow = true; g.add(wall);
  if (b.poster) {
    let poster;
    // 그림 비율을 지켜 2.6×1.6 칸 안에 맞춘다(로고처럼 가로로 긴 그림이 늘어나지 않게)
    const tex = texLoader.load(b.poster, t => { const r = t.image.width / t.image.height; const s = Math.min(2.6 / r, 1.6); poster.scale.set((s * r) / 2.6, s / 1.6, 1); });
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
    poster = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
    poster.position.set(0, 1.35, -D / 2 + 0.1); g.add(poster);
  }
  // 앞 카운터
  const counter = new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, 0.95, 0.5), mat('#fbf7f0'));
  counter.position.set(0, 0.475, D / 2 - 0.35); counter.castShadow = true; counter.receiveShadow = true; g.add(counter);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(W * 0.8 + 0.02, 0.16, 0.52), mat(b.color));
  stripe.position.set(0, 0.86, D / 2 - 0.35); g.add(stripe);
  // 간판
  const sign = textPlane(b.title, { w: 2.6, h: 0.62, bg: b.color, fg: b.ink || '#ffffff', size: 92, sub: b.sub });
  sign.position.set(0, H - 0.05, D / 2 + 0.07); g.add(sign);
  g.position.set(b.x, 0, b.z);
  g.rotation.y = Math.atan2(-b.x, -b.z + b.cz); // 광장 가운데를 본다
  blockers.push({ x: b.x, z: b.z, r: 1.95 });
  return g;
}

function arch(scene, occluders) {
  const g = new THREE.Group();
  const m = mat('#2c2244');
  for (const x of [-2.6, 2.6]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4, 0.35), m); p.position.set(x, 2, 0); p.castShadow = true; g.add(p); blockers.push({ x, z: 13, r: 0.35 }); }
  const sign = textPlane('양혁준 포트폴리오 행사장', { w: 5.6, h: 1, bg: '#2c2244', fg: '#ffe6b8', size: 76, sub: '부스에 다가가면 작업을 볼 수 있어요' });
  sign.position.set(0, 4.1, 0.2); g.add(sign);
  const sb = sign.clone(); sb.rotation.y = Math.PI; sb.position.z = -0.2; g.add(sb);
  g.position.set(0, 0, 13); scene.add(g); occluders.push(g);
}

function trees(scene, occluders) {
  const N = 90, rnd = mulberry(7);
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.12, 0.18, 1.6, 6), mat('#6b4a33'), N);
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.25, 0), mat('#5d8a4a', { flatShading: true }), N);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), c = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const a = rnd() * Math.PI * 2, r = 29 + rnd() * 16, k = 0.8 + rnd() * 0.8; // 걷는 반경 19 + 카메라 거리 밖
    const x = Math.sin(a) * r, z = Math.cos(a) * r;
    m.compose(p.set(x, 0.8 * k, z), q.identity(), s.set(k, k, k)); trunk.setMatrixAt(i, m);
    m.compose(p.set(x, 2.2 * k, z), q.setFromEuler(new THREE.Euler(0, rnd() * 3, 0)), s.set(k * 1.1, k * 1.25, k * 1.1)); crown.setMatrixAt(i, m);
    crown.setColorAt(i, c.setHSL(0.27 + rnd() * 0.06, 0.38, 0.32 + rnd() * 0.1));
  }
  trunk.castShadow = crown.castShadow = true;
  scene.add(trunk, crown); // 나무는 걷는 곳 바깥이라 카메라 가림 판정에서 뺀다(넣으면 휴대폰 카메라가 캐릭터에 붙는다)
}

function lights(scene, booths, cz, occluders) {
  // 가운데 기둥에서 부스 지붕으로 늘어진 줄 전구(점광원 없이 빛나는 구슬만)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 6, 8), mat('#2c2244'));
  pole.position.set(0, 3, cz); pole.castShadow = true; scene.add(pole); occluders.push(pole); blockers.push({ x: 0, z: cz, r: 0.15 }); // 카메라가 기둥 뒤에 숨지 않게 가림 판정에 넣는다
  const pts = [];
  for (const b of booths) {
    const a = new THREE.Vector3(0, 5.8, cz), e = new THREE.Vector3(b.x, 3.3, b.z);
    for (let i = 1; i < 14; i++) { const t = i / 14; const v = a.clone().lerp(e, t); v.y -= Math.sin(t * Math.PI) * 0.9; pts.push(v); }
  }
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffd889', toneMapped: false }), pts.length);
  const m = new THREE.Matrix4();
  pts.forEach((v, i) => { bulbs.setMatrixAt(i, m.makeTranslation(v.x, v.y, v.z)); });
  scene.add(bulbs);
  const lamp = new THREE.PointLight('#ffc070', 18, 16, 1.6); lamp.position.set(0, 5.2, cz); scene.add(lamp);
}

export function buildWorld(scene, booths, cz) {
  const occluders = [];
  const texLoader = new THREE.TextureLoader();
  // 땅: 잔디 + 포장된 광장 + 입구 길
  const grass = new THREE.Mesh(new THREE.CircleGeometry(70, 64), mat('#7da35f'));
  grass.rotation.x = -Math.PI / 2; grass.receiveShadow = true; scene.add(grass);
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(15.5, 64), mat('#e2d3b8'));
  plaza.rotation.x = -Math.PI / 2; plaza.position.y = 0.01; plaza.receiveShadow = true; scene.add(plaza);
  const ring = new THREE.Mesh(new THREE.RingGeometry(5.6, 6, 64), mat('#cdb995'));
  ring.rotation.x = -Math.PI / 2; ring.position.set(0, 0.02, cz); scene.add(ring);
  const path = new THREE.Mesh(new THREE.PlaneGeometry(4, 10), mat('#e2d3b8'));
  path.rotation.x = -Math.PI / 2; path.position.set(0, 0.012, 18); path.receiveShadow = true; scene.add(path);
  const targets = new Map();
  for (const b of booths) {
    const g = booth({ ...b, cz }, texLoader);
    scene.add(g); occluders.push(g); targets.set(g, b.id);
  }
  arch(scene, occluders);
  trees(scene, occluders);
  lights(scene, booths, cz, occluders);
  return { occluders, targets, floor: grass };
}

function mulberry(a) { return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
