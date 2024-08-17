import { Flex, Text } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from 'assets/img/avatars/avatars';
import Land from './components/Land';

export default function Home() {
  return (
    <Flex direction="column" height="100vh">
      <Flex
        align="center"
        justify="center"
        width="100%"
        height="100%"
        justifyContent="space-around"
        padding="20px"
        boxSizing="border-box"
      >
        <Profile avatar={avatars.avatar1} days="20" name="James Belfort" suggestions="1" />
        <Flex direction="column" gap="10px" align="center">
          <Text color="#218225" textAlign="center" fontWeight="bold" fontSize="30px">
            Selected Lands
          </Text>
          <Land name="Land1" coordinates={['41.40338', '2.17403']} select={false} />
        </Flex>
      </Flex>
      <Text color="#218225" fontWeight="bold" fontSize="30px" ml="20px">
        Other
      </Text>
      <Flex wrap="wrap" gap="40px" padding="40px">
        <Land isNew />
        <Land name="Land1" coordinates={['41.40338', '2.17403']} select />
      </Flex>
    </Flex>
  );
}
