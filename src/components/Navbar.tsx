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
  ChevronDown
} from 'lucide-react';
import { CityInfo } from '../types';

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
  const getAQIBadgeColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-500/10 text-emerald-400 border-emerald-900/50';
    if (aqi <= 100) return 'bg-emerald-400/10 text-emerald-300 border-emerald-800/40';
    if (aqi <= 200) return 'bg-amber-500/10 text-amber-400 border-amber-900/50';
    if (aqi <= 300) return 'bg-orange-500/10 text-orange-400 border-orange-900/50';
    if (aqi <= 400) return 'bg-purple-500/10 text-purple-400 border-purple-900/50';
    return 'bg-red-500/10 text-red-400 border-red-900/50 animate-pulse';
  };

  return (
    <header className="bg-[#0E0E10] border-b border-white/10 sticky top-0 z-40">
      {/* Top Bar with Live City AQI Ticker & Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3 border-b border-white/5">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif italic text-white tracking-wide">VayuDrishti AI</h1>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" /> 900+ CAAQMS Grid
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                AI-Powered Urban Air Quality Intelligence & Smart City Intervention
              </p>
            </div>
          </div>

          {/* City Switcher & Live Stats Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Selected City Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-[#151518] border border-white/10 rounded px-3 py-1.5 cursor-pointer hover:border-amber-500/40 transition-all">
                <MapPin className="w-4 h-4 text-amber-500" />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Target Urban Center</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif font-bold text-white">{selectedCity.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${getAQIBadgeColor(selectedCity.currentAQI)}`}>
                      AQI {selectedCity.currentAQI}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
              </div>

              {/* City Selection Menu */}
              <div className="absolute right-0 mt-1 w-64 bg-[#151518] border border-white/10 rounded shadow-2xl py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 border-b border-white/5 uppercase tracking-wider">
                  Select Smart City Node
                </div>
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onSelectCity(city)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer ${
                      selectedCity.id === city.id ? 'bg-amber-500/10 text-amber-400' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-serif block">{city.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{city.state}</span>
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
              className="bg-amber-500 hover:bg-amber-400 text-black px-3.5 py-1.5 rounded font-mono text-xs uppercase font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
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
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>1. Geospatial Digital Twin</span>
          </button>

          <button
            onClick={() => setActiveTab('attribution')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'attribution'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>2. AI Source Attribution</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'forecast'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>3. 24-72h AQI Forecast</span>
          </button>

          <button
            onClick={() => setActiveTab('enforcement')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'enforcement'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>4. Enforcement Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab('ncap')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ncap'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <span>5. Multi-City NCAP Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-3.5 py-2 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'advisory'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Megaphone className="w-4 h-4 text-blue-400" />
            <span>6. Citizen Health & Advisory</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
