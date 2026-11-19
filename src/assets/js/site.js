// Team-Karten auf der Startseite zufällig mischen
(function () {
  var grid = document.querySelector('.team-grid[data-shuffle]');
  if (!grid) return;
  var cards = Array.from(grid.children);
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
  }
  cards.forEach(function (c) { grid.appendChild(c); });
})();

// Navigation: Hamburger, Untermenüs, Sprachwahl
(function () {
  var btn = document.getElementById('hamburger');
  var drawer = document.getElementById('mobileDrawer');
  var langWrap = document.getElementById('mobLangWrap');
  var langBtn = document.getElementById('mobLangBtn');
  var body = document.body;
  var soon = {
    EN: 'This language version is coming soon.',
    TR: 'Bu dil sürümü yakında gelecek.',
    RU: 'Эта языковая версия скоро появится.',
    AR: 'هذه النسخة اللغوية قادمة قريباً.'
  };

  function closeDrawer() {
    drawer.classList.remove('open');
    btn.classList.remove('open');
    body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    var isOpen = drawer.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
    langWrap.classList.remove('open');
  });

  document.querySelectorAll('.mob-sub-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var sub = document.getElementById(this.getAttribute('data-target'));
      this.classList.toggle('open', sub.classList.toggle('open'));
    });
  });

  // Links im Drawer schließen ihn (wichtig für Anker auf derselben Seite)
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (langWrap.classList.toggle('open')) closeDrawer();
  });

  document.querySelectorAll('.mob-lang-opt').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      var lang = this.getAttribute('data-lang');
      langWrap.classList.remove('open');
      if (soon[lang]) setTimeout(function () { alert(soon[lang]); }, 100);
    });
  });

  document.querySelectorAll('.lang-desktop span:not(.active), .pill[data-lang]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang') || this.textContent.trim();
      if (soon[lang]) alert(soon[lang]);
    });
  });

  document.addEventListener('click', function (e) {
    if (!langWrap.contains(e.target)) langWrap.classList.remove('open');
  });
})();

// Animationen
window.addEventListener('load', function () {
  var heroText = document.querySelector('.hero-text');
  var heroImg = document.querySelector('.hero-img');
  if (heroText) setTimeout(function () { heroText.classList.add('anim-in'); }, 10);
  if (heroImg) setTimeout(function () { heroImg.classList.add('anim-in'); }, 80);

  document.querySelectorAll('.team-grid').forEach(function (grid) {
    grid.querySelectorAll('.team-card').forEach(function (card, i) {
      card.classList.add('tc-fade');
      card.style.transitionDelay = (Math.floor(i / 4) * 0.18 + (i % 4) * 0.07) + 's';
    });
  });

  document.querySelectorAll('.rg-item').forEach(function (item, i) {
    item.classList.add('rg-fade');
    item.style.transitionDelay = (i * 0.08) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-up, .tc-fade, .rg-fade').forEach(function (el) { observer.observe(el); });
});
