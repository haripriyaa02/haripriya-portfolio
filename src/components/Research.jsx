import { useEffect, useRef } from 'react';

export default function Research() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 130);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="research" id="research" ref={ref}>
      <div className="research-container">
        <div className="section-tag reveal">Research</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Presented <span className="gradient-text">work.</span>
        </h2>

        <div className="research-card reveal" style={{ transitionDelay: '0.25s' }}>
          <div className="research-venue">
            📍 IIPA Southern Regional Conference · Puducherry · June 30, 2025
          </div>
          <div className="research-title">
            AI-Powered Government Scheme Recommender: A Public Administration Digital Transformation Tool
          </div>
          <div className="research-desc">
            Proposed an AI-driven welfare scheme recommender system with personalized eligibility matching,
            multilingual chatbot support, real-time API integration, and DPDP/GDPR-compliant, fair, and
            transparent service delivery. Designed to bridge the gap between citizens and government
            welfare programs through intelligent, accessible technology.
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['AI/ML', 'NLP', 'Multilingual', 'GDPR Compliance', 'Public Administration', 'Chatbot'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                padding: '3px 10px', borderRadius: 100,
                background: 'rgba(124,58,237,0.1)', color: 'var(--fuchsia)',
                border: '1px solid rgba(232,121,249,0.18)'
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
