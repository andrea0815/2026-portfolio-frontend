import { crtSettings } from "./crtSettings";

export const shaderUniforms = {
    distortionStrength: () =>
        crtSettings.distortionStrength,

    distortionPower: () =>
        crtSettings.distortionPower,

    baseScale: () =>
        crtSettings.baseScale,

    edgeWobbleStrength: () =>
        crtSettings.edgeWobbleStrength,

    edgeWobbleFalloffPower: () =>
        crtSettings.edgeWobbleFalloffPower,

    wobbleSpeed: () =>
        crtSettings.wobbleSpeed,

    breathingStrength: () =>
        crtSettings.breathingStrength,

    aberrationStrength: () =>
        crtSettings.aberrationStrength,

    aberrationPower: () =>
        crtSettings.aberrationPower,

    vignetteStrength: () =>
        crtSettings.vignetteStrength,

    vignettePower: () =>
        crtSettings.vignettePower,

    scanlineDensity: () =>
        crtSettings.scanlineDensity,

    scanlineStrength: () =>
        crtSettings.scanlineStrength,

    scanlineSpeedA: () =>
        crtSettings.scanlineSpeedA,

    scanlineSpeedB: () =>
        crtSettings.scanlineSpeedB,

    phosphorStrength: () =>
        crtSettings.phosphorStrength,

    gridSize: () =>
        crtSettings.gridSize,

    gridStrength: () =>
        crtSettings.gridStrength,

    noiseStrength: () =>
        crtSettings.noiseStrength,

    glitchSpeed: () =>
        crtSettings.glitchSpeed,

    glitchThreshold: () =>
        crtSettings.glitchThreshold,

    tearStrength: () =>
        crtSettings.tearStrength,

    glitchBands: () =>
        crtSettings.glitchBands,

    jitterStrength: () =>
        crtSettings.jitterStrength,

    flickerStrength: () =>
        crtSettings.flickerStrength,
};