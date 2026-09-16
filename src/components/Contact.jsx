import { useRef } from "react";
import { site } from "../data/site.js";
import { useScrollFx, clamp } from "../hooks.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  const secRef = useRef(null);
  const wordRef = useRef(null);

  useScrollFx((isReduced) => {
    const sec = secRef.current, word = wordRef.current;
    if (!sec || !word || isReduced) return;
    const r = sec.getBoundingClientRect();
    const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
    word.style.transform =
      `translateX(-50%) translateY(${((p - 0.5) * 40).toFixed(1)}%) scaleY(1.6)`;
  });

  const tel = "tel:" + site.phone.replace(/[^+\d]/g, "");

  return (
    <section id="contact" ref={secRef} className="contact scene scene-near" aria-label="Contact">
      <div className="giant-word" ref={wordRef} aria-hidden="true">Contact</div>
      <div className="shell">
        <Reveal className="contact-card">
          <p className="cc-eyebrow">Reach us — well, me</p>
          <h2>Let's build something worth relying on.</h2>
          <p>Have a product that needs building? I'd love to hear about it.</p>
          <a className="contact-cta" href={`mailto:${site.email}`}>
            SEND AN EMAIL <span className="arr" aria-hidden="true">→</span>
          </a>
          <div className="contact-meta">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={tel}>{site.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
