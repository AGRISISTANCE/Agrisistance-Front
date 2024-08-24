import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from '../../../assets/img/avatars/avatars';
import Land from './components/Land';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Adjust the import according to your project structure

export default function Home() {
  // Access lands from the Redux store
  const lands = useSelector((state: RootState) => state.land);
  // const selectedLandIndex = useSelector((state: RootState) => state.selectedLandIndex);

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
          {/* {selectedLandIndex >= 0 ? (
            <Land {...lands[selectedLandIndex]} select={false} />
          ) : (
            <Land />
          )} */}
        </Flex>
      </Flex>
      <Text color="#218225" fontWeight="bold" fontSize="30px" ml="20px">
        Other Lands:
      </Text>
      <Flex wrap="wrap" gap="40px" padding="40px">
        {/* {lands.map((land, key) => (
          <Land key={key} {...land} />
        ))} */}
      </Flex>
    </Flex>
  );
}
