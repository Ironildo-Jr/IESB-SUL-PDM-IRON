import { TextInput } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

export default function DescriptionInput({ form, setForm, valueInputRef }) {
  return (
    <TextInput
      value={form.description}
      onChangeText={(text) => setForm({ ...form, description: text })}
      style={globalStyles.input}
      placeholder="Descrição da transação"
      placeholderTextColor={colors.secondaryText}
    />
  );
}
