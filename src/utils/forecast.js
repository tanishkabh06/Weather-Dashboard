// Turns OpenWeatherMap's 3-hourly forecast list into one summary per day.
// Days are grouped in the searched city's local time (data.city.timezone, in seconds).
export function summarizeForecast(data, maxDays = 5) {
  if (!data?.list?.length) return [];

  const offset = data.city?.timezone ?? 0;
  const days = new Map();

  for (const entry of data.list) {
    // Shift to the city's local time, then read it with UTC getters.
    const local = new Date((entry.dt + offset) * 1000);
    const key = local.toISOString().slice(0, 10);
    if (!days.has(key)) days.set(key, []);
    days.get(key).push({ entry, hour: local.getUTCHours() });
  }

  return [...days.entries()].slice(0, maxDays).map(([key, items]) => {
    // Use the reading closest to midday as the day's representative icon.
    const midday = items.reduce((best, cur) =>
      Math.abs(cur.hour - 12) < Math.abs(best.hour - 12) ? cur : best
    ).entry;

    return {
      date: key,
      day: new Date(`${key}T00:00:00Z`).toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "UTC",
      }),
      max: Math.round(Math.max(...items.map((i) => i.entry.main.temp_max))),
      min: Math.round(Math.min(...items.map((i) => i.entry.main.temp_min))),
      icon: midday.weather[0].icon.replace("n", "d"),
      description: midday.weather[0].description,
    };
  });
}