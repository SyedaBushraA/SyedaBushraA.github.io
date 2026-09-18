# Syeda Bushra Banu — Portfolio

My personal portfolio: a single-page site with case studies of the healthcare software I build,
written in **React + Vite**. Deep green and cream palette, full-screen scenes, and a case-study
overlay for each project.

**Live:** https://syedabushraa.github.io

## Run it

```bash
npm install
npm run dev      # local dev server (usually http://localhost:5173)
npm run build    # production build into docs/
npm run preview  # preview the production build
python build_single.py out.html   # one self-contained HTML file (images inlined), after npm run build
```

## Deploy

GitHub Pages serves the `docs/` folder on the `main` branch, so `npm run build` and a push are all
it takes:

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push
```

## Edit the content

All content lives in `src/data/` — no component editing needed:

| File                 | What's inside                                       |
| -------------------- | --------------------------------------------------- |
| `data/site.js`       | Name, role, email, phone, social links, intro text  |
| `data/projects.js`   | All projects and their full case studies            |
| `data/skills.js`     | The four skill tags                                 |
| `data/experience.js` | The timeline entries                                |

Images live in `public/` (project screenshots, `me.png` for the portrait, and the resume PDF).

## Structure

```
src/
  data/          ← the content (edit here)
  components/    ← Preloader, Navbar, Hero, Intro, About, Work,
                   Skills, Experience, Experiments, Contact,
                   Footer, CaseStudy, Reveal
  hooks.js       ← shared scroll/reveal/pointer utilities
  index.css      ← the whole design system
docs/            ← built site served by GitHub Pages
```
