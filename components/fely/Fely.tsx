"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import FelyChat from "./FelyChat";

type FelyState = "idle" | "sitting" | "walking" | "excited" | "thinking";
type Overlay = "none" | "hover" | "ghost";
type Point = { x: number; y: number };

const SIZE = 48;
const FOLLOW_RADIUS = 70; // Fely trails the cursor at this distance (center to center)
const EDGE = 4; // keep Fely this far inside the viewport
const HIT_INSET = 6; // the sprite doesn't fill its box corners
const SLEEP_AFTER = 3000;
const SLEEP_BUBBLE = "zZz 😴";

// Anything that should always win a click over Fely
const INTERACTIVE = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[role='button']",
  "[role='link']",
  "[contenteditable='']",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-fely-chat]",
].join(",");

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ── Hand-drawn cat sprite, four expressions ────────────────────────────────────
function FelySprite({ state }: { state: FelyState }) {
  const body = "#F4C542";
  const dark = "#D4A520";
  const pink = "#F9A8A8";
  const nose = "#E8845A";
  const black = "#1a1814";
  const violet = "#8b5cf6";
  const violetSoft = "#c4b5fd";
  const cyan = "#22d3ee";

  const moving = state === "walking" || state === "excited";

  return (
    <svg width={SIZE} height={SIZE} viewBox="0 0 48 48" style={{ display: "block" }}>
      {/* Body */}
      <ellipse cx="24" cy="34" rx="11" ry="9" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* Head */}
      <circle cx="24" cy="20" r="11" fill={body} stroke={dark} strokeWidth="1.5" />

      {/* Ears */}
      <polygon points="14,13 10,4 18,11" fill={body} stroke={dark} strokeWidth="1.2" />
      <polygon points="34,13 38,4 30,11" fill={body} stroke={dark} strokeWidth="1.2" />
      <polygon points="14,12 11,6 17,11" fill={pink} opacity="0.75" />
      <polygon points="34,12 37,6 31,11" fill={pink} opacity="0.75" />

      {/* Eyes */}
      {state === "idle" ? (
        <>
          <path d="M19 19 Q21 17 23 19" stroke={black} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M25 19 Q27 17 29 19" stroke={black} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <text x="32" y="12" fontSize="7" fill={violetSoft} fontFamily="monospace">z</text>
          <text x="36" y="8" fontSize="5" fill={violetSoft} fontFamily="monospace" opacity="0.6">z</text>
        </>
      ) : state === "excited" ? (
        <>
          <text x="16" y="22" fontSize="9" fill={violet}>★</text>
          <text x="25" y="22" fontSize="9" fill={violet}>★</text>
        </>
      ) : state === "thinking" ? (
        <>
          <circle cx="21" cy="19" r="3" fill={black} />
          <circle cx="27" cy="18" r="3" fill={black} />
          <circle cx="22" cy="18" r="1" fill="white" />
          <circle cx="28" cy="17" r="1" fill="white" />
          <circle cx="38" cy="10" r="2" fill={violetSoft} opacity="0.9" />
          <circle cx="42" cy="7" r="1.5" fill={violetSoft} opacity="0.6" />
          <circle cx="45" cy="5" r="1" fill={violetSoft} opacity="0.3" />
        </>
      ) : (
        <>
          <circle cx="21" cy="19" r="3" fill={black} />
          <circle cx="27" cy="19" r="3" fill={black} />
          <circle cx="22" cy="18" r="1" fill="white" />
          <circle cx="28" cy="18" r="1" fill="white" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="24" cy="23" rx="2.5" ry="1.5" fill={nose} />

      {/* Mouth */}
      {state === "excited" ? (
        <path d="M21 25 Q24 28 27 25" stroke={dark} strokeWidth="1.2" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M22 24.5 Q24 26 26 24.5" stroke={dark} strokeWidth="1" strokeLinecap="round" fill="none" />
      )}

      {/* Whiskers */}
      <line x1="12" y1="22" x2="20" y2="23" stroke={dark} strokeWidth="0.7" opacity="0.5" />
      <line x1="12" y1="24" x2="20" y2="24" stroke={dark} strokeWidth="0.7" opacity="0.5" />
      <line x1="28" y1="23" x2="36" y2="22" stroke={dark} strokeWidth="0.7" opacity="0.5" />
      <line x1="28" y1="24" x2="36" y2="24" stroke={dark} strokeWidth="0.7" opacity="0.5" />

      {/* Tail */}
      {moving ? (
        <g style={{ transformOrigin: "35px 38px", animation: "tail-wag 0.5s ease-in-out infinite" }}>
          <path d="M35 38 Q44 30 40 20" stroke={dark} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <path d="M13 40 Q4 36 8 28" stroke={dark} strokeWidth="3" strokeLinecap="round" fill="none" />
      )}

      {/* Walking legs */}
      {state === "walking" && (
        <>
          <line x1="18" y1="41" x2="14" y2="47" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="22" y1="42" x2="20" y2="47" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="42" x2="28" y2="47" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="41" x2="34" y2="47" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* Excited sparkles */}
      {state === "excited" && (
        <>
          <text x="2" y="12" fontSize="9" fill={cyan}>✦</text>
          <text x="36" y="8" fontSize="7" fill={violet}>✦</text>
        </>
      )}
    </svg>
  );
}

// ── Speech bubble ─────────────────────────────────────────────────────────────
function Bubble({ text, color, alignRight }: { text: string; color: string; alignRight: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-full z-10 mb-1.5 whitespace-nowrap",
        alignRight ? "right-0" : "left-1/2 -translate-x-1/2",
      )}
    >
      <div
        className={cn(
          "fely-bubble border border-white/10 bg-[#0d0d17]/95 px-2.5 py-1.5 font-mono text-[11px] backdrop-blur-sm",
          alignRight ? "rounded-xl rounded-br-sm" : "rounded-xl rounded-bl-sm",
        )}
        style={{ color }}
      >
        {text}
      </div>
    </div>
  );
}

// ── Main Fely component ───────────────────────────────────────────────────────
// • Trails the cursor at a distance instead of sitting under it.
// • Never blocks the page: it's pointer-events:none, and a click on it only opens
//   the chat when nothing interactive sits underneath ("smart pass-through").
// • Freezes while the mouse button is held (text selection, drags).
// • Perches on the chat panel while it's open, and on the "ask fely" button on
//   touch devices / reduced motion.
export default function Fely() {
  const [felyState, setFelyState] = useState<FelyState>("idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [bubble, setBubble] = useState<string | null>("hey there! 👋");
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [nearRightEdge, setNearRightEdge] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLButtonElement>(null);

  const posRef = useRef<Point | null>(null);
  const cursorRef = useRef<(Point & { interactive: boolean; inside: boolean }) | null>(null);
  const downRef = useRef<Point | null>(null);
  const heldRef = useRef(false);
  const roamRef = useRef(false);
  const reducedRef = useRef(false);
  const lastActiveRef = useRef(0);
  const stateRef = useRef<FelyState>("idle");
  const chatOpenRef = useRef(false);
  const overlayRef = useRef<Overlay>("none");
  const edgeRef = useRef(false);
  const bubbleRef = useRef<string | null>("hey there! 👋");
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeState = useCallback((s: FelyState) => {
    stateRef.current = s;
    setFelyState(s);
  }, []);

  const showBubble = useCallback((text: string | null, ms = 2000) => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleRef.current = text;
    setBubble(text);
    if (text) {
      bubbleTimer.current = setTimeout(() => {
        bubbleRef.current = null;
        setBubble(null);
      }, ms);
    }
  }, []);

  // Roam only with a real mouse and when motion is welcome
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedRef.current = reduced.matches;
      roamRef.current = fine.matches && !reduced.matches;
    };
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Hide the greeting bubble after a while
  useEffect(() => {
    bubbleTimer.current = setTimeout(() => showBubble(null), 4000);
    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [showBubble]);

  // Movement loop — writes the transform straight to the DOM, no re-render per frame
  useEffect(() => {
    let raf: number;

    const perch = (): Point => {
      const panel = chatOpenRef.current
        ? document.querySelector<HTMLElement>("[data-fely-chat]")
        : null;
      if (panel) {
        const r = panel.getBoundingClientRect();
        return { x: r.left + 12, y: r.top - SIZE + 4 }; // top-left edge, clear of the close button
      }
      if (homeRef.current) {
        const r = homeRef.current.getBoundingClientRect();
        return { x: r.left + 2, y: r.top - SIZE + 6 }; // sitting on the "ask fely" button
      }
      return { x: window.innerWidth - SIZE - 24, y: window.innerHeight - SIZE - 80 };
    };

    const tick = () => {
      const now = performance.now();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cursor = cursorRef.current;
      const roaming = roamRef.current && !chatOpenRef.current && cursor !== null;
      let pos = posRef.current;

      // 1. Where should Fely be?
      let target: Point;
      if (!roaming || !cursor) {
        target = perch();
      } else if (heldRef.current && pos) {
        target = pos; // mouse button held → stay put
      } else {
        const p = pos ?? perch();
        const dx = cursor.x - (p.x + SIZE / 2);
        const dy = cursor.y - (p.y + SIZE / 2);
        const d = Math.hypot(dx, dy);
        // Stop on the line toward the cursor, FOLLOW_RADIUS short of it → always behind you
        target =
          d > FOLLOW_RADIUS
            ? { x: p.x + dx * (1 - FOLLOW_RADIUS / d), y: p.y + dy * (1 - FOLLOW_RADIUS / d) }
            : p;
      }
      target = {
        x: clamp(target.x, EDGE, vw - SIZE - EDGE),
        y: clamp(target.y, EDGE, vh - SIZE - EDGE),
      };

      // 2. Ease toward it (snap on the first frame and under reduced motion)
      if (!pos) pos = target;
      const ease = reducedRef.current ? 1 : 0.06;
      const gap = Math.hypot(target.x - pos.x, target.y - pos.y);
      const walking = gap > 2;
      if (gap > 0.5) {
        const stepX = (target.x - pos.x) * ease;
        pos = { x: pos.x + stepX, y: pos.y + (target.y - pos.y) * ease };
        if (flipRef.current && Math.abs(stepX) > 0.3) {
          flipRef.current.style.transform = stepX < 0 ? "scaleX(-1)" : "scaleX(1)";
        }
      }
      posRef.current = pos;
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      // 3. Expression — driven by Fely's own movement, not the mouse
      if (!chatOpenRef.current) {
        const s = stateRef.current;
        if (walking) lastActiveRef.current = now;
        let next: FelyState;
        if (walking) next = "walking";
        else if (now - lastActiveRef.current > SLEEP_AFTER) next = "idle";
        else next = "sitting";

        if (next !== s) {
          if (next === "idle" && (s === "walking" || s === "sitting")) showBubble(SLEEP_BUBBLE);
          if (s === "idle" && bubbleRef.current === SLEEP_BUBBLE) showBubble(null);
          changeState(next);
        }
      }

      // 4. Hover feedback: fade if something clickable is underneath, else invite a click
      let nextOverlay: Overlay = "none";
      if (
        cursor?.inside &&
        cursor.x >= pos.x + HIT_INSET &&
        cursor.x <= pos.x + SIZE - HIT_INSET &&
        cursor.y >= pos.y + HIT_INSET &&
        cursor.y <= pos.y + SIZE - HIT_INSET
      ) {
        nextOverlay = cursor.interactive ? "ghost" : "hover";
      }
      if (nextOverlay !== overlayRef.current) {
        overlayRef.current = nextOverlay;
        setOverlay(nextOverlay);
        document.documentElement.style.cursor = nextOverlay === "hover" ? "pointer" : "";
      }

      // 5. Keep the speech bubble on screen near the right edge
      const edge = pos.x > vw - 140;
      if (edge !== edgeRef.current) {
        edgeRef.current = edge;
        setNearRightEdge(edge);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, [changeState, showBubble]);

  // Pointer tracking
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !roamRef.current) return;
      const el = e.target instanceof Element ? e.target : null;
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY,
        interactive: !!el?.closest(INTERACTIVE),
        inside: true,
      };
      lastActiveRef.current = performance.now();
    };
    const onDown = (e: PointerEvent) => {
      downRef.current = { x: e.clientX, y: e.clientY };
      if (e.pointerType === "mouse" && e.button === 0) heldRef.current = true;
    };
    const release = () => {
      heldRef.current = false;
    };
    const onLeave = () => {
      if (cursorRef.current) cursorRef.current = { ...cursorRef.current, inside: false };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const openChat = useCallback(() => {
    chatOpenRef.current = true;
    setChatOpen(true);
    changeState("excited");
    showBubble("hi! ask me anything! ✨");
  }, [changeState, showBubble]);

  const closeChat = useCallback(() => {
    chatOpenRef.current = false;
    setChatOpen(false);
    lastActiveRef.current = performance.now();
    changeState("sitting");
    showBubble("see you! 🐾");
  }, [changeState, showBubble]);

  const toggleChat = useCallback(() => {
    if (chatOpenRef.current) closeChat();
    else openChat();
  }, [openChat, closeChat]);

  // Smart pass-through: a click on Fely only counts when nothing interactive is beneath
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.defaultPrevented) return;
      const pos = posRef.current;
      if (!pos) return;
      const { clientX: x, clientY: y } = e;
      if (
        x < pos.x + HIT_INSET ||
        x > pos.x + SIZE - HIT_INSET ||
        y < pos.y + HIT_INSET ||
        y > pos.y + SIZE - HIT_INSET
      )
        return;

      const down = downRef.current;
      if (down && Math.hypot(x - down.x, y - down.y) > 6) return; // it was a drag
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest(INTERACTIVE)) return; // the element underneath wins
      if (window.getSelection()?.toString()) return; // user is selecting text

      toggleChat();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [toggleChat]);

  // Listen for "open-fely" event from CTA buttons
  useEffect(() => {
    document.addEventListener("open-fely", openChat);
    return () => document.removeEventListener("open-fely", openChat);
  }, [openChat]);

  return (
    <>
      {/* Fely sprite — decorative and click-through; the button below is the accessible trigger */}
      <div
        ref={rootRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] select-none"
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          transform: "translate3d(-999px, -999px, 0)", // off-screen until the first frame places it
        }}
      >
        {bubble && (
          <Bubble
            text={bubble}
            alignRight={nearRightEdge}
            color={felyState === "excited" ? "#c4b5fd" : "#67e8f9"}
          />
        )}
        <div
          style={{
            opacity: overlay === "ghost" ? 0.35 : 1,
            transform: overlay === "hover" ? "scale(1.1)" : "none",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          <div ref={flipRef} style={{ transition: "transform 0.2s" }}>
            <FelySprite state={felyState} />
          </div>
        </div>
      </div>

      {/* Persistent, always-findable trigger — also Fely's "home" perch */}
      <button
        ref={homeRef}
        type="button"
        aria-label={chatOpen ? "Close chat" : "Ask Fely"}
        onClick={toggleChat}
        style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
        className="group fixed right-4 z-50 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-[#0d0d17]/90 py-2 pl-2 pr-4 shadow-xl shadow-black/40 backdrop-blur-xl transition hover:border-violet-400/40 sm:right-6"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-lg transition group-hover:rotate-6">
          🐱
        </span>
        <span className="font-mono text-sm text-zinc-200">
          {chatOpen ? "close" : "ask fely"}
        </span>
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && (
          <FelyChat
            onClose={closeChat}
            onThinking={(thinking) => changeState(thinking ? "thinking" : "excited")}
          />
        )}
      </AnimatePresence>
    </>
  );
}
