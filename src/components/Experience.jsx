import { useRef } from "react";
import { experience } from "../data/experience.js";
import { useScrollFx, clamp } from "../hooks.js";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  const trailRef = useRef(null);
  const fillRef = useRef(null);

  useScrollFx((isReduced) => {
    const trail = trailRef.current, fill = fillRef.current;
    if (!trail || !fill) return;
    if (isReduced) { fill.style.transform = "scaleY(1)"; return; }
    const r = trail.getBoundingClientRect();
    const p = clamp((innerHeight * 0.8 - r.top) / r.height, 0, 1);
    fill.style.transform = `scaleY(${p})`;
  });

  return (
    <section id="experience" className="scene scene-near" aria-label="Experience">
      <div className="shell">
        <Reveal as="h2" className="sec-h">Experience<em>.</em></Reveal>
        <div className="trail" ref={trailRef}>
          <div className="trail-line" aria-hidden="true"><i ref={fillRef}></i></div>
          {experience.map((x, i) => (
            <Reveal key={x.org} className={`trail-item${x.edu ? " edu" : ""}`} delay={(i % 3) * 0.1}>
              <div className="trail-when">{x.when}</div>
              <div>
                <div className="trail-role">{x.role}</div>
                <div className="trail-org">{x.org}</div>
                <p className="trail-desc">{x.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
