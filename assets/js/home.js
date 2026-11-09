/* The home page: feature switcher, workflow, accordions, language. English copy is in _layouts/home.html; Vietnamese is in VI and the data below. */
(function () {
  var APPSTORE = 'https://apps.apple.com/app/id6475389461';
  var PLAY = 'https://play.google.com/store/apps/details?id=com.icedtealabs.mymoney';
  var GET = 'https://mymoney.icedtealabs.com/get/';
  var lang = 'en';
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function L(o) { return o[lang] || o.en; }
  function shot(name) { return '/assets/real/' + lang + '-light-' + name + '.webp'; }
  /* a real screen, cropped from `y` (a fraction of the screenshot's height) */
  function screen(v, alt, lazy) {
    return '<span class="screen"><img src="' + shot(v.n) + '" alt="' + esc(alt || '') + '" width="660" height="1435"' + (lazy ? ' loading="lazy"' : '') + ' style="margin-top: calc(-217.4% * ' + (v.y || 0) + ')"></span>';
  }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var P = {
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    gauge: '<path d="M12 14l4-4"/><path d="M3.3 17a9 9 0 1 1 17.4 0"/>',
    flag: '<path d="M5 22V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21h4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1"/>',
    wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="16" cy="13.5" r="1.2"/>',
    tag: '<path d="M3 3h8l10 10-8 8L3 11Z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-4"/>',
    inbox: '<path d="M3 13h5l2 3h4l2-3h5"/><path d="M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6Z"/>'
  };
  function ic(n, cls) { return '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>'; }

  var VI = {
    navHow: 'Cách hoạt động', navFeatures: 'Tính năng', navPrivacy: 'Quyền riêng tư', navPricing: 'Bảng giá', navFaq: 'Hỏi đáp', getApp: 'Tải ứng dụng',
    heroH1: 'Tự ghi chi tiêu từ thông báo ngân hàng.',
    heroSub: 'myMoney đọc thông báo thanh toán mà ngân hàng gửi về và ghi lại từng giao dịch giúp bạn. Ngân sách, mục tiêu và báo cáo lo phần còn lại.',
    heroNote: 'Tải miễn phí · Không cần đăng nhập ngân hàng · Bản trả phí mua một lần',
    flowEyebrow: 'Cách hoạt động', flowH2: 'Hợp với cách bạn vẫn thanh toán mỗi ngày',
    flowP: 'Quẹt thẻ, quét mã QR hay dùng ví điện tử, bạn cứ thanh toán như mọi khi. Phần ghi chép để myMoney lo.',
    flowCta: 'Tải myMoney miễn phí',
    factsEyebrow: 'Con số', factsH2: 'Tóm lại là',
    fact1: 'lần đăng nhập ngân hàng', fact2: 'chạm để ghi tay một khoản tiền mặt', fact3: 'lần tự ghi miễn phí để dùng thử', fact4: 'lần thanh toán cho Bánh Xèo, không trả theo tháng',
    priceEyebrow: 'Bảng giá', priceH2: 'Bắt đầu miễn phí. Thấy hợp thì mua một lần.',
    freeH: 'Miễn phí', freeSub: 'Đủ để bắt đầu', freePrice: '0đ, mãi mãi', fT: 'Giao dịch', unlimited: 'Không giới hạn', fCap: 'Giao dịch tự ghi', first3: '3 giao dịch đầu', fW: 'Ví', fB: 'Ngân sách tháng + ngân sách danh mục', fG: 'Mục tiêu · giao dịch định kỳ', fR: 'Báo cáo', fRv: 'Tháng này và tháng trước', fAds: 'Quảng cáo', yes: 'Có',
    freeNote: 'Đã dùng myMoney từ trước khi có giới hạn? Mọi thứ bạn đang có vẫn được giữ nguyên.',
    proBadge: 'Mua một lần', proSub: 'Bản Premium của myMoney', proPrice: 'Giá theo cửa hàng', pCap: 'Tự ghi mọi giao dịch', pAll: 'Ví, ngân sách, mục tiêu, giao dịch định kỳ', pR: 'Báo cáo', pRv: 'Toàn bộ lịch sử', pBk: 'Sao lưu hằng ngày lên Drive', pX: 'Xuất file Excel', incl: 'Có', pAds: 'Quảng cáo', none: 'Không',
    proNote: 'Không trả theo tháng, không bán dữ liệu. Được cập nhật miễn phí về sau. Hoàn tiền qua Apple hoặc Google.',
    faqH2: 'Câu hỏi thường gặp',
    q1: 'Có dùng được với ngân hàng của tôi không?', a1: 'Được, miễn là ứng dụng ngân hàng hoặc ví điện tử của bạn có gửi thông báo khi thanh toán. myMoney đọc nội dung thông báo nên không cần danh sách ngân hàng hỗ trợ, và đọc được cả thông báo tiếng Việt lẫn tiếng Anh.',
    q2: 'iPhone có dùng được Tự ghi không?', a2: 'Được, từ iOS 27 trở lên. Bạn chỉ cần tạo một lệnh tự động trong Phím tắt, ứng dụng có hướng dẫn từng bước kèm ảnh. Với Android, chỉ cần cho phép myMoney truy cập thông báo là xong.',
    q3: 'Nếu ứng dụng ghi sai thì sao?', a3: 'Bạn sửa được mọi thông tin. Nếu muốn kiểm tra trước, hãy bật chế độ duyệt: mỗi giao dịch sẽ nằm trong mục Cần xem lại cho đến khi bạn xác nhận. Bạn cũng có thể gắn từ khóa với danh mục để một nơi chi luôn vào đúng chỗ.',
    q4: 'Hết 3 giao dịch tự ghi miễn phí thì sao?', a4: 'Thông báo thanh toán vẫn được giữ trong mục Cần xem lại, gắn nhãn Chỉ dành cho Premium, chỉ là chưa được đọc. Khi bạn mua Bánh Xèo, tất cả sẽ được đọc, nên không sót giao dịch nào.',
    q5: 'Hỗ trợ ngôn ngữ và loại tiền nào?', a5: 'Ứng dụng có tiếng Việt và tiếng Anh, dùng được với mọi loại tiền, từ đồng, đô la đến euro hay yên.',
    closeH2: 'Lần thanh toán tới, để myMoney ghi giúp.', closeP: 'Miễn phí trên cả hai cửa hàng. Dùng thử 3 lần tự ghi rồi hãy quyết định.',
    qr: 'Đang dùng máy tính? Quét mã để mở đúng cửa hàng.',
    made: 'myMoney · do Trinh Le làm tại TP.HCM', fPriv: 'Quyền riêng tư', fTerms: 'Điều khoản', fLog: 'Nhật ký cập nhật', fDel: 'Xóa tài khoản'
  };
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { EN[el.dataset.i18n] = el.innerHTML; });

  /* ---------- hero feature switcher */
  var FEATS = [
    { icon: 'bolt', col: 'var(--lime)', grad: 'g-lime', vis: { n: 'capture-inbox', y: 0.15 }, href: '#capture',
      tag: { en: 'Auto-capture', vi: 'Tự ghi giao dịch' },
      h: { en: 'Every payment logged, without typing', vi: 'Mỗi khoản chi đều được ghi, không cần gõ' },
      p: { en: 'Pick your bank and e-wallet apps. Each payment notification becomes a transaction with the amount, place, category and wallet filled in.', vi: 'Chọn ứng dụng ngân hàng và ví điện tử. Mỗi thông báo thanh toán sẽ thành một giao dịch, có sẵn số tiền, nơi chi, danh mục và ví.' } },
    { icon: 'gauge', col: 'var(--sky)', grad: 'g-sky', vis: { n: 'budget', y: 0.06 }, href: '#plan',
      tag: { en: 'Budget', vi: 'Ngân sách' },
      h: { en: 'Know what’s safe to spend today', vi: 'Biết hôm nay còn được tiêu bao nhiêu' },
      p: { en: 'Set one monthly budget. myMoney turns it into a daily amount that updates with every payment.', vi: 'Đặt một ngân sách tháng. myMoney chia thành số tiền có thể chi mỗi ngày, cập nhật sau mỗi khoản chi.' } },
    { icon: 'flag', col: 'var(--peach)', grad: 'g-peach', vis: { n: 'goals', y: 0.06 }, href: '#plan',
      tag: { en: 'Goals', vi: 'Mục tiêu' },
      h: { en: 'Save for what matters, month by month', vi: 'Tiết kiệm cho điều quan trọng, từng tháng một' },
      p: { en: 'Pick a target and a date. myMoney works out how much to put aside each month and reminds you when it’s time.', vi: 'Chọn số tiền và ngày cần đạt. myMoney tính mỗi tháng cần để dành bao nhiêu và nhắc bạn khi đến lúc.' } },
    { icon: 'chart', col: 'var(--lilac)', grad: 'g-sky', vis: { n: 'report', y: 0.07 }, href: '#plan',
      tag: { en: 'Reports', vi: 'Báo cáo' },
      h: { en: 'See where the month went', vi: 'Xem tháng này tiền đã đi đâu' },
      p: { en: 'Money kept, savings rate and daily spend, with an overspent month called out in plain words.', vi: 'Số tiền giữ lại, tỷ lệ tiết kiệm và mức chi mỗi ngày, kèm nhận xét dễ hiểu khi bạn chi quá tay.' } }
  ];
  var featIdx = 0, DUR = 6000, busy = false;
  var RING = '<svg class="ring" viewBox="0 0 54 54" aria-hidden="true"><rect x="1.5" y="1.5" width="51" height="51" rx="16" pathLength="100"/></svg>';
  function featHTML(f) {
    return '<div class="featText"><span class="tag"><i style="background:' + f.col + '">' + ic(f.icon) + '</i>' + esc(L(f.tag)) + '</span>' +
      '<h2>' + esc(L(f.h)) + '</h2><p>' + esc(L(f.p)) + '</p>' +
      '<a class="more" href="' + f.href + '">' + (lang === 'vi' ? 'Xem thêm' : 'Learn more') + ' <span aria-hidden="true">→</span></a></div>' +
      '<div class="featVis ' + f.grad + '">' + screen(f.vis, 'myMoney ' + L(f.tag) + ' screen') + '</div>';
  }
  function renderPicks() {
    $('picks').innerHTML = FEATS.map(function (f, i) {
      return '<button type="button" class="pick" role="tab" id="pick-' + i + '" aria-selected="' + (i === featIdx) + '" aria-label="' + esc(L(f.tag)) + '" data-i="' + i + '">' + ic(f.icon) + RING + '</button>';
    }).join('');
    startRing();
  }
  function startRing() {
    if (reduced) return;
    var r = $('picks').querySelector('.pick[aria-selected="true"] .ring rect');
    if (!r) return;
    r.classList.remove('run'); void r.getBoundingClientRect(); r.classList.add('run');
  }
  function renderFeat() { renderPicks(); $('featCard').innerHTML = featHTML(FEATS[featIdx]); }
  function goFeat(i, dir) {
    if (i === featIdx || busy) return;
    var card = $('featCard'), old = featIdx;
    featIdx = (i + FEATS.length) % FEATS.length;
    renderPicks();
    if (reduced || !card.animate) { card.innerHTML = featHTML(FEATS[featIdx]); return; }
    busy = true;
    var dx = (dir || (featIdx > old ? 1 : -1)) * 24;
    var outEls = card.querySelectorAll('.featText > *, .featVis .screen');
    var outs = Array.prototype.map.call(outEls, function (el, k) {
      return el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: el.classList.contains('screen') ? 'translateY(40px) scale(.96)' : 'translateX(' + (-dx) + 'px)' }],
        { duration: 220, delay: k * 25, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }).finished;
    });
    Promise.all(outs).then(function () {
      card.innerHTML = featHTML(FEATS[featIdx]);
      card.querySelectorAll('.featText > *').forEach(function (el, k) {
        el.animate([{ opacity: 0, transform: 'translateX(' + dx + 'px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 40 + k * 55, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
      });
      var sc = card.querySelector('.featVis .screen');
      sc.animate([{ opacity: 0, transform: 'translateY(60px) scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: 80, easing: 'cubic-bezier(.2,.9,.25,1.05)', fill: 'backwards' });
      card.querySelector('.featVis').animate([{ filter: 'saturate(.6) brightness(1.08)' }, { filter: 'none' }], { duration: 600 });
      busy = false;
    });
  }
  $('picks').addEventListener('click', function (e) { var b = e.target.closest('.pick'); if (!b) return; goFeat(+b.dataset.i); var nb = $('pick-' + featIdx); if (nb) nb.focus(); });
  $('picks').addEventListener('animationend', function (e) { if (e.target.classList.contains('run')) goFeat(featIdx + 1, 1); });
  $('prevFeat').addEventListener('click', function () { goFeat(featIdx - 1, -1); });
  $('nextFeat').addEventListener('click', function () { goFeat(featIdx + 1, 1); });
  /* pause the timer while someone is reading the card, the tab is hidden, or the hero is off screen */
  var hero = document.querySelector('.heroPanel'), hovering = false, visible = true;
  function syncPause() { hero.classList.toggle('paused', hovering || !visible || document.hidden); }
  ['featCard', 'picks'].forEach(function (id) {
    $(id).addEventListener('mouseenter', function () { hovering = true; syncPause(); });
    $(id).addEventListener('mouseleave', function () { hovering = false; syncPause(); });
  });
  document.addEventListener('visibilitychange', syncPause);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; syncPause(); }, { threshold: 0.3 }).observe(hero);
  hero.style.setProperty('--dur', DUR + 'ms');

  /* ---------- workflow columns */
  var FLOW = [
    { icon: 'card', methods: true, grad: 'g-sky', h: { en: 'Pay', vi: 'Thanh toán' },
      lead: { en: 'Use your card, a QR code or an e-wallet, as usual.', vi: 'Dùng thẻ, mã QR hoặc ví điện tử như bình thường.' },
      items: [['bell', 'var(--sky)', { en: 'Your bank app sends its usual notification', vi: 'Ngân hàng gửi thông báo như mọi khi' }], ['phone', 'var(--lime)', { en: 'Nothing to open, nothing to type', vi: 'Không cần mở ứng dụng, không cần gõ' }]] },
    { icon: 'bolt', vis: { n: 'capture-inbox', y: 0.15 }, grad: 'g-lime', h: { en: 'Capture', vi: 'Tự ghi' },
      lead: { en: 'Gemini reads the notification and fills in the transaction.', vi: 'Gemini đọc thông báo và điền sẵn giao dịch.' },
      items: [['tag', 'var(--lime)', { en: 'Amount, place and category', vi: 'Số tiền, nơi chi và danh mục' }], ['card', 'var(--sky)', { en: 'The right wallet from the card’s last digits', vi: 'Đúng ví nhờ số cuối của thẻ' }], ['ban', 'var(--peach)', { en: 'Promotions and OTP codes skipped', vi: 'Bỏ qua tin khuyến mãi và mã OTP' }]] },
    { icon: 'inbox', vis: { n: 'capture-inbox', y: 0.33 }, grad: 'g-peach', h: { en: 'Review', vi: 'Xem lại' },
      lead: { en: 'Confirm with one tap, or let it save on its own.', vi: 'Xác nhận bằng một chạm, hoặc để ứng dụng tự lưu.' },
      items: [['inbox', 'var(--peach)', { en: 'Everything waits in To review', vi: 'Mọi giao dịch chờ trong mục Cần xem lại' }], ['check', 'var(--lime)', { en: 'Edit any field before saving', vi: 'Sửa được mọi thông tin trước khi lưu' }], ['tag', 'var(--lilac)', { en: 'Keyword rules for categories', vi: 'Quy tắc từ khóa cho danh mục' }]] },
    { icon: 'gauge', vis: { n: 'budget', y: 0.06 }, grad: 'g-mint', h: { en: 'Plan', vi: 'Lên kế hoạch' },
      lead: { en: 'Your budget and goals update the moment a payment lands.', vi: 'Ngân sách và mục tiêu cập nhật ngay khi có giao dịch mới.' },
      items: [['gauge', 'var(--mint)', { en: 'Safe to spend per day', vi: 'Số tiền có thể chi mỗi ngày' }], ['flag', 'var(--peach)', { en: 'Goals with a monthly amount', vi: 'Mục tiêu kèm số tiền mỗi tháng' }], ['chart', 'var(--sky)', { en: 'A report every month', vi: 'Báo cáo mỗi tháng' }]] }
  ];
  var flowIdx = 0;
  function renderFlow() {
    $('flow').innerHTML = FLOW.map(function (s, i) {
      return '<button type="button" class="step" aria-expanded="' + (i === flowIdx) + '" data-i="' + i + '"><h3>' + esc(L(s.h)) + '</h3><span class="lead">' + esc(L(s.lead)) + '</span><ul>' +
        s.items.map(function (it) { return '<li><i style="background:' + it[1] + '">' + ic(it[0]) + '</i>' + esc(L(it[2])) + '</li>'; }).join('') +
        '</ul><span class="stepVis ' + s.grad + '"><span class="stepIcon"><b>' + ic(s.icon) + '</b></span>' +
        (s.methods
          ? '<span class="methods"><span>' + ic('card') + (lang === 'vi' ? 'Thẻ' : 'Card') + '</span><span>' + ic('qr') + (lang === 'vi' ? 'Mã QR' : 'QR code') + '</span><span>' + ic('phone') + (lang === 'vi' ? 'Ví' : 'E-wallet') + '</span></span>'
          : screen(s.vis, '', true)) +
        '</span></button>';
    }).join('');
  }
  function openFlow(i) {
    flowIdx = i;
    $('flow').querySelectorAll('.step').forEach(function (b, k) { b.setAttribute('aria-expanded', k === i); });
  }
  $('flow').addEventListener('click', function (e) { var b = e.target.closest('.step'); if (b) openFlow(+b.dataset.i); });
  $('flow').addEventListener('mouseover', function (e) { var b = e.target.closest('.step'); if (b && +b.dataset.i !== flowIdx && window.matchMedia('(hover: hover) and (min-width: 861px)').matches) openFlow(+b.dataset.i); });

  /* ---------- accordion feature sections */
  var ACC = {
    capture: { icon: 'bolt', col: 'var(--lime)', grad: 'g-lime',
      tag: { en: 'Auto-capture', vi: 'Tự ghi giao dịch' },
      h: { en: 'A calmer way to track spending', vi: 'Ghi chép chi tiêu nhẹ nhàng hơn' },
      items: [
        { icon: 'bell', vis: { n: 'capture-inbox', y: 0.15 }, t: { en: 'Only the apps you pick', vi: 'Chỉ những ứng dụng bạn chọn' }, b: { en: 'Notifications from every other app are never read, stored or sent.', vi: 'Thông báo từ mọi ứng dụng khác không bao giờ được đọc, lưu hay gửi đi.' } },
        { icon: 'card', vis: { n: 'capture-inbox', y: 0.26 }, t: { en: 'The right wallet, by card digits', vi: 'Đúng ví nhờ số cuối của thẻ' }, b: { en: 'Add the last 3–4 digits of a card and its payments land in that wallet.', vi: 'Thêm 3–4 số cuối của thẻ, giao dịch của thẻ đó sẽ tự vào đúng ví.' } },
        { icon: 'phone', kind: 'guide', t: { en: 'Android and iPhone', vi: 'Dùng được trên Android và iPhone' }, b: { en: 'Android reads notifications once you allow access. iPhone (iOS 27+) uses one Shortcuts automation, with a step-by-step guide in the app.', vi: 'Android đọc thông báo sau khi bạn cho phép truy cập. iPhone (iOS 27 trở lên) dùng một lệnh tự động trong Phím tắt, có hướng dẫn từng bước trong ứng dụng.' } },
        { icon: 'gift', kind: 'free', t: { en: 'Try 3 for free', vi: 'Dùng thử 3 lần miễn phí' }, b: { en: 'Your first 3 captured payments are free. Bánh Xèo reads every one after that.', vi: '3 giao dịch tự ghi đầu tiên được miễn phí. Từ giao dịch thứ 4 trở đi cần Bánh Xèo.' } }
      ] },
    plan: { icon: 'gauge', col: 'var(--sky)', grad: 'g-sky',
      tag: { en: 'Budget & goals', vi: 'Ngân sách & mục tiêu' },
      h: { en: 'Spend with a number in mind', vi: 'Chi tiêu có con số rõ ràng' },
      items: [
        { icon: 'gauge', vis: { n: 'budget', y: 0.06 }, t: { en: 'Safe to spend per day', vi: 'Có thể chi mỗi ngày' }, b: { en: 'One monthly budget becomes a daily amount you can keep in your head.', vi: 'Ngân sách tháng được chia thành mức chi mỗi ngày, dễ nhớ.' } },
        { icon: 'tag', vis: { n: 'budget', y: 0.33 }, t: { en: 'Category budgets', vi: 'Ngân sách theo danh mục' }, b: { en: 'Cap food, transport or anything else, and see which one is running hot.', vi: 'Đặt hạn mức cho ăn uống, đi lại hay bất kỳ danh mục nào, và biết ngay mục nào sắp vượt.' } },
        { icon: 'flag', vis: { n: 'goal-detail', y: 0.05 }, t: { en: 'Goals that do the maths', vi: 'Mục tiêu tự tính giúp' }, b: { en: 'Pick a target and a date. myMoney sets the monthly amount and reminds you.', vi: 'Chọn số tiền và ngày cần đạt. myMoney tính số tiền mỗi tháng và nhắc bạn.' } },
        { icon: 'wallet', vis: { n: 'wallets', y: 0.13 }, t: { en: 'Every wallet in one place', vi: 'Mọi ví ở một nơi' }, b: { en: 'Cash, cards, bank and e-wallets, with net worth on top.', vi: 'Tiền mặt, thẻ, ngân hàng và ví điện tử, tổng tài sản ở trên cùng.' } }
      ] },
    privacy: { icon: 'lock', col: 'var(--peach)', grad: 'g-peach', priv: true,
      tag: { en: 'Privacy', vi: 'Quyền riêng tư' },
      h: { en: 'Your money, your data', vi: 'Tiền của bạn, dữ liệu của bạn' },
      items: [
        { icon: 'send', t: { en: 'What Gemini sees', vi: 'Gemini nhận được gì' }, b: { en: 'Only the text of a notification from an app you picked, that app’s name, and your category names.', vi: 'Chỉ nội dung thông báo từ ứng dụng bạn chọn, tên ứng dụng đó và tên các danh mục của bạn.' } },
        { icon: 'ban', t: { en: 'No bank login, ever', vi: 'Không bao giờ cần đăng nhập ngân hàng' }, b: { en: 'myMoney never connects to your bank. It reads what’s already on your phone.', vi: 'myMoney không kết nối với ngân hàng, chỉ đọc những gì đã có trên điện thoại.' } },
        { icon: 'phone', t: { en: 'Kept on your phone', vi: 'Lưu trên điện thoại' }, b: { en: 'Transactions, budgets and goals live on your device. Backups go to your own Google Drive, only if you turn them on.', vi: 'Giao dịch, ngân sách và mục tiêu nằm trên máy bạn. Bản sao lưu lên Google Drive của chính bạn, chỉ khi bạn bật.' } }
      ],
      card: [
        ['send', 'var(--lime)', { en: 'Sent to Gemini', vi: 'Gửi cho Gemini' }, { en: 'Notification text, app name, category names', vi: 'Nội dung thông báo, tên ứng dụng, tên danh mục' }],
        ['ban', 'var(--peach)', { en: 'Never read or sent', vi: 'Không bao giờ đọc hay gửi' }, { en: 'Bank login, other apps, your history', vi: 'Đăng nhập ngân hàng, ứng dụng khác, lịch sử giao dịch' }],
        ['phone', 'var(--sky)', { en: 'Kept on your phone', vi: 'Lưu trên điện thoại' }, { en: 'Transactions, budgets, goals', vi: 'Giao dịch, ngân sách, mục tiêu' }]
      ] }
  };
  var accIdx = { capture: 0, plan: 0, privacy: 0 };
  function renderAcc(key) {
    var d = ACC[key], el = document.querySelector('[data-acc="' + key + '"]'), i = accIdx[key];
    var tile;
    if (d.priv) {
      tile = '<div class="featTile priv ' + d.grad + '"><div class="privCard">' + d.card.map(function (r, k) {
        return '<div class="privRow' + (k === i ? ' on' : '') + '"><i style="background:' + r[1] + '">' + ic(r[0]) + '</i><span><b>' + esc(L(r[2])) + '</b><span>' + esc(L(r[3])) + '</span></span></div>';
      }).join('') + '</div></div>';
    } else {
      var it = d.items[i];
      if (it.kind === 'guide') {
        tile = '<div class="featTile center ' + d.grad + '"><div class="guide"><img src="/assets/guide/step_5.webp" alt="Shortcuts automation: When I receive a notification" width="804" height="328"><img src="/assets/guide/step_7.webp" alt="Shortcuts action: Capture Notification with myMoney" width="804" height="270"><small>' + (lang === 'vi' ? 'iPhone: một lệnh tự động trong Phím tắt' : 'iPhone: one Shortcuts automation') + '</small></div></div>';
      } else if (it.kind === 'free') {
        tile = '<div class="featTile center ' + d.grad + '"><div class="freeCard"><b>3</b><span>' + (lang === 'vi' ? 'giao dịch tự ghi miễn phí' : 'free auto-captured payments') + '</span><em>' + (lang === 'vi' ? 'Sau đó: Bánh Xèo, mua một lần' : 'Then Bánh Xèo, bought once') + '</em></div></div>';
      } else {
        tile = '<div class="featTile ' + d.grad + '">' + screen(it.vis, 'myMoney: ' + L(it.t)) + '</div>';
      }
    }
    el.innerHTML = '<div class="featLeft"><span class="tag"><i style="background:' + d.col + '">' + ic(d.icon) + '</i>' + esc(L(d.tag)) + '</span><h2>' + esc(L(d.h)) + '</h2><ul class="acc">' +
      d.items.map(function (it, k) {
        return '<li><button type="button" class="accBtn" aria-expanded="' + (k === i) + '" data-k="' + k + '">' + ic(it.icon, 'ic') + '<strong>' + esc(L(it.t)) + '</strong><span class="go">' + ic('arrow') + '</span><span class="body">' + esc(L(it.b)) + '</span></button></li>';
      }).join('') + '</ul></div>' + tile;
  }
  document.querySelectorAll('[data-acc]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.accBtn'); if (!b) return;
      var key = el.dataset.acc; accIdx[key] = +b.dataset.k; renderAcc(key);
      var nb = el.querySelector('.accBtn[data-k="' + accIdx[key] + '"]'); if (nb) nb.focus();
    });
  });

  /* ---------- store buttons, by device */
  var ua = navigator.userAgent;
  var os = /iPhone|iPad|iPod/.test(ua) ? 'ios' : (/Android/.test(ua) ? 'android' : 'desktop');
  if (os !== 'desktop') document.documentElement.classList.add('isMobile');
  var APPLE = '<svg width="22" height="26" viewBox="-1 0 26 26" fill="currentColor" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.42 2.2-1.26 3.08-.99 1.05-2.19 1.66-3.28 1.56-.02-.12-.04-.3-.04-.48 0-1.1.48-2.24 1.3-3.08.83-.86 2.1-1.5 3.2-1.55.02.16.08.32.08.47zM20.7 17.020c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.01-3.05-1.77-4.04-3.34C-.13 15.8-.42 10.66 1.29 7.93c1.21-1.94 3.12-3.07 4.92-3.07 1.83 0 2.98 1.01 4.5 1.01 1.47 0 2.36-1.01 4.48-1.01 1.6 0 3.3.88 4.51 2.39-3.96 2.18-3.32 7.85 1 9.77z"/></svg>';
  var GPLAY = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 2.1 L2.8 12 L13.4 12 Z" fill="#00A0FF"/><path d="M2.8 12 L2.8 21.9 L13.4 12 Z" fill="#00CE72"/><path d="M2.8 2.1 L21.3 12 L13.4 12 Z" fill="#FF3A44"/><path d="M2.8 21.9 L21.3 12 L13.4 12 Z" fill="#FFC400"/></svg>';
  function storeBtn(which) {
    var isA = which === 'ios';
    var small = lang === 'vi' ? 'Tải về trên' : (isA ? 'Download on the' : 'Get it on');
    return '<a class="store" href="' + (isA ? APPSTORE : PLAY) + '" target="_blank" rel="noopener">' + (isA ? APPLE : GPLAY) + '<span><small>' + small + '</small><strong>' + (isA ? 'App Store' : 'Google Play') + '</strong></span></a>';
  }
  function renderStores() {
    var order = os === 'android' ? ['android', 'ios'] : ['ios', 'android'];
    document.querySelectorAll('[data-stores]').forEach(function (el) { el.innerHTML = order.map(storeBtn).join(''); });
    document.querySelectorAll('[data-store-link]').forEach(function (a) {
      a.href = os === 'ios' ? APPSTORE : os === 'android' ? PLAY : '#get';
      if (os !== 'desktop') { a.target = '_blank'; a.rel = 'noopener'; }
    });
  }

  /* ---------- language */
  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $('lang-en').setAttribute('aria-pressed', l === 'en');
    $('lang-vi').setAttribute('aria-pressed', l === 'vi');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.dataset.i18n; el.innerHTML = (l === 'vi' && VI[k]) || EN[k]; });
    renderFeat(); renderFlow(); renderAcc('capture'); renderAcc('plan'); renderAcc('privacy'); renderStores();
    try { localStorage.setItem('mm-lang', l); } catch (e) {}
  }
  $('lang-en').addEventListener('click', function () { setLang('en'); });
  $('lang-vi').addEventListener('click', function () { setLang('vi'); });
  var start = 'en';
  try { start = localStorage.getItem('mm-lang') || ((navigator.language || '').indexOf('vi') === 0 ? 'vi' : 'en'); } catch (e) {}
  setLang(start);

  var top = $('top');
  window.addEventListener('scroll', function () { top.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  try { if (window.QRCode) new QRCode($('qrcode'), { text: GET, width: 104, height: 104, colorDark: '#0F2E22', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } catch (e) {}
  if (!window.QRCode) document.querySelector('.qrRow').hidden = true;
})();
