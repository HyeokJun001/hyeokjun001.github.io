// 휴대폰 조작
// - 왼쪽 아래를 누르면 그 자리에 조이스틱이 생긴다: 끄는 방향으로 걷고, 끝까지 밀면 뛴다
// - 나머지 화면을 끌면 둘러보기(위로 끌면 하늘을 올려다봄)
// - 톡 누르면 예전처럼 그 자리로 걸어가거나 물건 앞으로 가서 한다
// 두 손가락으로 걸으면서 둘러볼 수 있다(손가락마다 따로 센다).
const $ = sel => document.querySelector(sel);
const RADIUS = 55; // 조이스틱 반지름(px)
const TAP_MOVE = 10; // 이보다 덜 움직이면 톡(누르기)

export function createTouch({ canvas, look, enabled, onTap }) {
  const stick = { id: null, ox: 0, oy: 0, x: 0, y: 0 };
  const drags = new Map(); // pointerId → { x, y, sx, sy, moved }
  const base = $('#stick');
  const knob = $('#stick-knob');

  const inStickZone = e => e.clientX < innerWidth * 0.45 && e.clientY > innerHeight * 0.4;
  const capture = id => {
    try {
      canvas.setPointerCapture(id);
    } catch {
      // 못 잡아도 움직임은 받는다
    }
  };

  function showStick() {
    base.style.left = `${stick.ox}px`;
    base.style.top = `${stick.oy}px`;
    base.classList.add('on');
    moveKnob();
  }
  function moveKnob() {
    let dx = stick.x - stick.ox;
    let dy = stick.y - stick.oy;
    const len = Math.hypot(dx, dy);
    if (len > RADIUS) {
      dx = (dx / len) * RADIUS;
      dy = (dy / len) * RADIUS;
    }
    knob.style.translate = `${dx}px ${dy}px`;
  }
  function hideStick() {
    stick.id = null;
    base.classList.remove('on');
    knob.style.translate = '0 0';
  }

  canvas.addEventListener('pointerdown', e => {
    if (!enabled() || e.pointerType === 'mouse') return;
    if (stick.id === null && inStickZone(e)) {
      Object.assign(stick, { id: e.pointerId, ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY });
      capture(e.pointerId);
      showStick();
      return;
    }
    drags.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false });
    capture(e.pointerId);
  });

  canvas.addEventListener('pointermove', e => {
    if (e.pointerId === stick.id) {
      stick.x = e.clientX;
      stick.y = e.clientY;
      moveKnob();
      return;
    }
    const d = drags.get(e.pointerId);
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > TAP_MOVE) d.moved = true;
    if (d.moved) look.drag(e.clientX - d.x, e.clientY - d.y);
    d.x = e.clientX;
    d.y = e.clientY;
  });

  const end = e => {
    if (e.pointerId === stick.id) return hideStick();
    const d = drags.get(e.pointerId);
    drags.delete(e.pointerId);
    if (d && !d.moved && e.type === 'pointerup') onTap(e.clientX, e.clientY);
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  return {
    // 걷는 방향: { f: 앞(+)/뒤(-), s: 오른쪽(+)/왼쪽(-), run } 또는 null
    direction() {
      if (stick.id === null) return null;
      const dx = (stick.x - stick.ox) / RADIUS;
      const dy = (stick.y - stick.oy) / RADIUS;
      const len = Math.hypot(dx, dy);
      if (len < 0.18) return null;
      look.hold(); // 조이스틱을 쓰는 동안 카메라가 멋대로 돌지 않게
      return { f: -dy / Math.max(1, len), s: dx / Math.max(1, len), run: len > 0.95 };
    },
  };
}
