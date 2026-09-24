export function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader">
      <span className="loader__spinner" />
      <span>{label}</span>
    </div>
  );
}

export function LiveIndicator({ isLive, lastUpdated }) {
  return (
    <div className="live-indicator">
      <span className={`live-indicator__dot${isLive ? ' is-live' : ''}`} />
      <span>{isLive ? 'Live' : 'Paused'}</span>
      {lastUpdated && (
        <span className="live-indicator__time">
          · updated {lastUpdated.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
