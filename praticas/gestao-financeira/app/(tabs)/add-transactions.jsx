import { useContext, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";

import Button from "../../components/Button";
import CategoryManagerModal from "../../components/CategoryManagerModal";
import CategoryPicker from "../../components/CategoryPicker";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import DescriptionInput from "../../components/DescriptionInput";
import { setAsyncStorage } from "../../utils/AsyncStorage";
import api from "../../services/api";

import { MoneyContext } from "../../contexts/GlobalState";
import { colors } from "../../constants/colors";

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
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const addTransaction = async () => {
    if (!form.description || !form.value || !form.date || !form.category) {
      Alert.alert(
        "Ops!",
        "Preencha todos os campos para adicionar a transação.",
      );
      return;
    }

    try {
      const payload = {
        description: form.description,
        value: Number(form.value),
        date: form.date,
        categoryId: Number(form.category),
      };
      try { console.log('[AddTransactions] create payload:', payload); } catch (e) {}
      const created = await api.createTransaction(payload);
      const updatedTransactions = [...transactions, created];
      setTransactions(updatedTransactions);
      setForm(initialForm);
      await setAsyncStorage("transactions", updatedTransactions);
      Alert.alert("Sucesso!", "Transação adicionada com sucesso!");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível adicionar transação.\n" + (err.message || ""));
    }
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

            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => setShowCategoryManager(true)}
            >
              <Text style={styles.manageButtonText}>Gerenciar categorias</Text>
            </TouchableOpacity>
          </View>

          <Button onPress={addTransaction}>Adicionar</Button>
          <CategoryManagerModal
            visible={showCategoryManager}
            onClose={() => setShowCategoryManager(false)}
          />
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
  manageButton: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  manageButtonText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});
