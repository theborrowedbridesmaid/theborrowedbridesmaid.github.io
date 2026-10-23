/* The Borrowed Bridesmaid: mobile menu + sticky inquiry button */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      toggle.textContent = open ? '\u2715' : '\u2630';
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 900px)');
      var onWide = function (e) { if (e.matches) setOpen(false); };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
    }
  }

  var bar = document.querySelector('.mobile-cta');
  if (bar && 'IntersectionObserver' in window) {
    var visible = [];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var i = visible.indexOf(e.target);
        if (e.isIntersecting && i < 0) visible.push(e.target);
        if (!e.isIntersecting && i > -1) visible.splice(i, 1);
      });
      bar.classList.toggle('is-hidden', visible.length > 0);
    }, { rootMargin: '0px 0px 100px 0px' });
    document.querySelectorAll('[data-hide-cta]').forEach(function (el) { io.observe(el); });
  }
})();
