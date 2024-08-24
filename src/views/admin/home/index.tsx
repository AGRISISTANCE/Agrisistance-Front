import React from 'react';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from '../../../assets/img/avatars/avatars';
import Land from './components/Land';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store'; // Ensure this import is correct
import { selectLand } from '../../../redux/landsSlice';
import { LandInfo } from '../../../redux/landsSlice'; // Import the LandInfo interface
import { IoIosClose } from 'react-icons/io';
import AddNewLand from './components/AddNewLand';

export default function Home() {
  const lands = useSelector((state: RootState) => state.lands.lands);
  const dispatch = useDispatch();
  const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleButtonClick = () => onOpen();
  const handleSelectLand = (landId: string) => {
    dispatch(selectLand(landId));
  };

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
        <Profile avatar={avatars.avatar1} days="20" name="James Belfort" suggestions="1" />
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
