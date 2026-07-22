import React from 'react';
import {
  BarChart2,
  Building,
  TrendingDown,
  Award,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { CityComparisonData } from '../types';

interface MultiCityDashboardProps {
  metrics: CityComparisonData[];
}

export const MultiCityDashboard: React.FC<MultiCityDashboardProps> = ({ metrics }) => {
  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case 'COMPLIANT':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-900/50';
      case 'NEEDS_IMPROVEMENT':
        return 'bg-amber-500/10 text-amber-400 border-amber-900/50';
      default:
        return 'bg-red-500/10 text-red-400 border-red-900/50';
    }
  };

  const getAQIBarColor = (aqi: number) => {
    if (aqi <= 100) return '#10b981';
    if (aqi <= 200) return '#f59e0b';
    if (aqi <= 300) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <BarChart2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif italic text-white">Multi-City Comparative Intelligence Dashboard</h2>
              <span className="text-[10px] font-mono bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded border border-purple-900/50 uppercase tracking-wider">
                National Clean Air Programme (NCAP) Grid
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
              Tracks air quality trends, NCAP compliance reduction targets (20-30%), active CAAQMS monitoring density, and intervention effectiveness metrics across major Indian urban centers.
            </p>
          </div>
        </div>

        <div className="bg-[#0E0E10] p-4 rounded border border-white/5 text-right shrink-0 font-mono">
          <span className="text-[10px] uppercase text-slate-400 block">Monitored Tier 1/2 Cities</span>
          <span className="text-2xl font-serif font-bold text-amber-500 mt-0.5 block">
            {metrics.length} Metro Nodes
          </span>
          <span className="text-[10px] text-slate-500 block">123 Total CAAQMS Stations</span>
        </div>
      </div>

      {/* Main Grid: Comparative Chart & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recharts Comparative Bar Chart */}
        <div className="lg:col-span-2 bg-[#151518] border border-white/10 rounded p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-serif italic font-bold text-white">Live AQI Comparison Across Indian Metros</h3>
                  <span className="text-[10px] font-mono text-slate-400">Benchmarked against CPCB National Ambient Air Standard</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="cityName" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0E0E10', borderColor: '#333333', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="currentAQI" name="Current Live AQI" radius={[4, 4, 0, 0]}>
                    {metrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getAQIBarColor(entry.currentAQI)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-xs font-mono text-slate-400 flex flex-wrap justify-between gap-2">
            <span>Cleanest Monitored Metro: <strong className="text-emerald-400">Chennai (AQI 92)</strong></span>
            <span>Highest Pollution Stress: <strong className="text-red-400">Delhi NCR (AQI 328)</strong></span>
          </div>
        </div>

        {/* Right 1 Col: Inter-City Policy Transfer & Cross Learning */}
        <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-200 border-b border-white/10 pb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Cross-City Intervention Best Practices
            </h3>

            <div className="space-y-3 font-sans text-xs">
              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                  Mumbai Coastal Dust Mandates
                </span>
                <p className="text-slate-300">
                  Mandating 35-foot perimeter geotextile screens & mandatory fogging cannons on all High-Rise sites reduced localized PM10 dust by <strong>22%</strong>.
                </p>
              </div>

              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                  Bengaluru Congestion Rerouting
                </span>
                <p className="text-slate-300">
                  Adaptive traffic signal cycles along Silk Board & ORR tech corridors reduced idle diesel bus emissions by <strong>18%</strong> during peak commute hours.
                </p>
              </div>

              <div className="bg-[#0E0E10] p-3 rounded border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                  Chennai Industrial Stack Telemetry
                </span>
                <p className="text-slate-300">
                  Automated stack shutoff switches triggered by continuous CPCB telemetry eliminated illegal high-sulfur petcoke burning in <strong>38 factories</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NCAP Compliance Table */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-widest text-slate-200">
          National Clean Air Programme (NCAP) City Performance Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-slate-300">
            <thead className="bg-[#0E0E10] text-[10px] uppercase text-slate-400 border-b border-white/10">
              <tr>
                <th className="p-3">Urban Center</th>
                <th className="p-3">State</th>
                <th className="p-3">Current AQI</th>
                <th className="p-3">PM2.5 Avg (µg/m³)</th>
                <th className="p-3">NCAP Target Reduction</th>
                <th className="p-3">Active CAAQMS</th>
                <th className="p-3">Interventions Enforced</th>
                <th className="p-3 text-right">NCAP Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metrics.map((m) => (
                <tr key={m.cityId} className="hover:bg-white/5 transition-all">
                  <td className="p-3 font-serif font-bold text-white text-sm">{m.cityName}</td>
                  <td className="p-3 text-slate-400">{m.state}</td>
                  <td className="p-3">
                    <span className="font-bold text-amber-400">{m.currentAQI}</span>
                  </td>
                  <td className="p-3 text-slate-300">{m.pm25Average} µg/m³</td>
                  <td className="p-3 text-cyan-400 font-bold">-{m.ncapTargetReductionPct}%</td>
                  <td className="p-3 text-slate-300">{m.activeCAAQMSStations} Nodes</td>
                  <td className="p-3 text-emerald-400 font-bold">{m.enforcementInterventionsCount} Actions</td>
                  <td className="p-3 text-right">
                    <span className={`text-[10px] px-2.5 py-1 rounded border uppercase font-bold ${getRatingBadge(m.complianceRating)}`}>
                      {m.complianceRating.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
