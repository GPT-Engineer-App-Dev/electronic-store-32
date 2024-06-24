import { Box, Flex, Link, Spacer, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="1200px" mx="auto" align="center">
        <Link as={RouterLink} to="/" color="white" fontSize="xl" fontWeight="bold">Electronics Store</Link>
        <InputGroup maxW="400px" mx="auto">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            bg="white"
            color="black"
          />
          <InputRightElement>
            <Button colorScheme="teal" variant="outline">Search</Button>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button as={RouterLink} to="/products" colorScheme="teal" variant="outline">Products</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;