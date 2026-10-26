import { summarizeForecast } from "../utils/forecast";

export default function Forecast({ forecast, error }) {
  const days = summarizeForecast(forecast);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mt-8 shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-center tracking-wide uppercase text-blue-50">
        5-Day Forecast
      </h3>

      {days.length === 0 ? (
        <p className="text-center text-blue-100">
          {error || "Forecast data is not available for this location."}
        </p>
      ) : (
        <div className="flex justify-between items-center overflow-x-auto gap-4 pb-2">
          {days.map((item) => (
            <div
              key={item.date}
              className="flex flex-col items-center min-w-[70px] p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <span className="text-blue-100 font-medium">{item.day}</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.description}
                title={item.description}
                className="w-12 h-12"
              />
              <span className="font-bold text-lg">{item.max}°</span>
              <span className="text-sm text-blue-200">{item.min}°</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}