import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from '../../../assets/img/avatars/avatars';
import Land from './components/Land';

// Define the type for land data
interface LandData {
  name: string;
  coordinates: [string, string];
  select?: boolean;
  selected?: boolean;
}

// Initialize lands with example data
const initialLands: LandData[] = [
   {
     name: "Land1",
     coordinates: ['41.4032', '3.17403'],
     select: true,
   selected: false
   }
];

export default function Home() {
  const [lands, setLands] = useState<LandData[]>(initialLands);

  // Function to handle adding new land
  const handleAddLand = (landData: LandData) => {
    setLands(prevLands => [...prevLands, landData]);
  };

  // Find the index of the first selected land
  const selectedLandIndex = lands.findIndex(land => land.selected);

  return (
    <Flex direction="column" height="100vh">
      <Flex
        align="center"
        justify="center"
        width="100%"
        height="100%"
        padding="20px"
        boxSizing="border-box"
        gap={'50px'}
      >
        <Profile avatar={avatars.avatar1} days="20" name="James Belfort" suggestions="1" />
        <Flex direction="column" gap="10px" align="center">
          <Text color="#218225" textAlign="center" fontWeight="bold" fontSize="30px">
            Selected Land
          </Text>
         {/*  {selectedLandIndex >= 0 ? (
            <Land {...lands[selectedLandIndex]} select={false}/>
          ) : (
            <Land/>
          )}
            */}
            {lands.map((land, key) => (
          <Land key={key} {...land} />
          ))}
        </Flex>
      </Flex>
      <Text color="#218225" fontWeight="bold" fontSize="30px" ml="20px">
        Other Lands:
      </Text>
      <Flex wrap="wrap" gap="40px" padding="40px">
        <Land isNew onAddLand={handleAddLand} />
        {lands.map((land, key) => (
          <Land key={key} {...land} />
        ))}
      </Flex>
    </Flex>
  );
}
