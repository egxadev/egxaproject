export function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!cursor) return;

  // Only show custom cursor on pointer devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    ring.style.transform = `translate(${ringX - mouseX}px, ${ringY - mouseY}px)`;

    rafId = requestAnimationFrame(animate);
  };
  animate();

  // Hoverable elements
  const hoverables = document.querySelectorAll('a, button, [data-magnetic], .service-card, .project-card');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));

  return () => cancelAnimationFrame(rafId);
}
