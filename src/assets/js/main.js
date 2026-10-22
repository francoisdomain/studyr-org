// studyR — navigation behaviour (mobile menu + keyboard/touch-friendly submenus)
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  var toggle = nav.querySelector('.nav__toggle');
  var openIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
  var closeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2" fill="none"/></svg>';

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = open ? closeIcon : openIcon;
  }

  if (toggle) {
    toggle.innerHTML = openIcon;
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
  }

  // Desktop dropdowns: click/tap toggles, Escape closes.
  var parents = nav.querySelectorAll('.nav__parent');
  parents.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.nav__item');
      var open = !item.classList.contains('is-open');
      nav.querySelectorAll('.nav__item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.nav__parent').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('.nav__item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.nav__parent').setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav.classList.contains('is-open')) setMenu(false);
    nav.querySelectorAll('.nav__item.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
  });
})();

// Point "Order on Amazon" buttons at the visitor's local Amazon store,
// guessed from the browser's language settings (e.g. en-GB → amazon.co.uk).
// Without JavaScript, or for unknown regions, the link stays on amazon.com.
(function () {
  var buttons = document.querySelectorAll('[data-local-store]');
  if (!buttons.length) return;

  var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  var region = null;
  for (var i = 0; i < langs.length && !region; i++) {
    var parts = String(langs[i]).split('-');
    if (parts[1] && parts[1].length === 2) region = parts[1].toUpperCase();
  }
  if (!region) {
    var byLang = { ja: 'JP', de: 'DE', fr: 'FR', it: 'IT', es: 'ES', nl: 'NL', sv: 'SE', pt: 'BR' };
    region = byLang[String(langs[0]).slice(0, 2).toLowerCase()] || null;
  }
  if (!region) return;

  buttons.forEach(function (btn) {
    var stores;
    try { stores = JSON.parse(btn.getAttribute('data-stores')); } catch (e) { return; }
    var store = stores.filter(function (s) { return s.regions.indexOf(region) !== -1; })[0];
    if (!store || store.domain === 'amazon.com') return;
    btn.href = 'https://www.' + store.domain + '/dp/' + btn.getAttribute('data-asin');
    var note = btn.closest('section') && btn.closest('section').querySelector('[data-local-store-note]');
    if (note) {
      note.textContent = 'Taking you to ' + store.label + '. Not right? Pick another store below.';
      note.hidden = false;
    }
  });
})();
