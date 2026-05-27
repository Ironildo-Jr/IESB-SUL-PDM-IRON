import { getAsyncStorage } from "@/utils/AsyncStorage";
import { createContext, useEffect, useState } from "react";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactionsFromStorage = async () => {
      const storedTransactions = await getAsyncStorage("transactions");
      setTransactions(storedTransactions); // Carrega as transações do AsyncStorage para o estado
    };
    transactionsFromStorage();
  }, []);

  return (
    <MoneyContext.Provider value={[transactions, setTransactions]}>
      {children}
    </MoneyContext.Provider>
  );
}
