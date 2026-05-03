import { useState, useEffect } from 'react';
import { isMuted, setMuted } from '../utils/sound';

export default function Navbar({ theme, toggleTheme }) {
  const [muted, setMutedState] = useState(false);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="nav-logo">HK.</div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="resume-btn"
        >
           Resume
        </a>
      </div>
      <div className="nav-links">
        {[['hero', 'Home'], ['story', 'Journey'], ['projects', 'Projects'], ['skills', 'Skills'], ['contact', 'Contact']].map(([id, label]) => (
          <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
        ))}
      </div>
      <div className="nav-controls">
        <button className="icon-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? '🔇' : '🔊'}
        </button>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
