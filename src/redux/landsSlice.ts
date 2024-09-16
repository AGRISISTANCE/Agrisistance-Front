// landsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Crop {
  CropName: string;
  CropImage: string;
  recommendationPercentage: number;
  cropSize: number;
  expectedMoneyRevenue: number;
  expectedWeightRevenue: number;
  cropCost: number;
  cropProfit: number;
}

export interface LandBusinessPlan {
  title: string;
  description: string;
}

export interface LandInfo {
  landId: string;
  owner: string; // userId
  landName: string;
  latitude: number;
  longitude: number;
  landSize: number;
  budgetForLand: number;
  oxygen_level: number;
  nitrogen: number;
  potassium: number;
  phosphorus: number;
  humidity: number;
  ph_level: number;
  LandBusinessPlan: LandBusinessPlan[];
  crops: Crop[];
  waterSufficecy: number;
  sunlight: number;
  pestisedesLevel: number;
  landUse: number;
  humanCoverage: number;
  waterAvaliability: number;
  distributionOptimality: number;
  suggestedImprovementSoil: string[];
  suggestedImprovementCrop: string[];
}

interface LandsState {
  lands: LandInfo[];
  selectedLand: LandInfo | null;
}

// Flag to toggle between dummy and real data
const USE_DUMMY_DATA = true;

const initialDummyLands: LandInfo[] = [
  {
    landId: '1',
    owner: 'user1',
    landName: 'Green Valley',
    latitude: 35.6125043,
    longitude: -0.526023,
    landSize: 50,
    budgetForLand: 5000,
    oxygen_level: 21,
    nitrogen: 15,
    potassium: 30,
    phosphorus: 20,
    humidity: 60,
    ph_level: 6.5,
    LandBusinessPlan: [
      {
        title: 'Sustainable Farming',
        description: 'Implement sustainable farming practices to increase productivity and reduce environmental impact.'
      }
    ],
    crops: [
      {
        CropName: 'Tomato',
        CropImage: 'tomato.png',
        recommendationPercentage: 80,
        cropSize: 10,
        expectedMoneyRevenue: 2000,
        expectedWeightRevenue: 500,
        cropCost: 500,
        cropProfit: 1500
      },
      {
        CropName: 'flax',
        CropImage: 'corn.png',
        recommendationPercentage: 70,
        cropSize: 20,
        expectedMoneyRevenue: 1500,
        expectedWeightRevenue: 300,
        cropCost: 400,
        cropProfit: 1100
      }
    ],
    waterSufficecy: 80,
    sunlight: 70,
    pestisedesLevel: 5,
    landUse: 30,
    humanCoverage: 70,
    waterAvaliability: 70,
    distributionOptimality: 85,
    suggestedImprovementSoil: ['Increase organic matter', 'Improve drainage'],
    suggestedImprovementCrop: ['Use resistant varieties', 'Improve irrigation']
  },
  {
    landId: '2',
    owner: 'user2',
    landName: 'Sunny Meadows',
    latitude: 7.0549637,
    longitude: 38.2404379,
    landSize: 75,
    budgetForLand: 7000,
    oxygen_level: 21,
    nitrogen: 20,
    potassium: 25,
    phosphorus: 15,
    humidity: 55,
    ph_level: 7.0,
    LandBusinessPlan: [
      {
        title: 'Crop Rotation',
        description: 'Implement crop rotation to maintain soil fertility and manage pests.'
      }
    ],
    crops: [
      {
        CropName: 'salad green',
        CropImage: 'wheat.png',
        recommendationPercentage: 90,
        cropSize: 25,
        expectedMoneyRevenue: 2500,
        expectedWeightRevenue: 600,
        cropCost: 600,
        cropProfit: 1900
      },
      {
        CropName: 'sweet potato',
        CropImage: 'barley.png',
        recommendationPercentage: 60,
        cropSize: 15,
        expectedMoneyRevenue: 1800,
        expectedWeightRevenue: 400,
        cropCost: 450,
        cropProfit: 1350
      }
    ],
    waterSufficecy: 85,
    sunlight: 75,
    pestisedesLevel: 3,
    landUse: 95,
    humanCoverage: 50,
    waterAvaliability: 80,
    distributionOptimality: 90,
    suggestedImprovementSoil: ['Add compost', 'Reduce tillage'],
    suggestedImprovementCrop: ['Use cover crops', 'Adjust planting density']
  }
];

const initialState: LandsState = {
  lands: USE_DUMMY_DATA ? initialDummyLands : [],

  //! initial selected land
  selectedLand: {
    landId: '2',
    owner: 'user2',
    landName: 'Sunny Meadows',
    latitude: 7.0549637,
    longitude: 38.2404379,
    landSize: 75,
    budgetForLand: 7000,
    oxygen_level: 21,
    nitrogen: 20,
    potassium: 25,
    phosphorus: 15,
    humidity: 55,
    ph_level: 7.0,
    LandBusinessPlan: [
      {
        title: 'Crop Rotation',
        description: 'Implement crop rotation to maintain soil fertility and manage pests.'
      }
    ],
    crops: [
      {
        CropName: 'salad green',
        CropImage: 'wheat.png',
        recommendationPercentage: 90,
        cropSize: 25,
        expectedMoneyRevenue: 2500,
        expectedWeightRevenue: 600,
        cropCost: 600,
        cropProfit: 1900
      },
      {
        CropName: 'sweet potato',
        CropImage: 'barley.png',
        recommendationPercentage: 60,
        cropSize: 15,
        expectedMoneyRevenue: 1800,
        expectedWeightRevenue: 400,
        cropCost: 450,
        cropProfit: 1350
      }
    ],
    waterSufficecy: 85,
    sunlight: 75,
    pestisedesLevel: 3,
    landUse: 95,
    humanCoverage: 50,
    waterAvaliability: 80,
    distributionOptimality: 90,
    suggestedImprovementSoil: ['Add compost', 'Reduce tillage'],
    suggestedImprovementCrop: ['Use cover crops', 'Adjust planting density']
  },
};

const landsSlice = createSlice({
  name: 'lands',
  initialState,
  reducers: {
    addLand: (state, action: PayloadAction<LandInfo>) => {
      state.lands.push(action.payload);
    },
    updateLand: (state, action: PayloadAction<{ landId: string; updates: Partial<LandInfo> }>) => {
      const land = state.lands.find((land) => land.landId === action.payload.landId);
      if (land) {
        Object.assign(land, action.payload.updates);
      }
    },
    removeLand: (state, action: PayloadAction<string>) => {
      state.lands = state.lands.filter((land) => land.landId !== action.payload);
    },
    selectLand: (state, action: PayloadAction<string>) => {
      const land = state.lands.find((land) => land.landId === action.payload);
      if (land) {
        state.selectedLand = land;
      }
    },
    deselectLand: (state) => {
      state.selectedLand = null;
    },
    setSelectedLand: (state, action: PayloadAction<LandInfo>) => {
      state.selectedLand = action.payload;
    },
    setInitialLands: (state, action: PayloadAction<LandInfo[]>) => {
      state.lands = action.payload;
    },
  },
});

export const { addLand, updateLand, removeLand, selectLand, deselectLand, setSelectedLand, setInitialLands } = landsSlice.actions;
export default landsSlice.reducer;
