import { useState, useRef, useEffect } from 'react';
import { getBotResponse, CHIPS } from '../utils/chatResponses';
import { playKeyClick, playPop } from '../utils/sound';

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
  const bottomRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const recognitionRef = useRef(null);

  // Scroll only within the chat window — never touches the page scroll position
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
      // Stop recording and leave transcript in input for user to review & send
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.onresult = (e) => {
      // Place transcript into input box — user sends manually
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
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
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
        <div className="hero-greeting">// hello world — welcome to my space</div>
        <h1 className="hero-title">
          I build things with<br />
          <span className="gradient-text">AI & curiosity.</span>
        </h1>
        <p className="hero-desc">
          AI & ML engineering student · QA Automation engineer · Deep learning enthusiast.
          Dual-enrolled at RIT & IIT Madras. Let's have a conversation ↓
        </p>

        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-avatar">HK</div>
            <div className="chat-status">
              <span className="chat-name">Haripriya K</span>
              <span className="chat-online">online now</span>
            </div>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map(msg => (
              <div key={msg.id} className={`msg ${msg.from}`}>
                {msg.from === 'bot' && <div className="chat-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem', flexShrink: 0 }}>HK</div>}
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
                <div className="chat-avatar" style={{ width: 28, height: 28, fontSize: '0.7rem', flexShrink: 0 }}>HK</div>
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
            <button className={`chat-mic${recording ? ' recording' : ''}`} onClick={handleVoice} title="Voice input">🎤</button>
            <button className="chat-send" onClick={(e) => { addRipple(e); sendMessage(input); }}>➤</button>
          </div>
        </div>
      </div>
    </section>
  );
}
