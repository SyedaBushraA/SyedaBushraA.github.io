import { useRef } from "react";
import { site } from "../data/site.js";
import { useScrollFx, clamp } from "../hooks.js";
import Reveal from "./Reveal.jsx";

// The statement lights up word by word as you scroll past it.
export default function Intro() {
  const wordsRef = useRef(null);
  const words = site.intro.trim().split(/\s+/);

  useScrollFx((isReduced) => {
    const el = wordsRef.current;
    if (!el) return;
    const spans = el.querySelectorAll(".w");
    if (isReduced) {
      spans.forEach((s) => s.classList.add("lit"));
      return;
    }
    const r = el.getBoundingClientRect();
    const p = clamp((innerHeight * 0.9 - r.top) / (r.height + innerHeight * 0.45), 0, 1);
    const lit = Math.floor(p * spans.length * 1.15);
    spans.forEach((s, i) => s.classList.toggle("lit", i < lit));
  });

  return (
    <section className="scene scene-black" aria-label="Philosophy"
      style={{ paddingTop: "clamp(50px,8vh,90px)" }}>
      <div className="shell">
        <p className="intro-words" ref={wordsRef}>
          {words.map((w, i) => {
            const bare = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const key = site.introKeywords.includes(bare);
            return (
              <span key={i} className={`w${key ? " key" : ""}`}>
                {w}{" "}
              </span>
            );
          })}
        </p>
        <Reveal as="p" className="intro-ground">{site.introGround}</Reveal>
      </div>
    </section>
  );
}
