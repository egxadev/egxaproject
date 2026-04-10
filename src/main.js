import './style.css';
import { ParticleSphere } from './scene/ParticleSphere.js';
import { ContactWaves } from './scene/ContactWaves.js';
import { initScrollAnimations, initDragScroll } from './animations/ScrollAnimations.js';
import { initMagneticButtons } from './animations/MagneticButton.js';
import { initCustomCursor } from './animations/Cursor.js';
import { initTiltCards } from './animations/TiltCards.js';

let particleSphere = null;
let contactWaves = null;

function initLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loader-bar');
    const pct = document.getElementById('loader-pct');

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('is-hidden');
          document.body.classList.remove('is-loading');
          resolve();
        }, 400);
      }
      bar.style.width = `${progress}%`;
      pct.textContent = `${Math.floor(progress)}%`;
    }, 80);
  });
}

function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  particleSphere = new ParticleSphere(canvas);
}

function initContactBackground() {
  const canvas = document.getElementById('contact-canvas');
  if (!canvas) return;
  contactWaves = new ContactWaves(canvas);
}

function animateHeroIn() {
  const eyebrow = document.getElementById('hero-eyebrow');
  const line1 = document.getElementById('hero-line1');
  const line2 = document.getElementById('hero-line2');
  const line3 = document.getElementById('hero-line3');
  const sub = document.getElementById('hero-sub');
  const actions = document.getElementById('hero-actions');

  setTimeout(() => eyebrow?.classList.add('animate'), 100);
  setTimeout(() => line1?.classList.add('animate'), 300);
  setTimeout(() => line2?.classList.add('animate'), 450);
  setTimeout(() => line3?.classList.add('animate'), 600);
  setTimeout(() => sub?.classList.add('animate'), 750);
  setTimeout(() => actions?.classList.add('animate'), 900);
}

function initMobileNav() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-link');

  if (!burger || !menu) return;

  const toggle = () => {
    const isOpen = menu.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const close = () => {
    menu.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', toggle);
  links.forEach((link) => link.addEventListener('click', close));
}

async function init() {
  document.body.classList.add('is-loading');

  // Start Three.js scenes immediately (background loading)
  initHeroParticles();
  initContactBackground();

  // Run loader
  await initLoader();

  // Hero entrance
  animateHeroIn();

  // Initialize all interactions
  initScrollAnimations(particleSphere);
  initDragScroll();
  initMagneticButtons();
  initCustomCursor();
  initTiltCards();
  initMobileNav();
}

init();
