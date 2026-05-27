import { useContext, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TransactionItem from "../../components/TransactionItem";
import { colors } from "../../constants/colors";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function Transactions() {
  const [transactions, setTransactions] = useContext(MoneyContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const date = new Date(item.date);
      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === selectedMonth &&
        date.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.filterRow}>
        <View style={styles.filterBlock}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
            itemStyle={{ color: colors.primaryText }}
          >
            {monthNames.map((label, index) => (
              <Picker.Item key={label} label={label} value={index} />
            ))}
          </Picker>
        </View>

        <View style={styles.filterBlock}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(value) => setSelectedYear(value)}
            itemStyle={{ color: colors.primaryText }}
          >
            {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map(
              (year) => (
                <Picker.Item key={year} label={String(year)} value={year} />
              ),
            )}
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TransactionItem
            {...item}
            setTransactions={setTransactions}
            transactions={transactions}
          />
        )}
        ListEmptyComponent={
          <Text style={globalStyles.inputLabel}>
            Não há transações para o período selecionado.
          </Text>
        }
        style={globalStyles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterBlock: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive,
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.negativesText,
  },
  listContent: {
    paddingTop: 10,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
