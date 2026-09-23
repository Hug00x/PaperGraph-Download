import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
} from "animejs";
import { motion } from "./animationConfig";
import { installPointer } from "./pointer";

export function useMotion(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!root.current) return;
    const element = root.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 601px)",
    );
    const mobile = matchMedia("(max-width: 600px)");
    let dispose = () => {};
    let entered = false;
    function setup() {
      dispose();
      if (reduced.matches) {
        dispose = () => {};
        return;
      }
      const scope = createScope({ root: element }).add(() => {
        if (!entered && window.scrollY < 100) {
          createTimeline({
            defaults: { ease: motion.ease, duration: motion.duration.normal },
          })
            .add(".navbar", { opacity: [0, 1], y: [-12, 0] }, 0)
            .add(
              ".network-node",
              { opacity: [0, 1], scale: [0.8, 1], delay: stagger(50) },
              100,
            )
            .add(
              ".title-line",
              {
                y: ["110%", "0%"],
                opacity: [0.3, 1],
                delay: stagger(motion.stagger),
              },
              180,
            )
            .add(
              ".hero-intro, .hero-description",
              { opacity: [0, 1], y: [12, 0], delay: stagger(60) },
              420,
            )
            .add(".hero-action", { opacity: [0.5, 1], y: [12, 0] }, 600)
            .add(".hero-bottom", { opacity: [0, 1] }, 760);
          entered = true;
        }
        const heroTimeline = createTimeline({
          defaults: { ease: "linear" },
          autoplay: onScroll({
            target: ".hero-track",
            enter: "top top",
            leave: "bottom bottom",
            sync: true,
          }),
        })
          .add(
            ".hero-content",
            { y: [0, -70], opacity: [1, 0], duration: 500 },
            0,
          )
          .add(".hero-bottom", { opacity: [1, 0], duration: 180 }, 0)
          .add(".node-label", { opacity: [1, 0], duration: 220 }, 120)
          .add(".hero-network > svg", { opacity: [0.45, 0], duration: 350 }, 0)
          .add(".hero-resolution", { opacity: [0, 1], duration: 100 }, 600)
          .add(".logo-node", { opacity: [0, 1], duration: 100 }, 600)
          .add(".logo-links", { strokeDashoffset: [1, 0], duration: 280 }, 760)
          .add(".logo-paper", { strokeDashoffset: [1, 0], duration: 300 }, 1120)
          .add(".hero-resolution", { scale: [1, .72], y: [0, 70], opacity: [1, 0], duration: 220 }, 1620);
        // Read positions once per setup/resize; scroll only interpolates transforms.
        const anchors = [0, 3, 0, 1, 2, 4, 4];
        const nodes = [...element.querySelectorAll<HTMLElement>(".technical-scroll")];
        const destinations = nodes.map((node, index) => {
          const from = node.getBoundingClientRect();
          const to = element.querySelector<SVGCircleElement>(`[data-logo-anchor="${anchors[index]}"]`)!.getBoundingClientRect();
          return { node, x: to.x + to.width / 2 - from.x - from.width / 2,
            y: to.y + to.height / 2 - from.y - from.height / 2,
            scale: from.width ? to.width / from.width : 1 };
        });
        destinations.forEach(({ node, x, y, scale }) => {
          heroTimeline.add(node, { x: [0, x], y: [0, y], scale: [1, scale], duration: 540, ease: "inOut(2)" }, 60)
            .add(node, { opacity: [1, 0], duration: 100 }, 600);
        });
        animate(".rail-fill", {
          scaleX: [0, 1],
          ease: "linear",
          autoplay: onScroll({
            target: ".workflow",
            enter: "bottom bottom",
            leave: "center top",
            sync: true,
          }),
        });
        const story = createTimeline({
          defaults: { ease: "linear" },
          autoplay: onScroll({
            target: ".product-track",
            enter: "top top",
            leave: "bottom bottom",
            sync: true,
          }),
        });
        story
          .add(".workspace", { scale: [0.96, 1], duration: 200 }, 0)
          .add(
            ".paper-document",
            { rotate: [-4, 0], y: [12, 0], duration: 230 },
            0,
          )
          .add(
            ".tex-content, .tex-tab",
            { opacity: [1, 0], duration: 160 },
            230,
          )
          .add(
            ".pdf-content, .pdf-tab",
            { opacity: [0, 1], duration: 200 },
            270,
          )
          .add(
            ".paper-document",
            { scale: [1, mobile.matches ? 0.44 : 0.7], duration: 300 },
            480,
          )
          .add(".research-edges", { opacity: [0, 0.65], duration: 180 }, 530)
          .add(
            ".research-edges path",
            { strokeDashoffset: [1, 0], duration: 300 },
            530,
          )
          .add(
            ".research-node",
            {
              opacity: [0, 1],
              scale: [0.65, 1],
              duration: 230,
              delay: stagger(40),
            },
            550,
          )
          .add(
            ".step-tex",
            { color: ["#8ee7ff", "#9badc3"], duration: 180 },
            240,
          )
          .add(
            ".step-pdf",
            { color: ["#9badc3", "#8ee7ff"], duration: 150 },
            280,
          )
          .add(
            ".step-pdf",
            { color: ["#8ee7ff", "#9badc3"], duration: 150 },
            560,
          )
          .add(
            ".step-map",
            { color: ["#9badc3", "#8ee7ff"], duration: 180 },
            600,
          )
          .add(".sync-status", { opacity: [0.5, 1], duration: 200 }, 800);
      });
      const removePointer = fine.matches ? installPointer(element) : () => {};
      dispose = () => {
        removePointer();
        scope.revert();
      };
    }
    let resizeFrame = 0;
    const resize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(setup); };
    window.addEventListener("resize", resize, { passive: true });
    setup();
    reduced.addEventListener("change", setup);
    fine.addEventListener("change", setup);
    mobile.addEventListener("change", setup);
    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", resize);
      dispose();
      reduced.removeEventListener("change", setup);
      fine.removeEventListener("change", setup);
      mobile.removeEventListener("change", setup);
    };
  }, [root]);
}
