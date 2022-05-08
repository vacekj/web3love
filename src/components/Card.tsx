import nftContractAbi from "@/nftContractAbi.json";
import abi from "@/nftContractAbi.json";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
const IMAGE = "/images/cards/mothers-day.jpeg";

export default function Card() {
  const addRecentTransaction = useAddRecentTransaction();
  const [recipient, setRecipient] = useState<string>(
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
  );
  const { data: account } = useAccount();
  const { writeAsync, isLoading: mintLoading } = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_NFT_CONTRACT!,
      contractInterface: abi.abi,
    },
    "safeMint",
    {
      args: [recipient, ""],
    }
  );

  return (
    <Center py={12} flexDirection={"column"}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        mb={8}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"flex-start"} spacing={3}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            from
          </Text>
          <Input
            size={"lg"}
            variant={"unstyled"}
            autoFocus={true}
            placeholder={"your loving son"}
          />

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            to
          </Text>
          <Input
            size={"lg"}
            variant={"unstyled"}
            autoFocus={true}
            placeholder={"the best mother"}
          />

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            send to
          </Text>
          <Input
            required={true}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            size={"lg"}
            variant={"unstyled"}
            autoFocus={true}
            placeholder={
              "0xa9fac1ba6c7fb0ffb44ecec01cf23d47bba924d25336defdbf782e7181fc00bd"
            }
          />
        </Stack>
      </Box>
      {<ConnectButton />}
      {account && (
        <Button
          type={"submit"}
          isLoading={mintLoading}
          onClick={async () => {
            const result = await writeAsync();
            console.log(result);
            addRecentTransaction({
              hash: result.hash,
              description: "Mint message NFT",
            });
          }}
          size={"lg"}
          px={8}
          mt={4}
          border={"solid 3px linear(to-r, red.400,pink.400)"}
          colorScheme={"pink"}
          bgGradient="linear(to-r, red.400,pink.400)"
          textColor={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.500,pink.500)",
          }}
        >
          Send some love
        </Button>
      )}
    </Center>
  );
}
