import { createContext, useEffect, useState } from "react";
import { getAsyncStorage, setAsyncStorage } from "../utils/AsyncStorage";
import { Alert } from "react-native";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const storedUser = await getAsyncStorage("user");
      if (storedUser && storedUser.name) {
        setUser(storedUser);
      }
      setIsHydrated(true);
    })();
  }, []);

  const login = async (name, password) => {
    // Validação simples - pode ser expandida com autenticação backend
    if (!name || !password) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    if (password.length < 3) {
      Alert.alert("Senha deve ter pelo menos 3 caracteres");
      return;
    }

    const userData = { name, password };
    await setAsyncStorage("user", userData);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await setAsyncStorage("user", null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
}
