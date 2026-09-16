import { useRef, useState } from "react";
import { skillTags } from "../data/skills.js";
import { useScrollFx, clamp } from "../hooks.js";
import Reveal from "./Reveal.jsx";

// Graph-paper workshop: a dashed line draws itself with scroll and each
// swing tag flips to red the moment the line tip passes it.
export default function Skills() {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const tagRefs = useRef([]);
  const [active, setActive] = useState(() => skillTags.map(() => false));

  useScrollFx((isReduced) => {
    const wrap = wrapRef.current, fill = fillRef.current;
    if (!wrap || !fill) return;
    if (isReduced) {
      fill.style.height = "100%";
      setActive(skillTags.map(() => true));
      return;
    }
    const r = wrap.getBoundingClientRect();
    const p = clamp((innerHeight * 0.6 - r.top) / r.height, 0, 1);
    fill.style.height = (p * 100).toFixed(2) + "%";
    const tipY = p * wrap.offsetHeight;
    setActive((prev) => {
      const next = skillTags.map((_, i) => {
        const el = tagRefs.current[i];
        return el ? tipY >= el.offsetTop + 50 : false;
      });
      return next.some((v, i) => v !== prev[i]) ? next : prev;
    });
  });

  return (
    <section id="skills" className="scene scene-paper" aria-label="Skills">
      <div className="shell">
        <Reveal as="h2" className="sec-h">What I work with<em>.</em></Reveal>
        <Reveal as="p" className="sec-sub">The toolkit, tagged and ready.</Reveal>
        <div className="tags-wrap" ref={wrapRef}>
          <div className="tag-line" aria-hidden="true"><i ref={fillRef}></i></div>
          <div className="tag-grid">
            {skillTags.map((tg, i) => (
              <div
                key={tg.num}
                ref={(el) => (tagRefs.current[i] = el)}
                className={`tag-card${active[i] ? " active" : ""}`}
              >
                <span className="tag-hole" aria-hidden="true"></span>
                <div className="tag-inner">
                  <div className="tag-num">{tg.num}</div>
                  <div className="tag-title">{tg.title}</div>
                  <div className="tag-list">
                    {tg.items.map((it) => <div key={it}>{it}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Reveal as="span" className="tag-note">— and always learning!</Reveal>
      </div>
    </section>
  );
}
