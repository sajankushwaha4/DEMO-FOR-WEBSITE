// Navbar functionality
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href').replace('.html', '');
    if (linkHref === currentPath) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

// Close mobile menu when clicking link & set active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
      // Set active class based on current page
      setActiveNavLink();
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Set initial active nav link
  setActiveNavLink();

  // Leader modal functionality
  const leaderModal = document.getElementById('leaderModal');
  const modalClose = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  function showLeaderModal(leaderId) {
    const leaders = {
      ved: {
        name: 'Ved R Tiwari',
        title: 'Founder & CEO',
        bio: 'B-Tech (Mechanical) & MBA-Marketing, 27 Years+ exp, Global Purchasing Head ex SKF, GM, HONDA, Kirloskar',
        image: 'image/Ved.png'
      },
      dinesh: {
        name: 'Dinesh Sinha',
        title: 'Associate Partner (CTO, CMO-USA)',
        bio: '39 Years+ exp, Ex-President & BUH Jindal Saw, TATA. IIT, Metallurgist',
        image: 'image/Dinesh.png'
      },
      flavio: {
        name: 'Flavio Artico',
        title: 'Associate Partner (CMO-Europe)',
        bio: '40 Years+ exp, Ex-Global Purchasing Director SKF Group',
        image: 'image/Flavio.png'
      }
    };

    const leader = leaders[leaderId];
    if (leader) {
      document.getElementById('modalImg').src = leader.image;
      document.getElementById('modalName').textContent = leader.name;
      document.getElementById('modalTitle').textContent = leader.title;
      document.getElementById('modalBio').textContent = leader.bio;
      
      leaderModal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  }

  // Modal close handlers
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  function closeModal() {
    leaderModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  // Parallax effect
  window.addEventListener('scroll', () => {
    const parallaxHeroes = document.querySelectorAll('.parallax-hero');
    parallaxHeroes.forEach(hero => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission (placeholder)
  document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your message has been sent. We will respond within 24 hours.');
      form.reset();
    });
  });

// Hero text stagger for CSR
  if (document.querySelector('.csr-hero')) {
    const h1 = document.querySelector('.csr-hero h1');
    const p = document.querySelector('.csr-hero p');
    const btn = document.querySelector('.csr-hero .btn');
    
    h1.style.animationDelay = '0.2s';
    p.style.animationDelay = '0.5s';
    btn.style.animationDelay = '0.8s';
  }

  // Animate cards/gallery on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.7s ease-out forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .member, .csr-card, .gallery-item').forEach(el => {
    observer.observe(el);
  });

  // Gallery lightbox
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      const src = img.src;
      const lb = document.createElement('div');
      lb.className = 'lightbox active';
      lb.innerHTML = `
        <img src="${src}" alt="${img.alt}">
        <span class="lightbox-close">&times;</span>
      `;
      document.body.appendChild(lb);
      document.body.classList.add('modal-open');
      
      lb.querySelector('.lightbox-close').onclick = () => {
        document.body.removeChild(lb);
        document.body.classList.remove('modal-open');
      };
      
      lb.onclick = (e) => {
        if (e.target === lb) {
          document.body.removeChild(lb);
          document.body.classList.remove('modal-open');
        }
      };
    });
  });

// Enhanced Ken Burns for Home hero video parent
  const homeHeroVideo = document.querySelector('.corporate-hero video');
  if (homeHeroVideo) {
    let time = 0;
    const parent = homeHeroVideo.parentElement;
    function animateHomeKenBurns() {
      time += 0.005;
      const scale = 1.02 + Math.sin(time * 0.5) * 0.06;
      const tx = Math.sin(time * 0.2) * 2 + '%';
      const ty = Math.cos(time * 0.3) * 1.5 + '%';
      parent.style.transform = `scale(${scale}) translate(${tx}, ${ty})`;
      requestAnimationFrame(animateHomeKenBurns);
    }
    animateHomeKenBurns();
  }

// CSR Ken Burns
  const csrHero = document.querySelector('.csr-hero[data-kenburns]');
  if (csrHero) {
    let time = 0;
    function animateKenBurns() {
      time += 0.01;
      const scale = 1.05 + Math.sin(time) * 0.1;
      const tx = Math.sin(time * 0.3) * 5 + '%';
      const ty = Math.cos(time * 0.4) * 3 + '%';
      csrHero.style.transform = `scale(${scale}) translate(${tx}, ${ty})`;
      requestAnimationFrame(animateKenBurns);
    }
    animateKenBurns();
  }
});




