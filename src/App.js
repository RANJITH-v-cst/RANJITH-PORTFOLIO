import { useState, useEffect, useRef } from "react";

import profileImg from "./pro.png";

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "./resume.pdf";
  link.download = "Ranjith_Resume.pdf";
  link.click();
};

const SECTIONS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const SKILLS = [
  { name: "C#", color: "#9b59b6", bg: "#2d1b45" },
  { name: "Python", color: "#f7d02c", bg: "#2d2800" },
  { name: ".NET", color: "#a78bfa", bg: "#1e1040" },
  { name: "Blazor", color: "#c084fc", bg: "#22103a" },
  { name: "JavaScript", color: "#f0db4f", bg: "#2d2a00" },
  { name: "HTML5", color: "#e44d26", bg: "#3a1200" },
  { name: "CSS3", color: "#6699ff", bg: "#0a1440" },
  { name: "Node Js", color: "#68a063", bg: "#143014" },
  { name: "PHP", color: "#777bb3", bg: "#1e1e3b" },
  { name: "Angular Js", color: "#dd1b16", bg: "#3d0705" },
  { name: "React Js", color: "#61dafb", bg: "#0a2633" },
  { name: "Bootstrap", color: "#563d7c", bg: "#190d2e" },
  { name: "Express Js", color: "#ffffff", bg: "#2d2d2d" },
  { name: "Laravel", color: "#ff2d20", bg: "#420905" },
  { name: "MongoDB", color: "#4db33d", bg: "#0d2b0a" },
  { name: "Supabase", color: "#3ecf8e", bg: "#07301e" },
  { name: "ASP.NET", color: "#818cf8", bg: "#1a0f40" },
  { name: "MudBlazor", color: "#ff6b35", bg: "#3a1500" },
  { name: "Git", color: "#f05032", bg: "#3a0e05" },
  { name: "GitHub", color: "#ffffff", bg: "#1a1a1a" },
  { name: "Postman", color: "#ff6c37", bg: "#3d1808" },
  { name: "Tableau", color: "#e97627", bg: "#3b1e09" },
  { name: "REST API", color: "#61affe", bg: "#0c2040" },
  { name: "SQL", color: "#60a5fa", bg: "#0d1e2b" },
  { name: "Deep Learning", color: "#fb7185", bg: "#3a0a1e" },
  { name: "ZKTeco SDK", color: "#00c6ff", bg: "#003040" },
];

const PROJECTS = [
  {
    title: "Advent T-Report",
    tech: "MEAN Stack · Python · Tally ERP",
    desc: "Developed customised reports in Advent Tally (TReports) to meet business-specific requirements. Designed data extraction/visualisation workflows and automated WhatsApp daily updates.",
    icon: "📈",
    color: "#ff6b35",
  },
  {
    title: "Weather Application",
    tech: ".NET · Blazor · OpenWeatherMap API",
    desc: "Fully functional weather web app with city search, current location detection, Supabase authentication, and favorite cities storage.",
    icon: "🌤️",
    color: "#7b2ff7",
  },
  {
    title: "Deepfake Detection System",
    tech: "Python · Meso-4 · Deep Learning",
    desc: "AI-based system detecting manipulated videos and images using the Meso-4 deep learning model with preprocessing and result visualization.",
    icon: "🧠",
    color: "#e91e8c",
  },
  {
    title: "Optiworkforce Analysis",
    tech: "MERN · React · Data Visualization",
    desc: "Comprehensive workforce management system with interactive dashboards, AI-assisted insights, task tracking, and analytics modules.",
    icon: "📊",
    color: "#00c6ff",
  },
  {
    title: "Biometric Attendance System",
    tech: ".NET · ZKTeco SDK · ESSL F22",
    desc: "Real-time attendance tracking integrating ESSL F22 biometric device using ZKTeco SDK and push data receiver APIs.",
    icon: "🔐",
    color: "#4db33d",
  },
  {
    title: "Tally Integration Concept",
    tech: ".NET · API Middleware · Tally ERP",
    desc: "Explored integration of Tally ERP with modern web applications using APIs and middleware for business financial automation.",
    icon: "💼",
    color: "#f7d02c",
  },
];

const CERTIFICATES = [
  {
    title: "Tally Prime & .0",
    issuer: "EduTrack",
    year: "2026",
    file: "/certificates/tally-prime.pdf",
    icon: "📜",
    color: "#ff6b35"
  },
  {
    title: "Tally Prime With WhatsApp",
    issuer: "EduTrack",
    year: "2026",
    file: "/certificates/tally-whatsapp.pdf",
    icon: "💬",
    color: "#4db33d"
  },
  {
    title: "NPTEL Edge Computing",
    issuer: "NPTEL",
    year: "2025",
    file: "/certificates/edge-computing.pdf",
    icon: "☁️",
    color: "#00c6ff"
  },
  {
    title: "NPTEL Programming In Java",
    issuer: "NPTEL",
    year: "2023",
    file: "/certificates/java.pdf",
    icon: "☕",
    color: "#f7d02c"
  },
  {
    title: "Foundational C# With Microsoft",
    issuer: "FreeCodeCamp",
    year: "Dec-2022",
    file: "/certificates/csharp.pdf",
    icon: "🏅",
    color: "#a78bfa"
  }
];

function useTypewriter(words, speed = 100, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    let t;
    if (!deleting && charIdx < current.length)
      t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    else if (!deleting) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.substring(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx]);
  return display;
}

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function FadeSection({ id, bg, children }) {
  const r = useRef();
  const v = useInView(r);
  return (
    <section
      id={id}
      ref={r}
      style={{
        background: bg || "transparent",
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
    >
      {children}
    </section>
  );
}

const ACC = "#7b2ff7";

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menu, setMenu] = useState(false);
  const [mob, setMob] = useState(false);
  const title = useTypewriter([
    "Software Developer",
    ".NET Full-Stack Developer",
    "MERN Stack Developer",
    "API Integration Expert",
    "Enterprise App Builder",
  ]);

  useEffect(() => {
    const fn = () => setMob(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const go = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenu(false);
  };

  const P = mob ? "64px 18px" : "100px 80px";

  return (
    <div
      style={{
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        background: "#0d0d14",
        color: "#e8e8f0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#7b2ff7;border-radius:3px}
        .hov-up:hover{transform:translateY(-5px)!important;box-shadow:0 12px 32px rgba(0,0,0,0.4)!important}
        .hov-border:hover{border-color:rgba(123,47,247,0.5)!important}
        .btn-pri:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(123,47,247,0.55)!important}
        .btn-sec:hover{background:rgba(123,47,247,0.12)!important}
        .nlnk:hover{color:#fff!important;background:rgba(123,47,247,0.18)!important}
        .mob-lnk:hover{color:#7b2ff7!important;padding-left:36px!important}
        .avatar{animation:floatUp 4s ease-in-out infinite}
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: mob ? "13px 20px" : "15px 48px",
          background: "rgba(13,13,20,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(123,47,247,0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New',monospace",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: 3,
            color: "#e8e8f0",
          }}
        >
          RV
        </span>

        {!mob && (
          <ul style={{ display: "flex", gap: 4, listStyle: "none" }}>
            {SECTIONS.map((s) => (
              <li
                key={s}
                className="nlnk"
                onClick={() => go(s)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active === s ? "#fff" : "#9090b0",
                  background:
                    active === s ? "rgba(123,47,247,0.25)" : "transparent",
                  border:
                    active === s
                      ? "1px solid rgba(123,47,247,0.4)"
                      : "1px solid transparent",
                  transition: "all 0.2s",
                  userSelect: "none",
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {mob && (
          <button
            onClick={() => setMenu((m) => !m)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 23,
                  height: 2,
                  background: "#e8e8f0",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform:
                    menu && i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : menu && i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : menu && i === 1
                          ? "scaleX(0)"
                          : "none",
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {mob && menu && (
        <div
          style={{
            position: "fixed",
            top: 54,
            left: 0,
            right: 0,
            zIndex: 299,
            background: "rgba(10,10,18,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(123,47,247,0.2)",
            animation: "slideDown 0.25s ease",
          }}
        >
          {SECTIONS.map((s) => (
            <div
              key={s}
              className="mob-lnk"
              onClick={() => go(s)}
              style={{
                padding: "15px 28px",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                color: active === s ? "#7b2ff7" : "#c0c0d8",
                borderLeft:
                  active === s ? "3px solid #7b2ff7" : "3px solid transparent",
                transition: "all 0.2s",
                userSelect: "none",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}

      {/* HERO */}
      <div
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: mob ? "column-reverse" : "row",
          justifyContent: mob ? "center" : "space-between",
          padding: mob ? "110px 22px 56px" : "120px 80px 80px",
          gap: mob ? 28 : 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 55% at 78% 50%,rgba(123,47,247,0.13) 0%,transparent 70%),radial-gradient(ellipse 40% 45% at 12% 80%,rgba(0,198,255,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Text */}
        <div
          style={{
            flex: 1,
            zIndex: 1,
            textAlign: mob ? "center" : "left",
            maxWidth: 600,
          }}
        >
          <h1
            style={{
              fontSize: mob ? "clamp(38px,9vw,58px)" : "clamp(52px,6vw,86px)",
              fontWeight: 300,
              letterSpacing: "-1px",
              lineHeight: 1.05,
              color: "#f0f0f8",
            }}
          >
            Ranjith V
          </h1>
          <p
            style={{
              fontSize: mob ? 16 : 22,
              fontWeight: 500,
              color: ACC,
              margin: "14px 0 20px",
              minHeight: 28,
            }}
          >
            I am a&nbsp;<span>{title}</span>
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "1em",
                background: ACC,
                marginLeft: 2,
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: "#9090b0",
              marginBottom: 28,
              textAlign: mob ? "center" : "justify",
            }}
          >
            An enthusiastic Software Developer with hands-on experience in .NET
            Full-Stack, MERN Stack and enterprise application development —
            passionate about scalable, user-centric solutions using Microsoft
            technologies.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: mob ? "center" : "flex-start",
            }}
            onClick={downloadResume}
          >
            <button
              onClick={downloadResume}
              className="btn-pri"
              style={{
                padding: "11px 26px",
                borderRadius: 8,
                background: "linear-gradient(135deg,#7b2ff7,#5218d4)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(123,47,247,0.35)",
                transition: "all 0.2s",
              }}
            >
              Download Resume
            </button>
            <button
              className="btn-sec"
              onClick={() => go("Contact")}
              style={{
                padding: "11px 26px",
                borderRadius: 8,
                background: "transparent",
                color: ACC,
                fontWeight: 600,
                fontSize: 14,
                border: "1px solid rgba(123,47,247,0.6)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Avatar */}
        <div className="avatar" style={{ zIndex: 1, flexShrink: 0 }}>
          <div
            style={{
              width: mob ? 200 : 300,
              height: mob ? 200 : 300,
              borderRadius: 18,
              background: "linear-gradient(135deg,#7b2ff7,#00c6ff)",
              padding: 3,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 16,
                background: "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden", // important
              }}
            >
              <img
                src={profileImg}
                alt="Ranjith"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // keeps same fit as emoji box
                  borderRadius: 16,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <FadeSection id="about" bg="#0f0f1a">
        <div style={{ padding: P }}>
          <h2
            style={{
              fontSize: mob ? 28 : 40,
              fontWeight: 300,
              textAlign: "center",
              marginBottom: mob ? 32 : 54,
            }}
          >
            About <span style={{ color: ACC, fontWeight: 600 }}>Me</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mob ? "1fr" : "1fr 1.4fr",
              gap: mob ? 24 : 56,
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: 14,
                background: "linear-gradient(135deg,#1a0f40,#0d1a30)",
                height: mob ? 160 : 360,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: mob ? 56 : 90,
                border: "1px solid rgba(123,47,247,0.2)",
              }}
            >
              👨‍💻
            </div>
            <div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#b0b0c8",
                  textAlign: "justify",
                  marginBottom: 14,
                }}
              >
                I'm Ranjith V, a detail-oriented Software Developer with a
                strong academic background from SNS College of Engineering. I
                gained real-time experience at Wise Work Company building
                enterprise-grade applications using .Net Full Stack, Blazor,
                ASP.NET, MSSQL, MongoDB, C++ and MudBlazor.
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#b0b0c8",
                  textAlign: "justify",
                }}
              >
                With a continuous learning mindset, I actively explore AI, cloud
                integration, and enterprise software customization. My ability
                to adapt quickly and implement innovative solutions makes me a
                promising developer ready to contribute to impactful projects in
                the IT industry.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  marginTop: 18,
                }}
              >
                {[
                  { l: "Location", v: "Sathyamangalam, TN" },
                  { l: "Degree", v: "B.E CST – SNS College" },
                  { l: "Focus", v: ".NET · MERN · APIs" },
                ].map((i) => (
                  <div key={i.l} style={{ fontSize: 13 }}>
                    <span style={{ color: ACC, fontWeight: 600 }}>{i.l}:</span>{" "}
                    <span style={{ color: "#b0b0c8" }}>{i.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* SKILLS */}
      <FadeSection id="skills">
        <div style={{ padding: P }}>
          <h2
            style={{
              fontSize: mob ? 28 : 40,
              fontWeight: 300,
              textAlign: "center",
              marginBottom: mob ? 32 : 54,
            }}
          >
            Technical{" "}
            <span style={{ color: ACC, fontWeight: 600 }}>Skills</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mob
                ? "repeat(2,1fr)"
                : "repeat(auto-fill,minmax(130px,1fr))",
              gap: 12,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {SKILLS.map((sk) => (
              <div
                key={sk.name}
                className="hov-up"
                style={{
                  background: sk.bg,
                  border: `1px solid ${sk.color}30`,
                  borderRadius: 12,
                  padding: mob ? "14px 10px" : "18px 12px",
                  textAlign: "center",
                  fontSize: mob ? 12 : 13,
                  fontWeight: 600,
                  color: sk.color,
                  transition: "transform 0.2s,box-shadow 0.2s",
                  cursor: "default",
                }}
              >
                {sk.name}
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* PROJECTS */}
      <FadeSection id="projects" bg="#0f0f1a">
        <div style={{ padding: P }}>
          <h2
            style={{
              fontSize: mob ? 28 : 40,
              fontWeight: 300,
              textAlign: "center",
              marginBottom: mob ? 32 : 54,
            }}
          >
            My <span style={{ color: ACC, fontWeight: 600 }}>Projects</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mob
                ? "1fr"
                : "repeat(auto-fill,minmax(300px,1fr))",
              gap: 16,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="hov-up hov-border"
                style={{
                  background: "#12121e",
                  border: `1px solid ${p.color}22`,
                  borderRadius: 14,
                  padding: mob ? 18 : 26,
                  transition:
                    "transform 0.2s,box-shadow 0.2s,border-color 0.2s",
                }}
              >
                <div style={{ fontSize: mob ? 28 : 34, marginBottom: 10 }}>
                  {p.icon}
                </div>
                <div
                  style={{
                    fontSize: mob ? 15 : 17,
                    fontWeight: 700,
                    marginBottom: 5,
                    color: "#f0f0f8",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: ACC,
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  {p.tech}
                </div>
                <div
                  style={{ fontSize: 13, lineHeight: 1.72, color: "#9090b0" }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* EXPERIENCE */}
      <FadeSection id="experience">
        <div style={{ padding: P }}>
          <h2
            style={{
              fontSize: mob ? 28 : 40,
              fontWeight: 300,
              textAlign: "center",
              marginBottom: mob ? 32 : 54,
            }}
          >
            Work <span style={{ color: ACC, fontWeight: 600 }}>Experience</span>
          </h2>
          <div
            style={{
              position: "relative",
              paddingLeft: mob ? 20 : 32,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: mob ? 6 : 8,
                top: 0,
                bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom,#7b2ff7,transparent)",
              }}
            />
            {[
              {
                role: "Software Engineer",
                company: "Advent Systems | Mar 2026 - Present",
                points: [
                  "Built the 'Advent TReports' business analytics platform using Vite and Python for real-time data visualization.",
                  "Integrated Tally ERP data to generate insights on sales, purchases, and financial performance.",
                  "Designed responsive and user-friendly UI components using modern frontend frameworks.",
                  "Developed and maintained web applications using Python and MERN stack technologies.",
                  "Worked on Tally ERP customization using TDL and generated reports with Advent TReports.",
                  "Designed and managed databases, ensuring efficient data handling and performance.",
                  "Implemented cloud-based solutions and handled deployment processes.",
                  "Optimized performance, debugged issues, and delivered solutions collaboratively.",
                ],
              },
              {
                role: "Associate Software Engineer",
                company: "Wise Work | Feb 2025 - Aug 2025",
                points: [
                  "Associate Software Engineer at Wise, specializing in JavaScript, C#, and Blazor to develop and maintain web applications.",
                  "Focused on building scalable and efficient solutions for seamless user experiences.",
                  "Designed & developed web apps using Blazor and .NET technologies.",
                  "Integrated APIs and enhanced UI/UX using MudBlazor with authentication.",
                  "Integrated ESSL F22 biometric device via ZKTeco SDK & push APIs for real-time attendance.",
                  "Optimized performance, debugged issues, and delivered solutions collaboratively.",
                ],
              },

              {
                role: "MERN STACK developer",
                company: "FACE Prep",
                points: [
                  "Motivated MERN Stack Developer Intern with hands-on experience in building full-stack web applications using MongoDB, Express.js, React, and Node.js",
                  "Skilled in developing REST APIs, responsive UI, and integrating backend services for real-world projects.",
                ],
              },
              
              {
                role: "Software Developer",
                company: "Cognifyz technologies",
                points: [
                  "Contributed to the development of robust software solutions using modern technologies, resulting in enhanced project efficiency and improved user experience.",
                  " Demonstrated proficiency in optimising code for performance and usability.",
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  marginBottom: i === 0 ? 24 : 0,
                  background: "#12121e",
                  border: "1px solid rgba(123,47,247,0.16)",
                  borderRadius: 12,
                  padding: mob ? 16 : 24,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: mob ? -23 : -29,
                    top: 18,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: ACC,
                    boxShadow: "0 0 10px rgba(123,47,247,0.6)",
                  }}
                />
                <div
                  style={{
                    fontSize: mob ? 15 : 17,
                    fontWeight: 700,
                    color: "#f0f0f8",
                    marginBottom: 4,
                  }}
                >
                  {item.role}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: ACC,
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  {item.company}
                </div>
                <ul style={{ paddingLeft: 16 }}>
                  {item.points.map((pt, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: "#9090b0",
                        marginBottom: 4,
                      }}
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certs */}
          <div style={{ marginTop: 50, textAlign: "center" }}>
            <h3
              style={{
                fontSize: mob ? 17 : 22,
                fontWeight: 600,
                marginBottom: 24,
                color: "#d0d0e8",
              }}
            >
              Certifications & <span style={{ color: ACC }}>Achievements</span>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: mob
                  ? "1fr"
                  : "repeat(auto-fill,minmax(260px,1fr))",
                gap: 16,
                textAlign: "left"
              }}
            >
              {CERTIFICATES.map((c, idx) => (
                <div
                  key={idx}
                  className="hov-up hov-border"
                  onClick={() => window.open(c.file, "_blank")}
                  style={{
                    background: "#12121e",
                    border: `1px solid ${c.color}30`,
                    borderRadius: 14,
                    padding: mob ? 18 : 22,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 28 }}>{c.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f8", lineHeight: 1.3, marginBottom: 4 }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>
                        {c.issuer}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, marginTop: "auto" }}>
                    <span style={{ fontSize: 12, color: "#9090b0", fontWeight: 500 }}>{c.year}</span>
                    <span style={{ fontSize: 12, color: ACC, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      View <span style={{ fontSize: 14 }}>↗</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeSection>

      {/* CONTACT */}
      <FadeSection id="contact" bg="#0f0f1a">
        <div style={{ padding: P }}>
          <h2
            style={{
              fontSize: mob ? 28 : 40,
              fontWeight: 300,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Get In <span style={{ color: ACC, fontWeight: 600 }}>Touch</span>
          </h2>
          <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                color: "#9090b0",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              I'm currently open to new opportunities. Whether you have a
              question, a project idea, or just want to say hi — my inbox is
              always open!
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 22,
              }}
            >
              {[
                {
                  icon: "ℹ️",
                  label: "LinkedIn",
                  value: "https://www.linkedin.com/in/cst-ranjith-v/",
                  action: () =>
                    window.open(
                      "https://www.linkedin.com/in/cst-ranjith-v/",
                      "_blank",
                    ),
                },
                {
                  icon: "🔗",
                  label: "GitHub",
                  value: "https://github.com/RANJITH-v-cst",
                  action: () =>
                    window.open("https://github.com/RANJITH-v-cst", "_blank"),
                },
                {
                  icon: "✉︎",
                  label: "Email",
                  value: "ranjithsvhpc1234@gmail.com",
                  action: () =>
                    window.open("mailto:ranjithsvhpc1234@gmail.com"),
                },
                {
                  icon: "📞",
                  label: "Phone",
                  value: "6379845643",
                  action: () => window.open("tel:+916379845643"),
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Sathyamangalam, Tamil Nadu, India",
                  action: () =>
                    window.open(
                      "https://maps.google.com/?q=Sathyamangalam,Tamil+Nadu,India",
                      "_blank",
                    ),
                },
                {
                  icon: "🎓",
                  label: "Education",
                  value: "SNS College of Engineering",
                  action: () =>
                    window.open("https://www.snsce.ac.in/", "_blank"),
                },
                {
                  icon: "💼",
                  label: "Role",
                  value: "Software Developer | Advent Systems",
                  action: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={item.action || undefined}
                  style={{
                    background: "#12121e",
                    border: "1px solid rgba(123,47,247,0.2)",
                    borderRadius: 10,
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textAlign: "left",
                    cursor: item.action ? "pointer" : "default",
                    transition:
                      "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (item.action) {
                      e.currentTarget.style.borderColor =
                        "rgba(123,47,247,0.7)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(123,47,247,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(123,47,247,0.2)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: ACC,
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 13.5, color: "#c0c0d8" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.open("mailto:ranjithsvhpc1234@gmail.com")}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 8,
                background: "linear-gradient(135deg,#7b2ff7,#5218d4)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(123,47,247,0.35)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ✉️ Send Message
            </button>
          </div>
        </div>
      </FadeSection>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: mob ? "22px 18px" : "28px",
          borderTop: "1px solid rgba(123,47,247,0.12)",
          color: "#505070",
          fontSize: 13,
        }}
      >
        <p>
          Designed & Built by <span style={{ color: ACC }}>Ranjith V</span> ·
          Software Developer
        </p>
        <p style={{ marginTop: 5, fontSize: 12 }}>
          © 2026 Ranjith V. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
