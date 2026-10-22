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
