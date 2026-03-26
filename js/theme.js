(function() {
  'use strict';

  var THEME_KEY = 'theme';
  var VALID_THEMES = ['dark', 'light'];

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleButton(theme);
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // localStorage may be unavailable in private browsing
    }
  }

  function updateToggleButton(theme) {
    var toggle = document.getElementById('theme-toggle');
    var sunIcon = document.getElementById('theme-icon-dark');
    var moonIcon = document.getElementById('theme-icon-light');
    if (!toggle || !sunIcon || !moonIcon) return;

    if (theme === 'light') {
      sunIcon.style.display = '';
      moonIcon.style.display = 'none';
      toggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = '';
      toggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  function init() {
    var currentTheme = getTheme();
    updateToggleButton(currentTheme);

    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        var newTheme = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        try {
          if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
