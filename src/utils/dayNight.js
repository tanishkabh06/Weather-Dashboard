// Local time and day/night helpers. OpenWeatherMap gives us `timezone`
// (seconds offset from UTC) and an icon code ending in "d" (day) or "n" (night).

export function getLocalClock(nowMs, timezoneSeconds = 0) {
  // Shift to the city's local time, then format with the UTC timezone so the
  // browser's own timezone is ignored.
  const local = new Date(nowMs + timezoneSeconds * 1000);
  return {
    date: local.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    }),
    time: local.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    }),
  };
}

export function isDaytime(weather) {
  return weather?.weather?.[0]?.icon?.endsWith("d") ?? false;
}