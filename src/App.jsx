import { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Hide loader after 2.8s
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2800);
    return () => clearTimeout(t);
  }, []);

  // Apply theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const onScroll = () => {
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      bar.style.width = `${pct * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Global IntersectionObserver for section tags & titles
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.15 }
      );
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [loaded]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <div id="scroll-progress" />
      <Cursor />
      <Loader hide={loaded} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Story />
        <Projects />
        <Skills />
        <Experience />
        <Research />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
