/* The home page's behaviour. All copy is rendered as HTML by _layouts/home.html
   from _data/home/<lang>.yml; this only adds the switcher timer and animation,
   the workflow and accordion toggles, store order by device, the remembered
   language and the QR code. Without JS the page still shows every word. */
(function () {
  var GET = 'https://mymoney.icedtealabs.com/get/';
  var $ = function (id) { return document.getElementById(id); };
  var lang = document.documentElement.lang === 'vi' ? 'vi' : 'en';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- language: remember the reader's choice, and send them back to it */
  document.querySelectorAll('.lang a[data-lang]').forEach(function (a) {
    a.addEventListener('click', function () { try { localStorage.setItem('mm-lang', a.dataset.lang); } catch (e) {} });
  });
  try {
    var saved = localStorage.getItem('mm-lang');
    var want = saved || ((navigator.language || '').indexOf('vi') === 0 ? 'vi' : null);
    if (want && want !== lang && !/[?&]lang=stay/.test(location.search)) {
      var target = document.querySelector('.lang a[data-lang="' + want + '"]');
      if (target) { location.replace(target.href + location.hash); return; }
    }
  } catch (e) {}

  /* ---------- hero feature switcher */
  var cards = Array.prototype.slice.call(document.querySelectorAll('.heroPanel .featCard'));
  var picks = Array.prototype.slice.call(document.querySelectorAll('#picks .pick'));
  var featIdx = 0, DUR = 6000, busy = false;
  function startRing() {
    if (reduced) return;
    var r = picks[featIdx] && picks[featIdx].querySelector('.ring rect');
    if (!r) return;
    r.classList.remove('run'); void r.getBoundingClientRect(); r.classList.add('run');
  }
  function selectPick() {
    picks.forEach(function (p, i) {
      p.setAttribute('aria-selected', i === featIdx);
      p.tabIndex = i === featIdx ? 0 : -1;
      var r = p.querySelector('.ring rect'); if (r && i !== featIdx) r.classList.remove('run');
    });
    startRing();
  }
  function goFeat(i, dir) {
    var next = (i + cards.length) % cards.length;
    if (next === featIdx || busy) return;
    var old = cards[featIdx], card = cards[next];
    var dx = (dir || (next > featIdx ? 1 : -1)) * 24;
    featIdx = next;
    selectPick();
    if (reduced || !old.animate) { old.hidden = true; card.hidden = false; return; }
    busy = true;
    var outs = Array.prototype.map.call(old.querySelectorAll('.featText > *, .featVis .screen'), function (el, k) {
      return el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: el.classList.contains('screen') ? 'translateY(40px) scale(.96)' : 'translateX(' + (-dx) + 'px)' }],
        { duration: 220, delay: k * 25, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });
    });
    Promise.all(outs.map(function (a) { return a.finished; })).then(function () {
      old.hidden = true;
      outs.forEach(function (a) { a.cancel(); });
      card.hidden = false;
      card.querySelectorAll('.featText > *').forEach(function (el, k) {
        el.animate([{ opacity: 0, transform: 'translateX(' + dx + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 40 + k * 55, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      });
      var sc = card.querySelector('.featVis .screen');
      if (sc) sc.animate([{ opacity: 0, transform: 'translateY(60px) scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: 80, easing: 'cubic-bezier(.2,.9,.25,1.05)', fill: 'backwards' });
      card.querySelector('.featVis').animate([{ filter: 'saturate(.6) brightness(1.08)' }, { filter: 'none' }], { duration: 600 });
      busy = false;
    });
  }
  if (cards.length) {
    $('picks').addEventListener('click', function (e) { var b = e.target.closest('.pick'); if (!b) return; goFeat(+b.dataset.i); picks[featIdx].focus(); });
    $('picks').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); goFeat(featIdx + (e.key === 'ArrowRight' ? 1 : -1)); picks[featIdx].focus();
    });
    $('picks').addEventListener('animationend', function (e) { if (e.target.classList.contains('run')) goFeat(featIdx + 1, 1); });
    $('prevFeat').addEventListener('click', function () { goFeat(featIdx - 1, -1); });
    $('nextFeat').addEventListener('click', function () { goFeat(featIdx + 1, 1); });
    /* pause the timer while someone is reading the card, the tab is hidden, or the hero is off screen */
    var hero = document.querySelector('.heroPanel'), hovering = false, visible = true;
    var syncPause = function () { hero.classList.toggle('paused', hovering || !visible || document.hidden); };
    cards.concat([$('picks')]).forEach(function (el) {
      el.addEventListener('mouseenter', function () { hovering = true; syncPause(); });
      el.addEventListener('mouseleave', function () { hovering = false; syncPause(); });
    });
    document.addEventListener('visibilitychange', syncPause);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; syncPause(); }, { threshold: 0.3 }).observe(hero);
    hero.style.setProperty('--dur', DUR + 'ms');
    selectPick();
  }

  /* ---------- workflow columns */
  var flow = $('flow');
  function openFlow(b) {
    flow.querySelectorAll('.step').forEach(function (s) { s.setAttribute('aria-expanded', s === b); });
  }
  if (flow) {
    flow.addEventListener('click', function (e) { var b = e.target.closest('.step'); if (b) openFlow(b); });
    flow.addEventListener('mouseover', function (e) {
      var b = e.target.closest('.step');
      if (b && b.getAttribute('aria-expanded') !== 'true' && window.matchMedia('(hover: hover) and (min-width: 861px)').matches) openFlow(b);
    });
  }

  /* ---------- accordion feature sections: open one item, show its tile */
  document.querySelectorAll('[data-acc]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.accBtn'); if (!b) return;
      var k = b.dataset.k;
      el.querySelectorAll('.accBtn').forEach(function (x) { x.setAttribute('aria-expanded', x === b); });
      el.querySelectorAll('.featTile[data-k]').forEach(function (tile) { tile.hidden = tile.dataset.k !== k; });
      el.querySelectorAll('.privRow').forEach(function (row) { row.classList.toggle('on', row.dataset.k === k); });
    });
  });

  /* ---------- store buttons, by device */
  var ua = navigator.userAgent;
  var os = /iPhone|iPad|iPod/.test(ua) ? 'ios' : (/Android/.test(ua) ? 'android' : 'desktop');
  if (os !== 'desktop') document.documentElement.classList.add('isMobile');
  if (os === 'android') document.querySelectorAll('[data-stores]').forEach(function (el) {
    var play = el.querySelector('[data-os="android"]'); if (play) el.insertBefore(play, el.firstChild);
  });
  var first = document.querySelector('[data-stores] [data-os="' + os + '"]');
  document.querySelectorAll('[data-store-link]').forEach(function (a) {
    if (!first) return;
    a.href = first.href; a.target = '_blank'; a.rel = 'noopener';
  });

  var top = $('top');
  window.addEventListener('scroll', function () { top.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  try { if (window.QRCode) new QRCode($('qrcode'), { text: GET, width: 104, height: 104, colorDark: '#0F2E22', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } catch (e) {}
  if (!window.QRCode) { var q = document.querySelector('.qrRow'); if (q) q.hidden = true; }
})();
