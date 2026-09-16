import { useEffect, useRef } from "react";
import { projects } from "../data/projects.js";
import Reveal from "./Reveal.jsx";

function WorkMedia({ p }) {
  const vidRef = useRef(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (ens) => {
        for (const en of ens)
          if (en.isIntersecting) {
            if (v.dataset.src && !v.src) {
              v.src = v.dataset.src;
              v.play().catch(() => {});
            }
            io.unobserve(v);
          }
      },
      { rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  if (p.video) {
    return (
      <video ref={vidRef} muted loop playsInline preload="none"
        data-src={p.video} poster={p.poster || undefined} />
    );
  }
  if (p.image) {
    return <img src={p.image} loading="lazy" alt={`Screenshot of ${p.title}`} />;
  }
  return (
    <div className="work-scene">
      <span className="ws-a" style={{ background: `radial-gradient(circle,${p.accentA},transparent 70%)` }}></span>
      <span className="ws-b" style={{ background: `radial-gradient(circle,${p.accentB},transparent 70%)` }}></span>
      <span className="ws-glyph">{p.glyph}</span>
      <span className="ws-cap">{p.caption}</span>
    </div>
  );
}

export default function Work({ onOpen }) {
  return (
    <section id="work" className="scene scene-white" aria-label="Selected projects"
      style={{ paddingTop: "clamp(50px,8vh,90px)" }}>
      <div className="shell">
        <Reveal as="h2" className="sec-h">Selected work<em>.</em></Reveal>
        <Reveal as="p" className="sec-sub">
          {String(projects.length).padStart(2, "0")} projects — click any to read the
          full case study.
        </Reveal>
        <div className="works">
          {projects.map((p, i) => (
            <Reveal key={p.title} className="work-row" delay={(i % 3) * 0.1}>
              <div className="work-meta">
                <div className="work-num">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="work-title">{p.title}</h3>
                <div className="work-kind">{p.kind} · {p.year} · {p.role}</div>
                <p className="work-blurb">{p.blurb}</p>
                <div className="work-tech">
                  {p.tech.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="work-links">
                  <button className="work-open" onClick={() => onOpen(i)}
                    aria-label={`Open case study: ${p.title}`}>
                    VIEW PROJECT <span aria-hidden="true">→</span>
                  </button>
                  {p.link && (
                    <a className="work-live" href={p.link} target="_blank" rel="noopener noreferrer">
                      LIVE ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="work-media" onClick={() => onOpen(i)}>
                <WorkMedia p={p} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
