import React, { useEffect } from 'react';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from '../../../assets/img/avatars/avatars';
import Land from './components/Land';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store'; // Ensure this import is correct
import { Crop, selectLand, LandBusinessPlan } from '../../../redux/landsSlice';
import { LandInfo } from '../../../redux/landsSlice'; // Import the LandInfo interface
import { IoIosClose } from 'react-icons/io';
import AddNewLand from './components/AddNewLand';
import { apiCall } from '../../../services/api';
import { setUser } from '../../../redux/userSlice'; // Adjust the path as necessary
import { setInitialLands } from '../../../redux/landsSlice';


export default function Home() {
  const lands = useSelector((state: RootState) => state.lands.lands);
  const dispatch = useDispatch();
  const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleButtonClick = () => onOpen();
  const handleSelectLand = (landId: string) => {
    dispatch(selectLand(landId));
  };

  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux

  //Setting user info from backend to redux store
  //! todo: set all lands from backend to redux store, (later set all posts and content in your network section)
  // fetching lands data:
  const fetchLands = async () => {
    try {
      const response = await apiCall('/land/your-lands', {
        method: 'GET',
        requireAuth: true,
      }, token);

      const mappedLands = response.result.map((land: any, index: number) => ({
        landId: land.land_id,
        owner: land.user_id,
        landName: land.land_name,
        latitude: land.latitude,
        longitude: land.longitude,
        landSize: land.land_size,
        budgetForLand: 0,
        oxygen_level: land.oxygen_level, //Or you can make those 0 bcz you dont need them
        nitrogen: land.nitrogen,
        potassium: land.potassium,
        phosphorus: land.phosphorus,
        humidity: 0,
        ph_level: land.ph_level,
        LandBusinessPlan: [] as LandBusinessPlan[], // Explicitly typing the array
        crops: [] as Crop[], // Explicitly typing the array
        waterSufficecy: 0, // Placeholder, fetch from another API if available
        sunlight: 0, // Placeholder, fetch from another API if available
        pestisedesLevel: 0, // Placeholder, fetch from another API if available
        landUse: 0, // Placeholder, fetch from another API if available
        humanCoverage: 0, // Placeholder, fetch from another API if available
        waterAvaliability: 0, // Placeholder, fetch from another API if available
        distributionOptimality: 0, // Placeholder, fetch from another API if available
        suggestedImprovementSoil: [] as string[], // Explicitly typing the array
        suggestedImprovementCrop: [] as string[], // Explicitly typing the array
      }));

      //! Commented because i am using dummy lands
      // dispatch(setInitialLands(mappedLands));
      // console.log("inital lands setted successfully", response )
      
    } catch (error) {
      console.error('Failed to fetch lands:', error);
    }
  };
  useEffect(() => {
    fetchLands();
  }, [dispatch, token]);

  // fetching user data!
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await apiCall('/profile/get-profile', {
          method: 'GET',
          requireAuth: true,
        }, token);

        dispatch(setUser({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.eMail,
          phoneNumber: profile.phoneNumber,
          country: profile.country,
          userId: profile.user_id,
          profilePicture: profile.profile_picture,
          currentPlan: profile.subscription_type === 'Basic' ? 'Basic' : 'premium',
        }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, [dispatch, token]);

  //
  return (
    <Flex direction="column" height="100vh">
      <Flex
        align="center"
        justify="center"
        width="100%"
        height="100%"
        padding="20px"
        boxSizing="border-box"
        gap="50px"
      >
        <div>
        <Profile avatar={avatars.avatar1} days="20" name="James Belfort" suggestions="1" />
        <Button onClick={fetchLands}>Fetch lands</Button>
        </div>
        <Flex direction="column" gap="10px" align="center">
          <Text color="#218225" textAlign="center" fontWeight="bold" fontSize="30px">
            Selected Land
          </Text>
          {!selectedLand ? (
            "No selected Land"
          ) : (
            <Land
              landId={selectedLand.landId}
              name={selectedLand.landName}
              coordinates={[selectedLand.latitude.toString(), selectedLand.longitude.toString()]}
              select={true} // Make sure it has select option
            />
          )}
        </Flex>
      </Flex>
      <Text color="#218225" fontWeight="bold" fontSize="30px" ml="20px">
        Other Lands:
      </Text>
      <Flex wrap="wrap" gap="40px" padding="40px">
      <Flex direction="column">
            <Button onClick={handleButtonClick} fontSize="25px">+ Add New Land</Button>
            {isOpen && (
              <Box
                className="modal-overlay"
                position="fixed"
                top="0"
                left="0"
                width="100%"
                height="100%"
                background="rgba(0,0,0,0.5)"
                zIndex="999"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box background="#fff" borderRadius="30px" position="relative">
                  <AddNewLand />
                  <Button
                    onClick={onClose}
                    position="absolute"
                    top="-20px"
                    right="-40px"
                    colorScheme="none"
                    border="2px"
                    color="#fff"
                    padding="10px"
                    borderRadius="50%"
                    fontSize="30px"
                  >
                    <IoIosClose />
                  </Button>
                </Box>
              </Box>
            )}
          </Flex>
        {lands.map((land) => (
            <Land
              key={land.landId}
              landId={land.landId}
              name={land.landName}
              coordinates={[land.latitude.toString(), land.longitude.toString()]}
              select={false} // Include select functionality
            />
          ))}
      </Flex>
    </Flex>
  );
}
