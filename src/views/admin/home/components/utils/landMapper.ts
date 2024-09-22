// Import necessary types for TypeScript safety
import { LandInfo } from '../../../../../redux/landsSlice'; // Adjust the path based on your project structure

// Utility function to map land data to selected land
export const mapLandDataToSelectedLand = (landData: any): LandInfo => {
  // Calculate the total crop area for all crops
  const totalCropArea = landData.crops.reduce((total: number, crop: any) => total + (crop.crop_area || 0), 0);

  return {
    landId: landData.land.land_id,
    owner: landData.land.user_id,
    landName: landData.land.land_name,
    latitude: landData.land.latitude,
    longitude: landData.land.longitude,
    landSize: landData.land.land_size,
    budgetForLand: landData.finance.investment_amount || 0, // Fixed here
    oxygen_level: landData.land.oxygen_level,
    nitrogen: landData.land.nitrogen,
    potassium: landData.land.potassium,
    phosphorus: landData.land.phosphorus,
    humidity: landData.weather.humidity || 0, // Fixed here
    ph_level: landData.land.ph_level,
    // LandBusinessPlan: [
    //   {
    //     title: 'Executive Summary',
    //     description: landData.business_plan.executive_summary || '', // Ensure this is a string
    //   },
    // ],
    LandBusinessPlan: [
      {
        title: 'Executive Summary',
        description: landData.business_plan.executive_summary || '', // Ensure this is a string
      },
      {
        title: 'Resources',
        description: landData.business_plan.resources || '', // Ensure this is a string
      },
      {
        title: 'Crop Information',
        description: landData.business_plan.crops || '', // Ensure this is a string
      },
      {
        title: 'Weather Considerations',
        description: landData.business_plan.weather_considerations || '', // Ensure this is a string
      },
      {
        title: 'Soil Maintenance',
        description: landData.business_plan.soil_maintenance || '', // Ensure this is a string
      },
      {
        title: 'Profit Estimations',
        description: landData.business_plan.profit_estimations || '', // Ensure this is a string
      },
      {
        title: 'Other Recommendations',
        description: landData.business_plan.other_recommendations || '', // Ensure this is a string
      }
    ],
    crops: landData.crops.map((crop: any) => {
      const recommendationPercentage = totalCropArea > 0 ? (crop.crop_area / totalCropArea) * 100 : 0;

      return {
        CropName: crop.crop_name || '', // Ensure default values
        CropImage: crop.crop_name || '', // Ensure default values
        recommendationPercentage: parseFloat(recommendationPercentage.toFixed(2)), // Limit to 2 decimal places
        cropSize: crop.crop_area || 0,
        expectedMoneyRevenue: crop.expected_money_return || 0,
        expectedWeightRevenue: crop.expected_weight_return || 0, // Fixed typo
        cropCost: crop.crop_investment || 0,
        cropProfit: (crop.expected_money_return || 0) - (crop.crop_investment || 0),
      };
    }),
    waterSufficecy: landData.crop_maintenance.water_sufficienty || 0, // Fixed here
    sunlight: landData.weather.sunlight || 0, // Fixed here
    pestisedesLevel: landData.crop_maintenance.pesticide_level || 0, // Fixed here
    landUse: (landData.land_statistics.land_use || 0) * 100,
    humanCoverage: (landData.land_statistics.human_coverage || 0) * 100,
    waterAvaliability: landData.land_statistics.water_availability || 0,
    distributionOptimality: landData.land_statistics.distribution_optimality || 0,
    suggestedImprovementSoil: landData.suggested_improvements?.soil || [],
    suggestedImprovementCrop: landData.suggested_improvements?.crop || [],
  };
};
