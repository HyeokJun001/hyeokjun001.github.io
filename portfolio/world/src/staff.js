// 부스 직원: 카운터 뒤에 서 있다가, 가까이 오면 고개를 돌려 나를 보고 웃으며 손을 흔든다.
// KayKit Adventurers(CC0). 얼굴에 입 모양이 없어서 웃는 입선·볼 홍조를 머리 뼈에 붙인다.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const HEIGHT = 1.7;
const STEP = 0.42; // 카운터 뒤 낮은 단(머리 큰 캐릭터라 몸이 카운터에 가려지지 않게)
const LOOK_DIST = 6.5; // 이 안이면 고개를 돌린다
const WAVE_DIST = 4.6; // 이 안으로 들어오면 손을 흔든다
const HIDE = /HelmetVisor|Mask$/; // 얼굴을 가리는 부품
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
const { clamp } = THREE.MathUtils;

function addSmile(model) {
  const headMesh = model.getObjectByProperty('isMesh', true) && (() => { let h; model.traverse(o => { if (o.isMesh && /_Head$/.test(o.name)) h = o; }); return h; })();
  const bone = model.getObjectByName('head');
  if (!headMesh || !bone) return;
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(headMesh);
  const size = box.getSize(new THREE.Vector3());
  const w = size.x;
  const ink = new THREE.MeshBasicMaterial({ color: '#4a2219' });
  // 아래로 둥근 반원 = 웃는 입
  const smile = new THREE.Mesh(new THREE.TorusGeometry(w * 0.12, w * 0.018, 6, 16, Math.PI), ink);
  smile.rotation.z = Math.PI;
  smile.position.set((box.min.x + box.max.x) / 2, box.min.y + size.y * 0.3, box.max.z + w * 0.005);
  const blush = new THREE.MeshBasicMaterial({ color: '#ff8f8f', transparent: true, opacity: 0.55, depthWrite: false });
  const cheeks = [-1, 1].map(s => { const c = new THREE.Mesh(new THREE.CircleGeometry(w * 0.07, 12), blush); c.position.set((box.min.x + box.max.x) / 2 + s * w * 0.27, box.min.y + size.y * 0.38, box.max.z - w * 0.02); return c; });
  for (const m of [smile, ...cheeks]) { m.updateMatrixWorld(); bone.attach(m); } // 지금 자리(월드) 그대로 머리 뼈에 붙여 함께 움직이게
}

export async function createStaff(scene, booths, cz) {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const [general, sim] = await Promise.all(['models/Rig_Medium_General.glb', 'models/Rig_Medium_Simulation.glb'].map(u => loader.loadAsync(u)));
  const clip = n => [...general.animations, ...sim.animations].find(a => a.name === n);
  const IDLE = clip('Idle_B') || clip('Idle_A'), WAVE = clip('Waving'), CHEER = clip('Cheering');
  const npcs = [];
  await Promise.all(booths.filter(b => b.staff).map(async b => {
    const gltf = await loader.loadAsync(`models/${b.staff}.glb`);
    const model = gltf.scene;
    model.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; if (HIDE.test(o.name)) o.visible = false; } });
    const box = new THREE.Box3().setFromObject(model);
    model.scale.setScalar(HEIGHT / (box.max.y - box.min.y));
    addSmile(model);
    const yaw = Math.atan2(-b.x, -b.z + cz); // 부스와 같은 방향(광장 쪽)을 본다
    const group = new THREE.Group();
    group.add(model);
    // 카운터(앞쪽 D/2-0.35) 뒤에 선다
    group.position.set(b.x + Math.sin(yaw) * 0.15, STEP, b.z + Math.cos(yaw) * 0.15);
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.4, STEP, 0.9), new THREE.MeshStandardMaterial({ color: '#d9cbb3', roughness: 0.9 }));
    step.position.set(b.x + Math.sin(yaw) * 0.15, STEP / 2, b.z + Math.cos(yaw) * 0.15); step.rotation.y = yaw; step.receiveShadow = true; scene.add(step);
    group.rotation.y = yaw;
    scene.add(group);
    const mixer = new THREE.AnimationMixer(model);
    const idle = mixer.clipAction(IDLE); idle.time = Math.random() * IDLE.duration; idle.play();
    const once = c => { if (!c) return null; const a = mixer.clipAction(c); a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; return a; };
    const wave = once(WAVE), cheer = once(CHEER);
    let cur = idle;
    mixer.addEventListener('finished', () => { idle.reset().play(); cur.crossFadeTo(idle, 0.35, false); cur = idle; });
    npcs.push({ b, group, model, mixer, idle, wave, cheer, yaw, head: model.getObjectByName('head'), turn: 0, inside: false, waveAt: -99, get cur() { return cur; }, set cur(v) { cur = v; } });
  }));

  const q = new THREE.Quaternion(), qParent = new THREE.Quaternion(), qYaw = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
  return {
    update(dt, t, pos) {
      for (const n of npcs) {
        n.mixer.update(dt);
        const dx = pos.x - n.group.position.x, dz = pos.z - n.group.position.z, d = Math.hypot(dx, dz);
        // 고개: 보이는 각도 안에서만(±65°) 부드럽게 따라온다
        const want = d < LOOK_DIST ? clamp(wrap(Math.atan2(dx, dz) - n.yaw), -1.15, 1.15) : 0;
        n.turn += (want - n.turn) * Math.min(1, dt * 5);
        if (n.head && Math.abs(n.turn) > 0.001) {
          // 애니메이션이 정한 머리 방향 위에, 세상 기준 세로축으로 turn 만큼 더 돌린다
          n.head.parent.updateWorldMatrix(true, false);
          n.head.parent.getWorldQuaternion(qParent);
          q.copy(qParent).multiply(n.head.quaternion);
          qYaw.setFromAxisAngle(up, n.turn);
          n.head.quaternion.copy(qParent.invert().multiply(qYaw.multiply(q)));
        }
        // 들어오면 손을 흔든다(8초에 한 번까지), 패널을 열면 박수(cheer)
        const inside = d < WAVE_DIST;
        if (inside && !n.inside && t - n.waveAt > 8 && n.wave) { n.waveAt = t; n.wave.reset().play(); n.cur.crossFadeTo(n.wave, 0.25, false); n.cur = n.wave; }
        n.inside = inside;
      }
    },
    cheer(id) {
      const n = npcs.find(x => x.b.id === id);
      if (!n || !n.cheer) return;
      n.cheer.reset().play(); n.cur.crossFadeTo(n.cheer, 0.25, false); n.cur = n.cheer;
    },
  };
}
