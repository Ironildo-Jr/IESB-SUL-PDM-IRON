import { createContext, useEffect, useState } from "react";
import { getAsyncStorage, setAsyncStorage } from "../utils/AsyncStorage";
import { categories as defaultCategories } from "../constants/categories";
import api from "../services/api";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const remoteCategories = await api.getCategories();
        const remoteTransactions = await api.getTransactions();
        if (Array.isArray(remoteCategories) && remoteCategories.length > 0) {
          setCategories(remoteCategories);
          await setAsyncStorage("categories", remoteCategories);
        }
        if (Array.isArray(remoteTransactions)) {
          setTransactions(remoteTransactions);
          await setAsyncStorage("transactions", remoteTransactions);
        }
      } catch (e) {
        const storedTransactions = await getAsyncStorage("transactions");
        const storedCategories = await getAsyncStorage("categories");

        if (Array.isArray(storedTransactions)) {
          setTransactions(storedTransactions);
        }

        if (Array.isArray(storedCategories) && storedCategories.length > 0) {
          setCategories(storedCategories);
        }
      } finally {
        setIsHydrated(true);
      }
    };

    loadFromStorage();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setAsyncStorage("transactions", transactions);
  }, [transactions, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setAsyncStorage("categories", categories);
  }, [categories, isHydrated]);

  return (
    <MoneyContext.Provider
      value={[transactions, setTransactions, categories, setCategories]}
    >
      {children}
    </MoneyContext.Provider>
  );
}
