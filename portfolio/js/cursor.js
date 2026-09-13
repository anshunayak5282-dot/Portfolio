/* =========================================================
   ANSHUMAN — Portfolio
   cursor.js — custom dot + delayed ring cursor.
   Desktop (fine pointer) only; fully disabled on touch
   devices and when prefers-reduced-motion is set.
   ========================================================= */

(function () {
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isFinePointer || prefersReducedMotion) return;

  document.addEventListener("DOMContentLoaded", () => {
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    document.body.classList.add("has-custom-cursor");

    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0;
    let targetX = 0,
      targetY = 0;
    let raf = null;

    const hasGSAP = typeof window.gsap !== "undefined";

    window.addEventListener(
      "pointermove",
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!hasGSAP) {
          dotX = targetX;
          dotY = targetY;
          dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        }
      },
      { passive: true }
    );

    if (hasGSAP) {
      const quickDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
      const quickDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
      const quickRingX = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power3.out" });
      const quickRingY = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power3.out" });

      window.addEventListener(
        "pointermove",
        (e) => {
          quickDotX(e.clientX);
          quickDotY(e.clientY);
          quickRingX(e.clientX);
          quickRingY(e.clientY);
        },
        { passive: true }
      );
    } else {
      // Manual rAF loop fallback for the ring's delayed follow when GSAP is unavailable
      const loop = () => {
        ringX += (targetX - ringX) * 0.18;
        ringY += (targetY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const interactiveSelector = "a, button, input, textarea, [data-tilt], .skill-pills li";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) {
        ring.classList.add("is-active");
      }
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) {
        ring.classList.remove("is-active");
      }
    });

    document.addEventListener("pointerleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("pointerenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });

    window.addEventListener("blur", () => cancelAnimationFrame(raf));
  });
})();
