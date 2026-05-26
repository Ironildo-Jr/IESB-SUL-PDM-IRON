import { Picker } from "@react-native-picker/picker";
import { categories } from "../constants/categories";
import { colors } from "../constants/colors";

export default function CategoryPicker({ form, setForm }) {
  return (
    <Picker
      selectedValue={form.category}
      onValueChange={(value) => setForm({ ...form, category: value })}
      itemStyle={{ color: colors.primaryText }}
    >
      <Picker.Item
        label="Selecione uma Categoria"
        value={null}
        enabled={false}
      />
      {categories.map((item, index) => (
        <Picker.Item key={index} label={item.displayName} value={item.name} />
      ))}
    </Picker>
  );
}
