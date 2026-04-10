varying float vAlpha;
varying vec3 vColor;

void main() {
  // Circular particle shape with soft edge
  vec2 coord = gl_PointCoord - 0.5;
  float dist = length(coord);
  if (dist > 0.5) discard;

  // Soft glow falloff
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  alpha = pow(alpha, 1.5);

  // Inner bright core
  float core = 1.0 - smoothstep(0.0, 0.15, dist);
  vec3 color = mix(vColor, vec3(1.0), core * 0.7);

  gl_FragColor = vec4(color, alpha * vAlpha);
}
