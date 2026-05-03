import { useEffect, useRef } from 'react';

const experiences = [
  {
    company: 'Zoho',
    role: 'AI & Automation Testing Intern',
    period: 'Oct 2025 – Jan 2026',
    points: [
      'Improved the accuracy of an AI-based test script conversion system by analyzing failures and refining prompt outputs.',
      'Validated machine-generated API automation scripts, strengthening skills in AI output evaluation, debugging, and reliability analysis.',
      'Collaborated with developer teams to resolve pipeline issues and integrated AI-assisted testing into continuous CI pipelines for speed and reliability.',
    ],
    badge: 'Z',
  },
];

const education = [
  {
    school: 'Rajalakshmi Institute of Technology',
    degree: 'B.E in Artificial Intelligence & Machine Learning',
    period: '2023 – Present · Poonamallee',
    detail: 'CGPA: 8.88',
    badge: 'RIT',
  },
  {
    school: 'IIT Madras',
    degree: 'B.S in Data Science',
    period: '2023 – Present · Chennai',
    detail: 'Dual enrollment',
    badge: 'IIT',
  },
  {
    school: 'Grace Matric. Hr. Sec. School',
    degree: 'Class 12',
    period: 'Completed March 2023 · Chennai',
    detail: 'Percentage: 95%',
    badge: 'G',
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal, .reveal-left').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {/* Internship */}
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="section-tag reveal">Experience</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s', marginBottom: 48 }}>
            Where I've <span className="gradient-text">worked.</span>
          </h2>

          <div className="exp-container" style={{ margin: 0 }}>
            {experiences.map((exp, i) => (
              <div key={i} className="exp-card reveal" style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}>
                <div className="exp-line">
                  <div className="exp-dot" />
                  <div className="exp-connector" />
                </div>
                <div className="exp-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: 'var(--gradient)', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontFamily: 'var(--font-display)',
                      fontWeight: 800, fontSize: '1rem', color: 'white', flexShrink: 0
                    }}>{exp.badge}</div>
                    <div>
                      <div className="exp-company">{exp.company}</div>
                      <div className="exp-role">{exp.role}</div>
                    </div>
                  </div>
                  <div className="exp-period">{exp.period}</div>
                  <ul className="exp-points">
                    {exp.points.map((pt, pi) => <li key={pi}>{pt}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ maxWidth: 760, margin: '60px auto 0' }}>
          <div className="section-tag reveal">Education</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s', marginBottom: 40 }}>
            Where I <span className="gradient-text">learned.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {education.map((edu, i) => (
              <div key={i} className="exp-card reveal" style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}>
                <div className="exp-line">
                  <div className="exp-dot" />
                  {i < education.length - 1 && <div className="exp-connector" />}
                </div>
                <div className="exp-content" style={{ paddingBottom: i < education.length - 1 ? 32 : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem',
                      color: 'var(--fuchsia)', flexShrink: 0
                    }}>{edu.badge}</div>
                    <div>
                      <div className="exp-company" style={{ fontSize: '1.1rem' }}>{edu.school}</div>
                      <div className="exp-role">{edu.degree}</div>
                    </div>
                  </div>
                  <div className="exp-period">{edu.period}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontFamily: 'var(--font-mono)', background: 'rgba(232,121,249,0.08)', border: '1px solid rgba(232,121,249,0.15)', borderRadius: 8, padding: '5px 12px', display: 'inline-block' }}>{edu.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
