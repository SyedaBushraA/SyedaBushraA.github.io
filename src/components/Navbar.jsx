import { useEffect, useState } from "react";
import { site } from "../data/site.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 50);
    addEventListener("scroll", on, { passive: true });
    on();
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a className="nav-logo" href="#top">
        syeda bushra banu<em>.</em>
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-hire" href={`mailto:${site.email}`}>
        Hire Me
      </a>
    </header>
  );
}
