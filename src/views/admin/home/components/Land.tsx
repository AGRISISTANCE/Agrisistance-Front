import React from 'react';
import { Flex } from '@chakra-ui/react';

// Assume land object is imported from somewhere or defined elsewhere
// This should be replaced with the actual way you get the image URLs
import land from '../../../../assets/img/land/land'

interface LandProps {
  name?: string;
  coordinates?: [string, string];
  select?: boolean; // Optional boolean prop
  isNew?: boolean; // Example for the renamed prop
}

export default function Land(props: LandProps) {
  const { name, coordinates, select, isNew } = props;

  // Handle cases where coordinates might be undefined
  const coordinateX = coordinates ? coordinates[0] : '';
  const coordinateY = coordinates ? coordinates[1] : '';

  // Ensure the image URL is dynamically assigned
  const backgroundImage = name && land.land1 ? `url('${land.land1}')` : '#C4C4C4';

  return (
    <Flex
      direction='column'
      width='288px'
      background='#fff'
      borderRadius='12px'
      boxShadow='10px 10px 10px -14px rgba(0,0,0,0.61)'
    >
      <Flex
        height='180px'
        width='100%'
        background={`${backgroundImage}`}
        backgroundSize='cover'
        backgroundPosition='center'
        borderRadius='12px 12px 0 0'
      ></Flex>
      <Flex direction='row' padding='20px' justifyContent='space-between' alignItems='center'>
        {!isNew && (
          <Flex direction='column' gap='10px'>
            <h3 style={{
              fontSize: '25px'
            }}>{name}</h3>
            <p style={{
              fontSize: '17px'
            }}>{coordinateX}, {coordinateY}</p>
          </Flex>
        )}
        {select && !isNew && (
          <button
            style={{
              color: '#fff',
              background: '#2C4026',
              borderRadius: '20px',
              height: '40px',
              padding: '0 25px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            Select
          </button>
        )}
        {isNew && (
          <Flex>
            <a href="#">
              <p style={{
                fontSize: '25px'
              }}>+ Add new land</p>
            </a>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
