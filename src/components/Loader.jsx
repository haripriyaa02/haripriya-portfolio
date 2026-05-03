export default function Loader({ hide }) {
  return (
    <div className={`loader-wrap${hide ? ' hide' : ''}`}>
      <div className="loader-name">Haripriya K</div>
      <div className="loader-sub">// initializing portfolio...</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" />
      </div>
    </div>
  );
}
