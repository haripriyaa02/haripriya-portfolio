import { useEffect, useRef } from 'react';
import { playPop } from '../utils/sound';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 8}s`,
  size: `${1 + Math.random() * 2}px`,
}));

function addRipple(e) {
  const btn = e.currentTarget;
  const r = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.className = 'ripple';
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(r);
  setTimeout(() => r.remove(), 700);
}

export default function Contact() {
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

  const links = [
    { label: '✉ Send an Email', href: 'mailto:haripriyakannanofficial@gmail.com', primary: true },
    { label: '💼 LinkedIn', href: 'https://www.linkedin.com/in/haripriya--kannan', primary: false },
    { label: '🐙 GitHub', href: 'https://github.com/haripriyaa02', primary: false },
  ];

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'var(--violet)', filter: 'blur(120px)', opacity: 0.07, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      <div className="contact-container">
        <div className="section-tag reveal">Contact</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>
          Let's build something<br />
          <span className="gradient-text">together.</span>
        </h2>
        <p className="contact-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Whether it's an internship, a collaboration, or just a conversation about AI —
          my inbox is always open. I reply fast.
        </p>

        <div className="contact-links reveal" style={{ transitionDelay: '0.3s' }}>
          {links.map(({ label, href, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noreferrer"
              className={`contact-btn ${primary ? 'primary' : 'secondary'}`}
              onClick={(e) => { addRipple(e); playPop(); }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="reveal" style={{ transitionDelay: '0.4s', marginTop: 48, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
          📍 Chennai, Tamil Nadu, India
        </div>
      </div>
    </section>
  );
}
