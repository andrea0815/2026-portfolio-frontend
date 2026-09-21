import GUI from "lil-gui";
import { crtSettings } from "./crtSettings";

export function createCrtGui() {
    const gui = new GUI({
        title: "CRT Shader",
    });

    const curvature = gui.addFolder("Curvature");

    curvature.add(
        crtSettings,
        "distortionStrength",
        -0.5,
        0.5,
        0.001);

    curvature.add(
        crtSettings,
        "distortionPower",
        -0.5,
        5,
        0.01
    );

    curvature.add(
        crtSettings,
        "baseScale",
        0.5,
        3.0,
        0.001
    );

    const edgeWobble = gui.addFolder("Edge wobble");

    edgeWobble.add(
        crtSettings,
        "edgeWobbleStrength",
        0.0,
        0.01,
        0.0001
    );
    edgeWobble.add(
        crtSettings,
        "edgeWobbleFalloffPower",
        1,
        10,
        0.1
    );
    edgeWobble.add(
        crtSettings,
        "wobbleSpeed",
        1.0,
        50.0,
        1.0
    );

    const screenBreathing = gui.addFolder("Screen breathing");

    screenBreathing.add(
        crtSettings,
        "breathingStrength",
        0.0000,
        0.01,
        0.0001
    );

    const verticalJittering = gui.addFolder("Vertical jittering");

    verticalJittering.add(
        crtSettings,
        "jitterStrength",
        0.0,
        0.001,
        0.0001
    );

    const chromaticAberration = gui.addFolder("Chromatic aberration");

    chromaticAberration.add(
        crtSettings,
        "aberrationStrength",
        0.0,
        0.01,
        0.0001
    );
    chromaticAberration.add(
        crtSettings,
        "aberrationPower",
        0.0,
        10.0,
        0.01
    );

    const scanlines = gui.addFolder("Scan lines");

    scanlines.add(
        crtSettings,
        "scanlineDensity",
        0.0,
        1.0,
        0.001
    );
    scanlines.add(
        crtSettings,
        "scanlineStrength",
        0.0,
        1.0,
        0.001
    );
    scanlines.add(
        crtSettings,
        "scanlineSpeedA",
        0.0,
        80.0,
        1.0
    );
    scanlines.add(
        crtSettings,
        "scanlineSpeedB",
        0.0,
        50.0,
        1.0
    );

    const vignette = gui.addFolder("Vignette");

    vignette.add(
        crtSettings,
        "vignetteStrength",
        0.0,
        5.0,
        0.001
    );
    vignette.add(
        crtSettings,
        "vignettePower",
        0.0,
        10.0,
        0.01
    );


    const phosphor = gui.addFolder("Phosphor");

    phosphor.add(
        crtSettings,
        "phosphorStrength",
        0.0,
        1.0,
        0.001
    );


    const grid = gui.addFolder("Grid");

    grid.add(
        crtSettings,
        "gridSize",
        0.0,
        100.0,
        1.0
    );
    grid.add(
        crtSettings,
        "gridStrength",
        0.0,
        1.0,
        0.001
    );

    const flicker = gui.addFolder("Flicker");

    flicker.add(
        crtSettings,
        "flickerStrength",
        0.0,
        0.01,
        0.0001
    );

    const noise = gui.addFolder("Noise");

    noise.add(
        crtSettings,
        "noiseStrength",
        0.0,
        1.0,
        0.001
    );

    return gui;
}