// KayKit Adventurers(CC0) 캐릭터: 뼈대 + 서 있기·걷기·뛰기를 부드럽게 섞는다.
// player.js 가 쓰는 약속을 지킨다: group, animate(dt, walking, t), play(name), setSitting()
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const HEIGHT = 1.6; // m
const CLIPS = { idle: 'Idle_A', walk: 'Walking_A', run: 'Running_A', hello: 'Interact' };

export async function loadCharacter(manager, file = 'Rogue') {
  const loader = new GLTFLoader(manager);
  loader.setMeshoptDecoder(MeshoptDecoder);
  const [body, move, general] = await Promise.all([`models/${file}.glb`, 'models/Rig_Medium_MovementBasic.glb', 'models/Rig_Medium_General.glb'].map(u => loader.loadAsync(u)));
  const model = body.scene;
  model.traverse(o => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  const box = new THREE.Box3().setFromObject(model);
  model.scale.setScalar(HEIGHT / (box.max.y - box.min.y));
  const group = new THREE.Group();
  group.add(model);

  const mixer = new THREE.AnimationMixer(model);
  const all = [...move.animations, ...general.animations];
  const acts = {};
  for (const [k, name] of Object.entries(CLIPS)) {
    const clip = all.find(a => a.name === name);
    if (clip) acts[k] = mixer.clipAction(clip);
  }
  if (acts.hello) { acts.hello.setLoop(THREE.LoopOnce, 1); acts.hello.clampWhenFinished = true; }
  let cur = acts.idle;
  cur.play();
  let oneShot = false;

  function to(k, fade = 0.25) {
    const a = acts[k];
    if (!a || a === cur) return;
    a.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
    cur.crossFadeTo(a, fade, false);
    cur = a;
  }
  mixer.addEventListener('finished', e => { if (e.action === acts.hello) { oneShot = false; to('idle', 0.3); } });

  return {
    group,
    animate(dt, walking) {
      if (walking > 0) oneShot = false;
      if (!oneShot) to(walking > 1.2 ? 'run' : walking > 0 ? 'walk' : 'idle');
      mixer.update(dt);
    },
    play(k) { if (!acts[k]) return; oneShot = true; to(k, 0.2); },
    setSitting() {},
  };
}
