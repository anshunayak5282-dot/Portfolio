/* =========================================================
   ANSHUMAN — Portfolio
   three-background.js — lightweight Three.js particle field
   for the hero section only. Auto-disables on small/low-end
   screens and when the tab is hidden, to protect performance.
   ========================================================= */

(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const container = document.getElementById("three-bg");
  if (!container) return;

  // Skip entirely on reduced motion, very small screens, or if Three.js failed to load
  if (prefersReducedMotion || window.innerWidth < 480 || typeof window.THREE === "undefined") {
    return;
  }

  const THREE = window.THREE;

  let renderer, scene, camera, particles;
  let width = container.clientWidth;
  let height = container.clientHeight;
  let animId = null;
  let visible = true;
  let mouseX = 0,
    mouseY = 0;

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const count = window.innerWidth < 900 ? 140 : 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x6ea3ff,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    animate();
  }

  function onResize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onPointerMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function onVisibilityChange() {
    visible = document.visibilityState === "visible";
    if (visible && !animId) animate();
  }

  function animate() {
    if (!visible) {
      animId = null;
      return;
    }
    animId = requestAnimationFrame(animate);

    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0002;

    // Subtle parallax toward the pointer — kept small so it stays in the
    // background rather than competing with foreground content.
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  init();
})();
