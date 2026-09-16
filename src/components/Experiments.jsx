import { useEffect, useRef, useCallback } from "react";
import { mouse, lerp, clamp, isMobile, useLazyCanvas } from "../hooks.js";
import Reveal from "./Reveal.jsx";

function ParticleField() {
  const cardRef = useRef(null);
  const init = useCallback((card) => {
    const cv = card.querySelector("canvas"), ctx = cv.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = card.offsetWidth, h = card.offsetHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const N = isMobile() ? 60 : 110;
    const pts = Array.from({ length: N }, () => {
      const x = Math.random() * w, y = Math.random() * h;
      return { x, y, hx: x, hy: y, vx: 0, vy: 0, r: Math.random() * 1.4 + 0.5 };
    });
    return () => {
      ctx.clearRect(0, 0, w, h);
      const cr = cv.getBoundingClientRect();
      const mx = mouse.x - cr.left, my = mouse.y - cr.top;
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 8100) {
          const d = Math.sqrt(d2) || 1, f = ((90 - d) / 90) * 1.6;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx += (p.hx - p.x) * 0.012; p.vy += (p.hy - p.y) * 0.012;
        p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx; p.y += p.vy;
        const glowing = Math.abs(p.vx) + Math.abs(p.vy) > 0.6;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = glowing ? "rgba(233,91,47,.95)" : "rgba(231,227,201,.55)";
        ctx.fill();
      }
    };
  }, []);
  useLazyCanvas(cardRef, init);
  return (
    <Reveal className="exp-card">
      <div ref={cardRef} style={{ position: "absolute", inset: 0 }}>
        <span className="exp-tag">Specimen 01</span>
        <div className="exp-stage"><canvas /></div>
        <div className="exp-label">
          <b>PARTICLE FIELD</b>
          <span>Motes that scatter around your cursor, then drift home.</span>
        </div>
      </div>
    </Reveal>
  );
}

function LiquidLight() {
  const cardRef = useRef(null);
  const init = useCallback((card) => {
    const cv = card.querySelector("canvas"), ctx = cv.getContext("2d");
    const w = card.offsetWidth, h = card.offsetHeight;
    cv.width = w; cv.height = h;
    const blobs = [
      { c: "rgba(233,91,47,", r: h * 0.42, fx: 0.00023, fy: 0.00017, px: 0, py: 2 },
      { c: "rgba(231,227,201,", r: h * 0.34, fx: 0.00017, fy: 0.00027, px: 2, py: 4 },
      { c: "rgba(136,168,167,", r: h * 0.28, fx: 0.00029, fy: 0.00013, px: 4, py: 1 },
    ];
    let fx = w / 2, fy = h / 2;
    return (t) => {
      ctx.fillStyle = "rgba(16,24,21,.3)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const cr = cv.getBoundingClientRect();
      fx = lerp(fx, clamp(mouse.x - cr.left, 0, w), 0.03);
      fy = lerp(fy, clamp(mouse.y - cr.top, 0, h), 0.03);
      blobs.forEach((b, i) => {
        const x = i === 0 ? fx : w * (0.5 + 0.34 * Math.sin(t * b.fx + b.px));
        const y = i === 0 ? fy : h * (0.5 + 0.3 * Math.cos(t * b.fy + b.py));
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, b.c + (i === 0 ? ".4)" : ".25)"));
        g.addColorStop(1, b.c + "0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, b.r, 0, 7); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    };
  }, []);
  useLazyCanvas(cardRef, init);
  return (
    <Reveal className="exp-card liquid">
      <div ref={cardRef} style={{ position: "absolute", inset: 0 }}>
        <span className="exp-tag">Specimen 02</span>
        <div className="exp-stage"><canvas /></div>
        <div className="exp-label">
          <b>LIQUID LIGHT</b>
          <span>A slow glow that leans toward you.</span>
        </div>
      </div>
    </Reveal>
  );
}

function MagneticType() {
  const cardRef = useRef(null);
  const wordRef = useRef(null);
  const init = useCallback((card) => {
    const word = wordRef.current;
    const letters = [...word.children].map((el) => ({ el, x: 0, y: 0 }));
    return () => {
      const cr = card.getBoundingClientRect();
      const inside =
        mouse.x > cr.left - 60 && mouse.x < cr.right + 60 &&
        mouse.y > cr.top - 60 && mouse.y < cr.bottom + 60;
      for (const L of letters) {
        const r = L.el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        let tx = 0, ty = 0;
        if (inside) {
          const dx = mouse.x - cx, dy = mouse.y - cy;
          const d = Math.hypot(dx, dy) || 1;
          const pull = clamp(90 / d, 0, 1.6) * 14;
          tx = (dx / d) * pull; ty = (dy / d) * pull;
        }
        L.x = lerp(L.x, tx, 0.1); L.y = lerp(L.y, ty, 0.1);
        L.el.style.transform = `translate(${L.x.toFixed(1)}px,${L.y.toFixed(1)}px)`;
      }
    };
  }, []);
  useLazyCanvas(cardRef, init);
  return (
    <Reveal className="exp-card">
      <div ref={cardRef} style={{ position: "absolute", inset: 0 }}>
        <span className="exp-tag">Specimen 03</span>
        <div className="exp-type" aria-hidden="true" ref={wordRef}>
          {"GRAVITY".split("").map((ch, i) => <span key={i}>{ch}</span>)}
        </div>
        <div className="exp-label">
          <b>MAGNETIC TYPE</b>
          <span>Letters with a quiet gravity.</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function Experiments() {
  return (
    <section id="experiments" className="scene scene-white" aria-label="Experiments">
      <div className="shell">
        <Reveal as="h2" className="sec-h">Experiments<em>.</em></Reveal>
        <Reveal as="p" className="sec-sub">
          Small interactive studies — move your cursor through them.
        </Reveal>
        <div className="exp-grid">
          <ParticleField />
          <LiquidLight />
          <MagneticType />
        </div>
      </div>
    </section>
  );
}
