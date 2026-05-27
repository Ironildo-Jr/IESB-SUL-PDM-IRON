import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, TextInput, View } from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

export default function DatePicker({ form, setForm }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_, selectDate) => {
    setShowDatePicker(false);

    if (selectDate) {
      setForm({ ...form, date: selectDate });
    }
  };

  return (
    <View>
      <TextInput
        style={globalStyles.input}
        placeholder="Data da Transação"
        value={form.date ? new Date(form.date).toLocaleDateString("pt-BR") : ""}
        placeholderTextColor={colors.secondaryText}
        editable={false}
        onPressIn={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={form.date ? new Date(form.date) : new Date()}
          onChange={handleDateChange}
          accentColor={colors.primary}
          display={Platform.OS === "ios" ? "inline" : "default"}
          textColor={colors.primaryText}
          style={{
            backgroundColor: colors.secondaryText,
            borderRadius: 25,
            marginTop: 8,
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
}
