'use strict';

const THEME_KEY = 'claudio-theme'; 
                                    

const DARK  = 'dark';
const LIGHT = 'light';

function $(selector, scope = document) {
  const el = scope.querySelector(selector);
  if (!el) throw new Error(`Element not found: "${selector}"`);
  return el;
}

function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function initTabs() {
  const tabButtons = $$('.tab-btn');
  const tabPanels  = $$('.tab-panel');
  const footer = document.querySelector('.site-footer');

  if (tabButtons.length === 0) return;

  function activateTab(clickedBtn) {
    const targetId = 'panel-' + clickedBtn.dataset.tab;

    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });

    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.focus({ preventScroll: true });
    }

    if (footer) {
      if (clickedBtn.dataset.tab === 'blue-dot') {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn));
  });

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', (event) => {
      let newIndex = null;

      if (event.key === 'ArrowRight') {
        newIndex = (index + 1) % tabButtons.length;
      } else if (event.key === 'ArrowLeft') {
        newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      if (newIndex !== null) {
        event.preventDefault();
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      }
    });
  });

  const activeButton = tabButtons.find(btn => btn.classList.contains('active'));
  if (activeButton && footer) {
    if (activeButton.dataset.tab === 'blue-dot') {
      footer.classList.add('visible');
    }
  }
}

function initTheme() {
  const htmlEl   = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  if (!toggleBtn) return;

  
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    toggleBtn.setAttribute('aria-pressed', theme === DARK ? 'true' : 'false');
    

    
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      
      console.warn('Theme preference could not be saved:', e.message);
    }
  }

  
  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === DARK || saved === LIGHT) return saved; 
    } catch (e) {
      
    }

    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK : LIGHT;
  }

  
  applyTheme(getInitialTheme());

  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const nextTheme = currentTheme === DARK ? LIGHT : DARK;
    applyTheme(nextTheme);
  });

  
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    
    try {
      const hasSavedPreference = localStorage.getItem(THEME_KEY) !== null;
      if (!hasSavedPreference) {
        applyTheme(event.matches ? DARK : LIGHT);
      }
    } catch (e) {
      
    }
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTheme();
  initFooterYear();
});