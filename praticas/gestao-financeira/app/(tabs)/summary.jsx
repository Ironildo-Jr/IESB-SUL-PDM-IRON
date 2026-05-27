import { useContext, useMemo } from "react";
import { MoneyContext } from "../../contexts/GlobalState";
import { categories } from "../../constants/categories";
import { globalStyles } from "../../styles/globalStyles";
import SummaryItem from "../../components/SummaryItem";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export default function Summary() {
  const [transactions] = useContext(MoneyContext);

  /**
   * Calcula totais por categoria e saldo geral em uma única passada O(n) sobre `transactions`.
   * Ignora itens cuja `category` não está em `SUMMARY_CATEGORY_KEYS` (dados legados/inválidos).
   *
   * @returns {{ sum: number, income: number, food: number, house: number, education: number, travel: number }}
   */
  const getTotals = () => {
    const totals = categories.reduce(
      (acc, c) => {
        acc[c.name] = 0;
        return acc;
      },
      { sum: 0 },
    );

    for (const item of transactions) {
      totals[item.category] += item.value;

      if (item.category === "income") {
        totals.sum += item.value;
      } else {
        totals.sum -= item.value;
      }
    }
    return totals;
  };

  /* useMemo: recalcula só quando [transactions] mudar. */
  const totals = useMemo(getTotals, [transactions]);

  const valueStyle =
    totals.sum > 0 ? globalStyles.positiveText : globalStyles.negativeText;

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        {categories.map((category) => (
          <SummaryItem
            key={category.name}
            category={category.name}
            value={totals[category.name]}
          />
        ))}

        <View style={globalStyles.line} />

        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>
          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: 800,
  },
});
