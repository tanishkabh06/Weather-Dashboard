import LocalTime from "./LocalTime";

export default function WeatherCard({ weather }) {
  const { name, sys, main, weather: weatherInfo } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo[0].icon}@4x.png`;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-[1.02] duration-300">
      <h2 className="text-4xl font-bold tracking-wide">
        {name}, {sys.country}
      </h2>
      <LocalTime weather={weather} />
      <div className="flex flex-col md:flex-row items-center justify-center mt-4">
        <img 
          src={iconUrl} 
          alt={weatherInfo[0].description} 
          className="w-40 h-40 drop-shadow-lg filter"
        />
        <div className="flex flex-col items-center md:items-start ml-0 md:ml-6">
          <span className="text-7xl font-extrabold tracking-tighter drop-shadow-md">
            {Math.round(main.temp)}°C
          </span>
          <span className="text-2xl font-medium capitalize mt-2 text-blue-100">
            {weatherInfo[0].description}
          </span>
        </div>
      </div>
    </div>
  );
}
