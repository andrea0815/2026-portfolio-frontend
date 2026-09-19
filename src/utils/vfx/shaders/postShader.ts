export const postShader = `
precision highp float;

uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;
uniform float time;

out vec4 outColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;

  vec4 color = texture(src, uv);

  // Add a blue tint
  vec3 blueTint = vec3(0.15, 0.35, 1.0);

  // Mix original color with blue
  color.rgb = mix(color.rgb, blueTint, 0.15);

  outColor = color;
}
`;