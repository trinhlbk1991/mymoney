/* Auto-capture demo.
 *
 * The markup ships on its last frame (data-step="3"), so with no script, or
 * with reduced motion, the figure already shows a notification and the
 * transaction it became. Here it rewinds and plays the trip on a loop:
 *   1 the notification drops in, 2 Gemini sweeps it and lifts out the card,
 *   amount and place, 3 the saved transaction lands. Then the next example.
 * It only runs while the figure is on screen.
 */
(function () {
  var root = document.querySelector('[data-capture-demo]');
  if (!root) return;

  var examples = [];
  try {
    examples = JSON.parse(root.querySelector('[data-examples]').textContent) || [];
  } catch (e) { return; }
  if (!examples.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  // ms spent on each step before moving to the next; step 0 is the blank
  // lock screen between examples.
  var STEPS = [700, 1500, 2100, 2900];

  var idx = 0, step = 3, timer = null, visible = false, rewound = false;

  function fill(example) {
    var fields = root.querySelectorAll('[data-f]');
    for (var i = 0; i < fields.length; i++) {
      var key = fields[i].getAttribute('data-f');
      if (example[key] != null) fields[i].textContent = example[key];
    }
  }

  function show(n) {
    step = n;
    root.setAttribute('data-step', String(n));
  }

  function advance() {
    var next = (step + 1) % STEPS.length;
    // the first rewind replays the example the page loaded with
    if (next === 0 && rewound) {
      idx = (idx + 1) % examples.length;
      fill(examples[idx]);
    }
    if (next === 0) rewound = true;
    show(next);
    timer = setTimeout(advance, STEPS[next]);
  }

  function start() {
    if (timer || !visible || document.hidden || reduced.matches) return;
    root.classList.add('isPlaying');
    timer = setTimeout(advance, STEPS[step]);
  }

  function stop() {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0.35 }).observe(root);
  } else {
    visible = true;
    start();
  }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  function onMotionChange() {
    if (reduced.matches) { stop(); fill(examples[idx]); show(3); }
    else start();
  }
  if (reduced.addEventListener) reduced.addEventListener('change', onMotionChange);
  else if (reduced.addListener) reduced.addListener(onMotionChange);
})();
