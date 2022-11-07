import { useState, useContext, useReducer, useEffect } from "react";
import {
  ERC20GetterReducer,
  tokenGetterState,
} from "../reducer/ERC20GetterReducer";
import { Web3Context } from "web3-hooks";
import { KhristalContext } from "../contexts/KhristalContext";
import ERC20Form from "./subcomponents/ERC20Form";
import {
  HStack,
  VStack,
  StackDivider,
  Container,
  Button,
  useToast,
} from "@chakra-ui/react";

const ERC20Token = () => {
  const [web3State] = useContext(Web3Context);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const khristal = useContext(KhristalContext);

  const [state, dispatch] = useReducer(ERC20GetterReducer, tokenGetterState);
  let {name, symbol, totalSupply, decimals} = state
  // Utiliser un reducer pour ce token
  // parce-que ça fait masse, de masse de fonctions quand meme

  useEffect(() => {
    // si khristal est pas null alors
    if (khristal) {
      const callBack = (account, spender, str) => {
        if (account.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: "Event Approval",
            description: `You: ${account} approved ${spender} with value: ${str}`,
            status: "info",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      // ecouter sur l'event DataSet
      khristal.on("Approval", callBack);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        khristal.off("Approval", callBack);
      };
    }
  }, [khristal, web3State.account, toast]);

  useEffect(() => {
    // si khristal est pas null alors
    if (khristal) {
      const callBack = (account, recipient, amount) => {
        if (account.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: "Event Transfer",
            description: `${account} sent ${recipient} with value: ${amount}`,
            status: "info",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          });
        }
      };
      // ecouter sur l'event DataSet
      khristal.on("Transfer", callBack);
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        khristal.off("Transfer", callBack);
      };
    }
  }, [khristal, web3State.account, toast]);

  const handleGetName = async () => {
    setIsLoading(true);
    try {
      let name = await khristal.name();
      dispatch({ type: "GET_NAME", payload: name });
      toast({
        title: "Name of the Token",
        description: ` is ${name}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSymbol = async () => {
    setIsLoading(true);
    try {
      let symbol = await khristal.symbol();
      dispatch({ type: "GET_SYMBOL", payload: symbol });
      toast({
        title: "Symbol of the Token",
        description: ` is ${symbol}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetTotal = async () => {
    try {
      let totalSupply = await khristal.totalSupply();
      dispatch({ type: "GET_TOTAL", payload: totalSupply });
      toast({
        title: "Total Supply",
        description: `is ${totalSupply}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetDecimals = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      let decimals = await khristal.decimals();
      dispatch({ type: "GET_DECIMALS", payload: decimals });
      toast({
        title: "Number Of Decimals",
        description: `are ${decimals}`,
        status: "success",
        duration: 100000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container maxW="100vh">
        <HStack display="flex" justifyContent="space-around" mb={3}>
          <StackDivider />
          <Button colorScheme="pink" onClick={handleGetDecimals}>
            decimals
          </Button>
          <Button colorScheme="pink" onClick={handleGetName}>
            name
          </Button>
          <Button colorScheme="pink" onClick={handleGetSymbol}>
            symbol
          </Button>
          <Button colorScheme="pink" onClick={handleGetTotal}>
            totalSupply
          </Button>
        </HStack>

        <VStack spacing={4} align="stretch">
          <ERC20Form />
        </VStack>
      </Container>
    </>
  );
};

export default ERC20Token;
