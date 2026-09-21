import { useEffect, type ReactNode } from "react";
import { VFX } from "@vfx-js/core";

type VFXSceneProps = {
  children: ReactNode;
};

import { passthroughShader } from './shaders/passThroughShader'
import { postShader } from './shaders/postShader'

export function VFXScene({ children }: VFXSceneProps) {
  useEffect(() => {
    let cancelled = false;
    let vfx: VFX | null = null;

    const registered = new Set<HTMLElement>();
    const waitingImages = new Set<HTMLImageElement>();
    const waitingVideos = new Set<HTMLVideoElement>();

    function addToVFX(element: HTMLElement) {
      if (!vfx) return;
      if (registered.has(element)) return;

      vfx.add(element, {
        shader: passthroughShader,
      });

      registered.add(element);
    }

    function registerElement(element: HTMLElement) {
      // Images
      if (element instanceof HTMLImageElement) {
        if (element.complete && element.naturalWidth > 0) {
          addToVFX(element);
          return;
        }

        if (waitingImages.has(element)) {
          return;
        }

        waitingImages.add(element);

        element.addEventListener(
          "load",
          () => {
            waitingImages.delete(element);

            if (cancelled) return;

            addToVFX(element);
          },
          { once: true },
        );

        return;
      }

      // Videos
      if (element instanceof HTMLVideoElement) {
        const hasMetadata =
          element.readyState >= HTMLMediaElement.HAVE_METADATA;

        const hasDimensions =
          element.videoWidth > 0 &&
          element.videoHeight > 0;

        if (hasMetadata && hasDimensions) {
          addToVFX(element);
          return;
        }

        if (waitingVideos.has(element)) {
          return;
        }

        waitingVideos.add(element);

        element.addEventListener(
          "loadedmetadata",
          () => {
            waitingVideos.delete(element);

            if (cancelled) return;

            if (
              element.videoWidth <= 0 ||
              element.videoHeight <= 0
            ) {
              return;
            }

            addToVFX(element);
          },
          { once: true },
        );

        return;
      }

      // Text / normal DOM elements
      addToVFX(element);
    }

    function registerTree(node: Node) {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      /**
       * The added node itself might have data-vfx.
       */
      if (node.matches("[data-vfx]")) {
        registerElement(node);
      }

      /**
       * Or it might contain data-vfx descendants.
       *
       * Example:
       *
       * <div>
       *   <h2 data-vfx />
       *   <img data-vfx />
       * </div>
       */
      const descendants =
        node.querySelectorAll<HTMLElement>("[data-vfx]");

      descendants.forEach(registerElement);
    }

    async function setup() {
      /**
       * Especially important because you're using custom fonts.
       */
      await document.fonts.ready;

      /**
       * Let React finish the current layout.
       */
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (cancelled) return;

      vfx = new VFX({
        scrollPadding: false,
        postEffect: {
          shader: postShader,
        },
      });

      /**
       * Register anything that's already on the page.
       */
      document
        .querySelectorAll<HTMLElement>("[data-vfx]")
        .forEach(registerElement);

      /**
       * Watch for async React content.
       *
       * This covers your:
       *
       * fetch()
       * → setProjects()
       * → React creates new DOM
       */
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          registerTree(node);
        }
      }
    });

    setup();

    return () => {
      cancelled = true;

      observer.disconnect();

      if (vfx) {
        for (const element of registered) {
          vfx.remove(element);
        }
      }

      registered.clear();
      waitingImages.clear();
      waitingVideos.clear();
    };
  }, []);

  return children;
}