import { useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import { reduced, ghostDrift } from "../hooks.js";

// Film-title-card hero: media fills the viewport, text hugs the lower left.
// With no showreel video set, a slow near-monochrome canvas drift stands in.
export default function Hero() {
  const bgRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (site.heroVideo) return; // video element renders instead
    const bg = bgRef.current, canvas = canvasRef.current;
    if (!bg || !canvas) return;
    const ctx = canvas.getContext("2d");
    let hw = 0, hh = 0, alive = true;
    const blobs = [
      { c: "rgba(34,72,60,", r: 0.6, fx: 0.00013, fy: 0.00009, px: 0, py: 2 },
      { c: "rgba(64,105,90,", r: 0.42, fx: 0.00009, fy: 0.00016, px: 2, py: 4 },
      { c: "rgba(233,91,47,", r: 0.3, fx: 0.00007, fy: 0.00011, px: 4, py: 1 },
    ];
    const size = () => {
      hw = bg.offsetWidth; hh = bg.offsetHeight;
      canvas.width = hw; canvas.height = hh;
    };
    size();
    addEventListener("resize", size);
    const tick = (t) => {
      ctx.fillStyle = "rgba(16,32,26,.18)";
      ctx.fillRect(0, 0, hw, hh);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b, i) => {
        const x = hw * (0.5 + 0.38 * Math.sin(t * b.fx + b.px));
        const y = hh * (0.5 + 0.34 * Math.cos(t * b.fy + b.py));
        const r = Math.max(hw, hh) * b.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, b.c + (i === 2 ? ".05)" : ".1)"));
        g.addColorStop(1, b.c + "0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    };
    if (reduced) { tick(0); return () => removeEventListener("resize", size); }
    (function loop(t) {
      if (!alive) return;
      ghostDrift(t || 0);
      if (scrollY < innerHeight * 1.2) tick(t || 0);
      requestAnimationFrame(loop);
    })(0);
    return () => { alive = false; removeEventListener("resize", size); };
  }, []);

  const onReel = () => {
    const v = videoRef.current;
    if (v) {
      if (v.paused) { v.play(); setPlaying(true); }
      else { v.pause(); setPlaying(false); }
    } else {
      document.getElementById("work")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <section className="hero scene scene-black" aria-label="Introduction">
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        {site.heroVideo ? (
          <video
            ref={videoRef}
            muted loop playsInline preload="metadata"
            poster={site.heroPoster || undefined}
            src={site.heroVideo}
          />
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
      <div className="hero-content">
        <h1>
          Hi, I'm {site.name}.<br />
          <span className="stroke">{site.role}</span>
        </h1>
        <p className="hero-sub">
          Building healthcare platforms with Python, TypeScript &amp; React — {site.location}.
        </p>
        <div className="hero-ctas">
          <a className="btn-solid" href="#work">View My Work</a>
          <a className="btn-glass" href={`mailto:${site.email}`}>Hire Me</a>
        </div>
      </div>
      <div className="reel-wrap">
        <button
          className="reel-btn"
          onClick={onReel}
          aria-label={site.heroVideo ? "Play showreel" : "Scroll to selected work"}
        >
          {site.heroVideo ? (playing ? "❚❚" : "▶") : "▶"}
        </button>
        <span className="reel-cap">{site.heroVideo ? "Play Reel" : "Enter"}</span>
      </div>
      <svg className="hero-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
      </svg>
    </section>
  );
}
