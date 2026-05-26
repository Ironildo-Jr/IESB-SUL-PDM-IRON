import { TextInput } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

export default function CurrencyInput({ form, setForm, valueInputRef }) {
  const handleCurrencyChange = (text) => {
    const formattedValue = text.replace(/\D/g, "");
    const numberValue = formattedValue ? parseFloat(formattedValue) / 100 : 0;

    setForm({ ...form, value: numberValue });
  };

  return (
    <TextInput
      value={
        form.value
          ? form.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : ""
      }
      onChangeText={handleCurrencyChange}
      keyboardType="numeric"
      style={globalStyles.input}
      placeholder="Valor da transação"
      placeholderTextColor={colors.secondaryText}
    />
  );
}
