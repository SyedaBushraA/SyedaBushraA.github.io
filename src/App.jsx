import { useEffect, useState } from "react";
import { site } from "./data/site.js";
import { reduced } from "./hooks.js";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import About from "./components/About.jsx";
import Work from "./components/Work.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Experiments from "./components/Experiments.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import CaseStudy from "./components/CaseStudy.jsx";

// Show the preloader once per browser session; storage may be blocked — never fatal.
function shouldPreload() {
  if (reduced) return false;
  try {
    const seen = !!sessionStorage.getItem("bb-pre");
    sessionStorage.setItem("bb-pre", "1");
    return !seen;
  } catch (e) {
    return true;
  }
}

export default function App() {
  const [preload] = useState(shouldPreload);
  const [caseIndex, setCaseIndex] = useState(null);

  useEffect(() => {
    if (preload) {
      document.documentElement.classList.add("pre");
      const t = setTimeout(
        () => document.documentElement.classList.remove("pre"),
        4500
      );
      return () => clearTimeout(t);
    }
  }, [preload]);

  return (
    <>
      {preload && <Preloader name="syeda bushra banu" />}
      <Navbar />
      <main id="top">
        <Hero />
        <Intro />
        <About />
        <Work onOpen={setCaseIndex} />
        <Skills />
        <Experience />
        <Experiments />
        <Contact />
      </main>
      <Footer />
      <CaseStudy
        index={caseIndex}
        onClose={() => setCaseIndex(null)}
        onNext={(i) => setCaseIndex(i)}
      />
    </>
  );
}
