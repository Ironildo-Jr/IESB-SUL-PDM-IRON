import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";

import Button from "../../components/Button";
import CategoryPicker from "../../components/CategoryPicker";
import CurrencyInput from "../../components/CurrencyInput";
import DatePicker from "../../components/DatePicker";
import DescriptionInput from "../../components/DescriptionInput";

const initialForm = {
  description: "",
  value: 0,
  date: "",
  category: "",
};

export default function AddTransactions() {
  const [form, setForm] = useState(initialForm);
  const valueInputRef = useRef();

  const addTransaction = () => {
    if (form.description === "" || form.value <= 0 || !form.category) {
      Alert.alert("Preencha todos os campos corretamente!");
      return;
    }
    Alert.alert(
      `${form.description} | ${form.value} | ${form.date.toLocaleDateString()} | ${form.category}`,
    );
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
