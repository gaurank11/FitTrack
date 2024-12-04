// Hero.js
import React from "react";
import { Box, Flex, Circle, Text, VStack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box position="relative" h="100vh" bg="gray.100" overflow="hidden">
      {/* Background Circles */}
      <Circle
        size="500px"
        bgGradient="radial(teal.500, transparent)"
        position="absolute"
        top="-100px"
        left="-150px"
        opacity={0.6}
      />
      <Circle
        size="300px"
        bgGradient="radial(teal.500, transparent)"
        position="absolute"
        bottom="-100px"
        right="-100px"
        opacity={0.4}
      />

      {/* Content */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100%"
        zIndex={1}
        position="relative"
        textAlign="center"
        px={6}
      >
        {/* FitTrack Logo Circle */}
        <Circle
          size="200px"
          bg="teal.500"
          color="white"
          fontWeight="bold"
          fontSize="5xl"
          mb={6}
          shadow="lg"
        >
          FitTrack
        </Circle>

        {/* Description */}
        <VStack spacing={4} maxW="600px">
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            color="teal.600"
          >
            Your Ultimate Fitness & Sports Companion
          </Text>
          <Text fontSize="lg" color="gray.700" lineHeight="1.6">
            Track your fitness journey with advanced insights, 
            personalized training, and real-time analytics. 
            Harness the power of cutting-edge technology to elevate your workouts and sports performance.
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Hero;
