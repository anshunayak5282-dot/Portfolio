# Anshuman — Full-Stack & AI Developer Portfolio

A premium, animated, dark-themed developer portfolio built with plain HTML5, CSS3 and JavaScript (ES6+), GSAP + ScrollTrigger, and a lightweight Three.js particle background.

## 1. Run it locally

No build step, no dependencies to install. You just need a local server (opening `index.html` directly works too, but a local server avoids any browser restrictions on JS modules/fonts).

**Option A — VS Code**
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

**Option B — Python**
```bash
cd portfolio
python3 -m http.server 5500
```
Then open `http://localhost:5500`.

**Option C — Node**
```bash
cd portfolio
npx serve .
```

## 2. Folder structure

```text
portfolio/
├── index.html
├── css/
│   ├── style.css        → base styles, layout, components, theme tokens
│   ├── responsive.css    → breakpoints (1920 → 375px)
│   └── animations.css    → keyframes, GSAP-adjacent CSS, prefers-reduced-motion
├── js/
│   ├── main.js            → data (projects/skills/timeline), nav, form, AI assistant, dashboard
│   ├── animations.js      → GSAP timelines + ScrollTrigger reveals
│   ├── cursor.js          → custom cursor (desktop only)
│   └── three-background.js→ lightweight Three.js particle field
├── assets/
│   ├── images/            → put profile photo + project screenshots here
│   ├── icons/             → favicon / extra icons
│   └── resume/            → put your PDF resume here
└── README.md
```

## 3. Replace placeholder content (all in one place)

Open **`js/main.js`** — the very top of the file has a `SITE_DATA` object with everything editable:

- `SITE_DATA.social` → `github`, `linkedin`, `email`, `resume` links
- `SITE_DATA.projects` → project title/description/tags/links
- `SITE_DATA.skills` → skill categories
- `SITE_DATA.timeline` → development journey steps
- `SITE_DATA.stats` / `SITE_DATA.dashboard` → the numbers shown in "Developer Statistics" and "Developer Activity"

Everything else (headings, section copy) lives directly in `index.html` and is written in plain sentence-case English — search for the text you want to change.

### Placeholders you must replace before publishing

| Placeholder | Where | Replace with |
|---|---|---|
| `YOUR_EMAIL` | `js/main.js`, contact section | your real email |
| `YOUR_GITHUB_URL` | `js/main.js` | your GitHub profile URL |
| `YOUR_LINKEDIN_URL` | `js/main.js` | your LinkedIn profile URL |
| `YOUR_RESUME_URL` | `js/main.js` | path/link to your resume PDF |
| Project `demoUrl` / `githubUrl` fields set to `null` | `js/main.js` | your real live-demo / repo links (button auto-hides while `null`) |

No fake data (stats, companies, achievements) has been invented — only clearly-labelled placeholders.

### Adding your photo, project images and resume

1. **Profile photo** — drop a square image into `assets/images/` (e.g. `profile.jpg`) and update the `<img src="assets/images/...">` in the About section of `index.html`. Until you do, a generated gradient avatar placeholder is shown.
2. **Project images** — drop screenshots into `assets/images/` and update each project's `image` field in `SITE_DATA.projects` (`js/main.js`). Until you do, a gradient placeholder with the project's tech icon is shown.
3. **Resume** — drop your PDF into `assets/resume/` and point `SITE_DATA.social.resume` at it (e.g. `assets/resume/Anshuman_Resume.pdf`).

## 4. Connecting a real AI to "Ask My AI"

The AI section currently answers from a small predefined Q&A set in `js/main.js` (`SITE_DATA.aiResponses`) — no API key, no network call, works offline.

To connect a real model:

1. Create a tiny backend endpoint (Node/Express, a serverless function, etc.) that holds your API key **server-side only**, e.g. as an environment variable (`ANTHROPIC_API_KEY`) — never in frontend code.
2. In `js/main.js`, find the `askAI()` function and replace the local lookup with a `fetch('/api/ask', { method: 'POST', body: JSON.stringify({ question }) })` call to your backend.
3. Your backend calls the real AI API using the server-side key and returns the answer as JSON.

This keeps the frontend safe to deploy publicly (e.g. GitHub Pages) with zero secrets in the client.

## 5. Connecting the contact form

The form currently validates client-side and shows a success state without sending data anywhere (no backend included). To make it functional, pick one:

- **Formspree** — create a form at formspree.io, then set the `<form>`'s `action` attribute to your Formspree endpoint and remove the `preventDefault` short-circuit in `js/main.js` (`handleContactSubmit`), or simply submit normally.
- **EmailJS** — include the EmailJS SDK, initialize with your public key, and call `emailjs.send(...)` inside `handleContactSubmit`.
- **Custom backend** — POST the form data to your own `/api/contact` endpoint.

## 6. Notes

- Reduced-motion users automatically get a calmer experience — heavy GSAP/Three.js motion is skipped in favor of simple fades (`prefers-reduced-motion`).
- The Three.js background auto-disables on very small screens / low-end devices to keep things fast, and pauses when the tab isn't visible.
- The custom cursor only runs on devices with a fine pointer (desktop); it's fully disabled on touch devices.
- Everything is vanilla JS, ES modules aren't used on purpose (keeps it copy-paste simple to host anywhere, including plain GitHub Pages).
