# bushra_portfolio

Personal portfolio of **Syeda Bushra Banu** — built with React + Vite in the same
design language as the `video_portfolio` reference (black / white / signal red,
heavy sans, hard scene cuts, physical-object metaphors).

## Run it

```bash
npm install
npm run dev      # local dev server (usually http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
python build_single.py out.html   # one self-contained HTML file (images inlined), after npm run build
```

## Edit your content

All content lives in `src/data/` — no component editing needed:

| File                 | What's inside                                      |
| -------------------- | -------------------------------------------------- |
| `data/site.js`       | Name, role, email, phone, socials, hero video slot |
| `data/projects.js`   | All projects + full case studies                   |
| `data/skills.js`     | The four skill swing-tags                          |
| `data/experience.js` | The timeline entries                               |

Anything marked `[ADD YOUR INFORMATION]` is a placeholder waiting for the real
link (GitHub, LinkedIn, resume PDF, photo, project videos).

## Structure

```
src/
  data/          ← your content (edit here)
  components/    ← Preloader, Navbar, Hero, Intro, About, Work,
                   Skills, Experience, Experiments, Contact,
                   Footer, CaseStudy, Reveal
  hooks.js       ← shared scroll/reveal/pointer utilities
  index.css      ← the whole design system
```
