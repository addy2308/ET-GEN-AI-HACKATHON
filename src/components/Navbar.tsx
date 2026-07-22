import React from 'react';
import {
  Wind,
  MapPin,
  Flame,
  ShieldAlert,
  BarChart2,
  Megaphone,
  Sliders,
  Radio,
  Sparkles,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { CityInfo } from '../types';
import { useTheme } from '../ThemeContext';

interface NavbarProps {
  cities: CityInfo[];
  selectedCity: CityInfo;
  onSelectCity: (city: CityInfo) => void;
  activeTab: 'map' | 'attribution' | 'forecast' | 'enforcement' | 'ncap' | 'advisory';
  setActiveTab: (tab: 'map' | 'attribution' | 'forecast' | 'enforcement' | 'ncap' | 'advisory') => void;
  onOpenSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  activeTab,
  setActiveTab,
  onOpenSimulator
}) => {
  const { theme, toggleTheme } = useTheme();
  
  const getAQIBadgeColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-500/10 text-emerald-400 border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-900/50 light:bg-emerald-100 light:text-emerald-700 light:border-emerald-300';
    if (aqi <= 100) return 'bg-emerald-400/10 text-emerald-300 border-emerald-800/40 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-800/40 light:bg-emerald-100 light:text-emerald-600 light:border-emerald-300';
    if (aqi <= 200) return 'bg-amber-500/10 text-amber-400 border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-900/50 light:bg-amber-100 light:text-amber-700 light:border-amber-300';
    if (aqi <= 300) return 'bg-orange-500/10 text-orange-400 border-orange-900/50 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-900/50 light:bg-orange-100 light:text-orange-700 light:border-orange-300';
    if (aqi <= 400) return 'bg-purple-500/10 text-purple-400 border-purple-900/50 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-900/50 light:bg-purple-100 light:text-purple-700 light:border-purple-300';
    return 'bg-red-500/10 text-red-400 border-red-900/50 animate-pulse dark:bg-red-500/10 dark:text-red-400 dark:border-red-900/50 dark:animate-pulse light:bg-red-100 light:text-red-700 light:border-red-300';
  };

  return (
    <header className="bg-slate-50 dark:bg-[#0E0E10] border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 transition-colors duration-300">
      {/* Top Bar with Live City AQI Ticker & Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3 border-b border-slate-200 dark:border-white/5">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 dark:border-amber-500/30 text-amber-600 dark:text-amber-500 light:bg-amber-100 light:text-amber-700 light:border-amber-300">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif italic text-slate-900 dark:text-white light:text-slate-900 tracking-wide">VayuDrishti AI</h1>
                <span className="text-[10px] font-mono bg-amber-500/10 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 dark:border-amber-500/20 light:bg-amber-100 light:text-amber-700 light:border-amber-300 uppercase tracking-widest flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-400 animate-pulse" /> 900+ CAAQMS Grid
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 light:text-slate-600 font-sans">
                AI-Powered Urban Air Quality Intelligence & Smart City Intervention
              </p>
            </div>
          </div>

          {/* City Switcher & Live Stats Bar & Theme Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-200 dark:bg-white/10 light:bg-slate-200 border border-slate-300 dark:border-white/20 light:border-slate-300 text-slate-700 dark:text-yellow-400 light:text-slate-700 hover:bg-slate-300 dark:hover:bg-white/20 light:hover:bg-slate-300 transition-all cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Selected City Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-white dark:bg-[#151518] light:bg-white border border-slate-300 dark:border-white/10 light:border-slate-300 rounded px-3 py-1.5 cursor-pointer hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500 light:text-amber-600" />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 light:text-slate-600 block uppercase">Target Urban Center</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif font-bold text-slate-900 dark:text-white light:text-slate-900">{selectedCity.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${getAQIBadgeColor(selectedCity.currentAQI)}`}>
                      AQI {selectedCity.currentAQI}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400 light:text-slate-600 ml-1" />
              </div>

              {/* City Selection Menu */}
              <div className="absolute right-0 mt-1 w-64 bg-white dark:bg-[#151518] light:bg-white border border-slate-300 dark:border-white/10 light:border-slate-300 rounded shadow-2xl py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-400 light:text-slate-600 border-b border-slate-200 dark:border-white/5 light:border-slate-200 uppercase tracking-wider">
                  Select Smart City Node
                </div>
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 transition-all cursor-pointer ${
                      selectedCity.id === city.id ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700' : 'text-slate-700 dark:text-slate-300 light:text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-serif block">{city.name}</span>
                      <span className="text-[10px] font-mono text-slate-600 dark:text-slate-500 light:text-slate-600">{city.state}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getAQIBadgeColor(city.currentAQI)}`}>
                      {city.currentAQI} {city.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Trigger Button */}
            <button
              onClick={onOpenSimulator}
              className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 light:bg-amber-600 light:hover:bg-amber-700 text-white dark:text-black light:text-white px-3.5 py-1.5 rounded font-mono text-xs uppercase font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
            >
              <Sliders className="w-4 h-4" />
              <span>Simulate Intervention Wave</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex overflow-x-auto gap-1 py-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'map'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-500 light:text-amber-600" />
            <span>1. Geospatial Digital Twin</span>
          </button>

          <button
            onClick={() => setActiveTab('attribution')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'attribution'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 light:text-emerald-600" />
            <span>2. AI Source Attribution</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'forecast'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400 light:text-cyan-600" />
            <span>3. 24-72h AQI Forecast</span>
          </button>

          <button
            onClick={() => setActiveTab('enforcement')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'enforcement'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 light:text-red-600" />
            <span>4. Enforcement Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab('ncap')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ncap'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-purple-600 dark:text-purple-400 light:text-purple-600" />
            <span>5. Multi-City NCAP Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'advisory'
                ? 'bg-amber-100 dark:bg-amber-500/10 light:bg-amber-100 text-amber-700 dark:text-amber-400 light:text-amber-700 border border-amber-300 dark:border-amber-500/40 light:border-amber-300 shadow'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-600 hover:text-slate-900 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/5 light:hover:bg-slate-100 border border-transparent'
            }`}
          >
            <Megaphone className="w-4 h-4 text-blue-600 dark:text-blue-400 light:text-blue-600" />
            <span>6. Citizen Health & Advisory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
