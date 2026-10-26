import { useState, useEffect } from "react";
import { getLocalClock, isDaytime } from "../utils/dayNight";

export default function LocalTime({ weather }) {
  // Start from the API's observation time, then keep the clock live.
  const [now, setNow] = useState(weather.dt * 1000);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 15000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const { date, time } = getLocalClock(now, weather.timezone);

  return (
    <p className="mt-2 text-blue-100 text-lg tracking-wide">
      {date} · {time} · {isDaytime(weather) ? "☀️ Daytime" : "🌙 Night"}
    </p>
  );
}