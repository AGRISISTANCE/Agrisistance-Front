import React, { useState } from 'react';
import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLand, removeLand, setSelectedLand, LandInfo } from '../../../../redux/landsSlice'; // Ensure this import is correct
import land from '../../../../assets/img/land/land';
import { apiCall } from '../../../../services/api';
import { RootState } from '../../../../redux/store';
import ConfirmationPopup from '../../../../components/Popup/ConfirmationPopup'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';


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

  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for showing the confirmation popup
  const navigate = useNavigate();

  const handleSelect = () => {
    const loadData = async () => {
      try {
        //! uncomment when using dummy data:
        dispatch(selectLand(landId))

        //! Comment when using dummy data
        // console.log("getting select land data...")
        // const data = await apiCall(`/land/get-land/${landId}`, { requireAuth: true }, token);
        // console.log('selected land data getted successfully: ', data)

        // if (data) {
        //   // Calculate total crop area for all crops
        //   const totalCropArea = data.crops.reduce((total: number, crop: any) => total + (crop.crop_area || 0), 0);

        //   // Map the API response to the LandInfo object
        //   const landInfo: LandInfo = {
        //     landId: data.land.land_id || '',
        //     owner: data.land.user_id || '',
        //     landName: data.land.land_name || '',
        //     latitude: data.land.latitude || 0,
        //     longitude: data.land.longitude || 0,
        //     landSize: data.land.land_size || 0,
        //     budgetForLand: data.finance[0]?.investment_amount || 0,
        //     oxygen_level: data.land.oxygen_level || 0,
        //     nitrogen: data.land.nitrogen || 0,
        //     potassium: data.land.potassium || 0,
        //     phosphorus: data.land.phosphorus || 0,
        //     humidity: data.weather[0]?.humidity || 0,
        //     ph_level: data.land.ph_level || 0,
        //     LandBusinessPlan: data.business_plan.map((plan: any) => ({
        //       title: 'Executive Summary',
        //       description: plan.executive_summary || '', // Ensure this is a string
        //     })),
        //     crops: data.crops.map((crop: any) => {
        //       const recommendationPercentage = totalCropArea > 0 
        //         ? (crop.crop_area / totalCropArea) * 100 
        //         : 0;

        //       return {
        //         CropName: crop.crop_name || '', // Ensure default values
        //         CropImage: crop.crop_name || '', // Ensure default values
        //         recommendationPercentage: parseFloat(recommendationPercentage.toFixed(2)), // Limit to 2 decimal places
        //         cropSize: crop.crop_area || 0,
        //         expectedMoneyRevenue: crop.expected_money_return || 0,
        //         expectedWeightRevenue: crop.expected_wight_return || 0,
        //         cropCost: crop.crop_investment || 0,
        //         cropProfit: (crop.expected_money_return || 0) - (crop.crop_investment || 0),
        //       };
        //     }),
        //     waterSufficecy: data.crop_maintenance[0]?.water_sufficienty || 0,
        //     sunlight: data.weather[0]?.sunlight || 0,
        //     pestisedesLevel: data.crop_maintenance[0]?.pesticide_level || 0,
        //     landUse: (data.land_statistics[0]?.land_use || 0) * 100,
        //     humanCoverage: (data.land_statistics[0]?.human_coverage || 0) * 100,
        //     waterAvaliability: data.land_statistics[0]?.water_availability || 0,
        //     distributionOptimality: data.land_statistics[0]?.distribution_optimality || 0,
        //     suggestedImprovementSoil: data.suggested_improvements?.soil || [],
        //     suggestedImprovementCrop: data.suggested_improvements?.crop || [],
        //   };

        // Dispatch the action to update the selected land in the Redux store
        // dispatch(setSelectedLand(landInfo));
        // console.log('Selected land updated in Redux store with: ', landInfo);
        // }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  };

  const handleDelete = async () => {
    try {
      //! uncomment when using dummy data:
      dispatch(removeLand(landId))

      //! Comment when using dummy data
      // console.log('Attempting to delete land with ID:', landId);
      // const response = await apiCall(`/land/delete-land/${landId}`, { method: 'DELETE', requireAuth: true }, token);
      // console.log('Delete response:', response);
      
      // if (response.message === 'Land deleted successfully') {
      //   // dispatch(removeLand(landId));
      //   console.log('Land deleted successfully');
      //   dispatch(setSelectedLand(null));
      //   window.location.reload();
      // } else {
      //   console.warn('Unexpected delete response:', response);
      //   window.location.reload();
      // }
    } catch (error) {
      console.error('Error deleting land:', error);
      alert("error when deleting land")
    }
  };

  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true); // Show the confirmation popup
  };

  const handleConfirmDelete = () => {
    handleDelete(); // Perform the delete action
    setShowDeletePopup(false); // Hide the confirmation popup
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false); // Hide the confirmation popup
  };

  const handleButtonClick = () => onOpen();
  const handleAddNewLand = () => {
    if (onAddLand) {
      onAddLand({ name, coordinates });
    }
    onClose();
  };

  return (
    <>
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
              <Button
                bg="#2ACC32" // Set the background color
                color="white" // Set text color to white for better contrast
                borderRadius="20px"
                height="40px"
                fontSize="18px"
                _hover={{ bg: '#28B32F' }} // Optionally, add a hover effect with a slightly different shade
                onClick={handleSelect}
              >
                Select
              </Button>
              <Button colorScheme="gray" borderRadius="20px" height="40px" fontSize="18px" onClick={handleDeleteButtonClick}>
                Delete
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      {/* Confirmation Popup for Deletion */}
      <ConfirmationPopup
        title="Confirm Delete"
        message={`Are you sure you want to delete the land "${name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isConfirmPhase={true} // Since this is a simple confirmation, you can keep it as false
        showPopup={showDeletePopup}
      />
    </>
  );
}
