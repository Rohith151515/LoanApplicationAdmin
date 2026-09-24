import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_INTERVAL = Number(import.meta.env.VITE_POLL_INTERVAL) || 5000;

/**
 * Repeatedly calls `fetcher` on an interval, giving screens a "live" feed
 * without needing a websocket endpoint. Pausing/resuming and manual
 * refresh are both supported so the UI can surface real controls.
 */
export default function usePolling(fetcher, { interval = DEFAULT_INTERVAL, enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLive, setIsLive] = useState(enabled);
  const timerRef = useRef(null);

  const run = useCallback(async () => {
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    run();
    if (isLive) {
      timerRef.current = setInterval(run, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [run, interval, isLive]);

  const refreshNow = useCallback(() => {
    setLoading(true);
    run();
  }, [run]);

  const toggleLive = useCallback(() => setIsLive((prev) => !prev), []);

  return { data, error, loading, lastUpdated, isLive, toggleLive, refreshNow };
}
