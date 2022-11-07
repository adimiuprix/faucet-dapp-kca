import { useContext } from "react";
import { Web3Context } from "web3-hooks";

import {
  Button,
  Link,
  Flex,
  Spacer,
  Heading,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Header = () => {
  const [web3State, login] = useContext(Web3Context);
  const {
    isOpen: isOpenLogoutModal,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure();

  const handleOnClickLogin = () => {
    if (!web3State.isLogged) {
      login();
    } else {
    }
  };

  return (
    <>
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent backgroundColor="purple.900">
          <ModalHeader>Logout from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="20px">
            <Text>You can not logout from a Dapp.</Text>
            <Text>
              Disconnect your MetaMask from this website if you want to logout.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        mt={0}
        backgroundImage="url('https://cdn.dribbble.com/users/454765/screenshots/6070873/tumblr_pmvl2uwmln1qjlqyvo1_1280.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          mt={0}
          ml={5}
          mr={5}
          h="300px"
        >
          <Flex
            justifyContent="space-between"
            width="100%"
            m={6}
            alignItems="center"
          >
            <Heading
              fontSize="50px"
              color="purple.200"
              alignSelf="flex-start"
              size="xl"
            >
              KHRISTAL Faucet
            </Heading>

            <Button
              ml={3}
              alignSelf="flex-end"
              colorScheme="purple"
              onClick={() =>
                !web3State.isLogged ? handleOnClickLogin() : onOpenLogoutModal()
              }
            >
              {!web3State.isLogged ? "Log in" : "Log out"}
            </Button>
          </Flex>

          <Heading
            color="pink.300"
            m={5}
            size="m"
            as="i"
            alignSelf="flex-start"
          >
            Deployed on Rinkeby at{" "}
            <Link
              color="blue.400"
              href="https://rinkeby.etherscan.io/address/0x1E965e5a464a0C13FeEA027b05F72068580B01be"
              isExternal
            >
              Etherscan-Link
            </Link>
          </Heading>

          <Spacer />
        </Flex>
      </Box>
    </>
  );
};

export default Header;
