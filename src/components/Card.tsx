import abi from "@/nftContractAbi.json";
import { Box, Button, Center, Image, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import ethers from "ethers";
import { parseTransaction } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChain, useNFTBalances } from "react-moralis";
import { useAccount, useContractRead, useNetwork, useSendTransaction } from "wagmi";
import z from "zod";

const IMAGE = "/images/cards/mothers-day.jpeg";

const schema = z.object({
  from: z.string().min(1, { message: "Type your name please" }),
  to: z.string().min(1, { message: "Type your recipient's name please" }),
  address: z.custom<string>((address) => ethers.utils.isAddress(address as string), {
    message: "Type your recipient's Polygon address please",
  }),
});

export default function Card() {
  const [loading, setLoading] = useState(false);
  const addRecentTransaction = useAddRecentTransaction();
  const { isLoading, sendTransactionAsync } = useSendTransaction();
  const { data: account } = useAccount();
  const { data: activeChain } = useNetwork();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = useCallback(async (data) => {
    setLoading(true);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({
        recipient: data.address,
        signer: account?.address,
        message: "Test message",
        imageId: "mothers-day",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .catch((e) => console.log(e));

    if (!response.success || !response.serializedTransaction) {
      console.log(response);
    }

    const result = await sendTransactionAsync({
      // @ts-ignore
      request: {
        ...parseTransaction(response.serializedTransaction),
        chainId: activeChain?.id ?? 0,
        gasLimit: 2100000,
      },
    });

    /* Add transaction to Rainbow transaction list */
    addRecentTransaction({
      hash: result.hash,
      description: "Mint message NFT",
    });

    /* Wait until transaction is confirmed to stop loading */
    await result.wait();
    setLoading(false);
  }, [account, activeChain]);

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
            content: "\"\"",
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
        <Stack
          pt={10}
          align={"flex-start"}
          onSubmit={handleSubmit(onSubmit)}
          spacing={3}
          as={"form"}
        >
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            from
          </Text>
          <Input
            {...register("from")}
            size={"lg"}
            variant={"unstyled"}
            autoFocus={true}
            placeholder={"your loving son"}
          />

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            to
          </Text>
          <Input
            {...register("to")}
            size={"lg"}
            variant={"unstyled"}
            autoFocus={true}
            placeholder={"the best mother"}
          />

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            send to
          </Text>
          <Input
            isTruncated={true}
            {...register("address")}
            size={"lg"}
            variant={"unstyled"}
            placeholder={"0xa9fac1ba6c7fb0ffb44ecec01cf23d47bba924d25336defdbf782e7181fc00bd"}
          />
        </Stack>
      </Box>
      {<ConnectButton chainStatus={"none"} />}
      {account && (
        <Button
          type={"submit"}
          isLoading={isLoading || loading}
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
