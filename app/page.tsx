"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

const projects = [
  ["01", "Smart Ambulance", "AI / COMPUTER VISION / IoT", "An intelligent traffic system designed to create a clear path for emergency vehicles."],
  ["02", "Zenvy", "VOICE / LLM / MEMORY", "AI voice-agent infrastructure for practical, low-latency conversations and automation."],
  ["03", "MAITRI", "EDGE AI / SPACE", "An offline AI companion concept designed for resilient edge inference."],
  ["04", "MedSecure AI", "BLOCKCHAIN / HEALTHCARE", "A medicine-authenticity concept using QR verification and tamper-resistant records."],
  ["05", "Vision Lab", "COMPUTER VISION", "Experiments with facial landmarks, movement and vision-assisted rehabilitation."],
  ["06", "Smart Healthcare IoT", "EMBEDDED / IoT", "Real-time health telemetry experiments with connected sensors and microcontrollers."],
];

const skills = ["Python", "C / C++", "Computer Vision", "LLMs", "FastAPI", "ESP32", "IoT", "Robotics", "Edge AI", "Supabase"];
const phone = "9019935723";

export default function Home() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [hits, setHits] = useState(0);
  const [target, setTarget] = useState({ x: 58, y: 42 });
  const [unlocked, setUnlocked] = useState(false);

  const moveTarget = useCallback(() => {
    setTarget({ x: 12 + Math.random() * 76, y: 12 + Math.random() * 68 });
  }, []);

  function hitTarget() {
    const next = hits + 1;
    setHits(next);
    if (next >= 5) {
      setUnlocked(true);
      return;
    }
    moveTarget();
  }

  function resetGame() {
    setHits(0);
    setUnlocked(false);
    setGameOpen(true);
    moveTarget();
  }

  useEffect(() => {
    if (!gameOpen || unlocked) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGameOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameOpen, unlocked]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      const response = await fetch("/api/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email }),
      });
      if (!response.ok) throw new Error();
      setMessage("");
      setEmail("");
      setSent(true);
    } catch {
      setSent(false);
    } finally {
      setSending(false);
    }
  }

  const contactLabel = useMemo(() => unlocked ? "CONTACT UNLOCKED" : "PLAY TO UNLOCK", [unlocked]);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="logo">SGP<span>.</span></a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-topline">
          <div className="eyebrow">AI / ML / ROBOTICS / SOFTWARE</div>
          <div className="hero-stamp">BASED IN INDIA <span>●</span> AVAILABLE FOR COOL PROBLEMS</div>
        </div>
        <h1>SHIVAKUMAR<br /><span>GOUDA S PATIL</span></h1>
        <div className="hero-bottom">
          <p>I build useful things with AI, software and connected systems.</p>
          <a className="circle-arrow" href="#work" aria-label="Scroll to work">↓</a>
        </div>
      </section>

      <section className="statement">
        <div className="statement-mark">✳</div>
        <p className="eyebrow">A LITTLE ABOUT THE WORK</p>
        <h2>Curious by default.<br /><em>Practical by choice.</em></h2>
      </section>

      <section className="work" id="work">
        <div className="section-top">
          <p className="eyebrow">01 / SELECTED WORK</p>
          <p>Projects across AI, computer vision, embedded systems and software.</p>
        </div>

        <div className="project-list">
          {projects.map(([number, title, kicker, text]) => (
            <a className="project" href="https://github.com/Shivakumarcr7" target="_blank" rel="noreferrer" key={number}>
              <div className="project-number">{number}</div>
              <div className="project-main">
                <p className="eyebrow">{kicker}</p>
                <h3>{title}</h3>
                <p className="project-description">{text}</p>
              </div>
              <div className="project-link">↗</div>
            </a>
          ))}
        </div>
      </section>

      <section className="skills">
        <p className="eyebrow">02 / TOOLKIT</p>
        <div className="skill-grid">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image-wrap">
          <div className="photo-note">THAT&apos;S ME ↘</div>
          <img src="/photos/shivu-acd26.jpeg" alt="Shivakumar Gouda S Patil" className="about-image" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">03 / ABOUT</p>
          <h2>Human first.<br /><em>Engineer second.</em></h2>
          <p>I am an AIML student and builder who likes turning ideas into working systems. I enjoy the space between software, AI, hardware and real-world problems.</p>
          <div className="facts">
            <div><span>Education</span><strong>PESCE / AIML / 2023–27</strong></div>
            <div><span>Experience</span><strong>Zenvy / AI Engineering Intern</strong></div>
            <div><span>Based</span><strong>India</strong></div>
          </div>
        </div>
      </section>

      <section className="game-section" id="game">
        <div>
          <p className="eyebrow">04 / HIDDEN CONTACT</p>
          <h2>Want my number?<br /><em>Earn it.</em></h2>
          <p className="game-copy">Catch 5 signals. That&apos;s it. No boss fight.</p>
        </div>
        <button className="game-launch" onClick={resetGame}>{unlocked ? "NUMBER UNLOCKED ✓" : "START MINI-GAME ↗"}</button>
      </section>

      <section className="contact" id="contact">
        <p className="eyebrow">05 / CONTACT</p>
        <h2>LET&apos;S BUILD<br /><em>SOMETHING.</em></h2>
        <div className="contact-grid">
          <div>
            <p className="contact-kicker">{contactLabel}</p>
            {unlocked ? (
              <a className="phone" href={`tel:${phone}`}>{phone}</a>
            ) : (
              <button className="locked-phone" onClick={() => document.getElementById("game")?.scrollIntoView({ behavior: "smooth" })}>🔒 +91 ••••• •••••</button>
            )}
            <a className="email" href="mailto:patilshivakumarcr7@gmail.com">patilshivakumarcr7@gmail.com</a>
            <div className="socials">
              <a href="https://github.com/Shivakumarcr7" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/shivu7" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <form onSubmit={submit} className="signal-form">
            <p className="eyebrow">LEAVE A SIGNAL</p>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you working on?" rows={4} required />
            <div className="form-row">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" />
              <button disabled={sending}>{sending ? "SENDING..." : sent ? "SENT ✓" : "SEND ↗"}</button>
            </div>
            {sent && <small>Thanks — your message was received.</small>}
          </form>
        </div>
        <footer><span>© 2026 SHIVAKUMAR GOUDA S PATIL</span><span>BUILT WITH NEXT.JS</span></footer>
      </section>

      {gameOpen && (
        <div className="game-overlay" role="dialog" aria-modal="true" aria-label="Catch the signal game">
          <div className="game-card">
            <button className="game-close" onClick={() => setGameOpen(false)} aria-label="Close game">ESC ×</button>
            {!unlocked ? (
              <>
                <p className="eyebrow">CATCH THE SIGNAL</p>
                <h2>5 hits to unlock.</h2>
                <div className="game-meta"><span>{hits} / 5</span><span>CLICK THE DOT</span></div>
                <div className="game-board">
                  <button
                    className="signal-dot"
                    style={{ left: `${target.x}%`, top: `${target.y}%` }}
                    onClick={hitTarget}
                    aria-label="Catch signal"
                  />
                  <div className="game-cross cross-a" />
                  <div className="game-cross cross-b" />
                </div>
              </>
            ) : (
              <div className="unlocked-card">
                <div className="unlock-symbol">✦</div>
                <p className="eyebrow">CONTACT UNLOCKED</p>
                <h2>Nice. Here&apos;s the number.</h2>
                <a className="unlocked-number" href={`tel:${phone}`}>+91 {phone}</a>
                <button className="play-again" onClick={resetGame}>PLAY AGAIN</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
