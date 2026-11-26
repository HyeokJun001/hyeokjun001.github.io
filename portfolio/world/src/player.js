// 내 캐릭터 걷기: WASD(시점 기준) · Shift 로 빨리 걷기 · 터치 기기는 누른 곳으로 걸어간다
import * as THREE from 'three';

const WALK = 3.2; // m/s
const RUN = 5.6;
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));

export function createPlayer({ world, figure, start }) {
  const pos = start.clone();
  let facing = Math.PI; // 사당(-z) 쪽을 본다
  let target = null; // { x, z, then, face, cancel }
  let stuck = 0;
  let walking = 0;
  let seat = null; // 앉아 있으면 { y, back: 앉기 전 서 있던 자리 }

  function walk(dx, dz, dt, speed) {
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) return false;
    const step = Math.min(speed * dt, len);
    const ux = dx / len;
    const uz = dz / len;
    // 막히면 비스듬히 돌아가거나 벽을 따라 미끄러진다
    const tries = [[ux, uz], ...[0.6, -0.6, 1.1, -1.1].map(a => [ux * Math.cos(a) - uz * Math.sin(a), ux * Math.sin(a) + uz * Math.cos(a)]), [Math.sign(ux), 0], [0, Math.sign(uz)]];
    // 너무 가파른 오르막(폭포 앞 절벽 등)은 못 올라간다. 비스듬히 걸어도 막히게 경사 크기로 본다
    const H = world.heightAt;
    const steep = (x, z) => Math.hypot(H(x + 0.15, z) - H(x - 0.15, z), H(x, z + 0.15) - H(x, z - 0.15)) / 0.3 > 1.6;
    const climbable = (x, z) => H(x, z) <= H(pos.x, pos.z) + 0.005 || !steep(x, z);
    const trapped = !world.canStand(pos.x, pos.z); // 이미 막힌 곳 안이면 빠져나올 수 있게 둔다
    const ok = tries.find(([x, z]) => (x || z) && (trapped || world.canStand(pos.x + x * step, pos.z + z * step)) && climbable(pos.x + x * step, pos.z + z * step));
    const moved = !!ok;
    if (ok) pos.set(pos.x + ok[0] * step, 0, pos.z + ok[1] * step);
    facing = wrap(facing + wrap(Math.atan2(dx, dz) - facing) * Math.min(1, dt * 12));
    return moved;
  }

  function update(dt, t, keyDir, run) {
    walking = 0;
    if (seat && keyDir) stand(); // 움직이면 일어난다
    if (seat) {
      figure.group.position.set(pos.x, seat.y, pos.z);
      figure.group.rotation.y = facing;
      figure.animate(dt, 0, t);
      return;
    }
    if (keyDir) {
      cancel(); // 키로 움직이면 가던 길은 취소
      walking = walk(keyDir.x, keyDir.z, dt, run ? RUN : WALK) ? (run ? 1.4 : 1) : 0;
    } else if (target) {
      const dx = target.x - pos.x;
      const dz = target.z - pos.z;
      if (Math.hypot(dx, dz) < 0.15) {
        const done = target;
        target = null;
        if (done.face !== undefined) facing = wrap(done.face);
        done.then?.();
      } else {
        stuck = walk(dx, dz, dt, WALK) ? 0 : stuck + dt;
        walking = 1;
        if (stuck > 0.6) {
          // 막혀서 못 가면 그 자리에서 한다
          const done = target;
          target = null;
          if (done.face !== undefined) facing = wrap(done.face);
          done.then?.();
        }
      }
    }
    pos.y = world.heightAt(pos.x, pos.z);
    figure.group.position.copy(pos);
    figure.group.rotation.y = facing;
    figure.animate(dt, walking, t);
  }

  // 일어나면 앉기 전 자리로 돌아간다(벤치 자리는 부딪히는 곳이라 거기 남으면 못 움직인다)
  function stand() {
    if (!seat) return;
    pos.copy(seat.back);
    seat = null;
    figure.setSitting(false);
  }

  function cancel() {
    const prev = target;
    target = null;
    prev?.cancel?.();
  }

  return {
    pos,
    get facing() {
      return facing;
    },
    get walking() {
      return walking > 0;
    },
    update,
    // 목적지로 걸어간 뒤 face 방향을 보고 then 실행. 도중에 다른 이동으로 바뀌면 cancel 실행
    moveTo: (x, z, then, face, onCancel) => {
      if (seat) stand();
      cancel();
      target = { x, z, then, face, cancel: onCancel };
      stuck = 0;
    },
    face: angle => (facing = wrap(angle)),
    sit(x, z, face, y) {
      cancel();
      const back = pos.clone();
      pos.set(x, 0, z);
      facing = wrap(face);
      seat = { y, back };
      figure.setSitting(true);
    },
    stand,
    get seated() {
      return !!seat;
    },
  };
}
