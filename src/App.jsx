import { useState, useEffect, useMemo } from "react";
import { getWeather, getForecast, WeatherError } from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Loader from "./components/Loader";
import Forecast from "./components/Forecast";

function WeatherEffects({ weather }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (weather) return; // Only need mouse tracking for landing page
    
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [weather]);

  const condition = weather?.weather?.[0]?.main?.toLowerCase() || "";
  const description = weather?.weather?.[0]?.description?.toLowerCase() || "";
  const temp = weather?.main?.temp || 0;
  const windSpeed = weather?.wind?.speed || 0;

  const isRain = condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunderstorm");
  const isHeavyRain = description.includes("heavy") || description.includes("extreme") || condition.includes("thunderstorm");
  const isSnow = condition.includes("snow") || temp <= 0; // Trigger snow if it's explicitly snowing or below freezing
  const isClear = condition.includes("clear");
  const isClouds = condition.includes("cloud");
  const isOvercast = description.includes("overcast") || condition.includes("clouds");
  const isHot = temp >= 30;
  const isCold = temp <= 10; // Trigger winter cooling effect
  const isWindy = windSpeed > 8;

  const rainDrops = useMemo(() => Array.from({ length: isHeavyRain ? 250 : 120 }).map(() => ({
    left: `${Math.random() * 100}vw`,
    top: `-${Math.random() * 20}vh`,
    delay: `${Math.random() * 1}s`,
    duration: isHeavyRain ? `${0.3 + Math.random() * 0.3}s` : `${0.6 + Math.random() * 0.4}s`
  })), [isHeavyRain]);

  const snowFlakes = useMemo(() => Array.from({ length: 70 }).map(() => ({
    left: `${Math.random() * 100}vw`,
    top: `-${Math.random() * 20}vh`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`
  })), []);

  const stars = useMemo(() => Array.from({ length: 40 }).map(() => ({
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 2}s`,
    duration: `${1 + Math.random() * 3}s`,
    opacity: Math.random() * 0.8 + 0.2
  })), []);

  const clouds = useMemo(() => Array.from({ length: 12 }).map(() => ({
    top: `${Math.random() * 80 - 10}vh`,
    width: `${Math.random() * 60 + 20}vw`,
    height: `${Math.random() * 25 + 10}vh`,
    delay: `${Math.random() * -30}s`,
    duration: `${20 + Math.random() * 20}s`
  })), []);

  const heatWaves = useMemo(() => Array.from({ length: 15 }).map(() => ({
    left: `${Math.random() * 100}vw`,
    width: `${Math.random() * 30 + 10}vw`,
    height: `${Math.random() * 30 + 10}vw`,
    delay: `${Math.random() * 2}s`,
    duration: `${3 + Math.random() * 2}s`
  })), []);

  const windLines = useMemo(() => Array.from({ length: 25 }).map(() => ({
    top: `${Math.random() * 100}vh`,
    delay: `${Math.random() * 2}s`,
    duration: `${0.8 + Math.random() * 1}s`,
    rotate: `${Math.random() * 10 - 5}deg`
  })), []);

  if (!weather) {
    // Initial Landing Page: Floating Galaxy/Aurora orbs with parallax hover effect
    const offsetX = mousePos.x * 60; 
    const offsetY = mousePos.y * 60;
    
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${offsetX * -1}px, ${offsetY * -1}px)` }}>
          <div className="w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        </div>
        
        <div className="absolute bottom-[-10%] right-[-10%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}>
          <div className="w-[60vw] h-[60vw] bg-cyan-600/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        </div>
        
        <div className="absolute top-[40%] left-[60%] transition-transform duration-1000 ease-out" style={{ transform: `translate(${offsetX * -1.5}px, ${offsetY * 1.5}px)` }}>
          <div className="w-[40vw] h-[40vw] bg-pink-600/20 rounded-full blur-[90px] animate-float" style={{ animationDelay: '-4s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background ambient lighting based on temp */}
      {isHot && (
        <div className="absolute inset-0 bg-orange-900/10 mix-blend-color-burn" />
      )}
      
      {/* Winter cooling effect */}
      {isCold && (
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
      )}
      
      {/* Overcast faded effect overall */}
      {isOvercast && (
        <div className="absolute inset-0 bg-slate-500/20 mix-blend-overlay backdrop-brightness-[0.8]" />
      )}

      {/* RAIN EFFECT (Changes intensity if heavy) */}
      {isRain && (
        rainDrops.map((drop, i) => (
          <div 
            key={`rain-${i}`}
            className={`absolute rounded-full animate-rain ${isHeavyRain ? "bg-blue-200/50 w-[2px] h-10" : "bg-blue-100/30 w-[1px] h-6"}`}
            style={{ 
              left: drop.left,
              top: drop.top,
              animationDelay: drop.delay,
              animationDuration: drop.duration
            }}
          />
        ))
      )}
      
      {/* SNOW EFFECT */}
      {isSnow && (
        snowFlakes.map((flake, i) => (
          <div 
            key={`snow-${i}`}
            className="absolute bg-white/70 w-2.5 h-2.5 rounded-full blur-[1px] animate-snow"
            style={{ 
              left: flake.left,
              top: flake.top,
              animationDelay: flake.delay,
              animationDuration: flake.duration
            }}
          />
        ))
      )}

      {/* CLEAR SKY EFFECT (Stars) */}
      {isClear && (
        stars.map((star, i) => (
          <div 
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{ 
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              opacity: star.opacity
            }}
          />
        ))
      )}

      {/* CLOUD EFFECT */}
      {isClouds && (
        clouds.map((cloud, i) => (
          <div 
            key={`cloud-${i}`}
            className="absolute bg-slate-200/10 blur-[60px] rounded-[100%] animate-cloud"
            style={{ 
              left: `-30vw`,
              top: cloud.top,
              width: cloud.width,
              height: cloud.height,
              animationDelay: cloud.delay,
              animationDuration: cloud.duration
            }}
          />
        ))
      )}

      {/* HEAT EFFECT */}
      {isHot && (
        heatWaves.map((heat, i) => (
          <div 
            key={`heat-${i}`}
            className="absolute bg-orange-500/20 blur-[50px] rounded-full animate-heat"
            style={{ 
              left: heat.left,
              bottom: `-20vh`,
              width: heat.width,
              height: heat.height,
              animationDelay: heat.delay,
              animationDuration: heat.duration
            }}
          />
        ))
      )}

      {/* WIND EFFECT */}
      {isWindy && (
        windLines.map((wind, i) => (
          <div 
            key={`wind-${i}`}
            className="absolute bg-slate-300/40 w-12 h-[1px] rounded-full animate-wind"
            style={{ 
              left: `-10vw`,
              top: wind.top,
              animationDelay: wind.delay,
              animationDuration: wind.duration,
              transform: `rotate(${wind.rotate})`
            }}
          />
        ))
      )}
    </div>
  );
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [forecastError, setForecastError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);
    setForecastError("");

    try {
      // Current weather is required; the forecast is optional, so one failing
      // does not hide the other.
      const [weatherResult, forecastResult] = await Promise.allSettled([
        getWeather(city),
        getForecast(city),
      ]);

      if (weatherResult.status === "rejected") throw weatherResult.reason;
      setWeather(weatherResult.value);

      if (forecastResult.status === "fulfilled") {
        setForecast(forecastResult.value);
      } else {
        setForecastError("Forecast is temporarily unavailable.");
      }
    }
    catch (err) {
      console.error(err);
      setError(
        err instanceof WeatherError
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div  className="relative min-h-screen bg-[#090b14] bg-gradient-to-br from-slate-900 via-[#0a1128] to-[#040814] text-white flex flex-col items-center py-12 px-4 font-sans selection:bg-cyan-500 selection:text-white overflow-hidden">
      
      {/* Background Weather Effects */}
      <WeatherEffects weather={weather} />

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        <div className="text-center mb-10 pointer-events-none">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
            Weather Forecast
          </h1>
          <p className="text-slate-400 text-lg">Check current conditions around the world</p>
        </div>

        <SearchBar 
          city={city} 
          setCity={setCity} 
          searchWeather={searchWeather} 
          loading={loading} 
        />

        {error && (
          <div className="bg-red-900/40 backdrop-blur-md border border-red-500/50 rounded-2xl p-4 text-center mx-auto max-w-md shadow-lg shadow-red-900/20">
            <p className="text-red-200 font-medium">{error}</p>
          </div>
        )}

        {loading && <Loader />}

        {weather && !loading && (
          <div className="space-y-6">
            <WeatherCard weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast forecast={forecast} error={forecastError} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;