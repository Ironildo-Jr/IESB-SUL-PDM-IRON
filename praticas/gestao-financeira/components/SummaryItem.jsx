import { StyleSheet, Text, View } from "react-native";

import CategoryItem from "./CategoryItem";
import { categories } from "../constants/categories";
import { globalStyles } from "../styles/globalStyles";

/**
 * Linha de resumo: ícone da categoria, nome para exibição e valor total formatado.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.category - Chave em `categories` (ex.: "food"). Valores desconhecidos
 *   usam o fallback de `categories.food` para o rótulo, alinhado ao `CategoryItem`.
 * @param {number} props.value - Total monetário da categoria (já agregado na tela de resumo).
 * @returns {JSX.Element} Container com ícone e textos.
 */
export default function SummaryItem({ category, value }) {
  const categoryConfig = categories.find((cat) => cat.name === category) ?? categories[0];

  const valueStyle =
    category == "income"
      ? globalStyles.positiveText
      : globalStyles.negativeText;

  return (
    <View style={styles.itemContainer}>
      <CategoryItem category={category} />
      <View style={styles.textContainer}>
        <Text style={globalStyles.primaryText}>
          {categoryConfig.displayName}
        </Text>
        <Text style={valueStyle}>
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
  },
  textContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 12,
  },
});