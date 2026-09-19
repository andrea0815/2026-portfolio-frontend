export const passthroughShader = `
precision highp float;

uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;

out vec4 outColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  outColor = texture(src, uv);
}
`;