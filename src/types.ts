export type AQICategory = 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';

export interface CityInfo {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  currentAQI: number;
  primaryPollutant: 'PM2.5' | 'PM10' | 'NO2' | 'SO2';
  category: AQICategory;
  stationCount: number;
  populationMillions: number;
  temperatureC: number;
  humidityPct: number;
  windSpeedKmh: number;
  windDirection: string;
  boundaryLayerM: number; // Atmospheric boundary layer height in meters
}

export interface CAAQMSStation {
  id: string;
  cityId: string;
  name: string;
  ward: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  status: 'ONLINE' | 'MAINTENANCE' | 'CRITICAL_SPIKE';
  primaryContributor: string;
  lastUpdated: string;
}

export interface PollutionSourceAttribution {
  id: string;
  category: 'Vehicular Traffic' | 'Construction & Demolition Dust' | 'Industrial Stacks' | 'Biomass & Waste Burning' | 'Secondary Inorganic Aerosols' | 'Regional Transboundary';
  percentage: number;
  confidenceScore: number; // 0-100%
  primaryLocations: string[];
  description: string;
  contributingVehiclesCount?: number;
  stackEmissionsPpm?: number;
}

export interface ForecastPoint {
  hourLabel: string; // e.g., 'Now', '+6h', '+12h', '+24h', '+48h', '+72h'
  hourOffset: number;
  predictedAQI: number;
  pm25: number;
  pm10: number;
  no2: number;
  windSpeed: number;
  windDirection: string;
  dispersionIndex: 'POOR' | 'MODERATE' | 'GOOD';
  confidenceMin: number;
  confidenceMax: number;
}

export interface EnforcementAction {
  id: string;
  cityId: string;
  targetName: string;
  sourceCategory: 'Construction Site' | 'Industrial Stack' | 'Waste Burning Hotspot' | 'High-Density Traffic Corridor' | 'Brick Kiln Cluster';
  ward: string;
  lat: number;
  lng: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  recommendedIntervention: string;
  estimatedPMReductionPct: number;
  status: 'RECOMMENDED' | 'DISPATCHED' | 'ENFORCED';
  assignedAgency: string; // e.g. 'DPCC / CPCB', 'BBMP Municipal Pollution Task Force', 'M PCB Enforcement Wing'
  fineAmountInr?: number;
  proofAttachmentUrl?: string;
  evidenceSummary: string;
}

export interface VulnerableZone {
  id: string;
  cityId?: string;
  type: 'Hospital' | 'School Cluster' | 'Elderly Density Zone' | 'Outdoor Worker Hub';
  name: string;
  ward: string;
  populationAtRisk: number;
  currentAQI: number;
}

export interface CitizenHealthAdvisory {
  cityId: string;
  ward: string;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'mr' | 'bn';
  languageName: string;
  healthRiskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'HAZARDOUS';
  headline: string;
  summaryText: string;
  actionableAdvice: string[];
  vulnerabilityFocus: string;
  ivrScriptPreview: string;
}

export interface CityComparisonData {
  cityId: string;
  cityName: string;
  state: string;
  currentAQI: number;
  pm25Average: number;
  ncapTargetReductionPct: number;
  annualAverage2024: number;
  activeCAAQMSStations: number;
  enforcementInterventionsCount: number;
  complianceRating: 'COMPLIANT' | 'NEEDS_IMPROVEMENT' | 'NON_COMPLIANT';
}

export interface SatelliteThermalAnomaly {
  id: string;
  cityId?: string;
  lat: number;
  lng: number;
  intensityFrp: number; // Fire Radiative Power (MW)
  type: 'Crop Residue / Stubble Burning' | 'Landfill Fire' | 'Industrial Flare';
  detectedTime: string;
  wardOrDistrict: string;
}

export interface AirQualityScenario {
  id: string;
  title: string;
  description: string;
  aqiMultiplier: number;
  primaryCause: string;
  affectedCities: string[];
  headline: string;
  suggestedInterventions: string[];
}

export interface LLMAttributionResult {
  cityId: string;
  overallAQI: number;
  primaryPollutant: string;
  attributionBreakdown: PollutionSourceAttribution[];
  confidenceScore: number;
  executiveBriefing: string;
  recommendedEmergencyActions: string[];
  transboundaryFactors: string;
}

export interface LLMEnforcementResult {
  prioritizedActions: EnforcementAction[];
  totalPotentialPM25ReductionPct: number;
  enforcementBriefing: string;
  legalNoticeDraft: string;
}
