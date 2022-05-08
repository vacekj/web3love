import Card from "@/components/Card";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function JoinOurTeam() {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        alignItems={"center"}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          >
            Send some <br />
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              web3
            </Text>{" "}
            love
          </Heading>
          <Text fontSize={["3xl"]}>
            Send a card with a custom message to your favourite person.
          </Text>
          <Text fontSize={"2xl"}>
            <Text
              fontSize={"4xl"}
              fontWeight={"bold"}
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              312 cards{" "}
            </Text>
            sent so far
          </Text>
        </Stack>
        <Card />
      </Container>
    </Box>
  );
}
