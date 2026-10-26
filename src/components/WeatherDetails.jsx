// Show "N/A" for a missing value instead of a misleading default (0% or 10 km).
const show = (value, format) => (value == null ? "N/A" : format(value));

export default function WeatherDetails({ weather }) {
  const { main, wind, visibility } = weather;

  const details = [
    { label: "Feels Like", value: show(main?.feels_like ?? main?.temp, (v) => `${Math.round(v)}°C`), icon: "🌡️" },
    { label: "Humidity", value: show(main?.humidity, (v) => `${v}%`), icon: "💧" },
    { label: "Wind Speed", value: show(wind?.speed, (v) => `${v} m/s`), icon: "🌬️" },
    { label: "Pressure", value: show(main?.pressure, (v) => `${v} hPa`), icon: "⏲️" },
    { label: "Visibility", value: show(visibility, (v) => `${(v / 1000).toFixed(1)} km`), icon: "👁️" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:bg-white/20 transition-colors duration-300"
        >
          <span className="text-3xl mb-2 drop-shadow-sm">{detail.icon}</span>
          <span className="text-blue-100 text-sm uppercase tracking-wider font-semibold mb-1">
            {detail.label}
          </span>
          <span className="text-2xl font-bold">{detail.value}</span>
        </div>
      ))}
    </div>
  );
}