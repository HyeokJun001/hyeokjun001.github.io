import * as THREE from 'three';
import { buildWorld, canStand, heightAt } from './world.js';
import { loadCharacter } from './character.js';
import { createPlayer } from './player.js';
import { createLook } from './look.js';
import { createTouch } from './touch.js';
import { BOOTHS } from './booths.js';
import { createBillboards } from './billboard.js';

const $ = s => document.querySelector(s);

// WebGL 이 안 되면 2D 버전으로 안내
function hasWebGL() { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } }
if (!hasWebGL()) { $('#nogl').hidden = false; $('#intro').hidden = true; throw new Error('WebGL 없음'); }

document.body.classList.toggle('mouse', matchMedia('(pointer: fine)').matches);
const canvas = $('#c');
const MAX_DPR = Math.min(devicePixelRatio, 1.5);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(MAX_DPR);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = skyTexture();
scene.fog = new THREE.Fog('#f0c39c', 32, 90);
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
scene.add(new THREE.HemisphereLight('#ffe4c8', '#4f6b3d', 1.3));
const sun = new THREE.DirectionalLight('#ffbf7a', 2.4);
sun.position.set(-18, 13, 12);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 70 });
sun.shadow.bias = -0.0005;
scene.add(sun);

function skyTexture() {
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#6f7fc4'); gr.addColorStop(0.45, '#f3b38f'); gr.addColorStop(0.75, '#f7d3a8'); gr.addColorStop(1, '#f0c39c');
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

// 부스 자리 계산: 광장 가운데(cz)를 둘러싼 반원 + 입구 옆 안내소
const CZ = -1;
for (const b of BOOTHS) {
  if (b.angle !== undefined) { const a = THREE.MathUtils.degToRad(b.angle); b.x = Math.sin(a) * 9.5; b.z = CZ - Math.cos(a) * 9.5; }
  const dx = 0 - b.x, dz = CZ - b.z, L = Math.hypot(dx, dz);
  b.at = { x: b.x + (dx / L) * 2.9, z: b.z + (dz / L) * 2.9 };
  b.face = Math.atan2(b.x - b.at.x, b.z - b.at.z);
}

// 불러오기 진행률
const manager = new THREE.LoadingManager();
manager.onProgress = (_u, done, total) => { $('#bar i').style.width = `${Math.round((done / total) * 100)}%`; };
const world = buildWorld(scene, BOOTHS, CZ);
const boards = createBillboards(scene, BOOTHS);

let player, look, touch, figure;
let entered = false;
const keys = new Set();

loadCharacter(manager).then(f => {
  figure = f;
  scene.add(figure.group);
  player = createPlayer({ world: { canStand, heightAt }, figure, start: new THREE.Vector3(0, 0, 16.5) });
  look = createLook({ canvas, camera, player, occluders: world.occluders });
  touch = createTouch({ canvas, look, enabled: () => entered && !anyOpen() && !look.mouseMode, onTap: tapAt });
  document.body.classList.toggle('mouse', look.mouseMode);
  $('#loading').hidden = true;
  $('#enter').disabled = false;
  $('#enter').focus();
}).catch(err => {
  console.error(err);
  $('#loading').textContent = '캐릭터를 불러오지 못했습니다. 새로고침하거나 2D 버전으로 보세요.';
});

// 들어가기 · 조작
$('#enter').addEventListener('click', () => {
  entered = true;
  $('#intro').hidden = true;
  $('#hud').hidden = false;
  if (look.mouseMode) look.lock();
});
canvas.addEventListener('click', () => { if (entered && look.mouseMode && !anyOpen() && document.pointerLockElement !== canvas) look.lock(); });
const typing = e => /INPUT|TEXTAREA/.test(e.target.tagName);
addEventListener('keydown', e => {
  if (!entered || typing(e) || anyOpen()) return;
  keys.add(e.code);
  if (e.code === 'KeyE' && !e.repeat) { const b = nearBooth(); if (b) openBooth(b); }
  if (e.code === 'KeyL' && !e.repeat) openList();
});
addEventListener('keyup', e => keys.delete(e.code));
addEventListener('blur', () => keys.clear());

function keyDirection() {
  if (anyOpen()) return null;
  const stick = touch.direction();
  const f = stick ? stick.f : (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
  const s = stick ? stick.s : (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
  if (!f && !s) return null;
  const yaw = look.moveYaw;
  return { x: Math.sin(yaw) * f - Math.cos(yaw) * s, z: Math.cos(yaw) * f + Math.sin(yaw) * s, run: stick ? stick.run : keys.has('ShiftLeft') || keys.has('ShiftRight') };
}

function nearBooth() {
  if (!player) return null;
  let best = null, bd = 2.7;
  for (const b of BOOTHS) { const d = Math.hypot(player.pos.x - b.at.x, player.pos.z - b.at.z); if (d < bd) { bd = d; best = b; } }
  return best;
}

// 톡: 부스를 누르면 앞까지 걸어가서 열고, 땅을 누르면 거기로 걷는다
const ray = new THREE.Raycaster();
const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
function tapAt(cx, cy) {
  ray.setFromCamera(new THREE.Vector2((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1), camera);
  let o = ray.intersectObjects([...world.targets.keys()], true)[0]?.object;
  while (o && !world.targets.has(o)) o = o.parent;
  if (o) return walkTo(BOOTHS.find(b => b.id === world.targets.get(o)));
  const hit = ray.ray.intersectPlane(ground, new THREE.Vector3());
  if (hit) player.moveTo(hit.x, hit.z);
}
function walkTo(b) { player.moveTo(b.at.x, b.at.z, () => openBooth(b), b.face); }

// 패널
const panel = $('#panel');
function anyOpen() { return panel.open || $('#list').open; }
function openBooth(b) {
  look.unlock();
  keys.clear();
  figure.play('hello');
  $('#p-title').textContent = b.title;
  $('#p-sub').textContent = b.sub;
  $('#p-body').innerHTML = b.html;
  $('#p-more').href = b.more;
  panel.showModal();
  panel.scrollTop = 0;
}
$('#p-close').addEventListener('click', () => panel.close());
panel.addEventListener('click', e => { if (e.target === panel) panel.close(); });
panel.addEventListener('close', () => { if (entered && look.mouseMode) setTimeout(() => look.lock(), 50); });

const list = $('#list');
$('#l-items').innerHTML = BOOTHS.map((b, i) => `<li><button type="button" class="l-open" data-i="${i}"><b>${b.title}</b><span>${b.sub}</span></button><button type="button" class="l-walk" data-i="${i}">걸어가기</button></li>`).join('');
function openList() { look.unlock(); keys.clear(); list.showModal(); }
$('#open-list').addEventListener('click', openList);
$('#l-close').addEventListener('click', () => list.close());
list.addEventListener('click', e => {
  if (e.target === list) return list.close();
  const btn = e.target.closest('button[data-i]'); if (!btn) return;
  const b = BOOTHS[+btn.dataset.i]; list.close();
  if (btn.classList.contains('l-walk')) { walkTo(b); if (look.mouseMode) look.lock(); } else openBooth(b);
});
$('#act').addEventListener('click', () => { const b = nearBooth(); if (b) openBooth(b); });

// 크기
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', resize);
resize();

// 느리면 화질을 한 단계씩 낮춘다(소원숲 방식): 해상도 1 → 그림자 끔 → 해상도 0.75
const QUALITY = [() => renderer.setPixelRatio(1), () => { renderer.shadowMap.enabled = false; scene.traverse(o => o.material && [o.material].flat().forEach(m => (m.needsUpdate = true))); }, () => renderer.setPixelRatio(0.75)];
let level = MAX_DPR > 1 ? 0 : 1, slowSum = 0, slowCount = 0;
function adaptQuality(raw) {
  if (level >= QUALITY.length || document.hidden || raw > 0.5) return;
  slowSum += raw;
  if (++slowCount < 120) return;
  const avg = slowSum / slowCount; slowSum = slowCount = 0;
  if (avg < 1 / 30) return;
  QUALITY[level++](); resize();
}

let lastAct = null;
function update(dt, t) {
  if (!player) { camera.position.set(Math.sin(t * 0.06) * 16, 9, 6 + Math.cos(t * 0.06) * 14); camera.lookAt(0, 1.5, CZ - 3); return; }
  if (!entered) { player.update(dt, t, null); camera.position.set(Math.sin(t * 0.06) * 16, 9, 6 + Math.cos(t * 0.06) * 14); camera.lookAt(0, 1.5, CZ - 3); return; }
  const dir = keyDirection();
  player.update(dt, t, dir, dir?.run);
  look.update(dt);
  look.setLift(boards.update(dt, t, player.pos, camera));
  const b = nearBooth();
  if (b !== lastAct) {
    lastAct = b;
    $('#act').hidden = !b;
    if (b) $('#act').innerHTML = `<b>${b.title}</b> 보기 <kbd>E</kbd>`;
  }
}

const clock = new THREE.Clock();
const FRAME_MS = 1000 / 30;
let lastFrameAt = null, frameReq = null;
function frame(now) {
  frameReq = null;
  if (document.hidden) return;
  frameReq = requestAnimationFrame(frame);
  if (lastFrameAt !== null && now - lastFrameAt < FRAME_MS - 0.5) return;
  lastFrameAt = now;
  const raw = clock.getDelta();
  const t0 = performance.now();
  update(Math.min(raw, 0.05), clock.elapsedTime);
  renderer.render(scene, camera);
  adaptQuality((performance.now() - t0) / 1000);
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frameReq); frameReq = null; clock.stop(); keys.clear(); }
  else { const e = clock.elapsedTime; clock.start(); clock.elapsedTime = e; lastFrameAt = null; if (frameReq === null) frameReq = requestAnimationFrame(frame); }
});
frameReq = requestAnimationFrame(frame);
window.__world = { get ready() { return !!player; }, get entered() { return entered; }, get pos() { return player && { x: player.pos.x, z: player.pos.z }; }, walkTo: id => walkTo(BOOTHS.find(b => b.id === id)), level: () => level };
