import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";

export default function CategoryPicker({ form, setForm }) {
  const [, , categories] = useContext(MoneyContext);

  return (
    <Picker
      selectedValue={form.category}
      onValueChange={(value) => setForm({ ...form, category: value })}
      itemStyle={{ color: colors.primaryText }}
    >
      <Picker.Item
        label="Selecione uma Categoria"
        value=""
        enabled={false}
      />
      {categories.map((item, index) => (
        <Picker.Item key={index} label={item.displayName} value={item.name} />
      ))}
    </Picker>
  );
}
