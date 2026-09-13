/* =========================================================
   ANSHUMAN — Portfolio
   main.js — editable content data + core interactivity
   (nav, mobile menu, AI assistant, contact form, stats,
   dashboard, back-to-top)
   ========================================================= */

/* =========================================================
   1. SITE DATA — edit everything here
   ========================================================= */
const SITE_DATA = {
  name: "Anshuman",
  role: "Full-Stack Developer",

  social: {
    github: "https://github.com/anshunayak5282-dot",
    linkedin: "https://www.linkedin.com/in/anshuman-nayak-a47384370/",
    email: "YOUR_EMAIL",
    resume: "assets/resume/anshu.pdf",
  },

  stats: [
    { value: 8, suffix: "+", label: "Projects" },
    { value: 12, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "+", label: "Years Learning" },
    { value: null, suffix: "∞", label: "Curiosity" },
  ],

  skills: [
    {
      category: "Frontend",
      description: "Interfaces that feel fast and precise",
      icon: "layout",
      items: ["HTML", "CSS", "JavaScript", "Bootstrap", "React"],
    },
    {
      category: "Backend",
      description: "APIs and server logic that hold up",
      icon: "server",
      items: ["Node.js", "Express.js", "PHP"],
    },
    {
      category: "Database",
      description: "Modeling and querying data cleanly",
      icon: "database",
      items: ["MongoDB", "MySQL"],
    },
    {
      category: "Programming",
      description: "Core languages behind the logic",
      icon: "code",
      items: ["Java", "C", "C++"],
    },
    {
      category: "Tools",
      description: "The daily developer workflow",
      icon: "terminal",
      items: ["Git", "GitHub", "VS Code"],
    },
    // {
    //   category: "AI",
    //   description: "Building with and around AI models",
    //   icon: "sparkles",
    //   items: ["AI APIs", "Prompt Engineering", "AI-assisted Development", "AI Application Development"],
    // },
  ],

  projects: [
    {
      title: "Jharkhand Dekho",
      description: "A tourism platform designed to showcase destinations, hotels and travel experiences across Jharkhand.",
      tech: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"],
      image: null,
      demoUrl: null,
      githubUrl: null,
    },
    {
      title: "Wonderlust",
      description: "A full-stack travel/listing platform where users can explore and manage listings.",
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Method Override"],
      image: null,
      demoUrl: null,
      githubUrl: null,
    },
    {
      title: "AI Weather Application",
      description: "A modern weather application that combines real-time weather information with AI-powered recommendations.",
      tech: ["HTML", "CSS", "JavaScript", "Weather API", "AI API"],
      image: null,
      demoUrl: null,
      githubUrl: null,
    },
    {
      title: "Face Attendance System",
      description: "An attendance management application using face recognition and database integration.",
      tech: ["Python", "Face Recognition", "MongoDB"],
      image: null,
      demoUrl: null,
      githubUrl: null,
      hideDemo: true,
    },
  ],

  timeline: [
    { year: "2025", title: "Started Development", desc: "Began learning how the web actually works." },
    { year: "2025", title: "HTML / CSS", desc: "Structure and styling fundamentals." },
    { year: "2025", title: "JavaScript", desc: "Made pages interactive and dynamic." },
    { year: "2026", title: "Node.js + Express", desc: "Started building on the backend." },
    { year: "2026", title: "MongoDB", desc: "Learned to model and store real data." },
    { year: "2026", title: "Full Stack", desc: "Connected frontend and backend into full products." },
    // { year: "2026", title: "AI Development", desc: "Started building with AI APIs and models." },
    // { year: "2026", title: "Full-Stack AI Developer", desc: "Combining both to ship practical solutions." },
  ],

  whyMe: [
    { title: "Problem Solver", desc: "I enjoy breaking complex problems into simple solutions.", icon: "puzzle" },
    { title: "Fast Learner", desc: "I continuously explore new technologies and improve my skills.", icon: "zap" },
    { title: "Full-Stack Mindset", desc: "I understand both frontend and backend development.", icon: "layers" },
    { title: "AI Focused", desc: "I'm interested in combining AI with real-world software applications.", icon: "brain" },
  ],

  dashboard: [
    { label: "Repositories", value: "10+", icon: "folder" },
    { label: "Projects", value: "08+", icon: "box" },
    { label: "Technologies", value: "12+", icon: "cpu" },
  ],

  // Predefined Q&A for the "Ask My AI" section.
  // See README → "Connecting a real AI" to swap this for a live API call.
  aiResponses: [
    {
      keywords: ["technolog", "stack", "tech", "know", "skill"],
      answer: "Anshuman works across the full stack — HTML, CSS, JavaScript, React and Bootstrap on the frontend; Node.js, Express and PHP on the backend; MongoDB and MySQL for data.",
    },
    {
      keywords: ["project", "built", "build", "made", "portfolio"],
      answer: "He's built Jharkhand Dekho (a tourism platform), Wonderlust (a full-stack listing platform), an AI-powered weather app, and a face-recognition attendance system. Scroll up to the Projects section for details.",
    },
    {
      keywords: ["focus", "specializ", "interest", "passion"],
      answer: "His focus is combining solid full-stack engineering with practical AI — building products that are useful, scalable and genuinely intelligent, not AI for its own sake.",
    },
    {
      keywords: ["contact", "reach", "hire", "email", "connect"],
      answer: "The best way to reach him is through the contact form below, or via the email and GitHub/LinkedIn links in the Contact section.",
    },
    {
      keywords: ["learn", "learning", "studying", "currently"],
      answer: "Right now he's deepening his AI development skills — going from using AI APIs to building complete AI-powered application features.",
    },
  ],

  aiFallback: "That's a good question — I don't have a predefined answer for that yet. Try asking about Anshuman's technologies, projects, focus, or how to get in touch.",
};

/* =========================================================
   2. Utilities
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   3. Render dynamic content from SITE_DATA
   ========================================================= */
function renderStats() {
  const grid = $("#stats-grid");
  if (!grid) return;
  grid.innerHTML = SITE_DATA.stats
    .map(
      (s) => `
      <div class="stat-card" data-reveal>
        <div class="stat-number" data-count="${s.value ?? ""}" data-suffix="${s.suffix}">${s.value === null ? s.suffix : "0" + s.suffix}</div>
        <div class="stat-label">${escapeHTML(s.label)}</div>
      </div>`
    )
    .join("");
}

const ICONS = {
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="18" height="7" rx="1.5"/><circle cx="7" cy="7.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="7" cy="17.5" r="0.8" fill="currentColor" stroke="none"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4L2 12l6 8M16 4l6 8-6 8"/></svg>',
  terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></svg>',
  puzzle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h3a2 2 0 100-4v-.5A1.5 1.5 0 018.5 2h.5a2 2 0 004 0h.5A1.5 1.5 0 0115 3.5V4h-.5a2 2 0 100 4h.5v3.5a1.5 1.5 0 01-1.5 1.5h-.5a2 2 0 00-4 0H9a1.5 1.5 0 01-1.5-1.5V11h-.5a2 2 0 100-4H4V8z"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/></svg>',
  brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 003 3M15 3a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-3 3M9 3v18M15 3v18"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="7" width="10" height="10" rx="1"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/></svg>',
};

function renderSkills() {
  const wrap = $("#skills-groups");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.skills
    .map(
      (g) => `
      <div class="skill-group" data-reveal>
        <div class="skill-group-head">
          <span class="icon">${ICONS[g.icon] || ""}</span>
          <h3>${escapeHTML(g.category)}</h3>
        </div>
        <p>${escapeHTML(g.description)}</p>
        <ul class="skill-pills">
          ${g.items.map((i) => `<li>${escapeHTML(i)}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");
}

function renderProjects() {
  const wrap = $("#projects-grid");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.projects
    .map((p) => {
      const media = p.image
        ? `<img src="${escapeHTML(p.image)}" alt="Screenshot of the ${escapeHTML(p.title)} project" loading="lazy" />`
        : `<div class="media-placeholder">${escapeHTML(p.tech[0] || "PROJECT")}</div>`;

      const demoBtn =
        !p.hideDemo && p.demoUrl
          ? `<a class="btn btn-sm btn-primary" href="${escapeHTML(p.demoUrl)}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
          : !p.hideDemo
          ? `<button class="btn btn-sm btn-primary" disabled title="Live demo link not added yet">Live Demo</button>`
          : "";

      const githubBtn = p.githubUrl
        ? `<a class="btn btn-sm btn-outline" href="${escapeHTML(p.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
        : `<button class="btn btn-sm btn-outline" disabled title="GitHub link not added yet">GitHub</button>`;

      return `
      <article class="project-card" data-reveal data-tilt>
        <div class="project-media">${media}</div>
        <div class="project-body">
          <h3>${escapeHTML(p.title)}</h3>
          <p>${escapeHTML(p.description)}</p>
          <ul class="tech-tags">${p.tech.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
          <div class="project-actions">${demoBtn}${githubBtn}</div>
        </div>
      </article>`;
    })
    .join("");
}

function renderTimeline() {
  const wrap = $("#timeline-list");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.timeline
    .map(
      (t, i) => `
      <li class="timeline-item" data-reveal>
        <span class="timeline-marker">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/></svg>
        </span>
        <span class="timeline-year">${escapeHTML(t.year)}</span>
        <div class="timeline-card">
          <h3>${escapeHTML(t.title)}</h3>
          <p>${escapeHTML(t.desc)}</p>
        </div>
      </li>`
    )
    .join("");
}

function renderWhyMe() {
  const wrap = $("#why-grid");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.whyMe
    .map(
      (w) => `
      <div class="why-card" data-reveal>
        <span class="icon">${ICONS[w.icon] || ""}</span>
        <h3>${escapeHTML(w.title)}</h3>
        <p>${escapeHTML(w.desc)}</p>
      </div>`
    )
    .join("");
}

function renderDashboard() {
  const wrap = $("#dash-panel");
  if (!wrap) return;
  wrap.innerHTML =
    SITE_DATA.dashboard
      .map(
        (d) => `
      <div class="dash-item" data-reveal>
        <span class="dash-icon">${ICONS[d.icon] || ""}</span>
        <div class="dash-value">${escapeHTML(d.value)}</div>
        <div class="dash-label">${escapeHTML(d.label)}</div>
      </div>`
      )
      .join("") +
    `<p class="dash-note">Numbers are manually maintained placeholders — connect the GitHub API for live data.</p>`;
}

function applySocialLinks() {
  const map = {
    "[data-social='github']": SITE_DATA.social.github,
    "[data-social='linkedin']": SITE_DATA.social.linkedin,
    "[data-social='email']": `mailto:${SITE_DATA.social.email}`,
    "[data-social='resume']": SITE_DATA.social.resume,
  };
  Object.entries(map).forEach(([sel, href]) => {
    $$(sel).forEach((el) => {
      el.setAttribute("href", href);
      if (href.includes("YOUR_")) {
        el.setAttribute("data-placeholder", "true");
        el.setAttribute("title", "Placeholder link — add your real URL in js/main.js");
      }
    });
  });
  $$("[data-social-text='email']").forEach((el) => (el.textContent = SITE_DATA.social.email));
}

/* =========================================================
   4. Navbar — scroll state, active link, mobile menu
   ========================================================= */
function initNavbar() {
  const navbar = $(".navbar");
  const hamburger = $(".hamburger");
  const mobileMenu = $(".mobile-menu");
  const navLinks = $$(".nav-links a, .mobile-menu a");
  const sections = $$("section[id]");

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }
}

/* =========================================================
   5. Animated stat counters (fallback trigger; GSAP handles
   the primary ScrollTrigger version in animations.js — this
   guards against GSAP failing to load)
   ========================================================= */
function initCounterFallback() {
  if (window.gsap && window.ScrollTrigger) return; // animations.js owns it
  const numbers = $$(".stat-number[data-count]");
  if (!numbers.length || !("IntersectionObserver" in window)) return;

  const animate = (el) => {
    const raw = el.dataset.count;
    if (raw === "") return;
    const target = parseInt(raw, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      cur = Math.min(target, cur + step);
      el.textContent = cur + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  numbers.forEach((n) => observer.observe(n));
}

/* =========================================================
   6. Ask My AI — predefined-response assistant
   ========================================================= */
function initAIAssistant() {
  const body = $("#ai-body");
  const form = $("#ai-form");
  const input = $("#ai-input");
  const suggestions = $$(".ai-suggestions button");
  if (!body || !form || !input) return;

  function addMessage(text, from) {
    const msg = document.createElement("div");
    msg.className = `ai-msg from-${from}`;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    return msg;
  }

  function findAnswer(question) {
    const q = question.toLowerCase();
    const match = SITE_DATA.aiResponses.find((r) => r.keywords.some((k) => q.includes(k)));
    return match ? match.answer : SITE_DATA.aiFallback;
  }

  function askAI(question) {
    if (!question.trim()) return;
    addMessage(question.trim(), "user");
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "ai-msg from-ai ai-typing-wrap";
    typing.innerHTML = `<span class="ai-typing"><span></span><span></span><span></span></span>`;
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    const delay = prefersReducedMotion ? 120 : 500 + Math.random() * 400;
    setTimeout(() => {
      typing.remove();
      addMessage(findAnswer(question), "ai");
    }, delay);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    askAI(input.value);
  });

  suggestions.forEach((btn) => {
    btn.addEventListener("click", () => askAI(btn.textContent));
  });
}

/* =========================================================
   7. Contact form — client-side validation
   ========================================================= */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  const status = $("#form-status", form);
  const fields = {
    name: $("#field-name", form),
    email: $("#field-email", form),
    message: $("#field-message", form),
  };

  function setError(field, message) {
    const group = field.closest(".form-group");
    const errorEl = $(".form-error", group);
    group.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function validate() {
    let valid = true;

    if (!fields.name.value.trim()) {
      setError(fields.name, "Please enter your name.");
      valid = false;
    } else {
      setError(fields.name, "");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(fields.email.value.trim())) {
      setError(fields.email, "Please enter a valid email address.");
      valid = false;
    } else {
      setError(fields.email, "");
    }

    if (fields.message.value.trim().length < 10) {
      setError(fields.message, "Message should be at least 10 characters.");
      valid = false;
    } else {
      setError(fields.message, "");
    }

    return valid;
  }

  Object.values(fields).forEach((field) => {
    field.addEventListener("blur", validate);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      status.textContent = "Please fix the highlighted fields.";
      status.classList.remove("is-success");
      return;
    }

    // No backend is wired up yet — see README "Connecting the contact form"
    // for Formspree / EmailJS / custom backend instructions.
    const submitBtn = $("button[type='submit']", form);
    submitBtn.disabled = true;
    status.textContent = "Sending…";
    status.classList.remove("is-success");

    setTimeout(() => {
      status.textContent = "Message ready to send — connect a backend (see README) to deliver it.";
      status.classList.add("is-success");
      submitBtn.disabled = false;
      form.reset();
    }, 700);
  });
}

/* =========================================================
   8. Back to top
   ========================================================= */
function initBackToTop() {
  $$(".back-to-top").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });
}

/* =========================================================
   9. Smooth in-page nav scrolling with sticky-header offset
   ========================================================= */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = $(".navbar").offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });
}

/* =========================================================
   10. Loader
   ========================================================= */
function initLoader() {
  const loader = $("#loader");
  if (!loader) return;
  const bar = $(".loader-bar span", loader);
  const status = $(".loader-status", loader);
  const duration = prefersReducedMotion ? 350 : 1400;

  // Drive the fill bar directly via JS rather than relying on the
  // browser's 'load' event (which can hang or fire late while waiting
  // on slow/blocked third-party CDN scripts).
  if (bar) {
    bar.style.transition = `width ${duration}ms ease-out`;
    // Double rAF so the browser registers the starting width before
    // we animate to 100%, otherwise the transition can get skipped.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = "100%";
      });
    });
  }

  if (status) {
    setTimeout(() => {
      status.textContent = "Ready";
    }, Math.max(0, duration - 250));
  }

  const hide = () => loader.classList.add("is-hidden");
  setTimeout(hide, duration + 150);
}

/* =========================================================
   11. Init
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-ready");

  renderStats();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderWhyMe();
  renderDashboard();
  applySocialLinks();

  initLoader();
  initNavbar();
  initSmoothScroll();
  initCounterFallback();
  initAIAssistant();
  initContactForm();
  initBackToTop();

  $("#footer-year") && ($("#footer-year").textContent = new Date().getFullYear());
});
