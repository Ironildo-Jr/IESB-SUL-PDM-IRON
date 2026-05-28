import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { MoneyContext } from "../contexts/GlobalState";
import { colors } from "../constants/colors";

/**
 * Exibe o ícone da categoria em um círculo com a cor de fundo correspondente.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.category - Chave da categoria em `categories` (ex.: "food", "income").
 *   Se o valor não existir em `categories` (dados legados ou inválidos), usa "food" como padrão
 *   para evitar crash ao acessar propriedades de `undefined`.
 * @returns {JSX.Element} View com ícone Material centrado.
 */
export default function CategoryItem({ category }) {
  const [, , categories] = useContext(MoneyContext);

  // category can be: name (string), id (number or numeric string), or object { id, name }
  let keyName = null;
  if (category && typeof category === "object") {
    keyName = category.name;
  } else if (category !== undefined && category !== null && !Number.isNaN(Number(category))) {
    const asId = Number(category);
    const foundById = categories.find((cat) => cat.id === asId);
    keyName = foundById ? foundById.name : String(category);
  } else {
    keyName = String(category);
  }

  const categoryConfig = categories.find((cat) => cat.name === keyName) ?? {
    icon: "category",
    background: colors.primary,
  };

  return (
    <View
      style={[styles.background, { backgroundColor: categoryConfig.background }]}
    >
      <MaterialIcons
        name={categoryConfig.icon}
        size={24}
        color={colors.primaryContrast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});