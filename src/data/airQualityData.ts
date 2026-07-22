import {
  CityInfo,
  CAAQMSStation,
  PollutionSourceAttribution,
  ForecastPoint,
  EnforcementAction,
  CitizenHealthAdvisory,
  CityComparisonData,
  SatelliteThermalAnomaly,
  AirQualityScenario,
  VulnerableZone
} from '../types';

export const CITIES: CityInfo[] = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi UT / Haryana / UP',
    lat: 28.6139,
    lng: 77.209,
    currentAQI: 328,
    primaryPollutant: 'PM2.5',
    category: 'Very Poor',
    stationCount: 42,
    populationMillions: 32.9,
    temperatureC: 22.4,
    humidityPct: 68,
    windSpeedKmh: 6.2,
    windDirection: 'NW (315°)',
    boundaryLayerM: 420
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.076,
    lng: 72.8777,
    currentAQI: 184,
    primaryPollutant: 'PM10',
    category: 'Moderate',
    stationCount: 28,
    populationMillions: 21.3,
    temperatureC: 29.8,
    humidityPct: 76,
    windSpeedKmh: 14.5,
    windDirection: 'WSW (245°)',
    boundaryLayerM: 780
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    lat: 22.5726,
    lng: 88.3639,
    currentAQI: 236,
    primaryPollutant: 'PM2.5',
    category: 'Poor',
    stationCount: 21,
    populationMillions: 15.1,
    temperatureC: 26.2,
    humidityPct: 72,
    windSpeedKmh: 8.1,
    windDirection: 'NNE (25°)',
    boundaryLayerM: 510
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    currentAQI: 118,
    primaryPollutant: 'PM10',
    category: 'Moderate',
    stationCount: 18,
    populationMillions: 13.6,
    temperatureC: 24.5,
    humidityPct: 58,
    windSpeedKmh: 11.2,
    windDirection: 'ENE (65°)',
    boundaryLayerM: 920
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    currentAQI: 92,
    primaryPollutant: 'NO2',
    category: 'Satisfactory',
    stationCount: 15,
    populationMillions: 11.9,
    temperatureC: 30.1,
    humidityPct: 81,
    windSpeedKmh: 16.0,
    windDirection: 'E (90°)',
    boundaryLayerM: 850
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    currentAQI: 156,
    primaryPollutant: 'PM2.5',
    category: 'Moderate',
    stationCount: 12,
    populationMillions: 7.2,
    temperatureC: 25.8,
    humidityPct: 54,
    windSpeedKmh: 9.8,
    windDirection: 'W (270°)',
    boundaryLayerM: 810
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    lat: 23.0225,
    lng: 72.5714,
    currentAQI: 212,
    primaryPollutant: 'PM10',
    category: 'Poor',
    stationCount: 14,
    populationMillions: 8.6,
    temperatureC: 28.3,
    humidityPct: 48,
    windSpeedKmh: 7.5,
    windDirection: 'NE (45°)',
    boundaryLayerM: 640
  }
];

export const CAAQMS_STATIONS: CAAQMSStation[] = [
  // Delhi CAAQMS Stations
  {
    id: 'del-01',
    cityId: 'delhi',
    name: 'Anand Vihar CAAQMS',
    ward: 'East Delhi Ward 21',
    lat: 28.6469,
    lng: 77.3162,
    aqi: 412,
    pm25: 284,
    pm10: 448,
    no2: 88,
    so2: 24,
    co: 3.8,
    o3: 42,
    status: 'CRITICAL_SPIKE',
    primaryContributor: 'Inter-state ISBT Bus Terminal & Unpaved Road Dust',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'del-02',
    cityId: 'delhi',
    name: 'Jahangirpuri Station',
    ward: 'North West Delhi Ward 08',
    lat: 28.7328,
    lng: 77.1706,
    aqi: 386,
    pm25: 242,
    pm10: 395,
    no2: 76,
    so2: 18,
    co: 2.9,
    o3: 38,
    status: 'CRITICAL_SPIKE',
    primaryContributor: 'Bhallaswa Landfill Smoldering & Waste Burning',
    lastUpdated: '5 mins ago'
  },
  {
    id: 'del-03',
    cityId: 'delhi',
    name: 'RK Puram CAAQMS',
    ward: 'South West Delhi Ward 14',
    lat: 28.564,
    lng: 77.1745,
    aqi: 310,
    pm25: 198,
    pm10: 320,
    no2: 64,
    so2: 15,
    co: 2.1,
    o3: 45,
    status: 'ONLINE',
    primaryContributor: 'Peak Hour Outer Ring Road Vehicular Congestion',
    lastUpdated: '8 mins ago'
  },
  {
    id: 'del-04',
    cityId: 'delhi',
    name: 'Punjabi Bagh Monitor',
    ward: 'West Delhi Ward 19',
    lat: 28.6683,
    lng: 77.1257,
    aqi: 342,
    pm25: 224,
    pm10: 360,
    no2: 72,
    so2: 21,
    co: 2.7,
    o3: 32,
    status: 'ONLINE',
    primaryContributor: 'Mayapuri Industrial Area Scrap Stacks',
    lastUpdated: '12 mins ago'
  },
  {
    id: 'del-05',
    cityId: 'delhi',
    name: 'Lodhi Road CPCB Head Office',
    ward: 'Central Delhi Ward 02',
    lat: 28.591,
    lng: 77.227,
    aqi: 268,
    pm25: 154,
    pm10: 280,
    no2: 52,
    so2: 12,
    co: 1.6,
    o3: 52,
    status: 'ONLINE',
    primaryContributor: 'Secondary Nitrate Aerosols & Ambient Traffic',
    lastUpdated: '15 mins ago'
  },

  // Mumbai CAAQMS Stations
  {
    id: 'mum-01',
    cityId: 'mumbai',
    name: 'BKC Bandra CAAQMS',
    ward: 'H-East Ward Bandra',
    lat: 19.0657,
    lng: 72.868,
    aqi: 228,
    pm25: 142,
    pm10: 254,
    no2: 58,
    so2: 14,
    co: 1.8,
    o3: 31,
    status: 'CRITICAL_SPIKE',
    primaryContributor: 'Coastal Road Construction & High-Rise Building Sites',
    lastUpdated: '6 mins ago'
  },
  {
    id: 'mum-02',
    cityId: 'mumbai',
    name: 'Chembur MPCB Station',
    ward: 'M-West Ward Chembur',
    lat: 19.062,
    lng: 72.897,
    aqi: 215,
    pm25: 138,
    pm10: 230,
    no2: 68,
    so2: 32,
    co: 2.2,
    o3: 28,
    status: 'ONLINE',
    primaryContributor: 'Trombay Refinery & Fertilizer Plant Stacks',
    lastUpdated: '11 mins ago'
  },
  {
    id: 'mum-03',
    cityId: 'mumbai',
    name: 'Colaba Navy Nagar Station',
    ward: 'A-Ward South Mumbai',
    lat: 18.9067,
    lng: 72.8147,
    aqi: 112,
    pm25: 68,
    pm10: 125,
    no2: 34,
    so2: 9,
    co: 0.9,
    o3: 42,
    status: 'ONLINE',
    primaryContributor: 'Maritime Sea Breeze & Port Goods Movement',
    lastUpdated: '14 mins ago'
  },

  // Bengaluru CAAQMS Stations
  {
    id: 'blr-01',
    cityId: 'bengaluru',
    name: 'Silk Board Junction CAAQMS',
    ward: 'BTM Layout Ward 172',
    lat: 12.9172,
    lng: 77.6228,
    aqi: 168,
    pm25: 98,
    pm10: 192,
    no2: 82,
    so2: 11,
    co: 2.4,
    o3: 36,
    status: 'CRITICAL_SPIKE',
    primaryContributor: 'Diesel Bus & Tech Park Traffic Congestion',
    lastUpdated: '4 mins ago'
  },
  {
    id: 'blr-02',
    cityId: 'bengaluru',
    name: 'Peenya Industrial Area Station',
    ward: 'Peenya Ward 41',
    lat: 13.032,
    lng: 77.525,
    aqi: 145,
    pm25: 84,
    pm10: 168,
    no2: 54,
    so2: 28,
    co: 1.7,
    o3: 30,
    status: 'ONLINE',
    primaryContributor: 'Manufacturing Stacks & Heavy Freight Trucks',
    lastUpdated: '9 mins ago'
  },

  // Chennai CAAQMS Stations
  {
    id: 'che-01',
    cityId: 'chennai',
    name: 'Manali Industrial Belt CAAQMS',
    ward: 'Thiruvottiyur Zone 1',
    lat: 13.166,
    lng: 80.261,
    aqi: 138,
    pm25: 72,
    pm10: 148,
    no2: 62,
    so2: 38,
    co: 1.5,
    o3: 25,
    status: 'ONLINE',
    primaryContributor: 'Petrochemical Refinery Stacks & Thermal Power',
    lastUpdated: '7 mins ago'
  },

  // Kolkata CAAQMS Stations
  {
    id: 'kol-01',
    cityId: 'kolkata',
    name: 'Victoria Memorial CAAQMS',
    ward: 'KMC Ward 63',
    lat: 22.5448,
    lng: 88.3426,
    aqi: 248,
    pm25: 162,
    pm10: 272,
    no2: 64,
    so2: 16,
    co: 2.0,
    o3: 34,
    status: 'CRITICAL_SPIKE',
    primaryContributor: 'Old Commercial Diesel Fleets & Winter Inversion',
    lastUpdated: '3 mins ago'
  }
];

export const CITY_ATTRIBUTION_MAP: Record<string, PollutionSourceAttribution[]> = {
  delhi: [
    {
      id: 'att-del-1',
      category: 'Vehicular Traffic',
      percentage: 36,
      confidenceScore: 94,
      primaryLocations: ['Anand Vihar ISBT', 'Outer Ring Road', 'Kashmere Gate'],
      description: 'Heavy diesel commercial goods vehicles (42%) and private two/four wheelers (58%).',
      contributingVehiclesCount: 184000
    },
    {
      id: 'att-del-2',
      category: 'Construction & Demolition Dust',
      percentage: 24,
      confidenceScore: 91,
      primaryLocations: ['Dwarka Expressway Phase 4', 'Noida Extension', 'Aerocity Expansion'],
      description: 'Uncovered earthworks, lack of anti-smog water cannons, dry ambient wind suspension.',
      stackEmissionsPpm: undefined
    },
    {
      id: 'att-del-3',
      category: 'Biomass & Waste Burning',
      percentage: 18,
      confidenceScore: 88,
      primaryLocations: ['Bhallaswa Landfill', 'Ghazipur Border', 'Bawana Industrial Perimeter'],
      description: 'Stubble burning plume inflow from Punjab/Haryana combined with open municipal solid waste burning.',
      stackEmissionsPpm: undefined
    },
    {
      id: 'att-del-4',
      category: 'Industrial Stacks',
      percentage: 14,
      confidenceScore: 86,
      primaryLocations: ['Mayapuri Scrap Hub', 'Okhla Phase II', 'Narela Industrial Estate'],
      description: 'Non-compliant unapproved fuel usage (coal/furnace oil) in small-scale metal processing units.',
      stackEmissionsPpm: 480
    },
    {
      id: 'att-del-5',
      category: 'Secondary Inorganic Aerosols',
      percentage: 8,
      confidenceScore: 82,
      primaryLocations: ['City-wide Boundary Layer'],
      description: 'Atmospheric transformation of SO2/NOx into fine ammonium sulfate and nitrate particulate matter under high relative humidity.'
    }
  ],
  mumbai: [
    {
      id: 'att-mum-1',
      category: 'Construction & Demolition Dust',
      percentage: 38,
      confidenceScore: 92,
      primaryLocations: ['BKC Metro Phase 3', 'Coastal Road Project', 'Worli Redevelopment Belt'],
      description: 'Active demolition rubble handling, uncovered transit dumpers, and road digging across metro corridors.'
    },
    {
      id: 'att-mum-2',
      category: 'Vehicular Traffic',
      percentage: 32,
      confidenceScore: 90,
      primaryLocations: ['Western Express Highway', 'SION Circle', 'LBS Marg'],
      description: 'High density peak hour congestion along north-south transit corridors.'
    },
    {
      id: 'att-mum-3',
      category: 'Industrial Stacks',
      percentage: 16,
      confidenceScore: 87,
      primaryLocations: ['Chembur Refinery Belt', 'Trombay Thermal Power', 'Taloja MIDC'],
      description: 'Refinery flare stacks and chemical manufacturing units.'
    },
    {
      id: 'att-mum-4',
      category: 'Biomass & Waste Burning',
      percentage: 14,
      confidenceScore: 81,
      primaryLocations: ['Deonar Dumping Ground', 'Kanjurmarg Landfill'],
      description: 'Methane ignition and open garbage burning along periphery settlements.'
    }
  ],
  bengaluru: [
    {
      id: 'att-blr-1',
      category: 'Vehicular Traffic',
      percentage: 48,
      confidenceScore: 95,
      primaryLocations: ['Silk Board Flyover', 'Outer Ring Road Tech Corridor', 'Tin Factory Junction'],
      description: 'Severe bottleneck congestion with over 1.2 million vehicles trapped daily in low-speed idling.'
    },
    {
      id: 'att-blr-2',
      category: 'Construction & Demolition Dust',
      percentage: 28,
      confidenceScore: 89,
      primaryLocations: ['Whitefield Metro Alignment', 'Hebbal Junction Expansion', 'Sarjapur Road'],
      description: 'Unpaved road dust resuspension and unmonitored commercial building construction.'
    },
    {
      id: 'att-blr-3',
      category: 'Industrial Stacks',
      percentage: 14,
      confidenceScore: 85,
      primaryLocations: ['Peenya Industrial Complex', 'Bommasandra Industrial Area'],
      description: 'Electroplating, textile dyeing, and boiler emissions.'
    },
    {
      id: 'att-blr-4',
      category: 'Biomass & Waste Burning',
      percentage: 10,
      confidenceScore: 80,
      primaryLocations: ['Electronic City Fringe', 'K R Puram Railway Yard Perimeter'],
      description: 'Dry foliage and plastic waste burning by informal worker settlements.'
    }
  ]
};

export const FORECAST_SERIES: Record<string, ForecastPoint[]> = {
  delhi: [
    { hourLabel: 'Now', hourOffset: 0, predictedAQI: 328, pm25: 218, pm10: 362, no2: 74, windSpeed: 6.2, windDirection: 'NW', dispersionIndex: 'POOR', confidenceMin: 320, confidenceMax: 336 },
    { hourLabel: '+6h', hourOffset: 6, predictedAQI: 345, pm25: 232, pm10: 388, no2: 82, windSpeed: 4.8, windDirection: 'NW', dispersionIndex: 'POOR', confidenceMin: 330, confidenceMax: 360 },
    { hourLabel: '+12h', hourOffset: 12, predictedAQI: 378, pm25: 258, pm10: 420, no2: 91, windSpeed: 3.2, windDirection: 'CALM', dispersionIndex: 'POOR', confidenceMin: 355, confidenceMax: 405 },
    { hourLabel: '+24h', hourOffset: 24, predictedAQI: 392, pm25: 270, pm10: 442, no2: 96, windSpeed: 2.8, windDirection: 'WNW', dispersionIndex: 'POOR', confidenceMin: 370, confidenceMax: 420 },
    { hourLabel: '+48h', hourOffset: 48, predictedAQI: 310, pm25: 198, pm10: 340, no2: 68, windSpeed: 9.5, windDirection: 'W', dispersionIndex: 'MODERATE', confidenceMin: 280, confidenceMax: 340 },
    { hourLabel: '+72h', hourOffset: 72, predictedAQI: 265, pm25: 152, pm10: 285, no2: 54, windSpeed: 14.2, windDirection: 'WSW', dispersionIndex: 'GOOD', confidenceMin: 240, confidenceMax: 290 }
  ],
  mumbai: [
    { hourLabel: 'Now', hourOffset: 0, predictedAQI: 184, pm25: 112, pm10: 210, no2: 52, windSpeed: 14.5, windDirection: 'WSW', dispersionIndex: 'MODERATE', confidenceMin: 175, confidenceMax: 192 },
    { hourLabel: '+6h', hourOffset: 6, predictedAQI: 195, pm25: 122, pm10: 228, no2: 58, windSpeed: 11.0, windDirection: 'SW', dispersionIndex: 'MODERATE', confidenceMin: 180, confidenceMax: 210 },
    { hourLabel: '+12h', hourOffset: 12, predictedAQI: 210, pm25: 135, pm10: 245, no2: 64, windSpeed: 8.5, windDirection: 'W', dispersionIndex: 'POOR', confidenceMin: 190, confidenceMax: 225 },
    { hourLabel: '+24h', hourOffset: 24, predictedAQI: 172, pm25: 104, pm10: 195, no2: 48, windSpeed: 16.2, windDirection: 'W', dispersionIndex: 'GOOD', confidenceMin: 155, confidenceMax: 185 },
    { hourLabel: '+48h', hourOffset: 48, predictedAQI: 148, pm25: 86, pm10: 168, no2: 41, windSpeed: 18.0, windDirection: 'WSW', dispersionIndex: 'GOOD', confidenceMin: 130, confidenceMax: 162 },
    { hourLabel: '+72h', hourOffset: 72, predictedAQI: 125, pm25: 72, pm10: 142, no2: 36, windSpeed: 19.5, windDirection: 'SW', dispersionIndex: 'GOOD', confidenceMin: 110, confidenceMax: 140 }
  ]
};

export const ENFORCEMENT_ACTIONS: EnforcementAction[] = [
  {
    id: 'enf-01',
    cityId: 'delhi',
    targetName: 'Anand Vihar Commercial Flyover Construction Site',
    sourceCategory: 'Construction Site',
    ward: 'East Delhi Ward 21',
    lat: 28.648,
    lng: 77.318,
    priority: 'CRITICAL',
    recommendedIntervention: 'Issue Immediate Stop-Work Notice & Deploy 4 Anti-Smog Water Cannon Trucks',
    estimatedPMReductionPct: 18.5,
    status: 'RECOMMENDED',
    assignedAgency: 'DPCC / East Delhi Municipal Corporation',
    fineAmountInr: 500000,
    evidenceSummary: 'CAAQMS Anand Vihar recorded PM10 spike >450 µg/m³. Satellite imagery & ground sensors confirm unmitigated excavation without dust suppression screens.'
  },
  {
    id: 'enf-02',
    cityId: 'delhi',
    targetName: 'Bhallaswa Municipal Landfill North Sector Fire',
    sourceCategory: 'Waste Burning Hotspot',
    ward: 'North West Ward 08',
    lat: 28.735,
    lng: 77.172,
    priority: 'CRITICAL',
    recommendedIntervention: 'Mobilize Fire Brigade Inert Foam Suppression & Enforce Barrier Spraying',
    estimatedPMReductionPct: 14.2,
    status: 'DISPATCHED',
    assignedAgency: 'Delhi Fire Services & M MCD Task Force',
    fineAmountInr: 0,
    evidenceSummary: 'MODIS thermal anomaly detected 18 MW fire radiative power at 02:45 AM. Methane flare plume drifted directly into Jahangirpuri residential zone.'
  },
  {
    id: 'enf-03',
    cityId: 'delhi',
    targetName: 'Mayapuri Metal Smelting Cluster (14 Non-Compliant Stacks)',
    sourceCategory: 'Industrial Stack',
    ward: 'West Delhi Ward 19',
    lat: 28.665,
    lng: 77.128,
    priority: 'HIGH',
    recommendedIntervention: 'Sealing of Illegal Furnace Operations & Power Disconnection Notice',
    estimatedPMReductionPct: 11.0,
    status: 'RECOMMENDED',
    assignedAgency: 'Delhi Pollution Control Committee (DPCC)',
    fineAmountInr: 250000,
    evidenceSummary: 'Ground inspector multispectral sensors flagged black carbon emissions exceeding CPCB stack limit by 380%.'
  },
  {
    id: 'enf-04',
    cityId: 'delhi',
    targetName: 'Ghazipur Inter-State Truck Entry Gate',
    sourceCategory: 'High-Density Traffic Corridor',
    ward: 'East Border Ward 03',
    lat: 28.625,
    lng: 77.332,
    priority: 'HIGH',
    recommendedIntervention: 'Enforce Non-Destined BS-III/BS-IV Commercial Truck Diverting to Eastern Peripheral Expressway',
    estimatedPMReductionPct: 12.8,
    status: 'ENFORCED',
    assignedAgency: 'Delhi Traffic Police & Transport Dept',
    fineAmountInr: 100000,
    evidenceSummary: 'Automatic Number Plate Recognition (ANPR) cameras flagged 1,420 non-destined diesel trucks entering city during prohibited peak window.'
  },
  {
    id: 'enf-05',
    cityId: 'mumbai',
    targetName: 'BKC Metro Line 3 Earthworks Pit',
    sourceCategory: 'Construction Site',
    ward: 'H-East Bandra',
    lat: 19.068,
    lng: 72.87,
    priority: 'HIGH',
    recommendedIntervention: 'Mandate Continuous Anti-Smog Fogging & Tarpaulin Enclosure',
    estimatedPMReductionPct: 15.0,
    status: 'RECOMMENDED',
    assignedAgency: 'Brihanmumbai Municipal Corporation (BMC)',
    fineAmountInr: 300000,
    evidenceSummary: 'Air quality monitor BKC recorded PM10 jump to 254 µg/m³ during dry wind hours due to uncovered soil stockpiles.'
  }
];

export const VULNERABLE_ZONES: VulnerableZone[] = [
  {
    id: 'vuln-01',
    type: 'Hospital',
    name: 'AIIMS & Safdarjung Super-Specialty Medical Complex',
    ward: 'South Delhi Ward 12',
    populationAtRisk: 18500,
    currentAQI: 295
  },
  {
    id: 'vuln-02',
    type: 'School Cluster',
    name: 'Anand Vihar Educational Hub (12 Schools)',
    ward: 'East Delhi Ward 21',
    populationAtRisk: 24000,
    currentAQI: 412
  },
  {
    id: 'vuln-03',
    type: 'Outdoor Worker Hub',
    name: 'Mayapuri Scrap Yard & Construction Worker Colony',
    ward: 'West Delhi Ward 19',
    populationAtRisk: 31000,
    currentAQI: 342
  },
  {
    id: 'vuln-04',
    type: 'Elderly Density Zone',
    name: 'Chittaranjan Park Senior Citizen Pocket',
    ward: 'South East Ward 09',
    populationAtRisk: 14200,
    currentAQI: 280
  }
];

export const CITIZEN_ADVISORIES: Record<string, CitizenHealthAdvisory[]> = {
  delhi: [
    {
      cityId: 'delhi',
      ward: 'East Delhi (Anand Vihar Zone)',
      language: 'hi',
      languageName: 'Hindi (हिंदी)',
      healthRiskLevel: 'HAZARDOUS',
      headline: 'गंभीर वायु प्रदूषण चेतावनी: आनंद विहार एवं आसपास',
      summaryText: 'आनंद विहार वार्ड में AQI 412 (अति गंभीर) पार कर गया है। हवा में PM2.5 की मात्रा सुरक्षित सीमा से 8 गुना अधिक है। बच्चों, बुजुर्गों और सांस के मरीजों के लिए बाहर निकलना हानिकारक है।',
      actionableAdvice: [
        'प्रातःकाल एवं सायंकाल आउटडोर वॉक और खेलकूद पूर्णतः स्थगित रखें।',
        'बाहर निकलते समय केवल N95 या FFP2 मास्क का उपयोग करें।',
        'अस्थमा या हृदय रोगी अपनी इनहेलर एवं दवाएं पास रखें।',
        'घर के दरवाजे व खिड़कियां बंद रखें और संभव हो तो एयर प्यूरीफायर चलाएं।'
      ],
      vulnerabilityFocus: 'स्कूली छात्र (24,000) एवं ऑटो/रिक्शा चालक',
      ivrScriptPreview: 'नमस्कार, यह दिल्ली नगर निगम की जन स्वास्थ्य चेतावनी है। आपके क्षेत्र आनंद विहार में वायु गुणवत्ता अत्यंत खतरनाक स्तर पर है। कृपया बिना मास्क बाहर न निकलें...'
    },
    {
      cityId: 'delhi',
      ward: 'Central & South Delhi',
      language: 'en',
      languageName: 'English',
      healthRiskLevel: 'HIGH',
      headline: 'Severe Air Quality Health Risk Advisory',
      summaryText: 'Current AQI stands at 310 (Very Poor). High concentration of fine particulate matter PM2.5 detected across Outer Ring Road and AIIMS hospital zone.',
      actionableAdvice: [
        'Avoid intense physical outdoor exercise between 6 AM and 10 AM.',
        'Schools are advised to halt outdoor sports sessions and assemblies.',
        'Use N95 respirators if commuting in open or two-wheeler transport.',
        'Keep indoor air filtration active in pediatric and geriatric wards.'
      ],
      vulnerabilityFocus: 'AIIMS & Safdarjung Hospital Inpatients & Outdoor Labour',
      ivrScriptPreview: 'Attention residents: Municipal Air Quality Warning. AQI in South Delhi has reached Very Poor levels. Minimize outdoor exposure and use protective respirators...'
    }
  ],
  bengaluru: [
    {
      cityId: 'bengaluru',
      ward: 'Silk Board & BTM Layout',
      language: 'kn',
      languageName: 'Kannada (ಕನ್ನಡ)',
      healthRiskLevel: 'MODERATE',
      headline: 'ವಾಯು ಮಾಲಿನ್ಯ ಜಾಗೃತಿ: ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಮತ್ತು ಜಯನಗರ ವಲಯ',
      summaryText: 'ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್ ಸುತ್ತಮುತ್ತ ವಾಹನಗಳ ದಟ್ಟಣೆಯಿಂದಾಗಿ AQI 168 ತಲುಪಿದೆ. ಸೂಕ್ಷ್ಮ ಧೂಳಿನ ಕಣಗಳು (PM10) ಹೆಚ್ಚಾಗಿವೆ.',
      actionableAdvice: [
        'ಪೀಕ್ ಅವರ್‌ನಲ್ಲಿ ಟ್ರಾಫಿಕ್ ಜಂಕ್ಷನ್‌ಗಳಲ್ಲಿ ದೀರ್ಘಕಾಲ ನಿಲ್ಲುವುದನ್ನು தவிர்க்கಿ.',
        'ಉಸಿರಾಟದ ತೊಂದರೆ ಇರುವವರು ಹೊರಗಡೆ ಹೋಗುವಾಗ ಮಾಸ್ಕ್ ಧರಿಸಿ.',
        'ಶಾಲೆಗಳಲ್ಲಿ ಬೆಳಗಿನ ಪ್ರಾರ್ಥನೆ ಸಮಾವೇಶಗಳನ್ನು ಸೀಮಿತಗೊಳಿಸಿ.'
      ],
      vulnerabilityFocus: 'ಬಿಎಂಟಿಸಿ ಬಸ್ ಚಾಲಕರು ಮತ್ತು ಪಾದಚಾರಿಗಳು',
      ivrScriptPreview: 'ನಮಸ್ಕಾರ, ಬಿಬಿಎಂಪಿ ವಾಯು ಮಾಲಿನ್ಯ ಜಾಗೃತಿ ಸೂಚನೆ. ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಭಾಗದಲ್ಲಿ ವಾಹನಗಳ ಹೊಗೆ ಹೆಚ್ಚಾಗಿದ್ದು, ಎಚ್ಚರಿಕೆ ವಹಿಸಿ...'
    }
  ],
  mumbai: [
    {
      cityId: 'mumbai',
      ward: 'BKC & Chembur',
      language: 'mr',
      languageName: 'Marathi (मराठी)',
      healthRiskLevel: 'MODERATE',
      headline: 'हवा गुणवत्ता सतर्कता: बीकेसी आणि चेंबूर परिसर',
      summaryText: 'बीकेसी आणि चेंबूर भागात बांधकामाची धूळ आणि वाहतुकीमुळे AQI २२८ (वाईट श्रेणी) नोंदवला गेला आहे.',
      actionableAdvice: [
        'बांधकाम क्षेत्राजवळ मास्क वापरणे अनिवार्य आहे.',
        'सकाळच्या वेळी उघड्यावर धावणे किंवा व्यायाम करणे टाळावे.',
        'ज्येष्ठ नागरिकांनी घरातच राहावे.'
      ],
      vulnerabilityFocus: 'बांधकाम कामगार आणि लहान मुले',
      ivrScriptPreview: 'नमस्कार, बृहन्मुंबई महानगरपालिकेची जनहितार्थ माहिती. बीकेसी परिसरात हवेची गुणवत्ता घसरली असून खबरदारी बाळगावी...'
    }
  ],
  kolkata: [
    {
      cityId: 'kolkata',
      ward: 'Central Kolkata & Victoria Zone',
      language: 'bn',
      languageName: 'Bengali (বাংলা)',
      healthRiskLevel: 'HIGH',
      headline: 'বায়ু দূষণ সতর্কতা: ভিক্টোরিয়া ও পার্ক স্ট্রিট এলাকা',
      summaryText: 'শীতকালীন কুয়াশা ও পুরোনো ডিজেল গাড়ির ধোঁয়ার কারণে দক্ষিণ ও মধ্য কলকাতায় AQI २४८ পৌঁছেছে।',
      actionableAdvice: [
        'প্রবীণ ব্যক্তি ও হাপানি রোগীরা সকালের হাঁটাহাঁটি বন্ধ রাখুন।',
        'বাইরে বেরোনোর সময় উপযুক্ত মাস্ক ব্যবহার করুন।',
        'শিশুদের খোলামেলা জায়গায় খেলাধুলো নিয়ন্ত্রণ করুন।'
      ],
      vulnerabilityFocus: 'প্রবীণ নাগরিক ও হকার সম্প্রদায়',
      ivrScriptPreview: 'নমস্কার, কলকাতা পৌরসংস্থার বায়ু নিরাপত্তা নির্দেশিকা। আপনার এলাকায় বায়ু মান আশঙ্কাজনক, সতর্ক থাকুন...'
    }
  ]
};

export const SATELLITE_ANOMALIES: SatelliteThermalAnomaly[] = [
  {
    id: 'sat-01',
    lat: 29.815,
    lng: 76.12,
    intensityFrp: 48.5,
    type: 'Crop Residue / Stubble Burning',
    detectedTime: 'Sentinel-3 SLSTR (42 mins ago)',
    wardOrDistrict: 'Karnal-Kaithal Cluster (Upwind to Delhi NCR)'
  },
  {
    id: 'sat-02',
    lat: 28.736,
    lng: 77.171,
    intensityFrp: 22.1,
    type: 'Landfill Fire',
    detectedTime: 'MODIS Terra (18 mins ago)',
    wardOrDistrict: 'Bhallaswa Municipal Solid Waste Dump'
  },
  {
    id: 'sat-03',
    lat: 28.667,
    lng: 77.129,
    intensityFrp: 12.4,
    type: 'Industrial Flare',
    detectedTime: 'VIIRS Suomi-NPP (1 hour ago)',
    wardOrDistrict: 'Mayapuri Industrial Estate'
  }
];

export const CITY_COMPARISON_METRICS: CityComparisonData[] = [
  {
    cityId: 'delhi',
    cityName: 'Delhi NCR',
    state: 'Delhi UT',
    currentAQI: 328,
    pm25Average: 218,
    ncapTargetReductionPct: 30,
    annualAverage2024: 218,
    activeCAAQMSStations: 42,
    enforcementInterventionsCount: 148,
    complianceRating: 'NON_COMPLIANT'
  },
  {
    cityId: 'mumbai',
    cityName: 'Mumbai',
    state: 'Maharashtra',
    currentAQI: 184,
    pm25Average: 112,
    ncapTargetReductionPct: 25,
    annualAverage2024: 110,
    activeCAAQMSStations: 28,
    enforcementInterventionsCount: 92,
    complianceRating: 'NEEDS_IMPROVEMENT'
  },
  {
    cityId: 'kolkata',
    cityName: 'Kolkata',
    state: 'West Bengal',
    currentAQI: 236,
    pm25Average: 148,
    ncapTargetReductionPct: 25,
    annualAverage2024: 152,
    activeCAAQMSStations: 21,
    enforcementInterventionsCount: 64,
    complianceRating: 'NON_COMPLIANT'
  },
  {
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    currentAQI: 118,
    pm25Average: 62,
    ncapTargetReductionPct: 20,
    annualAverage2024: 78,
    activeCAAQMSStations: 18,
    enforcementInterventionsCount: 52,
    complianceRating: 'NEEDS_IMPROVEMENT'
  },
  {
    cityId: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    currentAQI: 92,
    pm25Average: 48,
    ncapTargetReductionPct: 20,
    annualAverage2024: 58,
    activeCAAQMSStations: 15,
    enforcementInterventionsCount: 38,
    complianceRating: 'COMPLIANT'
  }
];

export const SCENARIOS: AirQualityScenario[] = [
  {
    id: 'stubble-wave',
    title: 'Peak Stubble Burning Plume Influx',
    description: 'Upwind transboundary residue burning in Punjab/Haryana triggers a 120-point AQI surge in Delhi NCR within 12 hours under calm wind conditions.',
    aqiMultiplier: 1.45,
    primaryCause: 'Agricultural Biomass Burning Transboundary Drift',
    affectedCities: ['delhi', 'ahmedabad'],
    headline: 'NASA Sentinel-3 flags 840 active fire hotspots upwind of NCR corridor.',
    suggestedInterventions: [
      'Trigger GRAP Stage-IV emergency measures immediately.',
      'Deploy 120 anti-smog water cannons along Anand Vihar & ISBT ring roads.',
      'Ban non-essential BS-III petrol & BS-IV diesel light commercial vehicles.'
    ]
  },
  {
    id: 'winter-inversion',
    title: 'Severe Thermal Inversion & Boundary Layer Compression',
    description: 'Winter temperature inversion drops planetary boundary layer height to 250m, trapping vehicular exhaust and dust in the breathing zone.',
    aqiMultiplier: 1.35,
    primaryCause: 'Atmospheric Inversion & Stagnant Dispersion',
    affectedCities: ['delhi', 'kolkata'],
    headline: 'Boundary layer collapses to 280m; atmospheric ventilation index drops to CRITICAL.',
    suggestedInterventions: [
      'Halt all private & public construction excavation work for 72 hours.',
      'Enforce mechanised vacuum sweeping on major arterial roads.',
      'Implement odd-even private vehicle rotation during peak commute hours.'
    ]
  },
  {
    id: 'landfill-methane',
    title: 'Landfill Methane Outbreak & Smoldering Fire',
    description: 'Uncontrolled landfill fire at major waste dump generates massive toxic toxic plume rich in PM2.5, dioxins, and VOCs over residential wards.',
    aqiMultiplier: 1.25,
    primaryCause: 'Uncontrolled Municipal Waste Combustion',
    affectedCities: ['delhi', 'mumbai'],
    headline: 'Bhallaswa landfill thermal camera detects 450°C internal hotspot flare.',
    suggestedInterventions: [
      'Dispatch fire tender foam blanket force and earthmoving soil cover.',
      'Distribute emergency N95 masks to 50,000 residents in downwind wards.',
      'Mandate door-to-door health checks for asthmatic and elderly citizens.'
    ]
  }
];
