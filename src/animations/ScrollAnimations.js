import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(particleSphere) {

  // Particle morph on scroll
  const aboutEl = document.querySelector('#about');
  if (aboutEl) {
    ScrollTrigger.create({
      trigger: aboutEl,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (particleSphere) {
          particleSphere.setScrollProgress(self.progress);
        }
      },
    });
  }

  // Reveal .reveal-up elements
  document.querySelectorAll('.reveal-up').forEach((el) => {
    const delay = parseFloat(el.style.getPropertyValue('--delay')) || 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay });
      },
    });
  });

  // Reveal .reveal-fade elements
  document.querySelectorAll('.reveal-fade').forEach((el) => {
    const delay = parseFloat(el.style.getPropertyValue('--delay')) || 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, duration: 0.9, ease: 'power2.out', delay });
      },
    });
  });

  // Stat counter animation
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    let started = false;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (started) return;
        started = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.floor(obj.val);
          },
        });
      },
    });
  });

  // Services grid stagger
  const servicesGrid = document.querySelector('#services-grid');
  if (servicesGrid) {
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    ScrollTrigger.create({
      trigger: servicesGrid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      },
    });
  }

  // Projects track reveal
  const trackWrap = document.querySelector('#projects-track-wrap');
  if (trackWrap) {
    ScrollTrigger.create({
      trigger: trackWrap,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const cards = trackWrap.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
        );
      },
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

// Horizontal drag scroll for projects
export function initDragScroll() {
  const wrap = document.getElementById('projects-track-wrap');
  if (!wrap) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velocity = 0;
  let lastX = 0;
  let animId = null;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
    lastX = e.pageX;
    cancelAnimationFrame(animId);
    velocity = 0;
    wrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    wrap.style.cursor = 'grab';
    startMomentum();
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1.2;
    velocity = e.pageX - lastX;
    lastX = e.pageX;
    wrap.scrollLeft = scrollLeft - walk;
  });

  function startMomentum() {
    animId = requestAnimationFrame(runMomentum);
  }

  function runMomentum() {
    if (Math.abs(velocity) < 0.5) return;
    wrap.scrollLeft -= velocity;
    velocity *= 0.92;
    animId = requestAnimationFrame(runMomentum);
  }

  // Touch
  let touchStartX = 0;
  let touchScrollLeft = 0;
  wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchScrollLeft = wrap.scrollLeft;
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    const diff = touchStartX - e.touches[0].clientX;
    wrap.scrollLeft = touchScrollLeft + diff;
  }, { passive: true });
}
