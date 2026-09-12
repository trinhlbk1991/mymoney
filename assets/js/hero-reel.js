/* Hero headline currency reel.
 *
 * The track holds the currency list twice over, so scrolling past the last
 * word lands on a duplicate of the first and the wrap is invisible. Position
 * is kept in item units modulo the list length; the mask width is tweened
 * separately so the words either side of the reel stay glued to it.
 */
(function () {
  var mask = document.querySelector('[data-currency-reel]');
  if (!mask) return;

  var track = mask.firstElementChild;
  if (!track || !track.children.length) return;

  var HOLD_MS = 1700;
  var SPIN_MS = 1250;

  var pos = 0, idx = 0, itemH = 0, count = 1, widths = [];
  var phase = 'hold', phaseStart = 0, from = 0, travel = 0, nextIdx = 0;
  var raf = null;

  function measure() {
    var kids = Array.prototype.slice.call(track.children);
    count = Math.max(1, Math.floor(kids.length / 2));
    itemH = kids[0].getBoundingClientRect().height;
    widths = kids.slice(0, count).map(function (kid) {
      return kid.getBoundingClientRect().width;
    });
    if (widths[idx]) mask.style.width = Math.ceil(widths[idx]) + 'px';
    track.style.transform = 'translateY(' + (-pos * itemH) + 'px)';
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!itemH) { measure(); return; }

    var dt = now - phaseStart;

    if (phase === 'hold') {
      if (dt < HOLD_MS) return;
      phase = 'spin';
      phaseStart = now;
      from = pos;
      travel = count * 2 + 1;
      nextIdx = (idx + 1) % count;
      if (widths[nextIdx]) {
        mask.style.transition = 'width ' + SPIN_MS + 'ms cubic-bezier(.75,0,.25,1)';
        mask.style.width = Math.ceil(widths[nextIdx]) + 'px';
      }
      return;
    }

    var p = Math.min(1, dt / SPIN_MS);
    // quintic ease-in-out, so the reel launches and lands rather than drifts
    var eased = p < 0.5 ? 16 * p * p * p * p * p : 1 - Math.pow(-2 * p + 2, 5) / 2;

    var prev = pos;
    pos = (from + travel * eased) % count;
    var delta = pos - prev;
    if (delta < 0) delta += count;

    track.style.transform = 'translateY(' + (-pos * itemH) + 'px)';
    track.style.filter = 'blur(' + Math.min(5, delta * itemH * 0.1).toFixed(2) + 'px)';

    if (p >= 1) {
      idx = nextIdx;
      pos = idx;
      track.style.transform = 'translateY(' + (-pos * itemH) + 'px)';
      track.style.filter = 'none';
      phase = 'hold';
      phaseStart = now;
    }
  }

  function start() {
    if (raf) return;
    phase = 'hold';
    phaseStart = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = null;
    // park on a whole item so neither the track nor the mask is left mid-tween
    pos = idx;
    track.style.transform = 'translateY(' + (-pos * itemH) + 'px)';
    track.style.filter = 'none';
    mask.style.transition = 'none';
    if (widths[idx]) mask.style.width = Math.ceil(widths[idx]) + 'px';
  }

  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', function () {
    // coming back from a background tab, restart the phase clock rather than
    // burning through a spin that "elapsed" while nothing was painted
    if (!document.hidden) phaseStart = performance.now();
  });

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function sync() { reduced.matches ? stop() : start(); }
  if (reduced.addEventListener) reduced.addEventListener('change', sync);
  else if (reduced.addListener) reduced.addListener(sync);
  sync();
})();
