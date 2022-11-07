import React from "react";
import { useState, useContext } from "react";
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import { KhristalContext } from "../../contexts/KhristalContext";
import {
  HStack,
  Center,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Box,
  useToast,
  StackDivider,
} from "@chakra-ui/react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const ERC20Form = () => {
  const [web3State] = useContext(Web3Context);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const khristal = useContext(KhristalContext);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("0x0");
  const [account, setAccount] = useState("0x0");
  const [spender, setSpender] = useState("0x0");

  const [balance, setBalance] = useState(0);

  const [transferFromSender, setTransferFromSender] = useState("0x0");
  const [transferFromRecipient, setTransferfromRecipient] = useState("0x0");
  const [transferFromAmount, setTransferfromAmount] = useState(0);

  const [allowance, setAllowance] = useState(0);

  const [approveSpender, setApproveSpender] = useState("0x0");
  const [approveAmount, setApproveAmount] = useState(0);

  const [decreaseAllowanceSpender, setDecreaseAllowanceSpender] =
    useState("0x0");
  const [decreaseAllowanceSubVal, setDecreaseAllowanceSubVal] = useState(0);

  const [increaseAllowanceSpender, setIncreaseAllowanceSpender] =
    useState("0x0");
  const [increaseAllowanceAddVal, setIncreaseAllowanceAddVal] = useState(0);


  const ToastHover = (title, description) => {
    return toast({
      title: title,
      description: description,
      status: "info",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleOnClickTransfer = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      let tx = await khristal.transfer(address, Number(amount));
      await tx.wait();
      toast({
        title: "Transfer effectué !",
        description: `Your transfer was successful. `,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      if (e.code === "UNPREDICTABLE_GAS_LIMIT") {
        toast({
          title: "error",
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

  const handleClickGetBalance = async () => {
    setIsLoading(true);
    try {
      const balance = await khristal.balanceOf(account);
      setTokenBalance(ethers.utils.formatEther(balance));
      console.log(balance);
      toast({
        title: `Balance of ${account}`,
        description: `${balance.toString()}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickGetAllowance = async () => {
    setIsLoading(true);
    try {
      const allowanceTx = await khristal.allowance(account, spender);
      setAllowance(allowanceTx);
      allowanceTx.wait()
      toast({
        title: `Allowance of ${account} for ${spender}`,
        description: `${allowance.toString()}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `Error`,
        description: `${e}`,
        status: "info",
        duration: 10000,
        isClosable: true,
     })} finally {
      setIsLoading(false);
    }
  };

  const handleClickApprove = async () => {
    setIsLoading(true);
    try {
      const approve = await khristal.approve(approveSpender, approveAmount);
      approve.wait()
      toast({
        title: `Allowance of ${web3State.account} approved ${approveAmount} ACK to ${approveSpender}`,
        description: `approved ${approveAmount.toString()} by ${approveSpender}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDecreaseAllowance = async () => {
    setIsLoading(true);
    try {
      const decreaseAllowance = await khristal.decreaseAllowance(
        decreaseAllowanceSpender,
        decreaseAllowanceSubVal
      );
      const allowanceTx = await khristal.allowance(account, spender);
      setAllowance(allowanceTx);
      console.log(decreaseAllowance);
      toast({
        title: `Allowance decreased`,
        description: `Allowance decreased of ${decreaseAllowanceSubVal.toString()} for ${decreaseAllowanceSpender}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickIncreaseAllowance = async () => {
    setIsLoading(true);
    try {
      const increaseAllowance = await khristal.increaseAllowance(
        increaseAllowanceSpender,
        increaseAllowanceAddVal
      );
      const allowanceTx = await khristal.allowance(account, spender);
      setAllowance(allowanceTx);
      console.log(increaseAllowance);
      toast({
        title: `Allowance increased`,
        description: `Allowance increased of ${increaseAllowanceSpender.toString()} for ${increaseAllowanceAddVal}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickTransferFrom = async () => {
    try {
      const transferFrom = await khristal.transferFrom(
        transferFromSender,
        transferFromRecipient,
        transferFromAmount
      );
      setTokenBalance(ethers.utils.formatEther(transferFrom));
      console.log(transferFrom);
      toast({
        title: `Allowance of ${account} for ${spender}`,
        description: `${transferFrom.toString()}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `Allowance of ${transferFromSender} for ${transferFromRecipient}`,
        description: `${e.message}`,
        size: "xl",
        status: "warning",
        duration: 10000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Approve
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <FormControl id="fn1" spacing={1}>
              <HStack>
                <Input
                  placeholder="spender"
                  tabindex="10"
                  onFocus={() =>
                    ToastHover("Approve", "Approve a given spender")
                  }
                  onChange={(e) => setApproveSpender(e.target.value)}
                />
                <FormLabel>
                  <Button
                    tabindex="30"
                    onClick={handleClickApprove}
                    colorScheme="purple"
                  >
                    Approve
                  </Button>
                </FormLabel>
                <Input
                  placeholder="amount"
                  tabindex="20"
                  onFocus={() =>
                    ToastHover("Approve", "Approve a given spender")
                  }
                  onChange={(e) => setApproveAmount(e.target.value)}
                />
              </HStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Decrease Allowance
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <FormControl id="fn2" spacing={3}>
              <HStack mb={2}>
                <Input
                  placeholder="spender"
                  tabindex="40"
                  onFocus={() =>
                    ToastHover(
                      "Decrease Allowance",
                      "Decrease the allowance of a given spender"
                    )
                  }
                  onChange={(event) =>
                    setDecreaseAllowanceSpender(event.target.value)
                  }
                  size="md"
                />
                <FormLabel>
                  <Button
                    onClick={handleClickDecreaseAllowance}
                    tabindex="60"
                    colorScheme="purple"
                  >
                    decreaseAllowance
                  </Button>
                </FormLabel>
                <Input
                  placeholder="substracted value"
                  tabindex="50"
                  onFocus={() =>
                    ToastHover(
                      "Decrease Allowance",
                      "Decrease the allowance of a given spender"
                    )
                  }
                  onChange={(event) =>
                    setDecreaseAllowanceSubVal(event.target.value)
                  }
                  size="md"
                />
              </HStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Increase Allowance
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <FormControl id="fn3" spacing={3}>
              <HStack mb={2}>
                <Input
                  colorScheme="purple"
                  placeholder="spender"
                  onFocus={() =>
                    ToastHover(
                      "Increase Allowance",
                      "Increase the allowance of a given spender"
                    )
                  }
                  tabindex="70"
                  onChange={(event) =>
                    setIncreaseAllowanceSpender(event.target.value)
                  }
                  size="md"
                />
                <FormLabel>
                  <Button
                    onClick={handleClickIncreaseAllowance}
                    tabindex="90"
                    colorScheme="purple"
                  >
                    increaseAllowance
                  </Button>
                </FormLabel>
                <Input
                  placeholder="added value"
                  tabindex="80"
                  onFocus={() =>
                    ToastHover(
                      "Increase Allowance",
                      "Increase the allowance of a given spender"
                    )
                  }
                  onChange={(event) =>
                    setIncreaseAllowanceAddVal(event.target.value)
                  }
                  size="md"
                />
              </HStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Transfer
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <FormControl id="fn4" spacing={3}>
              <HStack mb={2}>
                <Input
                  placeholder="recipient"
                  tabindex="100"
                  onFocus={() =>
                    ToastHover(
                      "Transfer",
                      "Transfer an amount of token to the recipient"
                    )
                  }
                  onChange={(event) => setAddress(event.target.value)}
                  size="md"
                />

                <FormLabel>
                  <Button
                    colorScheme="purple"
                    tabindex="120"
                    onClick={handleOnClickTransfer}
                  >
                    Transfer
                  </Button>
                </FormLabel>

                <Input
                  placeholder="amount"
                  tabindex="110"
                  onFocus={() =>
                    ToastHover(
                      "Transfer",
                      "Transfer an amount of token to the recipient"
                    )
                  }
                  onChange={(event) => setAmount(event.target.value)}
                  size="md"
                />
              </HStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Transfer From
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <FormControl id="fn5" spacing={3}>
              <HStack
                mb={2}
                onFocus={() =>
                  ToastHover(
                    "Transfer From",
                    "Transfer an amount of token to the recipient from the sender account"
                  )
                }
              >
                <Input
                  placeholder="sender"
                  tabindex="130"
                  type="text"
                  onChange={(event) =>
                    setTransferFromSender(event.target.value)
                  }
                  size="md"
                />
                <Input
                  placeholder="recipient"
                  tabindex="140"
                  type="text"
                  onChange={(event) =>
                    setTransferfromRecipient(event.target.value)
                  }
                  size="md"
                />
                <Input
                  placeholder="amount"
                  tabindex="150"
                  type="text"
                  onChange={(event) =>
                    setTransferfromAmount(event.target.value)
                  }
                  size="md"
                />
              </HStack>
              <Center>
                <FormLabel>
                  <Button
                    tabindex="160"
                    onClick={handleClickTransferFrom}
                    colorScheme="purple"
                  >
                    TransferFrom
                  </Button>
                </FormLabel>
              </Center>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <AccordionButton tabindex="-1" backgroundColor="purple.900">
            <Box colorScheme="purple" flex="1" textAlign="left">
              Spy on others
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <StackDivider borderColor="gray.200" />
            <HStack spacing={3}>
              <FormLabel>
                <Button
                  colorScheme="pink"
                  tabindex="190"
                  onClick={handleClickGetAllowance}
                >
                  allowance
                </Button>
              </FormLabel>

              <Input
                placeholder="owner"
                tabindex="170"
                onFocus={() =>
                  ToastHover(
                    "Allowance",
                    "Retrieve the amount owner allowed spender to spend"
                  )
                }
                size="md"
                type="text"
                placeholder={"owner"}
                onChange={(event) => setAccount(event.target.value)}
                size="md"
              />

              <Input
                placeholder="spender"
                tabindex="180"
                onFocus={() =>
                  ToastHover(
                    "Allowance",
                    "Retrieve the amount owner allowed spender to spend"
                  )
                }
                size="md"
                type="text"
                onChange={(event) => setSpender(event.target.value)}
                size="md"
              />
            </HStack>
            <HStack>
              <FormLabel>
                <Button
                  tabindex="210"
                  colorScheme="pink"
                  onFocus={handleClickGetBalance}
                >
                  balanceOf
                </Button>
              </FormLabel>
              <Input
                type="text"
                placeholder={"ethereum address"}
                tabindex="200"
                onFocus={() =>
                  ToastHover("Balance Of", "Get the balance of the address passed in")
                }
                onChange={(event) => setAccount(event.target.value)}
                size="md"
              />
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ERC20Form;
