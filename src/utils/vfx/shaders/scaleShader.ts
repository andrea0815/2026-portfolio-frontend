export const scaleShader = `
precision highp float;

uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;
uniform float hover;

out vec4 outColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;

  float scale = mix(1.0, 1.15, hover);

  vec2 scaledUv = (uv - 0.5) / scale + 0.5;

  vec4 color = texture(src, scaledUv);

  outColor = color;
}
`;