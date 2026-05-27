import { useContext, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";

import Button from "../../components/Button";
import CategoryPicker from "../../components/CategoryPicker";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import DescriptionInput from "../../components/DescriptionInput";
import { setAsyncStorage } from "../../utils/AsyncStorage";

import { MoneyContext } from "../../contexts/GlobalState";

const initialForm = {
  description: "",
  value: 0,
  date: "",
  category: "",
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const valueInputRef = useRef();
  const [transactions, setTransactions] = useContext(MoneyContext);

  const addTransaction = async () => {
    if (!form.description || !form.value || !form.date || !form.category) {
      Alert.alert(
        "Ops!",
        "Preencha todos os campos para adicionar a transação.",
      );
      return;
    }
    // Cria a transação gerando um ID baseado no tamanho da lista
    const newTransaction = { id: transactions.length + 1, ...form };
    const updatedTransactions = [...transactions, newTransaction];

    setTransactions(updatedTransactions); // Atualiza a memória RAM (Contexto)
    setForm(initialForm); // Limpa o formulário
    await setAsyncStorage("transactions", updatedTransactions); // Atualiza a memória do Celular (Storage)

    Alert.alert("Sucesso!", "Transação adicionada com sucesso!");
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.screenContainer}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={globalStyles.content}>
          <View style={styles.form}>
            <DescriptionInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />

            <CurrencyInput
              form={form}
              setForm={setForm}
              valueInputRef={valueInputRef}
            />

            <DatePicker form={form} setForm={setForm} />

            <CategoryPicker form={form} setForm={setForm} />
          </View>

          <Button onPress={addTransaction}>Adicionar</Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10,
  },
});
