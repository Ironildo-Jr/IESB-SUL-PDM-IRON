import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";

export default function CategoryPicker({ form, setForm }) {
  const [, , categories] = useContext(MoneyContext);

  return (
    <Picker
      selectedValue={form.category !== undefined && form.category !== null ? String(form.category) : ""}
      onValueChange={(value) => setForm({ ...form, category: String(value) })}
      itemStyle={{ color: colors.primaryText }}
    >
      <Picker.Item
        label="Selecione uma Categoria"
        value=""
        enabled={false}
      />
      {categories.map((item) => {
        const value = item.id !== undefined && item.id !== null ? String(item.id) : String(item.name);
        const key = item.id !== undefined && item.id !== null ? String(item.id) : String(item.name);
        return <Picker.Item key={key} label={item.displayName} value={value} />;
      })}
    </Picker>
  );
}
