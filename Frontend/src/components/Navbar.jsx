// Navbar.js
import React from "react";
import { Box, Flex, Text, Stack, Link, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../fitness.png"; // Ensure the correct path to your logo

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (page) => {
    navigate(`/${page}`);
  };

  return (
    <Box bg="teal.500" px={4} py={2} color="white">
      <Flex align="center" justify="space-between">
        {/* Logo and Title */}
        <Flex align="center">
          <Image src={Logo} alt="Fitness Tracker Logo" width="40px" mr={3} />
          <Text fontSize="xl" fontWeight="bold">
            FitTrack
          </Text>
        </Flex>

        {/* Navigation Links */}
        <Flex align="center">
          <Stack direction="row" spacing={4}>
            <Link
              href="/"
              color="white"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
              onClick={() => handleClick("/")}
            >
              Home
            </Link>
            <Link
              href="#"
              color="white"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
              onClick={() => handleClick("services")}
            >
              Services
            </Link>
            <Link
              href="/about"
              color="white"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
              onClick={() => handleClick("")}
            >
              About Us
            </Link>
          
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
