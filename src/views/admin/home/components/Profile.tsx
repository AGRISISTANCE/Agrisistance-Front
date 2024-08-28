import React from "react";
// Chakra imports
import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card";

export default function Profile(props: {
  avatar: string;
  name: string;
  days: string;
  suggestions: string;
}) {
  const { avatar, name, days, suggestions, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  return (
    <Card
      mb={{ base: "0px", lg: "20px" }}
      alignItems="center"
      {...rest}
      width="552px"
      height="fit-content"
      padding="20px"
    >
      <Flex height="100%" width="100%" direction="column" gap="24px">
        <Flex justify="space-around" gap="40px" align="center">
          <Avatar
            src={avatar}
            h="70px"
            w="70px"
            border="4px solid"
            borderColor={borderColor}
          />
          <Flex direction="column" gap="10px">
            <Text color={textColorPrimary} fontWeight="semibold" fontSize="xl">
              Welcome back
            </Text>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="xl">
              {name}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center">
          <Text
            border="2px solid #218225"
            borderRadius="20px"
            padding="5px 10px"
          >
            - {days} days until harvest
          </Text>
          <Text color="#FC0D0D">
            {suggestions === "0"
              ? "No new suggestions"
              : `${suggestions} new suggestions`}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
