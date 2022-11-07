import { createContext } from "react";
import { useContract } from "web3-hooks";
import { tokenAddress, tokenAbi } from "../contracts/Token";
import { faucetAddress, faucetAbi } from "../contracts/Faucet";

export const ContractsContext = createContext(null);

const ContractsContextProvider = ({ children }) => {
  const token = useContract(tokenAddress, tokenAbi);
  const faucet = useContract(faucetAddress, faucetAbi);

  return (
    <ContractsContext.Provider value={[token, faucet]}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsContextProvider;
