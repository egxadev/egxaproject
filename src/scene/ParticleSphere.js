import * as THREE from 'three';
import vertexShader from './shaders/particle.vert?raw';
import fragmentShader from './shaders/particle.frag?raw';

export class ParticleSphere {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.scrollProgress = 0;
    this._startTime = performance.now();
    this.isActive = true;

    this._initRenderer();
    this._initScene();
    this._initCamera();
    this._initParticles();
    this._addEventListeners();
    this._animate();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
  }

  _initScene() {
    this.scene = new THREE.Scene();
  }

  _initCamera() {
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 100);
    this.camera.position.set(0, 0, 4);
  }

  _initParticles() {
    const COUNT = window.innerWidth < 768 ? 3000 : 6000;
    const RADIUS = 1.5;

    const positions = new Float32Array(COUNT * 3);
    const spherePositions = new Float32Array(COUNT * 3);
    const randomPositions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Sphere position (fibonacci spiral for even distribution)
      const phi = Math.acos(1 - 2 * (i + 0.5) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const sx = RADIUS * Math.sin(phi) * Math.cos(theta);
      const sy = RADIUS * Math.sin(phi) * Math.sin(theta);
      const sz = RADIUS * Math.cos(phi);

      spherePositions[i3] = sx;
      spherePositions[i3 + 1] = sy;
      spherePositions[i3 + 2] = sz;

      positions[i3] = sx;
      positions[i3 + 1] = sy;
      positions[i3 + 2] = sz;

      // Random cloud positions
      randomPositions[i3] = (Math.random() - 0.5) * 6;
      randomPositions[i3 + 1] = (Math.random() - 0.5) * 6;
      randomPositions[i3 + 2] = (Math.random() - 0.5) * 6;

      randoms[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSpherePos', new THREE.BufferAttribute(spherePositions, 3));
    geometry.setAttribute('aRandomPos', new THREE.BufferAttribute(randomPositions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: 0 },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uSize: { value: 80 * this.renderer.getPixelRatio() },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particles = new THREE.Points(geometry, this.material);
    this.scene.add(this.particles);
  }

  _addEventListeners() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 4;
      this.targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 4;
    });

    window.addEventListener('resize', () => this._onResize());
  }

  _onResize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setScrollProgress(v) {
    this.scrollProgress = v;
  }

  _animate() {
    if (!this.isActive) return;
    requestAnimationFrame(() => this._animate());

    const elapsed = (performance.now() - this._startTime) / 1000;

    // Lerp mouse
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uMousePos.value.set(this.mouse.x, this.mouse.y);
    this.material.uniforms.uMouse.value += (1 - this.material.uniforms.uMouse.value) * 0.05;
    this.material.uniforms.uScrollProgress.value += (this.scrollProgress - this.material.uniforms.uScrollProgress.value) * 0.05;

    // Slow auto-rotation
    this.particles.rotation.y = elapsed * 0.05;
    this.particles.rotation.x = Math.sin(elapsed * 0.03) * 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.isActive = false;
    this.renderer.dispose();
  }
}
