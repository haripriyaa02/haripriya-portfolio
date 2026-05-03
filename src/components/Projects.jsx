import { useEffect, useRef } from 'react';

const projects = [
  {
    emoji: '🤖',
    title: 'AI-Driven API Test Script Conversion & Validation',
    desc: 'LLM-based system to convert Postman API test scripts with prompt optimization for high accuracy. Automated regression runs via Jenkins CI for faster failure detection and continuous validation.',
    tags: ['Postman', 'OpenAI API', 'JavaScript', 'REST APIs', 'Newman', 'Jenkins'],
    github: 'https://github.com/haripriyaa02',
    type: 'Internship Project · 2025–2026',
  },
  {
    emoji: '🚑',
    title: 'Web-Based Ambulance ETA Prediction System',
    desc: 'Web application predicting ambulance ETAs and automatically notifying traffic authorities for timely signal clearance. Interactive mapping with real-time route calculations.',
    tags: ['Flask', 'Leaflet.js', 'Geopy', 'Twilio API', 'Python'],
    github: 'https://github.com/haripriyaa02',
    type: 'Personal Project · 2025',
  },
  {
    emoji: '🫁',
    title: 'Automated Pneumonia Detection using Deep Learning',
    desc: 'MobileNetV2 deep learning model for Pneumonia vs. Normal X-ray classification with Grad-CAM interpretability. Achieved 87% accuracy optimized for resource-constrained environments.',
    tags: ['Python', 'TensorFlow/Keras', 'OpenCV', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/haripriyaa02',
    type: 'AI/ML Project · 2025',
  },
  {
    emoji: '🔧',
    title: 'Newman–Jenkins Output Comparison Tool',
    desc: 'QA utility comparing Newman Jenkins console outputs of old vs. new Postman scripts with request counts and pass/fail results. Automated Excel report generation to speed up QA validation.',
    tags: ['Lovable.ai', 'JavaScript', 'Excel Automation'],
    github: 'https://github.com/haripriyaa02',
    type: 'QA Utility · 2025',
  },
  {
    emoji: '🗺️',
    title: 'ATLAS — Adaptive Thresholding with Language-Augmented Sensing',
    desc: 'Full-stack AI road segmentation platform combining UNet (ResNet34, 85%+ IoU) with 5 classical CV methods. Features a Next.js UI with method comparison, confidence heatmaps, ground truth annotation, batch processing, and Better Auth + Neon PostgreSQL for persistent results.',
    tags: ['PyTorch', 'UNet', 'FastAPI', 'Next.js', 'TypeScript', 'OpenCV', 'Neon PostgreSQL'],
    github: 'https://github.com/haripriyaa02/ATLAS',
    type: 'Personal Project · 2026',
    hackathon: false,
  },
  {
    emoji: '✈️',
    title: 'S.A.F.E. Sky — AI-Powered Air Traffic Decision Support',
    desc: 'Real-time ATC decision support system ingesting live ADSB data via OpenSky API. Uses Random Forest for conflict detection, Isolation Forest for anomaly detection, Whisper for audio transcription, NLP urgency analysis, and ghost path projections 10 minutes ahead.',
    tags: ['FastAPI', 'Random Forest', 'Whisper', 'Leaflet.js', 'OpenSky API', 'OpenWeather', 'NLP'],
    github: 'https://github.com/haripriyaa02/AI-ATC-Assistant-main',
    type: 'Hackathon Project · 2025',
    hackathon: true,
  },
  {
    emoji: '🎓',
    title: 'AdaptLearn — AI-Adaptive Onboarding Engine',
    desc: 'Intelligent full-stack platform that eliminates guesswork in corporate upskilling. Parses resumes against JDs for ATS scoring with line-by-line rewrite suggestions, generates diagnostic quizzes, and renders interactive DAG learning roadmaps powered by LLaMA-3 via Groq.',
    tags: ['Next.js', 'FastAPI', 'LLaMA-3', 'Groq API', 'React Flow', 'TypeScript', 'PyMuPDF'],
    github: 'https://github.com/haripriyaa02/AdaptLearn',
    type: 'Hackathon Project · 2026',
    hackathon: true,
  },
];

function ProjectCard({ p, idx, cardRefs, handleTilt, resetTilt }) {
  return (
    <div
      ref={el => cardRefs.current[idx] = el}
      className="card project-card reveal"
      style={{ transitionDelay: `${idx * 0.08}s` }}
      onMouseMove={e => handleTilt(e, e.currentTarget)}
      onMouseLeave={e => resetTilt(e.currentTarget)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div className="project-emoji">{p.emoji}</div>
        {p.hackathon && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            padding: '2px 9px', borderRadius: 100,
            background: 'rgba(232,121,249,0.1)', color: 'var(--fuchsia)',
            border: '1px solid rgba(232,121,249,0.25)',
            whiteSpace: 'nowrap',
          }}>🏆 Hackathon</span>
        )}
      </div>
      <div>
        <div className="project-title">{p.title}</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--violet)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>{p.type}</div>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-tags">
        {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
      </div>
      <div className="project-links">
        <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
          🐙 GitHub →
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    cardRefs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const handleTilt = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    el.style.transform = `perspective(800px) rotateX(${x * -10}deg) rotateY(${y * 12}deg) translateZ(4px)`;
  };
  const resetTilt = (el) => { el.style.transform = ''; };

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <div className="section-tag reveal">Projects</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Things I've <span className="gradient-text">built.</span>
        </h2>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            p={p}
            idx={i}
            cardRefs={cardRefs}
            handleTilt={handleTilt}
            resetTilt={resetTilt}
          />
        ))}
      </div>
    </section>
  );
}