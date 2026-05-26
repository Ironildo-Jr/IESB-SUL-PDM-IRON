import { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";

export default function AddTransactions() {
  const initialForm = {
    description: "",
    value: 0,
    date: new Date(),
    category: "income",
  };
  // Estado inicial como um objeto
  const [form, setForm] = useState(initialForm);
  const [showPicker, setShowPicker] = useState(false);

  const addTransaction = () => {
    Alert.alert(
      `${form.description} | ${form.value} | ${form.date} | ${form.category}`,
    );
  };

  const handleCurrencyChange = (text) => {
    const formattedValue = text.replace(/\D/g, ""); // Remove caracteres não numéricos
    const numericValue = parseFloat(formattedValue) / 100; // Converte para número decimal com centavos
    setForm({ ...form, value: numericValue }); // Atualiza o estado com o valor numérico
  };

  const handleDateChange = (_, selectedDate) => {
    setShowPicker(false); // Esconde o DatePicker após a seleção
    if (selectedDate) {
      setForm({ ...form, date: selectedDate }); // Atualiza o estado com a data formatada
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <ScrollView style={globalStyles.content}>
        <View style={styles.form}>
          <View>
            <Text style={globalStyles.inputLabel}>Descrição</Text>
            <TextInput
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              style={globalStyles.input}
            />
          </View>

          <View>
            <Text style={globalStyles.inputLabel}>Valor</Text>
            <TextInput
              value={form.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              onChangeText={(text) => handleCurrencyChange(text)}
              keyboardType="numeric"
              style={globalStyles.input}
            />
          </View>
          <View>
            <Text style={globalStyles.inputLabel}>Data</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <TextInput
                value={form.date.toLocaleDateString("pt-BR")}
                onChangeText={(text) => setForm({ ...form, date: text })} // Permite digitar a data manualmente
                style={globalStyles.input}
                editable={showPicker} // Permite edição apenas quando o DatePicker estiver visível
              />
            </TouchableOpacity>
            {showPicker && (
              <RNDateTimePicker
                value={form.date}
                display={Platform.OS === "ios" ? "inline" : "default"}
                mode="date"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View>
            <Text style={globalStyles.inputLabel}>Categoria</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={form.category}
                onValueChange={(text) => setForm({ ...form, category: text })}
              >
                {categories.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.displayName}
                    value={item.name}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <Button title="Adicionar" onPress={addTransaction} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 40,
    marginTop: 10,
  },
  picker: {
    display: "flex",
    justifyContent: "center",
    height: 44,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 8,
    flexGrow: 1,
  },
});
