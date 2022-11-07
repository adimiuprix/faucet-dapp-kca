import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import Header from "./components/Header";
import Dapp from "./components/Dapp";
import ERC20Token from "./components/ERC20Token";
import React from "react";
import { useContract } from "web3-hooks";
import { faucetAddress, faucetAbi } from "./contracts/Faucet";
import { tokenAddress, tokenAbi } from "./contracts/Token";
import { KhristalContext } from "./contexts/KhristalContext";
import { FaucetContext } from "./contexts/FaucetContext";
import chestAppearsOneSound from "./res/sounds/chest_appears_1.wav";
import chestAppearsTwoSound from "./res/sounds/chest_appears_2.wav";

function App() {
  const faucet = useContract(faucetAddress, faucetAbi);
  const khristal = useContract(tokenAddress, tokenAbi);

  const tabsOnChange = async (e) => {
    if (e === 1) {
      const audio = new Audio(chestAppearsOneSound);
      await audio.play();
    } else if (e === 0) {
      const audio = new Audio(chestAppearsTwoSound);
      await audio.play();
    }
  };

  return (
    <Tabs
      onChange={(e) => tabsOnChange(e)}
      align="end"
      variant="enclosed"
      m={0}
      colorScheme="purple"
    >
      <TabList backgroundColor="purple.900" color="pink">
        <Tab data-key="37" backgroundColor="white">
          Faucet
        </Tab>
        <Tab data-key="39" backgroundColor="white">
          ERC20
        </Tab>
      </TabList>
      <Header />
      <TabPanels>
        <TabPanel>
          <FaucetContext.Provider value={faucet}>
            <Dapp />
          </FaucetContext.Provider>
        </TabPanel>
        <TabPanel>
          <KhristalContext.Provider value={khristal}>
            <ERC20Token />
          </KhristalContext.Provider>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
