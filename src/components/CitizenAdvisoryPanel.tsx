import React, { useState } from 'react';
import {
  Megaphone,
  Languages,
  Heart,
  PhoneCall,
  Sparkles,
  AlertOctagon,
  Users,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { CityInfo, CitizenHealthAdvisory, VulnerableZone } from '../types';

interface CitizenAdvisoryPanelProps {
  city: CityInfo;
  advisories: Record<string, CitizenHealthAdvisory[]>;
  vulnerableZones: VulnerableZone[];
}

export const CitizenAdvisoryPanel: React.FC<CitizenAdvisoryPanelProps> = ({
  city,
  advisories,
  vulnerableZones
}) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'kn' | 'ta' | 'mr' | 'bn'>('hi');
  const [loading, setLoading] = useState(false);
  const [generatedAdvisory, setGeneratedAdvisory] = useState<CitizenHealthAdvisory | null>(null);

  const cityAdvisories = advisories[city.id] || advisories['delhi'] || [];
  const currentAdvisory = generatedAdvisory || cityAdvisories.find((a) => a.language === selectedLang) || cityAdvisories[0];

  const handleGenerateAdvisory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityName: city.name,
          ward: 'Anand Vihar Ward',
          language: selectedLang,
          aqi: city.currentAQI
        })
      });

      const data = await res.json();
      if (data && data.headline) {
        setGeneratedAdvisory({
          cityId: city.id,
          ward: data.ward || 'Central Ward',
          language: selectedLang,
          languageName: data.languageName || 'Hindi',
          healthRiskLevel: data.healthRiskLevel || 'HAZARDOUS',
          headline: data.headline,
          summaryText: data.summaryText,
          actionableAdvice: data.actionableAdvice || [],
          vulnerabilityFocus: data.vulnerabilityFocus || 'Schools & Elderly',
          ivrScriptPreview: data.ivrScriptPreview || ''
        });
      }
    } catch (err) {
      console.error('Failed to generate citizen advisory:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Megaphone className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif italic text-white">Citizen Health Risk Advisory System</h2>
              <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded border border-blue-900/50 uppercase tracking-wider">
                Multi-Lingual AI Public Broadcast
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
              Generates ward-level health risk alerts, maps population vulnerability (hospitals, schools, outdoor workers, elderly) against forecast AQI, and broadcasts advisories in regional languages.
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerateAdvisory}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded font-mono text-xs uppercase font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>Generate Regional Language AI Advisory</span>
        </button>
      </div>

      {/* Language Selector Tabs */}
      <div className="flex items-center gap-2 bg-[#151518] p-2 rounded border border-white/10 overflow-x-auto">
        <span className="text-xs font-mono uppercase text-slate-400 px-2 shrink-0 flex items-center gap-1">
          <Languages className="w-4 h-4 text-amber-500" /> Select Regional Broadcast Language:
        </span>

        {[
          { code: 'hi', label: 'Hindi (हिंदी)' },
          { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
          { code: 'ta', label: 'Tamil (தமிழ்)' },
          { code: 'mr', label: 'Marathi (मराठी)' },
          { code: 'bn', label: 'Bengali (বাংলা)' },
          { code: 'en', label: 'English' }
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setSelectedLang(lang.code as any);
              setGeneratedAdvisory(null);
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              selectedLang === lang.code
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Active Regional Advisory Card & Vulnerability Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Regional Health Alert Card */}
        <div className="lg:col-span-2 bg-[#151518] border border-white/10 rounded p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            {/* Headline & Risk Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-500 uppercase block font-bold">
                  Target Zone: {currentAdvisory.ward}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1 leading-snug">
                  {currentAdvisory.headline}
                </h3>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded border uppercase font-bold bg-red-500/10 text-red-400 border-red-900/50 shrink-0">
                {currentAdvisory.healthRiskLevel} RISK
              </span>
            </div>

            {/* Native Language Summary */}
            <div className="bg-[#0E0E10] p-4 rounded border border-white/5 space-y-2 mb-6">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Regional Health Summary ({currentAdvisory.languageName}):
              </span>
              <p className="text-sm font-sans text-slate-200 leading-relaxed">
                {currentAdvisory.summaryText}
              </p>
            </div>

            {/* Actionable Health Precautions */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase block font-bold">
                Actionable Citizen Health Precautions:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentAdvisory.actionableAdvice.map((adv, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0E0E10] p-3 rounded border border-white/5 flex items-start gap-2 text-xs font-sans text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Automated IVR Voice Call Script Preview */}
          {currentAdvisory.ivrScriptPreview && (
            <div className="bg-[#0E0E10] border border-blue-900/50 rounded p-4 space-y-2 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" /> Automated IVR Citizen Call Script ({currentAdvisory.languageName})
                </span>
                <span className="text-[10px] font-mono text-slate-500">Regional Voice Synthesizer Ready</span>
              </div>
              <p className="text-xs font-mono text-slate-300 italic bg-[#151518] p-3 rounded border border-white/5">
                "{currentAdvisory.ivrScriptPreview}"
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Col: Vulnerable Population Density Mapping */}
        <div className="bg-[#151518] border border-white/10 rounded p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-200 border-b border-white/10 pb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-red-400" />
              Population Vulnerability Mapping
            </h3>

            <div className="space-y-3">
              {vulnerableZones.map((vz) => (
                <div key={vz.id} className="bg-[#0E0E10] p-3.5 rounded border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-bold">{vz.type}</span>
                    <span className="text-[10px] font-mono text-red-400 font-bold">AQI {vz.currentAQI}</span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white">{vz.name}</h4>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                    <span>{vz.ward}</span>
                    <span className="text-emerald-400">{vz.populationAtRisk.toLocaleString('en-IN')} At Risk</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Multi-Lingual Citizen Alert Network: ONLINE
          </div>
        </div>
      </div>
    </div>
  );
};
