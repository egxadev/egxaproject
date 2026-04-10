uniform float uTime;
uniform float uMouse;
uniform vec2 uMousePos;
uniform float uSize;
uniform float uScrollProgress;

attribute float aRandom;
attribute vec3 aSpherePos;
attribute vec3 aRandomPos;

varying float vAlpha;
varying vec3 vColor;

void main() {
  float t = uScrollProgress;

  // Morph between sphere and random positions based on scroll
  vec3 morphPos = mix(aSpherePos, aRandomPos, t * 0.3);

  // Mouse distortion
  vec2 diff = uMousePos - morphPos.xy;
  float dist = length(diff);
  float strength = smoothstep(2.0, 0.0, dist);
  morphPos.xy += normalize(-diff) * strength * 0.4 * uMouse;

  // Rotation
  float angle = uTime * 0.15 + aRandom * 6.28;
  float rSize = 0.008;
  morphPos.x += sin(angle) * rSize;
  morphPos.y += cos(angle * 0.7) * rSize;
  morphPos.z += sin(angle * 0.5) * rSize;

  // Wave
  float wave = sin(uTime * 0.5 + aSpherePos.x * 2.0 + aSpherePos.y) * 0.06;
  morphPos += normalize(aSpherePos) * wave;

  vec4 mvPosition = modelViewMatrix * vec4(morphPos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size based on depth
  float depth = (-mvPosition.z);
  gl_PointSize = uSize * (1.0 / depth) * (0.5 + aRandom * 0.5);

  // Alpha
  vAlpha = 0.4 + aRandom * 0.6;

  // Color gradient from violet to cyan based on position
  float colorT = (normalize(aSpherePos).y * 0.5 + 0.5);
  vColor = mix(vec3(0.54, 0.36, 0.98), vec3(0.02, 0.71, 0.83), colorT);
}
