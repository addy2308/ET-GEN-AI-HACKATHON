import React, { useState } from 'react';
import {
  MapPin,
  Flame,
  Wind,
  Layers,
  Info,
  Radio,
  AlertTriangle,
  Building2,
  Truck,
  Activity,
  Maximize2
} from 'lucide-react';
import { CityInfo, CAAQMSStation, SatelliteThermalAnomaly } from '../types';

interface DigitalTwinMapProps {
  city: CityInfo;
  stations: CAAQMSStation[];
  thermalAnomalies: SatelliteThermalAnomaly[];
  onSelectStation: (station: CAAQMSStation) => void;
  selectedStation: CAAQMSStation | null;
}

export const DigitalTwinMap: React.FC<DigitalTwinMapProps> = ({
  city,
  stations,
  thermalAnomalies,
  onSelectStation,
  selectedStation
}) => {
  const [showHeatGrid, setShowHeatGrid] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showConstruction, setShowConstruction] = useState(true);
  const [showSatAnomalies, setShowSatAnomalies] = useState(true);

  // Filter stations for selected city
  const cityStations = stations.filter((s) => s.cityId === city.id);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10b981'; // Green
    if (aqi <= 100) return '#34d399'; // Light green
    if (aqi <= 200) return '#f59e0b'; // Amber
    if (aqi <= 300) return '#f97316'; // Orange
    if (aqi <= 400) return '#a855f7'; // Purple
    return '#ef4444'; // Red Severe
  };

  return (
    <div className="space-y-6">
      {/* City Status Metric Header */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Current Urban AQI</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-serif font-bold text-amber-500">{city.currentAQI}</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">{city.category}</span>
            </div>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Primary Pollutant</span>
            <span className="text-2xl font-serif font-bold text-red-400 mt-1 block">{city.primaryPollutant}</span>
            <span className="text-[10px] font-mono text-slate-500">Target for Intervention</span>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Active CAAQMS Nodes</span>
            <span className="text-2xl font-serif font-bold text-emerald-400 mt-1 block">{city.stationCount}</span>
            <span className="text-[10px] font-mono text-slate-500">Live Continuous Feed</span>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Atmospheric Boundary Layer</span>
            <span className="text-2xl font-serif font-bold text-cyan-400 mt-1 block">{city.boundaryLayerM} m</span>
            <span className="text-[10px] font-mono text-slate-500">Inversion Height Limit</span>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Surface Wind Vector</span>
            <span className="text-xl font-serif font-bold text-slate-200 mt-1 block">{city.windSpeedKmh} km/h</span>
            <span className="text-[10px] font-mono text-slate-500">{city.windDirection}</span>
          </div>

          <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">Relative Humidity</span>
            <span className="text-2xl font-serif font-bold text-blue-400 mt-1 block">{city.humidityPct}%</span>
            <span className="text-[10px] font-mono text-slate-500">Aerosol Growth Factor</span>
          </div>
        </div>
      </div>

      {/* Main Digital Twin Grid Map & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Interactive Map Canvas */}
        <div className="lg:col-span-3 bg-[#151518] border border-white/10 rounded p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          {/* Layer Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-mono uppercase text-slate-200 tracking-wider">
                Geospatial Layer Overlay (1km Resolution Grid)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setShowHeatGrid(!showHeatGrid)}
                className={`px-2.5 py-1 rounded border cursor-pointer transition-all ${
                  showHeatGrid
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                    : 'bg-[#0E0E10] text-slate-500 border-white/5 hover:text-slate-300'
                }`}
              >
                1km AQI Grid
              </button>

              <button
                onClick={() => setShowTraffic(!showTraffic)}
                className={`px-2.5 py-1 rounded border cursor-pointer transition-all ${
                  showTraffic
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                    : 'bg-[#0E0E10] text-slate-500 border-white/5 hover:text-slate-300'
                }`}
              >
                Traffic Corridors
              </button>

              <button
                onClick={() => setShowConstruction(!showConstruction)}
                className={`px-2.5 py-1 rounded border cursor-pointer transition-all ${
                  showConstruction
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                    : 'bg-[#0E0E10] text-slate-500 border-white/5 hover:text-slate-300'
                }`}
              >
                Construction Hotspots
              </button>

              <button
                onClick={() => setShowSatAnomalies(!showSatAnomalies)}
                className={`px-2.5 py-1 rounded border cursor-pointer transition-all ${
                  showSatAnomalies
                    ? 'bg-red-500/20 text-red-400 border-red-500/50'
                    : 'bg-[#0E0E10] text-slate-500 border-white/5 hover:text-slate-300'
                }`}
              >
                Thermal Satellite
              </button>
            </div>
          </div>

          {/* SVG Map Canvas Simulation */}
          <div className="relative w-full h-[520px] bg-[#0A0A0B] rounded border border-white/5 overflow-hidden flex items-center justify-center">
            {/* Background Map Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated Heatmap Plume Overlay */}
            {showHeatGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-600 rounded-full filter blur-3xl opacity-60" />
                <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-orange-600 rounded-full filter blur-3xl opacity-50" />
              </div>
            )}

            {/* Traffic Corridor Vector Paths */}
            {showTraffic && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-blue-500/40 stroke-2 fill-none">
                <path d="M 50 120 Q 200 300 650 480" strokeDasharray="6,6" className="animate-pulse" />
                <path d="M 300 40 Q 320 280 340 500" strokeDasharray="4,4" />
                <path d="M 100 400 L 580 180" strokeDasharray="8,8" />
              </svg>
            )}

            {/* Interactive CAAQMS Station Markers */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="relative w-full h-full">
                {cityStations.map((st, idx) => {
                  // Coordinate offset simulation for visual spread
                  const posX = 15 + ((idx * 28 + 12) % 70);
                  const posY = 15 + ((idx * 34 + 20) % 65);
                  const isSelected = selectedStation?.id === st.id;

                  return (
                    <div
                      key={st.id}
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                      onClick={() => onSelectStation(st)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      {/* Pulse effect */}
                      <div
                        className="w-8 h-8 rounded-full absolute -inset-1 opacity-75 animate-ping pointer-events-none"
                        style={{ backgroundColor: getAQIColor(st.aqi) }}
                      />

                      {/* Station Badge */}
                      <div
                        className={`relative px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xl border text-xs font-mono font-bold transition-all ${
                          isSelected
                            ? 'scale-110 ring-2 ring-amber-400 bg-black text-white'
                            : 'bg-[#151518]/90 text-slate-100 hover:scale-105'
                        }`}
                        style={{ borderColor: getAQIColor(st.aqi) }}
                      >
                        <Radio
                          className="w-3 h-3"
                          style={{ color: getAQIColor(st.aqi) }}
                        />
                        <span>{st.aqi}</span>
                      </div>

                      {/* Station Tooltip Hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-[#0E0E10] border border-white/10 rounded p-2 text-left hidden group-hover:block z-30 shadow-2xl pointer-events-none">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">{st.name}</span>
                        <span className="text-xs font-serif font-bold text-white block mt-0.5">{st.ward}</span>
                        <div className="flex justify-between text-[10px] font-mono text-slate-300 mt-1 border-t border-white/5 pt-1">
                          <span>PM2.5: {st.pm25} µg/m³</span>
                          <span>PM10: {st.pm10}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Satellite Thermal Anomaly Hotspots */}
                {showSatAnomalies &&
                  thermalAnomalies.map((anom, idx) => {
                    const posX = 25 + (idx * 30);
                    const posY = 30 + (idx * 25);
                    return (
                      <div
                        key={anom.id}
                        style={{ left: `${posX}%`, top: `${posY}%` }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                      >
                        <div className="p-2 rounded-full bg-red-500/20 text-red-500 border border-red-500/50 animate-bounce">
                          <Flame className="w-5 h-5 fill-current" />
                        </div>

                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-[#0E0E10] border border-red-900/50 rounded p-2 text-left hidden group-hover:block z-30 shadow-2xl pointer-events-none">
                          <span className="text-[10px] font-mono text-red-400 uppercase block">Satellite Thermal Anomaly</span>
                          <span className="text-xs font-serif font-bold text-white block">{anom.type}</span>
                          <span className="text-[10px] font-mono text-slate-400 block mt-1">FRP: {anom.intensityFrp} MW ({anom.detectedTime})</span>
                        </div>
                      </div>
                    );
                  })}

                {/* Construction Hotspots Pins */}
                {showConstruction && (
                  <div className="absolute top-[60%] left-[20%] p-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded cursor-pointer group">
                    <Building2 className="w-4 h-4" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-[#0E0E10] border border-purple-900/50 rounded p-2 hidden group-hover:block z-30">
                      <span className="text-[10px] font-mono text-purple-400 uppercase block">Unmitigated Earthworks Site</span>
                      <span className="text-xs font-serif text-white">Commercial Flyover Expansion</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map Legend Footer */}
            <div className="absolute bottom-3 right-3 bg-[#0E0E10]/90 backdrop-blur border border-white/10 rounded px-3 py-2 text-[10px] font-mono text-slate-300 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Good (&le;50)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Mod (101-200)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>Poor (201-300)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Severe (&gt;400)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: CAAQMS Station Inspection Panel */}
        <div className="bg-[#151518] border border-white/10 rounded p-5 shadow-xl flex flex-col justify-between">
          {selectedStation ? (
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 uppercase">
                    Node Telemetry Active
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{selectedStation.lastUpdated}</span>
                </div>
                <h3 className="text-base font-serif italic text-white mt-1">{selectedStation.name}</h3>
                <p className="text-xs text-slate-400 font-sans">{selectedStation.ward}</p>
              </div>

              {/* Station AQI Score */}
              <div className="bg-[#0E0E10] p-4 rounded border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Station AQI Score</span>
                  <span className="text-3xl font-serif font-bold text-amber-500">{selectedStation.aqi}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Status</span>
                  <span className="text-xs font-mono font-bold text-red-400">{selectedStation.status}</span>
                </div>
              </div>

              {/* Pollutant Level Breakdown Grid */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-slate-400 block">
                  Pollutant Concentration Levels (µg/m³)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-[#0E0E10] p-2.5 rounded border border-white/5">
                    <span className="text-slate-500 block">PM2.5</span>
                    <span className="text-sm font-serif font-bold text-red-400">{selectedStation.pm25}</span>
                  </div>

                  <div className="bg-[#0E0E10] p-2.5 rounded border border-white/5">
                    <span className="text-slate-500 block">PM10</span>
                    <span className="text-sm font-serif font-bold text-amber-400">{selectedStation.pm10}</span>
                  </div>

                  <div className="bg-[#0E0E10] p-2.5 rounded border border-white/5">
                    <span className="text-slate-500 block">NO2</span>
                    <span className="text-sm font-serif font-bold text-slate-200">{selectedStation.no2}</span>
                  </div>

                  <div className="bg-[#0E0E10] p-2.5 rounded border border-white/5">
                    <span className="text-slate-500 block">SO2</span>
                    <span className="text-sm font-serif font-bold text-slate-200">{selectedStation.so2}</span>
                  </div>
                </div>
              </div>

              {/* Primary Contributor */}
              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-amber-500 uppercase block font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Primary Source Contributor
                </span>
                <p className="text-xs text-slate-300 font-sans">{selectedStation.primaryContributor}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
              <Radio className="w-8 h-8 text-slate-600 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-wider">
                Click any CAAQMS Station marker on the map to inspect live pollutant levels and local source attribution.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
