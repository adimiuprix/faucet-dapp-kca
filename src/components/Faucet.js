import React from "react";
import { useContext, useState, useEffect } from "react";
import { Web3Context } from "web3-hooks";

import getItemSoundFile from "../res/sounds/item_get_1.wav";
import beamSoundFile from "../res/sounds/beam.wav";

import { FaucetContext } from "../contexts/FaucetContext";

import {
  Alert,
  AlertIcon,
  Button,
  Text,
  VStack,
  useToast,
  Box,
  Image,
} from "@chakra-ui/react";

const Faucet = () => {
  const faucet = useContext(FaucetContext);
  const [web3State] = useContext(Web3Context);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // si faucet est pas null alors
    if (faucet) {
      const callBack = (account, amount) => {
        if (account.toLowerCase() == web3State.account.toLowerCase()) {
          toast({
            title: "Event TokenSent",
            description: `${account} withdrawed ${amount} ACK`,
            status: "info",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      // ecouter sur l'event TokenSent
      faucet.on("TokenSent", callBack);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        faucet.off("TokenSent", callBack);
      };
    }
  }, [faucet]);

  useEffect(() => {
    // si faucet est pas null alors
    if (faucet) {
      const callBack = (account, amount) => {
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: "Event TokenSent",
            description: `${account} withdrawed ${amount} ACK`,
            status: "info",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      // ecouter sur l'event TokenSent
      faucet.on("TokenSent", callBack);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        faucet.off("TokenSent", callBack);
      };
    }
  }, [faucet, web3State.account, toast]);

  const handleClickRequestTokens = async () => {
    try {
      setIsLoading(true);
      let tx = await faucet.requestTokens();
      await tx.wait();
      // const audio = new Audio(getItemSoundFile);
      await getItemSoundFile.play();
      toast({
        title: "You recieved 10 Khristal!",
        description: `Use it wisely! `,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e.code);
      if (e.code === "UNPREDICTABLE_GAS_LIMIT") {
        const audio = new Audio(beamSoundFile);
        await audio.play();
        toast({
          title:
            "You already claimed 10 Khristal! Wait until you can withdraw anymore!",
          description: e.message,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box m={100} alignSelf="center">
        <>
          {web3State.chainId === 4 ? (
            <>
              <VStack>
                <Text color="pink.100" as="b" fontSize="20" textAlign="center">
                  Retrieve your tokens: 
                </Text>

                <Image
                  borderRadius="full"
                  boxSize="100px"
                  src="https://i.pinimg.com/originals/63/aa/5f/63aa5ff9ac06d003d90dff41f6d798be.gif"
                  alt="Khristal Token"
                />

                <Button
                  isLoading={isLoading}
                  loadingText="Requesting Khristals..."
                  colorScheme="purple"
                  onClick={handleClickRequestTokens}
                >
                  GET 10 KHRISTAL
                </Button>
              </VStack>
            </>
          ) : (
            <Alert
              fontWeight="bold"
              fontSize="20px"
              status="error"
              backgroundColor="purple.400"
              color="pink.700"
            >
              <AlertIcon color="purple" />
              You are on the wrong network, please switch to Rinkeby
            </Alert>
          )}
        </>
      </Box>
    </>
  );
};

export default Faucet;
