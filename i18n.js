/**
 * Shared i18n translation system for SEO sniper pages.
 *
 * Usage:
 * 1. Add data-i18n="key" attributes to translatable elements
 * 2. Define window.TRANSLATIONS = { es: { 'key': 'Spanish text', ... } }
 * 3. Include this script after the translations object
 *
 * The toggle button auto-inserts into the first <nav> found,
 * or falls back to fixed-position top-right.
 */
(function () {
  'use strict';
  var STORAGE_KEY = 'snapit-lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';
  var originals = {};

  function saveOriginals() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!originals[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          originals[key] = el.placeholder;
        } else {
          originals[key] = el.innerHTML;
        }
      }
    });
  }

  function applyLang(lang) {
    var strings = lang === 'en' ? originals : (window.TRANSLATIONS && window.TRANSLATIONS[lang]);
    if (!strings) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = strings[key];
        } else {
          el.innerHTML = strings[key];
        }
      }
    });
    document.documentElement.lang = lang;
  }

  function createToggle() {
    var btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.type = 'button';
    updateBtn(btn);

    // Styling
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:6px;padding:6px 12px;' +
      'border:1px solid rgba(255,255,255,0.2);border-radius:6px;background:rgba(255,255,255,0.08);' +
      'color:inherit;font-size:0.8rem;font-weight:600;cursor:pointer;transition:background 0.2s;' +
      'letter-spacing:0.5px;font-family:inherit;white-space:nowrap;';

    // Check if page uses light theme
    var bg = getComputedStyle(document.body).backgroundColor;
    if (bg && isLightColor(bg)) {
      btn.style.border = '1px solid rgba(0,0,0,0.15)';
      btn.style.background = 'rgba(0,0,0,0.05)';
      btn.style.color = '#333';
    }

    btn.addEventListener('mouseover', function () {
      btn.style.background = 'rgba(255,255,255,0.15)';
      if (bg && isLightColor(bg)) btn.style.background = 'rgba(0,0,0,0.1)';
    });
    btn.addEventListener('mouseout', function () {
      btn.style.background = 'rgba(255,255,255,0.08)';
      if (bg && isLightColor(bg)) btn.style.background = 'rgba(0,0,0,0.05)';
    });

    btn.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      localStorage.setItem(STORAGE_KEY, currentLang);
      applyLang(currentLang);
      updateBtn(btn);
    });

    // Try to insert into nav
    var nav = document.querySelector('nav');
    if (nav) {
      var container = nav.querySelector('.nav-links, .nav-right, .nav-actions') || nav;
      btn.style.marginLeft = '12px';
      container.appendChild(btn);
    } else {
      // Fallback: fixed position
      btn.style.position = 'fixed';
      btn.style.top = '12px';
      btn.style.right = '12px';
      btn.style.zIndex = '9999';
      document.body.appendChild(btn);
    }

    return btn;
  }

  function updateBtn(btn) {
    var flag = currentLang === 'en' ? '&#127468;&#127463;' : '&#127466;&#127480;';
    var label = currentLang === 'en' ? 'EN' : 'ES';
    btn.innerHTML = flag + ' ' + label;
  }

  function isLightColor(color) {
    var m = color.match(/\d+/g);
    if (!m || m.length < 3) return false;
    var lum = (parseInt(m[0]) * 299 + parseInt(m[1]) * 587 + parseInt(m[2]) * 114) / 1000;
    return lum > 128;
  }

  // Init on DOM ready
  function init() {
    saveOriginals();
    createToggle();
    if (currentLang !== 'en') {
      applyLang(currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
