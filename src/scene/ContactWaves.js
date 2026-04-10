import * as THREE from 'three';

export class ContactWaves {
  constructor(canvas) {
    this.canvas = canvas;
    this._startTime = performance.now();
    this.isActive = true;
    this._init();
    this._animate();
  }

  _init() {
    const w = this.canvas.clientWidth || 800;
    const h = this.canvas.clientHeight || 400;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 1;

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(w, h) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5, 0.5);
          float dist = length(uv - center);

          float wave1 = sin(dist * 20.0 - uTime * 1.5) * 0.5 + 0.5;
          float wave2 = sin(dist * 14.0 - uTime * 1.0 + 1.0) * 0.5 + 0.5;
          float wave3 = sin(dist * 8.0 - uTime * 0.7 + 2.0) * 0.5 + 0.5;

          float waves = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2);
          float falloff = smoothstep(0.8, 0.1, dist);

          vec3 violet = vec3(0.54, 0.36, 0.98);
          vec3 cyan = vec3(0.02, 0.71, 0.83);
          vec3 color = mix(violet, cyan, uv.x + sin(uTime * 0.5) * 0.2);

          float alpha = waves * falloff * 0.15;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.scene.add(this.mesh);

    window.addEventListener('resize', () => {
      const nw = this.canvas.clientWidth;
      const nh = this.canvas.clientHeight;
      this.renderer.setSize(nw, nh);
      mat.uniforms.uResolution.value.set(nw, nh);
    });
  }

  _animate() {
    if (!this.isActive) return;
    requestAnimationFrame(() => this._animate());
    this.mesh.material.uniforms.uTime.value = (performance.now() - this._startTime) / 1000;
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.isActive = false;
    this.renderer.dispose();
  }
}
