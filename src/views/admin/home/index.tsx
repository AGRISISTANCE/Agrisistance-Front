import React, { useEffect } from 'react';
import { Box, Button, Flex, Img, Text, useDisclosure } from '@chakra-ui/react';
import Profile from './components/Profile';
import Land from './components/Land';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store'; // Ensure this import is correct
import { Crop, selectLand, LandBusinessPlan } from '../../../redux/landsSlice';
import { LandInfo } from '../../../redux/landsSlice'; // Import the LandInfo interface
import { IoIosClose } from 'react-icons/io';
import AddNewLand from './components/AddNewLand';
import { apiCall } from '../../../services/api';
import { setUser, UserInfo } from '../../../redux/userSlice'; // Adjust the path as necessary
import { setInitialLands } from '../../../redux/landsSlice';
import Navbar from '../navbar/navbar';
import addIcon from "../../../assets/img/dashboards/addIcon.jpg"

export default function Home() {
  const lands = useSelector((state: RootState) => state.lands.lands);
  const user = useSelector((state: any) => state.user) as UserInfo;
  const dispatch = useDispatch();
  const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleButtonClick = () => onOpen();
  const handleSelectLand = (landId: string) => {
    dispatch(selectLand(landId));
  };


  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  console.log("user token: ", token)
  console.log("current lands: ", lands)


  // fetching lands data:
  const fetchLands = async () => {
    try {
      // Directly call apiCall and get the parsed data
      const lands = await apiCall('/land/get-all-lands', {
        method: 'GET',
        requireAuth: true,
      }, token);

      console.log("API Response:", lands); // Log the response to confirm it's an array

      const mappedLands = lands.map((land: any) => ({
        landId: land.land_id,
        owner: user.userId,
        landName: land.land_name,
        latitude: land.latitude,
        longitude: land.longitude,
        landSize: land.land_size,
        budgetForLand: 0,
        oxygen_level: 0,
        nitrogen: 0,
        potassium: 0,
        phosphorus: 0,
        humidity: 0,
        ph_level: 0,
        LandBusinessPlan: [] as LandBusinessPlan[], 
        crops: [] as Crop[], 
        waterSufficecy: 0, 
        sunlight: 0, 
        pestisedesLevel: 0, 
        landUse: 0, 
        humanCoverage: 0, 
        waterAvaliability: 0, 
        distributionOptimality: 0, 
        suggestedImprovementSoil: [] as string[], 
        suggestedImprovementCrop: [] as string[], 
      }));
      //! comment when using dummy data
      dispatch(setInitialLands(mappedLands));
      console.log("Initial lands set successfully", mappedLands);
      
    } catch (error) {
      console.error('Failed to fetch lands:', error);
    }
};

  //! comment when using dummy data
  // useEffect(() => {
  //   fetchLands();
  // }, []);

  // fetching user data!
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await apiCall('/profile/get-profile', {
          method: 'GET',
          requireAuth: true,
        }, token);

        dispatch(setUser({
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          phoneNumber: profile.phone_number,
          country: profile.country,
          userId: profile.user_id,
          profilePicture: profile.profile_picture,
          currentPlan: profile.subscription_type === 'Basic' ? 'Basic' : 'premium',
        }));
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    //! Comment when using dummy data
    fetchUserProfile();
  }, []);


  //
  return (
  <Flex direction="column" height="100vh" mt={16}>
    <Navbar /> {/* Add className */}
    <Flex
      align="center"
      justify="center"
      width="100%"
      height="100%"
      padding="20px"
      boxSizing="border-box"
      gap="50px"
    >
      <div className="profile-section"> {/* Add className */}
        <Profile />
        <Box width="100%" maxW="1200px" mb="20px">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/?listType=playlist&list=PLY--2DKz-ETN3XDhpM8wN384PWwBp5R6j"
            title="Agriculture Videos"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </div>
      <Flex className="selected-land" direction="column" gap="10px" align="center">
        <Text color="#2ACC32" textAlign="center" fontWeight="bold" fontSize="30px">
          Selected Land
        </Text>
        {!selectedLand ? (
          "No selected Land"
        ) : (
          <Land
            landId={selectedLand.landId}
            name={selectedLand.landName}
            coordinates={[selectedLand.latitude.toString(), selectedLand.longitude.toString()]}
            select={true}
          />
        )}
      </Flex>
    </Flex>
    <Text color="#2ACC32" fontWeight="bold" fontSize="30px" ml="20px">
      Other Lands:
    </Text>
    <Flex wrap="wrap" gap="40px" padding="40px" className="other-lands">
      <Flex direction="column">
        <Button className="add-new-land" onClick={handleButtonClick} fontSize="25px">
          <img src={addIcon} width="25px" />
          &nbsp; Add New Land
        </Button>
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
                top="20px"
                right="20px"
                backgroundColor="#000"
                color="#fff"
                padding="0"
                borderRadius="50%"
                width="40px"
                height="40px"
                fontSize="30px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="none"
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
          select={false}
        />
      ))}
    </Flex>
  </Flex>
)}