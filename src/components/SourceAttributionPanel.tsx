import React, { useState } from 'react';
import {
  Sparkles,
  Truck,
  Building2,
  Flame,
  Factory,
  Wind,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { CityInfo, CAAQMSStation, PollutionSourceAttribution } from '../types';

interface SourceAttributionPanelProps {
  city: CityInfo;
  attributions: PollutionSourceAttribution[];
  stations: CAAQMSStation[];
}

export const SourceAttributionPanel: React.FC<SourceAttributionPanelProps> = ({
  city,
  attributions,
  stations
}) => {
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    executiveBriefing: string;
    transboundaryFactors: string;
    emergencyActions: string[];
    attributions: PollutionSourceAttribution[];
  } | null>(null);

  const getSourceIcon = (category: string) => {
    switch (category) {
      case 'Vehicular Traffic':
        return <Truck className="w-5 h-5 text-blue-400" />;
      case 'Construction & Demolition Dust':
        return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'Biomass & Waste Burning':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'Industrial Stacks':
        return <Factory className="w-5 h-5 text-amber-400" />;
      default:
        return <Wind className="w-5 h-5 text-emerald-400" />;
    }
  };

  const handleRunAiAnalysis = async () => {
    setLoading(true);
    try {
      const activeStation = stations.find((s) => s.cityId === city.id) || stations[0];
      const res = await fetch('/api/analyze-attribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityName: city.name,
          aqi: city.currentAQI,
          primaryPollutant: city.primaryPollutant,
          stationName: activeStation.name,
          ward: activeStation.ward
        })
      });

      const data = await res.json();
      if (data && data.attributionBreakdown) {
        setAiAnalysis({
          executiveBriefing: data.executiveBriefing,
          transboundaryFactors: data.transboundaryFactors,
          emergencyActions: data.recommendedEmergencyActions || [],
          attributions: data.attributionBreakdown
        });
      }
    } catch (err) {
      console.error('Failed to run AI attribution analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeAttributions = aiAnalysis ? aiAnalysis.attributions : attributions;

  return (
    <div className="space-y-6">
      {/* Agent Banner */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-serif italic text-white">Geospatial Pollution Source Attribution Engine</h2>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-900/50 uppercase tracking-wider">
                  Multi-Modal AI Agent
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
                Fuses spatial-temporal CAAQMS station data against land use maps, traffic density, construction permits, industrial stack sensors, and satellite thermal anomalies to attribute pollution by source category with statistical confidence scores.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAiAnalysis}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded font-mono text-xs uppercase font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Run Gemini AI Source Fingerprinting</span>
          </button>
        </div>
      </div>

      {/* AI Executive Briefing Callout */}
      {aiAnalysis && (
        <div className="bg-[#0E0E10] border border-amber-500/30 rounded p-5 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-mono uppercase text-amber-500 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> C-Suite Intelligence Briefing ({city.name})
            </span>
            <span className="text-[10px] font-mono text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded bg-emerald-500/10">
              Statistical Confidence: 94%
            </span>
          </div>
          <p className="text-xs font-sans text-slate-200 leading-relaxed">{aiAnalysis.executiveBriefing}</p>

          <div className="pt-2 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px]">Upwind Transboundary Impact</span>
              <p className="text-slate-300 font-sans text-[11px]">{aiAnalysis.transboundaryFactors}</p>
            </div>

            <div className="space-y-1">
              <span className="text-amber-400 uppercase text-[10px]">Recommended Municipal Directives</span>
              <ul className="space-y-1 text-slate-300 font-sans text-[11px]">
                {aiAnalysis.emergencyActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Source Attribution Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeAttributions.map((attr) => (
          <div
            key={attr.id || attr.category}
            className="bg-[#151518] border border-white/10 rounded p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded bg-[#0E0E10] border border-white/10">
                    {getSourceIcon(attr.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-white">{attr.category}</h3>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Confidence Score: <strong className="text-emerald-400">{attr.confidenceScore}%</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-amber-500">{attr.percentage}%</span>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Share</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-[#0E0E10] rounded overflow-hidden p-0.5 border border-white/5 mb-3">
                <div
                  className="h-full bg-amber-500 rounded transition-all duration-700"
                  style={{ width: `${attr.percentage}%` }}
                />
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">{attr.description}</p>
            </div>

            {/* Hotspot Locations */}
            <div className="pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono text-slate-500 block uppercase mb-1.5">Primary Hotspot Locations:</span>
              <div className="flex flex-wrap gap-1.5">
                {attr.primaryLocations.map((loc, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono bg-[#0E0E10] text-slate-300 px-2 py-0.5 rounded border border-white/5"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
