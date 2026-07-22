import React from 'react';
import {
  Wind,
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { CityInfo, ForecastPoint } from '../types';

interface PredictiveForecastPanelProps {
  city: CityInfo;
  forecastPoints: ForecastPoint[];
}

export const PredictiveForecastPanel: React.FC<PredictiveForecastPanelProps> = ({
  city,
  forecastPoints
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Wind className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif italic text-white">Hyperlocal Predictive AQI Forecasting Agent</h2>
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded border border-cyan-900/50 uppercase tracking-wider">
                1km Grid Atmospheric Dispersion Model
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
              Integrates meteorological forecasts, traffic density models, atmospheric boundary layer inversion heights, and seasonal emission calendars for 24–72 hour ward-level forecasts.
            </p>
          </div>
        </div>

        <div className="bg-[#0E0E10] p-4 rounded border border-white/5 text-right shrink-0 font-mono">
          <span className="text-[10px] uppercase text-slate-400 block">Peak Forecast AQI Window</span>
          <span className="text-2xl font-serif font-bold text-red-400 mt-0.5 block">
            {Math.max(...forecastPoints.map((f) => f.predictedAQI))} AQI
          </span>
          <span className="text-[10px] text-slate-500 block">Expected at +24h Window</span>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 24-72h AQI Forecast Area Chart */}
        <div className="lg:col-span-2 bg-[#151518] border border-white/10 rounded p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-serif italic font-bold text-white">24-72 Hour AQI & PM2.5 Trajectory</h3>
                  <span className="text-[10px] font-mono text-slate-400">Resolution: 1km Ward-Grid Array</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-amber-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Predicted AQI
                </span>
                <span className="flex items-center gap-1 text-red-400 ml-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" /> PM2.5 (µg/m³)
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastPoints} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="pm25Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="hourLabel" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0E0E10', borderColor: '#333333', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="predictedAQI" name="Predicted AQI" stroke="#f59e0b" fillOpacity={1} fill="url(#aqiGrad)" />
                  <Area type="monotone" dataKey="pm25" name="PM2.5 Level" stroke="#ef4444" fillOpacity={1} fill="url(#pm25Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-400 flex flex-wrap justify-between gap-2">
            <span>Forecast Model Confidence: <strong className="text-emerald-400">89.4%</strong></span>
            <span>Atmospheric Dispersion Index: <strong className="text-amber-400">STAGNANT / POOR</strong></span>
          </div>
        </div>

        {/* Right 1 Col: Dispersion Parameters & Scheduled Intervention Window */}
        <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-200 border-b border-white/10 pb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Proactive Intervention Scheduling
            </h3>

            <div className="bg-[#0E0E10] p-4 rounded border border-amber-500/30 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Optimal Action Window: +12h to +18h
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Atmospheric wind velocity is forecast to drop from 6.2 km/h to 2.8 km/h at +12 hours, collapsing the boundary layer. Municipal water cannon trucks and construction halts must be activated <strong>BEFORE +12h</strong> to prevent AQI spiking above 390.
              </p>
            </div>

            {/* Dispersion Matrix Cards */}
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Boundary Layer (+24h)</span>
                <span className="text-cyan-400 font-bold">280 meters (Low)</span>
              </div>

              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Wind Direction (+24h)</span>
                <span className="text-slate-200 font-bold">CALM / NW Drift</span>
              </div>

              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Ventilation Coefficient</span>
                <span className="text-red-400 font-bold">&lt; 1,800 m²/s (Severe)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-4 h-4" /> Predictive Trigger Protocol: ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
