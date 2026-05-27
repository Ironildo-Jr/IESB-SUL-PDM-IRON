import { useContext, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MoneyContext } from "../contexts/GlobalState";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../constants/colors";
import CategoryItem from "./CategoryItem";
import Button from "./Button";

const normalizeCategoryName = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

export default function CategoryManagerModal({ visible, onClose }) {
  const [, , categories, setCategories] = useContext(MoneyContext);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleAddCategory = () => {
    const slug = normalizeCategoryName(name);
    if (!slug || !displayName.trim()) {
      Alert.alert(
        "Atenção",
        "Informe chave e nome de exibição para a categoria.",
      );
      return;
    }

    if (categories.some((category) => category.name === slug)) {
      Alert.alert("Atenção", "Já existe uma categoria com esta chave.");
      return;
    }

    const newCategory = {
      name: slug,
      displayName: displayName.trim(),
      icon: "category",
      background: colors.primary,
    };

    setCategories([...categories, newCategory]);
    setName("");
    setDisplayName("");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={globalStyles.overlay}>
        <View style={globalStyles.modalContainer}>
          <Text style={globalStyles.modalTitle}>Gerenciar categorias</Text>
          <ScrollView contentContainerStyle={{ gap: 16 }}>
            {categories.map((category) => (
              <View key={category.name} style={styles.categoryRow}>
                <CategoryItem category={category.name} />
                <Text style={styles.categoryLabel}>{category.displayName}</Text>
              </View>
            ))}

            <View style={styles.separator} />

            <Text style={globalStyles.inputLabel}>
              Adicionar nova categoria
            </Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Chave única (ex: pets)"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Nome de exibição (ex: Pets)"
              value={displayName}
              onChangeText={setDisplayName}
            />
            <Button onPress={handleAddCategory}>Salvar categoria</Button>
          </ScrollView>

          <Pressable style={globalStyles.closeButton} onPress={onClose}>
            <Text style={globalStyles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryLabel: {
    fontSize: 18,
    color: colors.primaryText,
  },
  separator: {
    height: 1,
    backgroundColor: colors.secondaryText,
    opacity: 0.15,
    marginVertical: 16,
  },
});
