export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Haripriya K — All rights reserved.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
        Built with <span style={{ color: 'var(--fuchsia)' }}>♥</span> & React
      </div>
    </footer>
  );
}
