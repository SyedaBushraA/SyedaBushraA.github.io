import { useEffect, useState } from "react";

// Red curtain with a water-fill wordmark, then a shutter lift — once per visit.
export default function Preloader({ name }) {
  const [lift, setLift] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLift(true), 2200);
    const t2 = setTimeout(() => setGone(true), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div id="preloader" className={lift ? "lift" : ""} aria-hidden="true">
      <span className="pre-word">
        {name}
        <i>{name}</i>
      </span>
    </div>
  );
}
