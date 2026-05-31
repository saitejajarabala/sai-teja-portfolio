"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

// GitHub Pages serves from /sai-teja-portfolio/ in production.
// We use a relative path so it resolves correctly regardless of basePath.
const VIDEO_PATH = "media/portfolio-intro.mp4";

const ROLES = ["AI Researcher", "Systems Engineer", "FPGA Developer", "CPS Researcher"];

export default function VideoIntro() {
  const rootRef  = useRef(null);
  const videoRef = useRef(null);
  const bgRef    = useRef(null);
  const hintRef  = useRef(null);

  const [muted,    setMuted]    = useState(true);
  const [playing,  setPlaying]  = useState(true);
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [vidError, setVidError] = useState(false);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(`.${styles.videoWrap}`,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.9, ease: "expo.out" }, 0
      );

      tl.fromTo(
        [`.${styles.eyebrow}`, `.${styles.firstName}`, `.${styles.lastName}`,
         `.${styles.subtitle}`, `.${styles.chips}`, `.${styles.cta}`],
        { y: 36, opacity: 0, filter: "blur(16px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.15,
          ease: "power3.out", stagger: 0.1 },
        0.18
      );

      tl.fromTo(`.${styles.logoStrip}`,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.85
      );

      tl.fromTo(`.${styles.scrollCue}`,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.3
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ── Auto-hide sound hint ── */
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => {
      if (hintRef.current) {
        gsap.to(hintRef.current, {
          opacity: 0, y: 6, duration: 0.4,
          onComplete: () => setShowHint(false),
        });
      }
    }, 4500);
    return () => clearTimeout(t);
  }, [showHint]);

  /* ── Role cycling ── */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  /* ── Controls ── */
  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
    if (bgRef.current)    bgRef.current.muted    = next;
    setShowHint(false);
  }, [muted]);

  const togglePlay = useCallback(async () => {
    const vid = videoRef.current;
    const bg  = bgRef.current;
    if (!vid) return;
    if (vid.paused) {
      await Promise.all([vid.play(), bg?.play()].filter(Boolean));
      setPlaying(true);
    } else {
      vid.pause();
      bg?.pause();
      setPlaying(false);
    }
  }, []);

  const scrollNext = useCallback(() => {
    document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className={styles.hero} ref={rootRef} aria-label="Portfolio hero">

      {/* Ambient blurred BG — using relative path, no basePath prefix needed */}
      <video
        ref={bgRef}
        className={styles.ambientBg}
        src={VIDEO_PATH}
        autoPlay muted loop playsInline preload="auto"
        aria-hidden="true"
        onError={() => setVidError(true)}
      />

      <div className={styles.overlay}        aria-hidden="true" />
      <div className={styles.overlayVignette} aria-hidden="true" />

      <CinematicLayer />

      <div className={styles.grid}>

        {/* ── LEFT copy ── */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>AI · Cybersecurity · Embedded Intelligence</p>

          <h1 className={styles.name}>
            <span className={styles.firstName}>Sai Teja</span>
            <span className={styles.lastName}>Jarabala</span>
          </h1>

          <p className={styles.subtitle}>
            Computer Engineer building intelligent, secure systems at the intersection
            of machine learning, cyber-physical security, FPGA acceleration,
            and real-time signal intelligence.
          </p>

          <div className={styles.chips}>
            {["ML-Based IDS", "FPGA Systems", "Secure CPS", "PQC Accelerator", "AWS Cloud"].map(c => (
              <span key={c} className={styles.chip}>{c}</span>
            ))}
          </div>

          <div className={styles.cta}>
            <a href="mailto:jarabalasaiteja@gmail.com" className={styles.btnPrimary}>
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="https://github.com/saitejajarabala" target="_blank"
              rel="noopener noreferrer" className={styles.btnGhost}>
              GitHub ↗
            </a>
          </div>

          <div className={styles.logoStrip} aria-label="Technology focus areas">
            {[
              { mark: "AI",  label: "Machine Learning" },
              { mark: "FP",  label: "FPGA / Zynq" },
              { mark: "AWS", label: "Cloud" },
              { mark: "PY",  label: "Python" },
              { mark: "PQC", label: "Post-Quantum" },
              { mark: "CPS", label: "Cyber-Physical" },
            ].map(({ mark, label }) => (
              <div key={mark} className={styles.logoPill}>
                <b className={styles.pillMark}>{mark}</b>
                <span className={styles.pillLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT video card ── */}
        <div className={styles.videoWrap}>
          <div className={styles.videoCard}>
            {vidError ? (
              <div className={styles.videoFallback}>
                <span>▶ Video unavailable</span>
              </div>
            ) : (
              <video
                ref={videoRef}
                className={styles.mainVideo}
                src={VIDEO_PATH}
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="auto"
                onError={() => setVidError(true)}
              />
            )}

            <div className={styles.cardTopGrad}    aria-hidden="true" />
            <div className={styles.cardBottomGrad} aria-hidden="true" />
            <div className={styles.cardGlow}       aria-hidden="true" />

            {/* Role badge */}
            <div className={styles.roleBadge} aria-live="polite">
              <span className={styles.roleDot} aria-hidden="true" />
              {ROLES[roleIdx]}
            </div>

            {/* Controls */}
            <div className={styles.controls} role="group" aria-label="Video controls">
              <button className={styles.ctrlBtn} onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}>
                {playing
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
                }
                {playing ? "Pause" : "Play"}
              </button>

              <button className={styles.ctrlBtn} onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}>
                {muted
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                  : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                }
                {muted ? "Sound" : "Mute"}
              </button>
            </div>
          </div>

          <div className={styles.cardRingGlow} aria-hidden="true" />
        </div>
      </div>

      {showHint && (
        <button ref={hintRef} className={styles.soundHint}
          onClick={toggleMute} aria-label="Tap to unmute video">
          <span className={styles.hintPulse} aria-hidden="true" />
          Tap for sound
        </button>
      )}

      <button className={styles.scrollCue} onClick={scrollNext}
        aria-label="Scroll to featured work">
        <span className={styles.scrollLine} aria-hidden="true" />
      </button>

      <div className={styles.barTop}    aria-hidden="true" />
      <div className={styles.barBottom} aria-hidden="true" />
    </section>
  );
}
