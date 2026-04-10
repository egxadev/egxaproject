import { gsap } from 'gsap';

export function initMagneticButtons() {
  const buttons = document.querySelectorAll('[data-magnetic]');

  buttons.forEach((btn) => {
    const strength = 0.4;
    const ease = 0.1;

    let rect = btn.getBoundingClientRect();
    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let rafId = null;
    let isHovered = false;

    const update = () => {
      if (!isHovered) return;
      cx += (mx - cx) * ease;
      cy += (my - cy) * ease;
      gsap.set(btn, { x: cx, y: cy });
      rafId = requestAnimationFrame(update);
    };

    btn.addEventListener('mouseenter', () => {
      isHovered = true;
      rect = btn.getBoundingClientRect();
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mousemove', (e) => {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mx = (e.clientX - centerX) * strength;
      my = (e.clientY - centerY) * strength;
    });

    btn.addEventListener('mouseleave', () => {
      isHovered = false;
      cancelAnimationFrame(rafId);
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      mx = 0; my = 0; cx = 0; cy = 0;
    });
  });
}
