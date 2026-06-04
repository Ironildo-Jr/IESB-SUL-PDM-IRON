import { useContext, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
} from "react-native";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";
import api from "../services/api";
import { globalStyles } from "../styles/globalStyles";
import Button from "./Button";
import CategoryItem from "./CategoryItem";

const normalizeCategoryName = (value) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

export default function CategoryManagerModal({ visible, onClose }) {
  const [, , categories, setCategories] = useContext(MoneyContext);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");
  const [isIncome, setIsIncome] = useState(false);

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

    const payload = {
      name: slug,
      displayName: displayName.trim(),
      icon: icon && icon.trim().length > 0 ? icon.trim() : "category",
      background: background && background.trim().length > 0 ? background.trim() : colors.primary,
      isIncome: Boolean(isIncome),
    };

    api
      .createCategory(payload)
      .then((created) => {
        const newCategories = [...categories, created];
        setCategories(newCategories);
        try { console.log('[CategoryManagerModal] created:', created, 'newCategories:', newCategories); } catch (e) {}
        setName("");
        setDisplayName("");
        setIcon("");
        setBackground("");
        setIsIncome(false);
      })
      .catch((err) => {
        try {
          console.error("createCategory error:", err);
        } catch (e) {}
        const details = err && err.details ? "\n" + JSON.stringify(err.details) : "";
        Alert.alert(
          "Erro",
          "Não foi possível criar a categoria.\n" + (err.message || "") + details,
        );
      });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={globalStyles.overlay}>
        <View style={globalStyles.modalContainer}>
          <Text style={globalStyles.modalTitle}>Gerenciar categorias</Text>
          <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
            {categories.map((category) => (
              <View key={category.id !== undefined && category.id !== null ? String(category.id) : category.name} style={styles.categoryRow}>
                <CategoryItem category={category} />
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
              placeholderTextColor={colors.secondaryText}
              autoCapitalize="none"
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Nome de exibição (ex: Pets)"
              value={displayName}
              onChangeText={setDisplayName}
              placeholderTextColor={colors.secondaryText}
            />
            <Text style={globalStyles.inputLabel}>Ícone (opcional)</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Ícone (ex: work, category)"
              value={icon}
              onChangeText={setIcon}
              placeholderTextColor={colors.secondaryText}
            />
            <Text style={globalStyles.inputLabel}>Cor de fundo (opcional)</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Cor (ex: #37BF81)"
              value={background}
              onChangeText={setBackground}
              placeholderTextColor={colors.secondaryText}
              autoCapitalize="none"
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={[globalStyles.inputLabel, { marginBottom: 0 }]}>É receita?</Text>
              <Switch value={isIncome} onValueChange={setIsIncome} />
            </View>
            <Button onPress={handleAddCategory}>Salvar categoria</Button>

            <Pressable style={[globalStyles.closeButton, { marginTop: 8 }]} onPress={onClose}>
              <Text style={globalStyles.closeButtonText}>Fechar</Text>
            </Pressable>
          </ScrollView>
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
