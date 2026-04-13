(function() {
  'use strict';
  
  let hamburger;
  let navLinks;
  
  function initMenu() {
    hamburger = document.querySelector('.hamburger');
    navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.onclick = toggleMenu;
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.onclick = closeMenu;
    });
    
    document.onclick = function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        closeMenu();
      }
    };
  }
  
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
  
  // Re-init after navbar load
  window.navbarLoaded = initMenu;
  
  // Initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
  
  window.addEventListener('load', initMenu);
})();
