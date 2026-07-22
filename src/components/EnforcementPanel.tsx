import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  Flame,
  Truck,
  Factory,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  X,
  Send,
  Scale
} from 'lucide-react';
import { CityInfo, EnforcementAction } from '../types';

interface EnforcementPanelProps {
  city: CityInfo;
  enforcements: EnforcementAction[];
  onUpdateEnforcementStatus: (id: string, newStatus: 'RECOMMENDED' | 'DISPATCHED' | 'ENFORCED') => void;
}

export const EnforcementPanel: React.FC<EnforcementPanelProps> = ({
  city,
  enforcements,
  onUpdateEnforcementStatus
}) => {
  const [selectedEnforcement, setSelectedEnforcement] = useState<EnforcementAction | null>(null);
  const [loadingNotice, setLoadingNotice] = useState(false);
  const [generatedNotice, setGeneratedNotice] = useState<string | null>(null);

  const cityEnforcements = enforcements.filter((e) => e.cityId === city.id || e.cityId === 'delhi');

  const getSourceCategoryIcon = (category: string) => {
    switch (category) {
      case 'Construction Site':
        return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'Waste Burning Hotspot':
        return <Flame className="w-5 h-5 text-red-400" />;
      case 'Industrial Stack':
        return <Factory className="w-5 h-5 text-amber-400" />;
      default:
        return <Truck className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleGenerateLegalNotice = async (act: EnforcementAction) => {
    setSelectedEnforcement(act);
    setLoadingNotice(true);
    setGeneratedNotice(null);

    try {
      const res = await fetch('/api/generate-enforcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityName: city.name,
          ward: act.ward,
          targetName: act.targetName,
          sourceCategory: act.sourceCategory
        })
      });

      const data = await res.json();
      if (data && data.legalNoticeDraft) {
        setGeneratedNotice(data.legalNoticeDraft);
      }
    } catch (err) {
      console.error('Failed to generate legal notice:', err);
    } finally {
      setLoadingNotice(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-red-500/10 text-red-400 border border-red-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif italic text-white">Enforcement Intelligence & Prioritisation Agent</h2>
              <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded border border-red-900/50 uppercase tracking-wider">
                Municipal & SPCB Action Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
              Correlates CAAQMS hotspot spikes with registered emission sources (construction permits, industrial stacks, waste dumping fires, heavy diesel routes) and generates evidence-backed inspection directives.
            </p>
          </div>
        </div>

        <div className="bg-[#0E0E10] p-4 rounded border border-white/5 text-right shrink-0 font-mono">
          <span className="text-[10px] uppercase text-slate-400 block">Total Active Directives</span>
          <span className="text-2xl font-serif font-bold text-red-400 mt-0.5 block">
            {cityEnforcements.length} Directives
          </span>
          <span className="text-[10px] text-emerald-400 block">
            {cityEnforcements.filter((e) => e.status === 'ENFORCED').length} Enforced
          </span>
        </div>
      </div>

      {/* Enforcement Actions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cityEnforcements.map((act) => (
          <div
            key={act.id}
            className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded bg-[#0E0E10] border border-white/10">
                    {getSourceCategoryIcon(act.sourceCategory)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 uppercase block font-bold">
                      {act.priority} PRIORITY HOTSPOT
                    </span>
                    <h3 className="text-base font-serif font-bold text-white leading-tight">{act.targetName}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded border uppercase font-bold ${
                      act.status === 'ENFORCED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-900/50'
                        : act.status === 'DISPATCHED'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-900/50'
                        : 'bg-red-500/10 text-red-400 border-red-900/50'
                    }`}
                  >
                    {act.status}
                  </span>
                </div>
              </div>

              {/* Location & Intervention Details */}
              <div className="space-y-2 text-xs font-mono mb-4">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Ward / Location:</span>
                  <span className="text-white font-serif">{act.ward}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Assigned Enforcement Authority:</span>
                  <span className="text-amber-400 font-bold">{act.assignedAgency}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Est. Local PM2.5 Reduction:</span>
                  <span className="text-emerald-400 font-bold">-{act.estimatedPMReductionPct}%</span>
                </div>

                {act.fineAmountInr ? (
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Proposed Fine Penalty:</span>
                    <span className="text-red-400 font-bold">₹{act.fineAmountInr.toLocaleString('en-IN')}</span>
                  </div>
                ) : null}
              </div>

              {/* Recommended Action Box */}
              <div className="bg-[#0E0E10] p-3.5 rounded border border-white/5 space-y-1 mb-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                  Recommended Municipal Intervention:
                </span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">{act.recommendedIntervention}</p>
              </div>

              {/* Sensor Evidence Summary */}
              <div className="text-[11px] text-slate-400 font-sans border-t border-white/5 pt-3">
                <strong className="text-slate-300 font-mono">Evidence Log:</strong> {act.evidenceSummary}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-500">Status:</span>
                <button
                  onClick={() => onUpdateEnforcementStatus(act.id, 'DISPATCHED')}
                  className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-900/50 hover:bg-amber-500/20 cursor-pointer"
                >
                  Dispatch Inspector
                </button>
                <button
                  onClick={() => onUpdateEnforcementStatus(act.id, 'ENFORCED')}
                  className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-900/50 hover:bg-emerald-500/20 cursor-pointer"
                >
                  Enforce Order
                </button>
              </div>

              <button
                onClick={() => handleGenerateLegalNotice(act)}
                className="bg-white/5 hover:bg-white/10 text-slate-200 px-3 py-1.5 rounded font-mono text-xs uppercase font-bold flex items-center gap-1.5 border border-white/10 cursor-pointer transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>CPCB Legal Notice</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Legal Notice Generation Modal */}
      {selectedEnforcement && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151518] border border-white/10 rounded max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Scale className="w-5 h-5" />
                <h3 className="text-base font-serif italic text-white">
                  Official CPCB/SPCB Legal Notice Draft
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnforcement(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingNotice ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <p className="text-xs font-mono uppercase">Drafting Section 31A Legal Notice via Gemini AI...</p>
              </div>
            ) : generatedNotice ? (
              <div className="space-y-4">
                <div className="bg-[#0E0E10] border border-white/5 rounded p-4 max-h-96 overflow-y-auto text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-amber-500 selection:text-black">
                  {generatedNotice}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Municipal Signature & Dispatch
                  </span>
                  <button
                    onClick={() => {
                      onUpdateEnforcementStatus(selectedEnforcement.id, 'ENFORCED');
                      setSelectedEnforcement(null);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded font-mono text-xs uppercase font-bold flex items-center gap-2 cursor-pointer transition-all shadow"
                  >
                    <Send className="w-4 h-4" /> Issue & Dispatch Order
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
