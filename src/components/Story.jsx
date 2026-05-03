import { useEffect, useRef } from 'react';

const chapters = [
  {
    line: 'Chapter 01 — Origin',
    quote: 'It started with a question that wouldn\'t leave me alone.',
    body: 'A curious student from Chennai who couldn\'t stop asking "but how does it actually work?" — that restlessness led me to dual-enroll at Rajalakshmi Institute of Technology (AI & ML) and IIT Madras (Data Science) simultaneously.',
    visual: 'education',
  },
  {
    line: 'Chapter 02 — First Build',
    quote: 'Then I wrote code that actually did something.',
    body: 'From predicting pneumonia in X-rays with 87% accuracy to routing ambulances in real time — my first projects taught me that the best code is the kind that matters to someone.',
    visual: 'project-preview',
    reverse: true,
  },
  {
    line: 'Chapter 03 — The Real World',
    quote: 'Then Zoho handed me a real problem.',
    body: 'During my internship at Zoho (Oct 2025–Jan 2026), I worked on AI-based test script conversion — debugging LLM outputs, validating automated pipelines, and shipping reliability at scale. Theory met practice head-on.',
    visual: 'zoho',
  },
  {
    line: 'Chapter 04 — Research',
    quote: 'And I got to present an idea on a national stage.',
    body: 'At the IIPA Southern Regional Conference in Puducherry, I presented an AI-powered government scheme recommender — multilingual, GDPR-compliant, and built to actually help citizens navigate welfare systems.',
    visual: 'research-preview',
    reverse: true,
  },
  {
    line: 'Chapter 05 — Now',
    quote: 'Now I\'m building the next thing.',
    body: 'Armed with Python, TensorFlow, Postman, Flask, and an appetite for hard problems — I\'m looking for the next challenge. Something that combines AI, automation, and real-world impact.',
    visual: 'cta',
  },
];

function VisualBlock({ type }) {
  if (type === 'education') return (
    <div className="card" style={{ padding: '28px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--fuchsia)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Currently enrolled at</div>
      <div className="edu-grid">
        {[
          { name: 'Rajalakshmi Institute of Technology', degree: 'B.E — AI & Machine Learning', info: '2023–Present · CGPA 8.88' },
          { name: 'IIT Madras', degree: 'B.S — Data Science', info: '2023–Present' },
        ].map((e, i) => (
          <div key={i} className="edu-item">
            <div className="edu-name">{e.name}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-info">{e.info}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'project-preview') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { e: '🫁', t: 'Pneumonia Detection', sub: 'MobileNetV2 · 87% accuracy · Grad-CAM' },
        { e: '🚑', t: 'Ambulance ETA System', sub: 'Flask · Leaflet.js · Twilio API' },
      ].map((p, i) => (
        <div key={i} className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '18px 22px' }}>
          <span style={{ fontSize: '1.6rem' }}>{p.e}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: 3 }}>{p.t}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{p.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );

  if (type === 'zoho') return (
    <div className="card" style={{ padding: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'white' }}>Z</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>Zoho</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--fuchsia)', fontFamily: 'var(--font-mono)' }}>AI & Automation Testing · Oct 2025–Jan 2026</div>
        </div>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Improved AI-based test script conversion accuracy', 'Validated machine-generated API automation pipelines', 'Integrated AI testing into Jenkins CI/CD workflows'].map((pt, i) => (
          <li key={i} style={{ fontSize: '0.85rem', color: 'var(--muted)', paddingLeft: 16, position: 'relative', lineHeight: 1.6 }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--violet)' }}>▸</span>{pt}
          </li>
        ))}
      </ul>
    </div>
  );

  if (type === 'research-preview') return (
    <div className="card" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gradient)' }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--fuchsia)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>📄 Published Research</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.98rem', marginBottom: 10, lineHeight: 1.4 }}>AI-Powered Government Scheme Recommender</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>IIPA Southern Regional Conference · Puducherry · June 2025</div>
    </div>
  );

  if (type === 'cta') return (
    <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>⚡</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12 }}>Open to Opportunities</div>
      <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>Internships · Full-time · Research collaborations</div>
      <a href="mailto:haripriyakannanofficial@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 12, background: 'var(--gradient)', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        ✉ Let's Talk
      </a>
    </div>
  );

  return null;
}

export default function Story() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
        }
      }),
      { threshold: 0.2 }
    );
    refs.current.forEach(r => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="story" id="story">
      <div className="story-container">
        {chapters.map((ch, i) => (
          <div
            key={i}
            className={`story-chapter${ch.reverse ? ' reverse' : ''}`}
            ref={el => refs.current[i] = el}
          >
            <div>
              <div className={`story-line reveal`}>{ch.line}</div>
              <div className={`story-quote reveal`} style={{ transitionDelay: '0.1s' }}>{ch.quote}</div>
              <div className={`story-body reveal`} style={{ transitionDelay: '0.2s' }}>{ch.body}</div>
            </div>
            <div className={`${ch.reverse ? 'reveal-left' : 'reveal-right'}`} style={{ transitionDelay: '0.15s' }}>
              <VisualBlock type={ch.visual} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
