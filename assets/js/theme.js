// Dark mode toggle functionality
(function() {
  'use strict';

  // No need to update icon - CSS handles the transition

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Add click handler to toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  }
})();
