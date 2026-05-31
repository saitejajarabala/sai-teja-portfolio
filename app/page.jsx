import VideoIntro from "../components/VideoIntro/VideoIntro";

const projects = [
  {
    title: "CPSS Framework — ML-Based IDS",
    tag: "Research Platform",
    description:
      "Physical-layer intrusion detection using Random Forest models, 38→19 feature extraction pipeline, real-time inference, and offline validation for cyber-physical systems. Mahalanobis-based device fingerprinting with confidence scoring.",
    stack: ["Python", "Random Forest", "Flask", "Streamlit", "Signal Features"],
    link: null,
  },
  {
    title: "FPGA-Based CPS Monitoring",
    tag: "Embedded Intelligence",
    description:
      "End-to-end FPGA–ARM architecture with 125 MSPS data acquisition, signal conditioning, feature extraction, and edge-level ML inference for real-time anomaly detection in electromechanical systems.",
    stack: ["Zynq SoC", "PYNQ-Z2", "Vivado/Vitis", "Verilog", "ML Inference"],
    link: null,
  },
  {
    title: "LatticeX FPGA Accelerator",
    tag: "Post-Quantum Security",
    description:
      "Fully pipelined NTT-based polynomial multiplication accelerator using Vitis HLS on Zynq-7000 for high-throughput post-quantum cryptographic operations in secure industrial communication.",
    stack: ["Vitis HLS", "NTT", "Kyber", "AXI Stream", "PYNQ"],
    link: "https://github.com/saitejajarabala/LatticeX-FPGA",
  },
  {
    title: "IoMT Intelligent Monitoring Platform",
    tag: "AI Healthcare CPS",
    description:
      "Multimodal AI monitoring for healthcare cyber-physical systems using Random Forest and CNN–GRU. Cloud-integrated dashboard on AWS EC2 with real-time inference, alerting, and anomaly tracking.",
    stack: ["AWS EC2", "Flask", "Streamlit", "CNN-GRU", "Dashboards"],
    link: "https://github.com/saitejajarabala/Multimodal_IDS_IoMT",
  },
  {
    title: "Monocular Vehicle Distance Estimation",
    tag: "Computer Vision",
    description:
      "Geometry-driven vehicle ranging using U.S. license plate constraints, YOLO detection, PnP pose estimation, and multi-cue fusion. MAE ~0.153 m, RMSE ~0.342 m across varying conditions.",
    stack: ["OpenCV", "YOLO", "PnP", "Geometry", "Python"],
    link: null,
  },
  {
    title: "GPU Health Monitoring System",
    tag: "Systems Intelligence",
    description:
      "Real-time monitoring for 4× RTX 3060 GPUs with adaptive health scoring, telemetry tracking, anomaly visualization, and EMI/EMR correlation for VRAM subsystem reliability.",
    stack: ["Telemetry", "Anomaly Tracking", "Python", "Monitoring", "EMI Analysis"],
    link: null,
  },
];

const skills = [
  "Machine Learning", "Deep Learning", "Cyber-Physical Systems", "FPGA / Zynq SoC",
  "PYNQ-Z2", "Vitis HLS", "Python", "C / C++", "Verilog / VHDL", "MATLAB / Simulink",
  "AWS EC2", "Docker", "Flask", "Streamlit", "OpenCV", "YOLO", "PyTorch", "scikit-learn",
  "Signal Processing", "CAN / LIN", "Ethernet / UART / SPI / I2C", "STM32 / NXP MCUs",
  "Altium Designer", "LabVIEW", "Post-Quantum Cryptography", "Quantum Computing", "Git / GitHub",
];

const certs = [
  { icon: "AWS", type: "aws", name: "AWS Cloud Quest: Solutions Architect", issuer: "Amazon Web Services", href: "https://www.credly.com/badges/fba1f5a3-a995-4f7b-a65e-5f3bd73f1104/linked_in?t=t80o31" },
  { icon: "ML",  type: "aws", name: "AWS Cloud Quest: Machine Learning",    issuer: "Amazon Web Services", href: "https://www.credly.com/badges/2510fad5-47dc-411f-b831-4ef8df805114/linked_in_profile" },
  { icon: "CP",  type: "aws", name: "AWS Cloud Quest: Cloud Practitioner",  issuer: "Amazon Web Services", href: "https://www.credly.com/badges/4342973e-e7ce-4db3-8515-e761d5318920/linked_in_profile" },
  { icon: "ES",  type: "misc", name: "Embedded Hardware and Operating Systems", issuer: "Coursera", href: "https://www.coursera.org/account/accomplishments/certificate/3RNRKZJF4FJ2" },
  { icon: "MS",  type: "misc", name: "MATLAB & Simulink", issuer: "APSSDC", href: "https://drive.google.com/file/d/1GyZGWqu8FDOpGt5fsW-k_iMekwWNfL1f/view" },
  { icon: "QC",  type: "misc", name: "Quantum Computing (1 Month)", issuer: "C-DAC Hyderabad & IIT Roorkee", href: "https://drive.google.com/file/d/1VYv4JSLbEPQYWEEgbN2pidularmpPN0n/view?usp=sharing" },
  { icon: "EN",  type: "misc", name: "English Proficiency Certificate", issuer: "Duolingo English Test", href: "https://certs.duolingo.com/178577b4591e5534856b3d472a2ad6dc" },
  { icon: "RO",  type: "misc", name: "Embedded Systems & Robotics Crash Course", issuer: "e-Yantra, IIT Bombay", href: "https://drive.google.com/file/d/1xfZ9MuFhOxmVhkSk4qe0ZqfTk2kKek8o/view?usp=drive_link" },
  { icon: "BC",  type: "misc", name: "Blockchain Technology Workshop", issuer: "IIIT Naya Raipur", href: "https://drive.google.com/file/d/1A2pgj2X0YuXFvAGe8Q6x8kEwxREKle6Y/view?usp=drive_link" },
];

// Arrow icon inline so no extra dep
const Arrow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

export default function Home() {
  return (
    <main>
      {/* ── Navbar ── */}
      <nav className="nav">
        <div className="navBrand">Sai <span>Teja</span></div>
        <div className="navLinks">
          <a href="#projects" className="hideMobile">Projects</a>
          <a href="#experience" className="hideMobile">Experience</a>
          <a href="#skills" className="hideMobile">Skills</a>
          <a href="#contact">Contact</a>
          <a href="https://www.linkedin.com/in/jsaiteja/" target="_blank" rel="noopener noreferrer" className="navCta">LinkedIn ↗</a>
        </div>
      </nav>

      {/* ── Cinematic Hero ── */}
      <VideoIntro />

      {/* ── Intro bridge ── */}
      <section id="next-section" className="section sectionIntro">
        <p className="eyebrow">Featured Work</p>
        <h2 className="section-title">Intelligent systems<br/>for secure real-world impact.</h2>
        <p className="section-lead">
          My research connects AI, cybersecurity, embedded hardware, FPGA acceleration, cloud dashboards,
          and real-time signal intelligence for cyber-physical systems.
        </p>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section projectsSection">
        <div className="fadeUp">
          <p className="eyebrow">Selected Projects</p>
          <h2 className="section-title">Research-grade<br/>engineering systems.</h2>
        </div>

        <div className="projectGrid">
          {projects.map((p) => (
            <article className="projectCard fadeUp" key={p.title}>
              <div className="projectTop">
                <span className="projectTag">{p.tag}</span>
                <div className="projectDot" />
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="stackList">
                {p.stack.map((s) => <span key={s} className="stackTag">{s}</span>)}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="cardLink">
                  View on GitHub <Arrow />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="section experienceSection">
        <div className="fadeUp">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">AI, embedded,<br/>secure platforms.</h2>
          <p className="section-lead">Research and industry roles spanning ML systems, automotive embedded software, and FPGA-based edge computing.</p>
        </div>

        <div className="timeline">
          <article className="timelineItem fadeUp">
            <div className="tlDate">Sep 2024 — May 2026</div>
            <div className="tlRole">Research Assistant</div>
            <div className="tlOrg">Information Systems &amp; Security Forensics Lab · University of Michigan–Dearborn</div>
            <div className="tlDesc">AI-driven CPS architectures, FPGA sensing, 125 MSPS acquisition, ML-based IDS, device fingerprinting, EMI/EMR analysis, and real-time monitoring dashboards. GPA 3.97/4.0.</div>
          </article>

          <article className="timelineItem fadeUp">
            <div className="tlDate">Apr 2023 — Feb 2024</div>
            <div className="tlRole">Hardware Engineer</div>
            <div className="tlOrg">Src E-Solutions · Vijayawada, India</div>
            <div className="tlDesc">MATLAB/Simulink EMS optimization for hybrid microgrids, renewable PV–battery systems, and FPGA-based EDGE-ZYNQ live system demonstrations.</div>
          </article>

          <article className="timelineItem fadeUp">
            <div className="tlDate">Aug 2022 — Nov 2022</div>
            <div className="tlRole">Software Engineer</div>
            <div className="tlOrg">KPIT Technologies Inc. · Bengaluru, India</div>
            <div className="tlDesc">Embedded automotive software in C/C++ and MATLAB/Simulink for ECU applications. Validated vehicle dynamics and powertrain models for Jaguar platforms.</div>
          </article>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section skillsSection">
        <div className="fadeUp">
          <p className="eyebrow">Technical Stack</p>
          <h2 className="section-title">End-to-end<br/>systems toolbox.</h2>
        </div>
        <div className="skillCloud fadeUp">
          {skills.map((s) => <span key={s} className="skillPill">{s}</span>)}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section id="certs" className="section" style={{background: "var(--bg2)"}}>
        <div className="fadeUp">
          <p className="eyebrow">Credentials</p>
          <h2 className="section-title">Certifications.</h2>
        </div>
        <div className="certGrid fadeUp">
          {certs.map((c) => (
            <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" className="certCard">
              <div className={`certIcon ${c.type}`}>{c.icon}</div>
              <div>
                <div className="certName">{c.name}</div>
                <div className="certIssuer">{c.issuer}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Patents ── */}
      <section id="patents" className="section" style={{background: "var(--bg)"}}>
        <div className="fadeUp">
          <p className="eyebrow">Intellectual Property</p>
          <h2 className="section-title">Patents.</h2>
        </div>
        <div className="patentList fadeUp">
          <div className="patentItem">
            <div className="patentTitle">Integrated Solar Charging System for Electric Vehicles</div>
            <div className="patentMeta">Application No. 428900-001 · Published in Journal No. 50/2024 · Dec 13, 2024 · India</div>
          </div>
          <div className="patentItem">
            <div className="patentTitle">Portable Solar Charging Station for EV</div>
            <div className="patentMeta">Application No. 428902-001 · Published in Journal No. 47/2024 · Nov 22, 2024 · India</div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section contactSection">
        <div className="contactInner fadeUp">
          <p className="eyebrow">Let's connect</p>
          <h2 className="contactTitle">Building something<br/>interesting?</h2>
          <p className="contactSub">Open to research collaborations, PhD opportunities, and challenging engineering problems in AI, cybersecurity, and embedded systems.</p>
          <div className="contactLinks">
            <a href="mailto:jarabalasaiteja@gmail.com" className="contactLink primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              jarabalasaiteja@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/jsaiteja/" target="_blank" rel="noopener noreferrer" className="contactLink">LinkedIn ↗</a>
            <a href="https://github.com/saitejajarabala" target="_blank" rel="noopener noreferrer" className="contactLink">GitHub ↗</a>
            <a href="tel:+13138885012" className="contactLink">+1 (313) 888-5012</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footerName">Sai Teja Jarabala · Belleville, MI, USA</div>
        <div className="footerLinks">
          <a href="https://www.linkedin.com/in/jsaiteja/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/saitejajarabala" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:jarabalasaiteja@gmail.com">Email</a>
        </div>
      </footer>

      {/* ── Scroll observer ── */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var obs = new IntersectionObserver(function(entries){
            entries.forEach(function(e){
              if(e.isIntersecting){
                e.target.classList.add('visible');
                obs.unobserve(e.target);
              }
            });
          }, { threshold: 0.1 });
          document.querySelectorAll('.fadeUp').forEach(function(el, i){
            el.style.transitionDelay = (i % 5) * 0.072 + 's';
            obs.observe(el);
          });
        })();
      ` }} />
    </main>
  );
}
