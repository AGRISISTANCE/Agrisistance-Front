import React, { useState } from 'react';
import { Flex, Button, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLand, removeLand, setSelectedLand, LandInfo } from '../../../../redux/landsSlice'; // Ensure this import is correct
import land from '../../../../assets/img/land/land';
import { apiCall } from '../../../../services/api';
import { RootState } from '../../../../redux/store';
import ConfirmationPopup from '../../../../components/Popup/ConfirmationPopup'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { mapLandDataToSelectedLand } from './utils/landMapper'; // Adjust path based on your file structure


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

  const toast = useToast(); // Initialize Chakra's useToast hook

  const handleSelect = () => {
    const loadData = async () => {
      try {
        //! uncomment when using dummy data:
        // dispatch(selectLand(landId))

        //! Comment when using dummy data
        console.log("getting select land data...")
        const landResponse = await apiCall(`/land/get-land/${landId}`, { requireAuth: true }, token);
        console.log('selected land data getted successfully: ', landResponse)

        if (landResponse) {
          const mappedLand = mapLandDataToSelectedLand(landResponse);
          dispatch(setSelectedLand(mappedLand));
          toast({
            title: "Land selected successfully",
            description: `land ${mappedLand.landName} Selected successfully`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error while selecting land",
          description: `Failed to select that specefic land`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  };

  const handleDelete = async () => {
    try {
      //! uncomment when using dummy data:
      // dispatch(removeLand(landId))

      //! Comment when using dummy data
      console.log('Attempting to delete land with ID:', landId);
      const response = await apiCall(`/land/delete-land/${landId}`, { method: 'DELETE', requireAuth: true }, token);
      console.log('Delete response:', response);
      
      if (response.message === 'Land deleted successfully') {
        // dispatch(removeLand(landId));
        console.log('Land deleted successfully');
        dispatch(setSelectedLand(null));
        dispatch(removeLand(landId));
        toast({
          title: "Land deleted successfully",
          description: response.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(()=>{

          window.location.reload();
        },2000)
      } else {
        console.warn('Unexpected delete response:', response);
        toast({
          title: "Error while deleting land",
          description: response.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(()=>{

          window.location.reload();
        },2000)
      }
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
function toast(arg0: { title: string; description: any; status: string; duration: number; isClosable: boolean; }) {
  throw new Error('Function not implemented.');
}

