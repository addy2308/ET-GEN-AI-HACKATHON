import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DigitalTwinMap } from './components/DigitalTwinMap';
import { SourceAttributionPanel } from './components/SourceAttributionPanel';
import { PredictiveForecastPanel } from './components/PredictiveForecastPanel';
import { EnforcementPanel } from './components/EnforcementPanel';
import { MultiCityDashboard } from './components/MultiCityDashboard';
import { CitizenAdvisoryPanel } from './components/CitizenAdvisoryPanel';
import { ScenarioSimulatorModal } from './components/ScenarioSimulatorModal';

import {
  CITIES,
  CAAQMS_STATIONS,
  CITY_ATTRIBUTION_MAP,
  FORECAST_SERIES,
  ENFORCEMENT_ACTIONS,
  VULNERABLE_ZONES,
  CITIZEN_ADVISORIES,
  SATELLITE_ANOMALIES,
  CITY_COMPARISON_METRICS,
  SCENARIOS
} from './data/airQualityData';

import { CityInfo, CAAQMSStation, EnforcementAction } from './types';
import { Sliders, CheckCircle2, X } from 'lucide-react';

export function App() {
  const [cities, setCities] = useState<CityInfo[]>(CITIES);
  const [selectedCity, setSelectedCity] = useState<CityInfo>(CITIES[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'attribution' | 'forecast' | 'enforcement' | 'ncap' | 'advisory'>('map');
  const [selectedStation, setSelectedStation] = useState<CAAQMSStation | null>(CAAQMS_STATIONS[0]);
  const [enforcements, setEnforcements] = useState<EnforcementAction[]>(ENFORCEMENT_ACTIONS);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [simulationBanner, setSimulationBanner] = useState<{
    scenTitle: string;
    simulated24hAQI: number;
    simulated48hAQI: number;
    pm25ReductionPct: number;
    summary: string;
    directives: string[];
  } | null>(null);

  const handleUpdateEnforcementStatus = (id: string, newStatus: 'RECOMMENDED' | 'DISPATCHED' | 'ENFORCED') => {
    setEnforcements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleApplyScenario = (result: {
    scenTitle: string;
    simulated24hAQI: number;
    simulated48hAQI: number;
    pm25ReductionPct: number;
    summary: string;
    directives: string[];
  }) => {
    setSimulationBanner(result);

    // Update current city's AQI score dynamically based on simulation
    setCities((prev) =>
      prev.map((c) =>
        c.id === selectedCity.id
          ? {
              ...c,
              currentAQI: result.simulated24hAQI,
              category: result.simulated24hAQI > 300 ? 'Severe' : result.simulated24hAQI > 200 ? 'Very Poor' : 'Poor'
            }
          : c
      )
    );

    setSelectedCity((prev) => ({
      ...prev,
      currentAQI: result.simulated24hAQI,
      category: result.simulated24hAQI > 300 ? 'Severe' : result.simulated24hAQI > 200 ? 'Very Poor' : 'Poor'
    }));
  };

  const currentAttributions = CITY_ATTRIBUTION_MAP[selectedCity.id] || CITY_ATTRIBUTION_MAP['delhi'];
  const currentForecasts = FORECAST_SERIES[selectedCity.id] || FORECAST_SERIES['delhi'];
  const currentSatelliteAnomalies = SATELLITE_ANOMALIES.filter((a) => a.cityId === selectedCity.id || !a.cityId);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          const cityStation = CAAQMS_STATIONS.find((s) => s.cityId === city.id);
          setSelectedStation(cityStation || null);
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Simulation Result Banner Notification */}
        {simulationBanner && (
          <div className="bg-[#151518] border border-amber-500/40 rounded p-4 shadow-2xl relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase font-bold text-amber-400">
                    Active Intervention Simulation Wave
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.2 rounded border border-emerald-900/50">
                    -{simulationBanner.pm25ReductionPct}% PM2.5 Drop
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans mt-0.5">
                  <strong>{simulationBanner.scenTitle}</strong>: Projected AQI drops from baseline to{' '}
                  <span className="text-amber-400 font-bold">{simulationBanner.simulated24hAQI} (+24h)</span> and{' '}
                  <span className="text-emerald-400 font-bold">{simulationBanner.simulated48hAQI} (+48h)</span>.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSimulationBanner(null)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer self-start sm:self-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab 1: Geospatial Digital Twin Map */}
        {activeTab === 'map' && (
          <DigitalTwinMap
            city={selectedCity}
            stations={CAAQMS_STATIONS}
            thermalAnomalies={currentSatelliteAnomalies}
            onSelectStation={(st) => setSelectedStation(st)}
            selectedStation={selectedStation}
          />
        )}

        {/* Tab 2: AI Source Attribution */}
        {activeTab === 'attribution' && (
          <SourceAttributionPanel
            city={selectedCity}
            attributions={currentAttributions}
            stations={CAAQMS_STATIONS}
          />
        )}

        {/* Tab 3: Hyperlocal AQI Forecast */}
        {activeTab === 'forecast' && (
          <PredictiveForecastPanel
            city={selectedCity}
            forecastPoints={currentForecasts}
          />
        )}

        {/* Tab 4: Enforcement Intelligence */}
        {activeTab === 'enforcement' && (
          <EnforcementPanel
            city={selectedCity}
            enforcements={enforcements}
            onUpdateEnforcementStatus={handleUpdateEnforcementStatus}
          />
        )}

        {/* Tab 5: Multi-City NCAP Grid */}
        {activeTab === 'ncap' && (
          <MultiCityDashboard metrics={CITY_COMPARISON_METRICS} />
        )}

        {/* Tab 6: Citizen Health Advisory */}
        {activeTab === 'advisory' && (
          <CitizenAdvisoryPanel
            city={selectedCity}
            advisories={CITIZEN_ADVISORIES}
            vulnerableZones={VULNERABLE_ZONES.filter((z) => z.cityId === selectedCity.id || !z.cityId)}
          />
        )}
      </main>

      {/* Emergency Scenario Simulation Modal */}
      {simulatorOpen && (
        <ScenarioSimulatorModal
          scenarios={SCENARIOS}
          selectedCity={selectedCity}
          onClose={() => setSimulatorOpen(false)}
          onApplyScenario={handleApplyScenario}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 bg-[#0E0E10] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-bold">VayuDrishti AI</span>
            <span>&bull;</span>
            <span>National Air Quality Intelligence & Smart City Intervention Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>CPCB / SPCB Telemetry Sync</span>
            <span>NCAP Target Framework 2024-25</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
