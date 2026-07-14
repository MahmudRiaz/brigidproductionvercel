/* ============================================================================
   Brigid — shared site behaviour
   No dependencies. Progressive enhancement: the site is fully readable
   without JS; this layer adds motion, the mobile menu, and the FAQ accordion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav: shrink / border on scroll ------------------------------------ */
  var nav = document.querySelector('[data-nav]');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  if (nav) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

  /* ---- Mobile menu -------------------------------------------------------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    document.body.style.overflow = '';
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Reveal on scroll --------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- Auto-stagger children of [data-stagger] --------------------------- */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var step = parseInt(group.getAttribute('data-stagger'), 10) || 90;
    Array.prototype.forEach.call(group.children, function (child, i) {
      if (child.classList.contains('reveal') || child.classList.contains('reveal-scale')) {
        child.style.setProperty('--d', (i * step) + 'ms');
      }
    });
  });

  /* ---- Count-up for [data-count] ----------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    var start = null, dur = 1500;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---- FAQ accordion ------------------------------------------------------ */
  document.querySelectorAll('[data-faq]').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('[data-faq].open .faq-a').forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  /* ---- Contact form (demo, no backend) ----------------------------------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.form-success');
      if (success) success.classList.add('show');
      form.querySelectorAll('input, textarea, select, button[type=submit]').forEach(function (el) {
        el.setAttribute('disabled', 'true');
      });
    });
  }

  /* ---- Year in footer ----------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
