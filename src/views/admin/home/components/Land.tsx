import React, { useState } from 'react';
import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLand, removeLand, setInitialLands, LandInfo, setSelectedLand } from '../../../../redux/landsSlice'; // Ensure this import is correct
import land from '../../../../assets/img/land/land';
import { apiCall } from '../../../../services/api';
import { RootState } from '../../../../redux/store';


interface LandProps {
  landId: string;
  name: string;
  coordinates: [string, string];
  select?: boolean;
  isNew?: boolean;
  onAddLand?: (landData: { name: string; coordinates: [string, string] }) => void;
}

export default function Land({
  landId,
  name,
  coordinates,
  select = false,
  isNew = false,
  onAddLand
}: LandProps) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const backgroundImage = name ? `url('${land.land1}')` : '#C4C4C4'; // Adjust image path if necessary
  
  
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.token.token);
  
  const handleSelect = () => {
    //dispatch(selectLand(landId));
    const loadData = async () => {
      try {
        const data = await apiCall(`/land/get-land/${landId}`, { requireAuth: true }, token);

          if (data) {
            const landInfo: LandInfo = {
              landId: data.land[0]?.land_id || '',
              owner: data.land[0]?.user_id || '',
              landName: data.land[0]?.land_name || '',
              latitude: data.land[0]?.latitude || 0,
              longitude: data.land[0]?.longitude || 0,
              landSize: data.land[0]?.land_size || 0,
              budgetForLand: data.finance[0]?.investment_amount || 0,
              oxygen_level: data.land[0]?.oxygen_level || 0,
              nitrogen: data.land[0]?.nitrogen || 0,
              potassium: data.land[0]?.potassium || 0,
              phosphorus: data.land[0]?.phosphorus || 0,
              humidity: parseFloat(data.land[0]?.humidity) || 0,
              ph_level: data.land[0]?.ph_level || 0,
              LandBusinessPlan: [
                {
                  title: 'Crop Rotation',
                  description: 'Implement crop rotation to maintain soil fertility and manage pests.'
                }
              ], // dummy data for now, Assuming you have a way to get this data
              crops: data.crops.map((crop: any) => ({
                CropName: crop.crop_name,
                CropImage: '', // You may need to map this if available
                recommendationPercentage: 0, // Placeholder
                cropSize: crop.crop_area,
                expectedMoneyRevenue: crop.expected_money_return,
                expectedWeightRevenue: crop.expected_wight_return,
                cropCost: crop.crop_investment,
                cropProfit: crop.expected_money_return - crop.crop_investment,
              })),
              waterSufficecy: data.crop_maintenance[0]?.water_sufficienty || 0,
              sunlight: data.weather[0]?.sunlight || 0,
              pestisedesLevel: data.crop_maintenance[0]?.pesticide_level || 0,
              landUse: data.land_statistics[0]?.land_use || 0,
              humanCoverage: data.land_statistics[0]?.human_coverage || 0,
              waterAvaliability: data.land_statistics[0]?.water_availability || 0,
              distributionOptimality: data.land_statistics[0]?.distribution_optimality || 0,
              suggestedImprovementSoil: ['Add compost', 'Reduce tillage'], // dummy data Placeholder
              suggestedImprovementCrop: ['Use cover crops', 'Adjust planting density'], // dummy data Placeholder
            };

            // dispatch(setInitialLands([landInfo]));
            dispatch(setSelectedLand(landInfo));
          }
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();

  };

  const handleDelete = () => {
    dispatch(removeLand(landId));
  };

  const handleButtonClick = () => onOpen();
  const handleAddNewLand = () => {
    if (onAddLand) {
      onAddLand({ name, coordinates });
    }
    onClose();
  };

  return (
    <Flex direction="column" width="288px" background="#fff" borderRadius="12px" boxShadow="10px 10px 10px -14px rgba(0,0,0,0.61)">
      <Flex
        height="180px"
        width="100%"
        background={backgroundImage}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="12px 12px 0 0"
      />
      <Flex direction="row" padding="20px" justifyContent="space-between" alignItems="center">
        {!isNew && (
          <Flex direction="column" gap="10px">
            <Text fontSize="25px" fontWeight="bold">{name}</Text>
            <Text fontSize="17px">{coordinates[0]}, {coordinates[1]}</Text>
          </Flex>
        )}
        {!select && (
          <Flex direction="column" gap="10px">
            <Button colorScheme="green" borderRadius="20px" height="40px" fontSize="18px" onClick={handleSelect}>Select</Button>
            <Button colorScheme="gray" borderRadius="20px" height="40px" fontSize="18px" onClick={handleDelete}>Delete</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
