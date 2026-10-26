const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Custom error so the UI can show a specific message for each failure type.
export class WeatherError extends Error {
  constructor(type, message) {
    super(message);
    this.name = "WeatherError";
    this.type = type;
  }
}

async function request(endpoint, params) {
  if (!API_KEY) {
    throw new WeatherError(
      "config",
      "API key is missing. Add VITE_WEATHER_API_KEY to your .env file."
    );
  }

  // URLSearchParams encodes the city safely (spaces, accents, symbols).
  const query = new URLSearchParams({ ...params, appid: API_KEY, units: "metric" });

  let response;
  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  } catch {
    throw new WeatherError(
      "network",
      "Could not reach the weather service. Check your internet connection."
    );
  }

  if (response.status === 404) {
    throw new WeatherError("not_found", "City not found. Please try again.");
  }
  if (response.status === 401) {
    throw new WeatherError(
      "invalid_key",
      "The weather service rejected the API key. Please check your configuration."
    );
  }
  if (response.status === 429) {
    throw new WeatherError(
      "rate_limit",
      "Too many requests. Please wait a moment and try again."
    );
  }
  if (!response.ok) {
    throw new WeatherError(
      "server",
      "The weather service is having trouble. Please try again later."
    );
  }

  return response.json();
}

export function getWeather(city) {
  return request("weather", { q: city.trim() });
}

export function getForecast(city) {
  return request("forecast", { q: city.trim() });
}