import {Box, Button, Center, FormControl, FormErrorMessage, Image, Input, Stack, Text, useColorModeValue, useToast, } from "@chakra-ui/react";
import {zodResolver} from "@hookform/resolvers/zod";
import {ConnectButton, useAddRecentTransaction} from "@rainbow-me/rainbowkit";
import {ethers} from "ethers";
import {parseTransaction} from "ethers/lib/utils";
import {useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAccount, useNetwork, useSendTransaction} from "wagmi";
import z from "zod";
const IMAGE = "/images/cards/mothers-day.jpeg";

const formSchema = z.object({
  from: z.string().min(1, { message: "Type your name please" }),
  to: z.string().min(1, { message: "Type your recipient's name please" }),
  address: z.custom<string>((address) => {
    return ethers.utils.isAddress(address as string);
  }, {
    message: "Type your recipient's Polygon address please",
  }),
});

const responseBodySchema = z.object({
  success: z.boolean(),
  serializedTransaction: z.string(),
  metadata: z.object({
    data: z.object({
      name: z.string(),
      description: z.string(),
      properties: z.object({ recipient: z.string(), message: z.string(), type: z.string() }),
    }),
    url: z.string(),
    ipnft: z.string(),
  }),
});

export default function Card() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const addRecentTransaction = useAddRecentTransaction();
  const { isLoading, sendTransactionAsync } = useSendTransaction();
  const { data: account } = useAccount();
  const { data: activeChain } = useNetwork();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      from: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(async (data) => {
    setLoading(true);
    try {
      /* Send request to backend */
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
        .then((r) => {
          console.log(r);
          if (r.ok) {
            return r.json();
          } else {
            console.log(r);
            throw r;
          }
        });

      const responseBody = responseBodySchema.parse(response);

      if (!responseBody.serializedTransaction) {
        toast({
          title: "Malformed response",
          status: "error",
          isClosable: true,
          description: "Please refresh the page and try again",
        });
        return;
      }

      /* Sign and send the transaction */
      const request = {
        request: {
          ...parseTransaction(response.serializedTransaction),
          chainId: null,
          gasLimit: 2100000,
        },
      };

      // @ts-ignore
      const result = await sendTransactionAsync(request);

      /* Add transaction to Rainbow transaction list */
      addRecentTransaction({
        hash: result.hash,
        description: "Mint card NFT",
      });

      /* Wait until transaction is confirmed to stop loading */
      await result.wait();
      setLoading(false);
      toast({
        title: "Card sent!",
        status: "success",
        isClosable: true,
        description: "Your card was successfully sent and should arrive in the recipient's wallet in a short while",
      });
    } catch (e) {
      toast({
        title: "An error occured",
        status: "error",
        isClosable: true,
        description: JSON.stringify(e),
      });
      setLoading(false);
      console.log(e);
    }
  }, [account, activeChain, account?.connector]);

  return (
    <Center py={12} flexDirection={"column"} as={"form"} onSubmit={handleSubmit(onSubmit)}>
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
          spacing={3}
        >
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            from
          </Text>
          <FormControl isInvalid={Boolean(errors.from?.message)}>
            <Input
              {...register("from")}
              size={"lg"}
              variant={"unstyled"}
              autoFocus={true}
              placeholder={"your loving son"}
            />
            <FormErrorMessage>{errors.from?.message}</FormErrorMessage>
          </FormControl>

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            to
          </Text>
          <FormControl isInvalid={Boolean(errors.to?.message)}>
            <Input
              {...register("to")}
              size={"lg"}
              variant={"unstyled"}
              autoFocus={true}
              placeholder={"your loving son"}
            />
            <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
          </FormControl>

          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            send to address
          </Text>
          <FormControl isInvalid={Boolean(errors.to?.message)}>
            <Input
              isTruncated={true}
              {...register("address")}
              size={"lg"}
              variant={"unstyled"}
              placeholder={"0xa9fac1ba6c7fb0ffb44ecec01cf23d47bba924d25336defdbf782e7181fc00bd"}
            />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </Box>
      <ConnectButton accountStatus={"full"} chainStatus={"full"} />
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
