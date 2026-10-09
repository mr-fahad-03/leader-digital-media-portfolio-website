/* Leader Digital Media — site scripts */
(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth <= 900) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  /* ---- Sticky header shadow + back-to-top ---- */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');

  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Scroll reveal ---- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1400;

        function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target % 1 ? val.toFixed(1) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Accordions ---- */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';

      var group = btn.closest('[data-acc-group]');
      if (group && !open) {
        group.querySelectorAll('.acc-btn[aria-expanded="true"]').forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
          var op = document.getElementById(other.getAttribute('aria-controls'));
          if (op) op.style.maxHeight = null;
        });
      }

      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
    });
  });

  window.addEventListener('resize', function () {
    document.querySelectorAll('.acc-btn[aria-expanded="true"]').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

  /* ---- Contact form validation ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var card = form.closest('.form-card') || document;
    var alertBox = card.querySelector('.form-alert');
    var emailRx = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

    function setError(field, on) {
      field.classList.toggle('has-error', on);
    }

    function validate(input) {
      var field = input.closest('.field');
      if (!field) return true;
      var value = input.value.trim();
      var ok = true;

      if (input.hasAttribute('required') && !value) ok = false;
      else if (input.type === 'email' && value && !emailRx.test(value)) ok = false;
      else if (input.name === 'phone' && value && value.replace(/[^\d]/g, '').length < 7) ok = false;
      else if (input.tagName === 'TEXTAREA' && value && value.length < 10) ok = false;

      setError(field, !ok);
      return ok;
    }

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('has-error')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstBad = null;

      form.querySelectorAll('input, select, textarea').forEach(function (input) {
        if (!validate(input)) {
          valid = false;
          if (!firstBad) firstBad = input;
        }
      });

      if (!valid) {
        if (firstBad) firstBad.focus();
        return;
      }

      if (alertBox) {
        alertBox.classList.add('show');
        alertBox.setAttribute('role', 'status');
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    });
  }

  /* ---- Current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
