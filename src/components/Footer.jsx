import { site } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="scene scene-panel">
      <div className="shell">
        <div className="spec-row">
          <div><b>What</b><span>{site.role}</span></div>
          <div><b>Where</b><span>{site.location}</span></div>
          <div><b>Reach</b><a href={`mailto:${site.email}`}>{site.email}</a></div>
        </div>
        <div className="foot-word" aria-hidden="true">syeda bushra banu<i>.</i></div>
        <div className="foot-base">
          <span>© 2026 SYEDA BUSHRA BANU</span>
          <nav aria-label="Footer links">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                {...(s.url.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <span>Designed &amp; built with curiosity.</span>
        </div>
      </div>
    </footer>
  );
}
