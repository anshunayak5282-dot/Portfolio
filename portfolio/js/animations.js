/* =========================================================
   ANSHUMAN — Portfolio
   animations.js — GSAP page-load timeline + ScrollTrigger
   reveals. Degrades gracefully if GSAP fails to load, and
   respects prefers-reduced-motion.
   ========================================================= */

(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function whenReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  whenReady(() => {
    if (typeof window.gsap === "undefined") {
      // GSAP failed to load (offline CDN, blocked script, etc). Content is
      // already visible by default via CSS, so nothing else to do.
      return;
    }

    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    if (prefersReducedMotion) {
      // Make sure nothing stays hidden behind data-reveal opacity:0
      gsap.set("[data-reveal]", { opacity: 1, clearProps: "transform" });
      initScrollProgress(gsap);
      return;
    }

    initLoadSequence(gsap);
    initScrollReveals(gsap);
    initHeroExtras(gsap);
    initTimelineFill(gsap);
    initProjectTilt();
    initScrollProgress(gsap);
  });

  /* -------------------- Page load sequence -------------------- */
  function initLoadSequence(gsap) {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 1.55, // syncs with the loader's fixed display duration (js/main.js initLoader)
    });

    tl.from(".logo", { opacity: 0, y: -12, duration: 0.5 })
      .from(".navbar .nav-links a, .navbar .nav-cta > *", { opacity: 0, y: -10, stagger: 0.06, duration: 0.4 }, "-=0.3")
      .from(".badge", { opacity: 0, y: 14, duration: 0.5 }, "-=0.15")
      .from(
        ".hero h1 .line",
        {
          opacity: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.12,
        },
        "-=0.2"
      )
      .from(".hero-desc", { opacity: 0, y: 16, duration: 0.55 }, "-=0.35")
      .from(".hero-actions .btn", { opacity: 0, y: 14, stagger: 0.08, duration: 0.5 }, "-=0.3")
      .from(".hero-meta", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3")
      .from(".scroll-indicator", { opacity: 0, duration: 0.6 }, "-=0.2")
      .from(
        "#three-bg",
        { opacity: 0, duration: 1.2 },
        "-=1"
      );
  }

  /* -------------------- Scroll-triggered reveals -------------------- */
  function initScrollReveals(gsap) {
    const groups = [
      { sel: ".section-head", y: 24 },
      { sel: ".about-visual", y: 0, x: -30 },
      { sel: ".about-text > *", y: 20, stagger: 0.08 },
      { sel: ".stat-card", y: 24, stagger: 0.08 },
      { sel: ".skill-group", y: 24, stagger: 0.07 },
      { sel: ".project-card", y: 34, stagger: 0.1 },
      { sel: ".ai-panel", y: 30 },
      { sel: ".timeline-item", y: 24, stagger: 0.08 },
      { sel: ".why-card", y: 24, stagger: 0.08 },
      { sel: ".dash-panel", y: 24 },
      { sel: ".contact-info > *", y: 20, stagger: 0.08 },
      { sel: ".contact-form", y: 20, x: 0 },
    ];

    groups.forEach(({ sel, y, x = 0, stagger = 0 }) => {
      const els = gsap.utils.toArray(sel);
      if (!els.length) return;

      els.forEach((el) => el.setAttribute("data-reveal", ""));

      gsap.fromTo(
        els,
        { opacity: 0, y, x, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: els[0].closest("section") || els[0],
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    // Animated stat counters
    gsap.utils.toArray(".stat-number[data-count]").forEach((el) => {
      const raw = el.dataset.count;
      if (raw === "") return; // the "∞" curiosity card — no count animation
      const target = parseInt(raw, 10);
      const suffix = el.dataset.suffix || "";
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(counter.val) + suffix;
        },
      });
    });
  }

  /* -------------------- Hero: mouse-following glow + parallax -------------------- */
  function initHeroExtras(gsap) {
    const hero = document.querySelector(".hero");
    const glow = document.querySelector(".hero-glow");
    if (!hero || !glow) return;

    const quickX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const quickY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      quickX(e.clientX - rect.left);
      quickY(e.clientY - rect.top);
    });

    hero.addEventListener("pointerenter", () => gsap.to(glow, { opacity: 1, duration: 0.4 }));
    hero.addEventListener("pointerleave", () => gsap.to(glow, { opacity: 0.8, duration: 0.6 }));

    // Gentle parallax on scroll
    if (window.ScrollTrigger) {
      gsap.to(".hero-inner", {
        y: 60,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }

  /* -------------------- Journey timeline progress fill -------------------- */
  function initTimelineFill(gsap) {
    const track = document.querySelector(".timeline-track-fill");
    const timeline = document.querySelector(".timeline");
    const items = gsap.utils.toArray(".timeline-item");
    if (!track || !timeline || !items.length || !window.ScrollTrigger) return;

    gsap.to(track, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    items.forEach((item) => {
      window.ScrollTrigger.create({
        trigger: item,
        start: "top 65%",
        end: "bottom 65%",
        onEnter: () => item.classList.add("is-active"),
        onEnterBack: () => item.classList.add("is-active"),
      });
    });
  }

  /* -------------------- Project card 3D tilt -------------------- */
  function initProjectTilt() {
    const cards = document.querySelectorAll("[data-tilt]");
    if (!("ontouchstart" in window) === false) {
      // still allow on hybrid devices; tilt only responds to mouse move anyway
    }

    cards.forEach((card) => {
      let rect;
      const strength = 6; // degrees — subtle, per spec ("do not overdo")

      const onEnter = () => {
        rect = card.getBoundingClientRect();
      };

      const onMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg) translateY(-4px)`;
      };

      const onLeave = () => {
        card.style.transform = "";
      };

      card.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "touch") return;
        onEnter();
      });
      card.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch") return;
        onMove(e);
      });
      card.addEventListener("pointerleave", onLeave);
    });
  }

  /* -------------------- Scroll progress bar -------------------- */
  function initScrollProgress(gsap) {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }
})();
