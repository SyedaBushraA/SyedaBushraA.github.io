import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects.js";

// Full-screen case study dialog. index === null means closed.
export default function CaseStudy({ index, onClose, onNext }) {
  const innerRef = useRef(null);
  const [shown, setShown] = useState(false);
  const open = index !== null;
  const p = open ? projects[index] : null;

  // slide in after mount / index change
  useEffect(() => {
    if (!open) { setShown(false); return; }
    setShown(false);
    if (innerRef.current) innerRef.current.scrollTop = 0;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setShown(true);
        innerRef.current?.focus({ preventScroll: true });
      })
    );
    return () => cancelAnimationFrame(raf);
  }, [open, index]);

  // lock scroll + make the page behind inert while open
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("lock");
    const main = document.querySelector("main");
    const nav = document.querySelector(".nav");
    try { if (main) main.inert = true; if (nav) nav.inert = true; } catch (e) {}
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lock");
      try { if (main) main.inert = false; if (nav) nav.inert = false; } catch (e) {}
      removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const num = String(index + 1).padStart(2, "0");
  const next = (index + 1) % projects.length;
  let d = 0.2;

  return (
    <div
      className={`overlay${shown ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${p.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="overlay-close" onClick={onClose}>CLOSE ✕</button>
      <div className="overlay-inner" ref={innerRef} tabIndex={-1}>
        <div className="cs-hero">
          <div className="cs-scene" aria-hidden="true">
            {p.image ? (
              <img src={p.image} alt="" />
            ) : (
              <>
                <span className="ws-a" style={{ background: `radial-gradient(circle,${p.accentA},transparent 70%)` }}></span>
                <span className="ws-b" style={{ background: `radial-gradient(circle,${p.accentB},transparent 70%)` }}></span>
              </>
            )}
          </div>
          <div className="shell">
            <p className="cs-num cs-reveal" style={{ transitionDelay: ".08s" }}>case {num}</p>
            <h2 className="cs-title cs-reveal" style={{ transitionDelay: ".16s" }}>{p.title}</h2>
            <div className="cs-meta cs-reveal" style={{ transitionDelay: ".24s" }}>
              <div><b>Role</b><span>{p.role}</span></div>
              <div><b>Year</b><span>{p.year}</span></div>
              <div><b>Technology</b><span>{p.tech.join(" · ")}</span></div>
            </div>
          </div>
        </div>
        <div className="cs-body">
          <div className="shell">
            {Object.entries(p.sections).map(([k, v]) => {
              d += 0.06;
              return (
                <div key={k} className="cs-sec cs-reveal" style={{ transitionDelay: `${d.toFixed(2)}s` }}>
                  <b>{k}</b>
                  <p>{v}</p>
                </div>
              );
            })}
            <div className="cs-actions cs-reveal" style={{ transitionDelay: `${(d + 0.1).toFixed(2)}s` }}>
              {p.link && (
                <a className="cs-btn" href={p.link} target="_blank" rel="noopener noreferrer">
                  VISIT LIVE SITE →
                </a>
              )}
              <button className="cs-btn ghost" onClick={() => onNext(next)}>
                NEXT — {projects[next].title} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
