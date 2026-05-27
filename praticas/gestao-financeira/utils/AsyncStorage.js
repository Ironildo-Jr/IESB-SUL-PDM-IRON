import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  } finally {
    console.log("AsyncStorage atualizado com sucesso!");
  }
};
export const getAsyncStorage = async (key) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    console.log("AsyncStorage lido com sucesso!");
  }
};

export const removeAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("AsyncStorage removido com sucesso!");
  }
};
