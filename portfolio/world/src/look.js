// 3인칭 카메라 (소원숲 look.js 바탕)
// 마우스 기기: 들어가면 마우스로 시점을 돌린다. Esc로 커서를 풀고 화면 클릭으로 복귀.
// 터치 기기: 카메라가 캐릭터 뒤를 알아서 따라가고, 화면을 끌면 둘러본다.
// 추가: 부스·나무가 캐릭터를 가리면 카메라를 앞으로 당긴다.
import * as THREE from 'three';
import { groundY, POLE } from './world.js';

const SENS = 0.0024;
const PITCH_MIN = -0.6;
const PITCH_MAX = 1.1;
const FREE_RETURN = 10;
const DIST = 5.2;
const { clamp } = THREE.MathUtils;
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));

export function createLook({ canvas, camera, player, occluders }) {
  const mouseMode = matchMedia('(pointer: fine)').matches;
  let yaw = Math.PI;
  let pitch = 0.22;
  let free = 0;
  let freeLook = false;
  let manualUntil = 0;
  let near = DIST; // 가림 때문에 당긴 거리(부드럽게 돌아간다)
  const TOUCH_SENS = 0.006;
  const head = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const right = new THREE.Vector3();
  const want = new THREE.Vector3();
  const back = new THREE.Vector3();
  const ray = new THREE.Raycaster();

  document.addEventListener('pointerlockchange', () => {
    const locked = document.pointerLockElement === canvas;
    document.body.classList.toggle('locked', locked);
    if (!locked) freeLook = false;
  });
  document.addEventListener('mousemove', e => {
    if (document.pointerLockElement !== canvas) return;
    const dx = e.movementX * SENS;
    if (freeLook) free -= dx;
    else { yaw -= dx; yawGoal = null; }
    pitch = clamp(pitch + e.movementY * SENS, PITCH_MIN, PITCH_MAX);
  });
  addEventListener('keydown', e => { if (e.code === 'AltLeft' && document.pointerLockElement === canvas) { e.preventDefault(); freeLook = true; } });
  addEventListener('keyup', e => { if (e.code === 'AltLeft') { e.preventDefault(); freeLook = false; } });
  addEventListener('blur', () => (freeLook = false));

  function update(dt) {
    if (!mouseMode && performance.now() > manualUntil) {
      yaw += wrap(player.facing - yaw) * Math.min(1, dt * (player.walking ? 1.8 : 0.4));
      pitch += (0.3 - pitch) * Math.min(1, dt * 2);
    }
    if (yawGoal !== null) { const d = wrap(yawGoal - yaw); yaw += d * Math.min(1, dt * 3.5); if (Math.abs(d) < 0.01) yawGoal = null; } // 부스 쪽으로 부드럽게 돈다
    if (!freeLook) free *= Math.max(0, 1 - dt * FREE_RETURN);
    const view = yaw + free;
    const dist = mouseMode ? DIST : DIST * clamp(0.8 / camera.aspect, 1.1, 1.4);
    dir.set(Math.sin(view) * Math.cos(pitch), -Math.sin(pitch), Math.cos(view) * Math.cos(pitch));
    right.set(-Math.cos(view), 0, Math.sin(view));
    head.set(player.pos.x, player.pos.y + 1.45, player.pos.z);
    // 가림 확인: 머리에서 카메라 쪽으로 광선을 쏴서 막히면 그 앞까지 당긴다
    back.copy(dir).multiplyScalar(-1).addScaledVector(right, mouseMode ? 0.1 : 0).normalize();
    ray.set(head, back);
    ray.far = dist;
    // 가는 기둥·전구처럼 잠깐 스치는 것은 무시한다(지나갈 때마다 카메라가 튀던 원인)
    const hit = occluders.length ? ray.intersectObjects(occluders, true).find(h => !h.object.userData.thin) : null;
    const allowed = hit ? Math.max(1.4, hit.distance - 0.35) : dist;
    // 당길 때도 한 번에 붙지 않고 빠르게 따라가고, 돌아갈 때는 천천히
    near += (allowed - near) * Math.min(1, dt * (allowed < near ? 9 : 2.2));
    want.copy(head).addScaledVector(dir, -near).addScaledVector(right, mouseMode ? 0.5 : 0);
    camera.position.copy(want);
    camera.position.y = Math.max(want.y, groundY(want.x, want.z) + 0.35);
    // 카메라가 가운데 기둥에 가까우면 기둥이 화면을 덮으니 흐리게 숨긴다(0.6m 안이면 안 보임, 1.8m부터 다 보임)
    if (POLE.mesh) {
      const o = clamp((Math.hypot(camera.position.x - POLE.x, camera.position.z - POLE.z) - 0.6) / 1.2, 0, 1);
      POLE.mesh.material.opacity = o; POLE.mesh.visible = o > 0.02;
    }
    camera.lookAt(camera.position.clone().addScaledVector(dir, 10));
  }
  let yawGoal = null;

  return {
    mouseMode,
    get moveYaw() { return yaw; },
    drag(dx, dy) { yawGoal = null; yaw -= dx * TOUCH_SENS; pitch = clamp(pitch + dy * TOUCH_SENS, PITCH_MIN, PITCH_MAX); manualUntil = performance.now() + 6000; },
    hold: () => (manualUntil = Math.max(manualUntil, performance.now() + 1500)),
    turn: v => (yawGoal = v),
    lock: () => canvas.requestPointerLock?.()?.catch?.(() => {}),
    unlock: () => document.pointerLockElement === canvas && document.exitPointerLock(),
    update,
  };
}
