export default function SearchBar({ city, setCity, searchWeather, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <div className="flex justify-center w-full max-w-md mx-auto group">
      <div className="relative w-full transition-all duration-500 ease-in-out group-hover:max-w-2xl group-focus-within:max-w-2xl">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 text-white placeholder-slate-400 rounded-full py-4 pl-8 pr-32 outline-none focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-500/20 transition-all shadow-xl shadow-cyan-900/20 hover:bg-slate-800/60"
        />
        <button
          onClick={searchWeather}
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-600 text-white font-bold rounded-full px-6 transition-all shadow-lg hover:shadow-cyan-500/40"
        >
          Search
        </button>
      </div>
    </div>
  );
}
