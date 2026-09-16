// Shared utilities: reduced-motion flag, pointer state, reveal + scroll hooks.
import { useEffect, useRef } from "react";

export const reduced =
  typeof matchMedia !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isMobile = () =>
  typeof matchMedia !== "undefined" && matchMedia("(max-width: 900px)").matches;

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// One shared pointer state; a gentle drift stands in on touch devices.
export const mouse = {
  x: typeof innerWidth !== "undefined" ? innerWidth / 2 : 0,
  y: typeof innerHeight !== "undefined" ? innerHeight / 2 : 0,
  real: false,
};
if (typeof addEventListener !== "undefined") {
  addEventListener(
    "pointermove",
    (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.real = true;
    },
    { passive: true }
  );
}
export function ghostDrift(t) {
  if (mouse.real) return;
  mouse.x = innerWidth * (0.5 + 0.32 * Math.sin(t * 0.00013));
  mouse.y = innerHeight * (0.5 + 0.26 * Math.cos(t * 0.00009));
}

// Adds the .in class once the element scrolls into view (AOS-style, once).
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// rAF-throttled scroll+resize callback. fn(isReducedInitialCall)
export function useScrollFx(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (reduced) {
      fnRef.current(true);
      return;
    }
    let ticking = false;
    const on = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          fnRef.current(false);
          ticking = false;
        });
      }
    };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    fnRef.current(false);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
}

// Canvas experiment runner: initializes when visible, animates while visible,
// draws one static frame under reduced motion.
export function useLazyCanvas(cardRef, init) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let running = false,
      started = false,
      tick = null,
      alive = true;
    const obs = new IntersectionObserver(
      (entries) => {
        const en = entries[entries.length - 1];
        if (!en.isIntersecting) {
          running = false;
          return;
        }
        if (!started) {
          started = true;
          tick = init(card);
          if (reduced) {
            tick(0);
            return;
          }
        }
        if (reduced) return;
        if (!running) {
          running = true;
          loop(0);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(card);
    function loop(t) {
      if (!alive || !running || !tick) return;
      tick(t || 0);
      requestAnimationFrame(loop);
    }
    return () => {
      alive = false;
      running = false;
      obs.disconnect();
    };
  }, [cardRef, init]);
}
