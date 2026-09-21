export const postShader = `
precision highp float;

uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;
uniform float time;

out vec4 outColor;

float random(vec3 p) {
    return fract(
        sin(
            dot(
                p,
                vec3(12.9898, 78.233, 37.719)
            )
        ) * 43758.5453
    );
}

vec2 scaleAroundCenter(vec2 uv, float scale) {
    return (uv - 0.5) * scale + 0.5;
}

vec4 sampleWithSoftEdges(vec2 sampleUv, vec2 screenUv) {
    vec4 color = texture(src, sampleUv);

    // Stable mask: always based on original screen position
    float maskX = smoothstep(
        0.5,
        0.45,
        abs(screenUv.x - 0.5)
    );

    float maskY = smoothstep(
        0.5,
        0.45,
        abs(screenUv.y - 0.5)
    );

    float edgeMask = maskX * maskY;

    color.a *= edgeMask;

    return color;
}

void main() {

    // ––––––––––––––––––––––––
    // TWEAKS

    // CRT curvature
    float distortionStrength = 0.05;
    float distortionPower = 3.0;
    float baseScale = 0.9;

    // Edge wobble
    float edgeWobbleStrength = 0.002;
    float edgeWobbleFalloffPower = 2.0;
    float wobbleStrength = 0.01;
    float wobbleSpeed = 8.0;

    // Screen breathing
    float breathingStrength = 0.0007;
    
    // Vertical jittering
    float jitterStrength = 0.0003;

    // Chromatic aberration
    float aberrationStrength = 0.001;
    float aberrationPower = 3.0;

    // Vignette
    float vignetteStrength = 0.1;
    float vignettePower = 4.0;

    // Scanlines
    float scanlineDensity = 0.5;
    float scanlineStrength = 0.08;
    float scanlineSpeedA = 10.0;
    float scanlineSpeedB = 35.0;

    // Phosphor
    float phosphorStrength = 0.08;

    // Grid
    float gridSize = 50.0;
    float gridStrength = 0.05;

    // Flicker
    float flickerStrength = 0.015;

    // Noise
    float noiseStrength = 0.04;

    // Glitch
    float glitchSpeed = 2.0;
    float glitchThreshold = 0.96;
    float tearStrength = 0.001;
    float glitchBands = 30.0;

    // MAIN SETUP
    // ––––––––––––––––––––––––

    // clean screen coordinates
    vec2 screenUv = (gl_FragCoord.xy - offset) / resolution;
    // distorted sampling coordinates
    vec2 sampleUv = screenUv;

    // define radial distance
    vec2 centered = screenUv * 2.0 - 1.0;
    centered.x *= resolution.x / resolution.y;

    float radialDist = length(centered);

    // ––––––––––––––––––––––––
    // CREATE CTR CURVE EFFECT

    // create curvature based on distance from center
    float distortion = pow(radialDist, distortionPower) * distortionStrength;
    // scale uv
    float scale = baseScale + distortion;

    // performs warp
    sampleUv = scaleAroundCenter(sampleUv, scale);

    // ––––––––––––––––––––
    // RADIAL SMEAR
    
    // create angle
    float angle = atan(centered.y, centered.x);
    
    // get random Angle
    float wobbleTick = floor(time * wobbleSpeed);
    float angleRand = random(vec3(angle, wobbleTick, 0.0));
    angleRand = angleRand * 2.0 - 1.0;

    float edgeFalloff = pow(radialDist, edgeWobbleFalloffPower);
    float edgeWobble = angleRand * edgeFalloff * edgeWobbleStrength;

    sampleUv = scaleAroundCenter(
        sampleUv,
        1.0 + edgeWobble
    );

    // ––––––––––––––––––––
    // SCREEN BREATHING

    float breathing =
    sin(time * 1.5) * breathingStrength;

    sampleUv = scaleAroundCenter(
        sampleUv,
        1.0 + breathing
    );

    // ––––––––––––––––––––
    // HORIZONTAL TEAR

    float glitchTick = floor(time * 2.0);

    float glitchRoll = random(vec3(glitchTick, 0.0, 0.0));  

    float glitchActive = step(0.96, glitchRoll);

    float band = floor(screenUv.y * 30.0);

    float bandRand =
    random(
        vec3(
            band,
            glitchTick,
            1.0
        )
    );

    bandRand = bandRand * 2.0 - 1.0;

    sampleUv.x +=
        bandRand *
        tearStrength *
        glitchActive;


    // ––––––––––––––––––––
    // VERTICAL JITTER


    float jitterTick =
    floor(time * 12.0);

    float jitterRand =
        random(
            vec3(
                jitterTick,
                9.0,
                2.0
            )
        );

    jitterRand = jitterRand * 2.0 - 1.0;

    sampleUv.y += jitterRand * jitterStrength;

    // ––––––––––––––––––––
    // CHROMATIC ABERRATION

    // Define Aberration Strength based on distance to center
    float aberrationAmount = pow(radialDist, aberrationPower) * aberrationStrength;

    vec2 uvR = sampleUv;
    vec2 uvG = sampleUv;
    vec2 uvB = sampleUv;

    // Apply to R Channel
    uvR.x += aberrationAmount;
    uvR.y += aberrationAmount;

    // Apply to B Channel
    uvB.x -= aberrationAmount;
    uvB.y -= aberrationAmount;

    // Apply soft edges to each channel
    vec4 colR = sampleWithSoftEdges(uvR, screenUv);
    vec4 colG = sampleWithSoftEdges(uvG, screenUv);
    vec4 colB = sampleWithSoftEdges(uvB, screenUv);

    float alpha = (colR.a + colG.a + colB.a) / 3.0;

    outColor = vec4(
        colR.r,
        colG.g,
        colB.b,
        alpha
    );

    // ––––––––––––––––––––
    // SCAN LINES

     // create lines
    float scanA = sin(
        screenUv.y *
        resolution.y *
        scanlineDensity +
        time * scanlineSpeedA
    );

    float scanB = sin(
        screenUv.y *
        resolution.y *
        scanlineDensity * 0.73 -
        time * scanlineSpeedB
    );

    // Combine lines and remap it
    float scanPattern = scanA * scanB;
    scanPattern = scanPattern * 0.5 + 0.5;

    // Make a mask out of lines
    float scanlineMask = 1.0 - scanPattern * scanlineStrength;

    outColor.rgb *= scanlineMask;

    // ––––––––––––––––––––
    // VIGNETTE

    float vignette = 1.0 - pow(radialDist, vignettePower) * vignetteStrength;
    vignette = clamp(vignette, 0.0, 1.0);

    outColor.rgb *= vignette;

    // ––––––––––––––––––––
    // GRID

    float gridX = fract(screenUv.x * gridSize);
    float gridY = fract(screenUv.y * gridSize);

    float gridLine = smoothstep(
        0.04,
        0.0,
        min(gridX, gridY)
    );

    outColor.rgb += gridLine * gridStrength;

    // ––––––––––––––––––––––––
    // RGB PHOSPHOR STRIPES

    float phosphorIndex = mod(floor(gl_FragCoord.x), 3.0);

    float rMask = 1.0 - step(0.5, abs(phosphorIndex - 0.0));
    float gMask = 1.0 - step(0.5, abs(phosphorIndex - 1.0));
    float bMask = 1.0 - step(0.5, abs(phosphorIndex - 2.0));

    vec3 phosphorMask = vec3(rMask, gMask, bMask);

    outColor.rgb *= mix(
    vec3(1.0),
    0.85 + phosphorMask * 0.15,
    phosphorStrength
    );

    // ––––––––––––––––––––
    // FLICKER

    float flickerNoise =
        random(
            vec3(
                floor(time * 20.0),
                4.0,
                7.0
            )
        );

    flickerNoise = flickerNoise * 2.0 - 1.0;
    float flicker = flickerNoise * flickerStrength;

    outColor.rgb *= 1.0 + flicker;

    // ––––––––––––––––––––
    // NOISE

    float noise = random(
        vec3(screenUv, time)
    );
    noise = noise * 2.0 - 1.0;

    outColor.rgb += noise * noiseStrength;

    // ––––––––––––––––––––
    // FINALLY

    outColor.rgb =
    clamp(outColor.rgb, 0.0, 1.0);
}
`;