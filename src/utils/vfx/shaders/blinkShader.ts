export const blinkShader = `
precision highp float;

uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;
uniform float time;

out vec4 outColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;

  vec4 tex = texture(src, uv);

  float blink = step(0.5, fract(time));

  outColor = vec4(
    tex.r * blink,
    tex.g * blink,
    tex.b * blink,
    tex.a * blink
  );
}
`;