import { useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import { reduced } from "../hooks.js";
import Reveal from "./Reveal.jsx";

// Solid-red scene; the identity card drops in on its lanyard and
// straightens when you pick it up (hover).
export default function About() {
  const badgeRef = useRef(null);
  const [dropped, setDropped] = useState(false);
  const [settled, setSettled] = useState(false);
  const [photoOk, setPhotoOk] = useState(true);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    if (reduced) { setDropped(true); setSettled(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) {
          setDropped(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tel = "tel:" + site.phone.replace(/[^+\d]/g, "");

  return (
    <>
      <section id="about" className="scene scene-red" aria-label="About"
        style={{ paddingBottom: "clamp(60px,9vh,110px)" }}>
        <span className="pulse-star" style={{ top: "12%", right: "8%" }} aria-hidden="true">✦</span>
        <span className="pulse-star" style={{ bottom: "16%", left: "6%", animationDelay: "1s" }} aria-hidden="true">✦</span>
        <div className="shell">
          <Reveal as="h2" className="sec-h">Who am I<em>.</em></Reveal>
          <div className="about-grid">
            <Reveal className="badge-col">
              <div className="lanyard" aria-hidden="true"></div>
              <div
                ref={badgeRef}
                className={`badge${dropped ? " in" : ""}${settled ? " settled" : ""}`}
                onAnimationEnd={() => setSettled(true)}
              >
                <div className="badge-hole" aria-hidden="true"></div>
                <div className="badge-photo">
                  {site.portrait && photoOk ? (
                    <img
                      src={site.portrait}
                      alt={`Portrait of ${site.name}`}
                      /* If the photo file is missing, fall back to the initials card instead of a broken image. */
                      onError={() => setPhotoOk(false)}
                    />
                  ) : (
                    <div className="badge-fallback" role="img"
                      aria-label="Placeholder portrait with initials SB">
                      <b>SB</b>
                      <span>your photo here</span>
                    </div>
                  )}
                </div>
                <div className="badge-name">{site.name}</div>
                <div className="badge-role">{site.role}</div>
              </div>
            </Reveal>
            <Reveal className="about-copy">
              <p>
                I'm <strong>{site.name}</strong>, a full stack developer in Hyderabad.
                By day I build the operations platform of Today's Dental Services, a
                multi-clinic dental group — a staff training portal, a bank-reconciliation
                engine, a provider-credentialing system, and the clinic websites patients
                see first.
              </p>
              <p>
                I enjoy building things people actually rely on: <strong>role-based
                dashboards, booking systems, payment flows, matching engines</strong> — and
                I care that the code underneath is clean and maintainable enough for the
                next person who reads it.
              </p>
              <p>
                Before software I earned an NCC 'C' certificate, represented my unit at a
                national camp, and took silver at a state wrestling championship — so{" "}
                <strong>discipline and follow-through</strong> came before the first line
                of code.
              </p>
              <div className="about-facts">
                <div><b>Based in</b><span>{site.location}</span></div>
                <div><b>Currently</b><span>Full Stack Developer, Today's Dental Services</span></div>
                <div><b>Education</b><span>MCA, Mesco Institute (2025)</span></div>
                <div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
                <div><b>Phone</b><a href={tel}>{site.phone}</a></div>
                <div><b>Focus</b><span>Python · TypeScript · React · PostgreSQL</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <div className="torn" aria-hidden="true">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,64 L0,40 C90,24 170,48 260,32 C350,16 430,44 520,30 C610,16 690,46 780,32 C870,18 950,44 1040,28 C1130,14 1210,42 1300,30 C1360,22 1400,34 1440,26 L1440,64 Z"></path>
        </svg>
      </div>
    </>
  );
}
