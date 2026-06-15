import { useState, useRef } from 'react';
import { getBotResponse, CHIPS } from '../utils/chatResponses';
import { playKeyClick, playPop } from '../utils/sound';
import photo from '../assets/photo.png';

const WELCOME = {
  id: 0,
  from: 'bot',
  html: `Hey there! 👋 I'm <b>Haripriya K</b> — an AI & ML engineer from Chennai. I build intelligent systems, automate things, and occasionally break stuff (to fix it better). Ask me anything below ↓`
};

function BotResponseContent({ response }) {
  if (!response) return null;

  if (response.type === 'projects') {
    return (
      <div>
        <p style={{ marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: response.text }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {response.content.map((p, i) => (
            <div key={i} style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.88rem' }}>{p.emoji} {p.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 8 }}>{p.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (response.type === 'skills') {
    return (
      <div>
        <p style={{ marginBottom: 12 }}>{response.text}</p>
        {response.content.map((g, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{g.group}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {g.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (response.type === 'education') {
    return (
      <div>
        <p style={{ marginBottom: 12 }}>{response.text}</p>
        {response.content.map((e, i) => (
          <div key={i} style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 10, padding: '10px 14px', marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 3 }}>{e.school}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--fuchsia)', marginBottom: 2, fontFamily: 'var(--font-mono)' }}>{e.degree}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{e.info}</div>
          </div>
        ))}
      </div>
    );
  }

  if (response.type === 'contact') {
    const c = response.content;
    return (
      <div>
        <p style={{ marginBottom: 12 }}>{response.text}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href={`mailto:${c.email}`} style={{ color: 'var(--fuchsia)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>📧 {c.email}</a>
          <a href={c.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--fuchsia)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>💼 LinkedIn</a>
          <a href={c.github} target="_blank" rel="noreferrer" style={{ color: 'var(--fuchsia)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>🐙 GitHub</a>
        </div>
      </div>
    );
  }

  return <p dangerouslySetInnerHTML={{ __html: response.text || response.content }} />;
}

let msgId = 1;

export default function Hero() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const chatMessagesRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollChat = () => {
    setTimeout(() => {
      const el = chatMessagesRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    playPop();
    const userMsg = { id: msgId++, from: 'user', html: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    scrollChat();

    await new Promise(r => setTimeout(r, 900 + Math.random() * 500));
    const response = getBotResponse(text);
    setTyping(false);
    playKeyClick();
    setMessages(prev => [...prev, { id: msgId++, from: 'bot', response }]);
    scrollChat();
  };

  const handleChip = (key) => sendMessage(key);

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser.');
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
    rec.onend = () => setRecording(false);
    rec.start();
    recognitionRef.current = rec;
    setRecording(true);
  };

  const addRipple = (e) => {
    const btn = e.currentTarget;
    const r = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.className = 'ripple';
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
      </div>

      <div className="hero-content">

        {/* ── Top row: text + avatar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, marginBottom: 40, flexWrap: 'wrap' }}>

          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="hero-greeting">// hello world — welcome to my space</div>
            <h1 className="hero-title">
              I build things with<br />
              <span className="gradient-text">AI & curiosity.</span>
            </h1>
            <p className="hero-desc">
              AI & ML engineering student · QA Automation engineer · Deep learning enthusiast.
              Dual-enrolled at RIT & IIT Madras. Let's have a conversation ↓
            </p>
          </div>

          {/* Right: animated ring avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ position: 'relative', width: 150, height: 150 }}>
              {/* Spinning gradient ring */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'conic-gradient(#7c3aed, #e879f9, #a855f7, #c026d3, #7c3aed)',
                animation: 'spinRing 4s linear infinite',
              }} />
              {/* Gap ring (dark bg) */}
              <div style={{
                position: 'absolute', inset: 4, borderRadius: '50%',
                background: 'var(--bg)',
              }} />
              {/* Photo */}
              <div style={{
                position: 'absolute', inset: 7, borderRadius: '50%', overflow: 'hidden',
              }}>
                <img
                  src={photo}
                  alt="Haripriya K"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
            </div>

            {/* Online indicator */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10b981',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{
                width: 6, height: 6, background: '#10b981', borderRadius: '50%',
                display: 'inline-block', animation: 'pulseGreen 2s infinite',
              }} />
              online now
            </div>
          </div>
        </div>

        {/* ── Chat box ── */}
        <div className="chat-box">
          <div className="chat-header">
            {/* Avatar in chat header — also uses photo */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%', overflow: 'hidden',
              border: '2px solid var(--fuchsia)', flexShrink: 0,
            }}>
              <img src={photo} alt="HK" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
            <div className="chat-status">
              <span className="chat-name">Haripriya K</span>
              <span className="chat-online">online now</span>
            </div>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`msg ${msg.from}`}>
                {msg.from === 'bot' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', overflow: 'hidden',
                    border: '1.5px solid var(--fuchsia)', flexShrink: 0,
                  }}>
                    <img src={photo} alt="HK" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                )}
                <div className="msg-bubble">
                  {msg.response
                    ? <BotResponseContent response={msg.response} />
                    : <span dangerouslySetInnerHTML={{ __html: msg.html }} />
                  }
                </div>
              </div>
            ))}
            {typing && (
              <div className="msg bot">
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', overflow: 'hidden',
                  border: '1.5px solid var(--fuchsia)', flexShrink: 0,
                }}>
                  <img src={photo} alt="HK" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div className="msg-bubble"><div className="typing-ind"><span /><span /><span /></div></div>
              </div>
            )}
          </div>

          <div className="chip-row">
            {CHIPS.map(c => (
              <button key={c.key} className="chip" onClick={() => handleChip(c.label)}>{c.label}</button>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask me anything…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            />
            <button className={`chat-mic${recording ? ' recording' : ''}`} onClick={handleVoice} title={recording ? 'Stop recording' : 'Voice input'}>
              {recording ? '⏹' : '🎤'}
            </button>
            <button className="chat-send" onClick={(e) => { addRipple(e); sendMessage(input); }}>➤</button>
          </div>
        </div>
      </div>

      {/* Keyframes injected inline for ring spin + pulse */}
      <style>{`
        @keyframes spinRing { to { transform: rotate(360deg); } }
        @keyframes pulseGreen { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}