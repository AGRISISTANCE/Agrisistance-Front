import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from '../../../assets/img/avatars/avatars';
import Land from './components/Land';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store'; // Ensure this import is correct
import { selectLand } from '../../../redux/landsSlice';
import { LandInfo } from '../../../redux/landsSlice'; // Import the LandInfo interface

export default function Home() {
  const lands = useSelector((state: RootState) => state.lands.lands);
  const dispatch = useDispatch();
  const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);

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
              name={selectedLand.landName}
              coordinates={[selectedLand.latitude.toString(), selectedLand.longitude.toString()]}
            />
          )}
        </Flex>
      </Flex>
      <Text color="#218225" fontWeight="bold" fontSize="30px" ml="20px">
        Other Lands:
      </Text>
      <Flex wrap="wrap" gap="40px" padding="40px">
        <select onChange={(e) => handleSelectLand(e.target.value)} defaultValue="">
          <option value="" disabled>Select a land</option>
          {lands.map((land: LandInfo) => (
            <option key={land.landId} value={land.landId}>
              {/* {land.landName}  Display the land name in the option */}
              <Land
              name={land.landName}
              coordinates={[land.latitude.toString(), land.longitude.toString()]}
              />
            </option>
          ))}
        </select>
      </Flex>
    </Flex>
  );
}
