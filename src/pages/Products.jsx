import { Box, SimpleGrid, Image, Text, Button, VStack, InputGroup, Input, InputRightElement, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const products = [
  { id: 1, name: "Smartphone", price: 299, category: "Electronics", brand: "Brand A", image: "/images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 799, category: "Electronics", brand: "Brand B", image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 199, category: "Accessories", brand: "Brand A", image: "/images/headphones.jpg" },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-");
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, category, priceRange, selectedBrands]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
  };

  return (
    <Box p={4}>
      <InputGroup maxW="400px" mx="auto" mb={4}>
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
      <Box mb={4}>
        <Select placeholder="Select category" onChange={handleCategoryChange} mb={2}>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </Select>

        <Select placeholder="Select price range" onChange={handlePriceRangeChange} mb={2}>
          <option value="0-200">0 - 200</option>
          <option value="201-500">201 - 500</option>
          <option value="501-1000">501 - 1000</option>
        </Select>

        <CheckboxGroup onChange={handleBrandChange}>
          <Stack spacing={2} direction="column">
            <Checkbox value="Brand A">Brand A</Checkbox>
            <Checkbox value="Brand B">Brand B</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {filteredProducts.map((product) => (
          <VStack key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" />
            <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
            <Text>${product.price}</Text>
            <Button as={Link} to={`/products/${product.id}`} colorScheme="teal">View Details</Button>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Products;