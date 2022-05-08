import {useTotalCards} from "@/hooks";
import {Box, Container, Heading, SimpleGrid, Stack, Text} from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("@/components/Card"));

export default function Index() {
  const { data: totalSupplyData } = useTotalCards();
  const totalSupply = parseInt((totalSupplyData as unknown as string) ?? 0);

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
              {totalSupply}
              {" "}
            </Text>
            cards sent so far
          </Text>
        </Stack>
        <Card />
      </Container>
    </Box>
  );
}
