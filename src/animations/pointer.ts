import { motion } from "./animationConfig";

// One demand-driven loop for all pointer layers and buttons; no React renders.
export function installPointer(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>(".hero-sticky")!;
  const layers = [...root.querySelectorAll<HTMLElement>("[data-depth]")];
  const buttons = [
    ...root.querySelectorAll<HTMLElement>(".magnetic-target"),
  ].map((element) => ({
    element,
    inner: element.querySelector<HTMLElement>(".primary-action")!,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  }));
  let frame = 0,
    x = 0,
    y = 0,
    tx = 0,
    ty = 0;
  let heroVisible = true;
  let bounds = hero.getBoundingClientRect();
  function tick() {
    frame = 0;
    x += (tx - x) * motion.pointerEase;
    y += (ty - y) * motion.pointerEase;
    let moving = Math.abs(tx - x) + Math.abs(ty - y) > 0.001;
    for (const layer of layers) {
      const depth = Number(layer.dataset.depth) * (innerWidth < 1025 ? 0.5 : 1);
      layer.style.transform = `translate3d(${x * depth}px,${y * depth}px,0)`;
    }
    for (const button of buttons) {
      button.x += (button.tx - button.x) * 0.15;
      button.y += (button.ty - button.y) * 0.15;
      button.inner.style.transform = `translate3d(${button.x}px,${button.y}px,0)`;
      moving ||=
        Math.abs(button.tx - button.x) + Math.abs(button.ty - button.y) > 0.02;
    }
    if (moving) frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function reset() {
    tx = ty = 0;
    buttons.forEach((b) => {
      b.tx = b.ty = 0;
    });
    wake();
  }
  function move(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    tx = heroVisible ? (event.clientX / bounds.width - 0.5) * 2 : 0;
    ty = heroVisible ? (event.clientY / bounds.height - 0.5) * 2 : 0;
    // Read all active bounds before the next frame writes transforms.
    for (const button of buttons) {
      if (button.element.contains(event.target as Node)) {
        const rect = button.element.getBoundingClientRect();
        button.tx = Math.max(
          -8,
          Math.min(8, (event.clientX - rect.left - rect.width / 2) * 0.06),
        );
        button.ty = Math.max(
          -6,
          Math.min(6, (event.clientY - rect.top - rect.height / 2) * 0.12),
        );
      } else {
        button.tx = button.ty = 0;
      }
    }
    wake();
  }
  const observer = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (!heroVisible) reset();
  });
  observer.observe(hero);
  function resize() {
    bounds = hero.getBoundingClientRect();
    reset();
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else reset();
  }
  root.addEventListener("pointermove", move, { passive: true });
  root.addEventListener("pointerleave", reset);
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("blur", reset);
  document.addEventListener("visibilitychange", visibility);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", reset);
    window.removeEventListener("resize", resize);
    window.removeEventListener("blur", reset);
    document.removeEventListener("visibilitychange", visibility);
    layers.forEach((layer) => layer.style.removeProperty("transform"));
    buttons.forEach((button) => button.inner.style.removeProperty("transform"));
  };
}
