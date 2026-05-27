import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import CategoryItem from "./CategoryItem";

export default function TransactionItem({
  id,
  category,
  date,
  description,
  value,
  setTransactions,
  transactions,
}) {
  const valueStyle =
    category == "income"
      ? globalStyles.positiveText
      : globalStyles.negativeText;

  const handleTransaction = (item) => {
    Alert.alert("Excluir Transação", "deseja excluir esta transação?", [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => deleteTransaction(item),
      },
    ]);
  };

  const deleteTransaction = async (item) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== item.id,
    );
    setTransactions(updatedTransactions); // Atualiza a memória RAM (Contexto)
    await setAsyncStorage("transactions", updatedTransactions); // Atualiza a memória do Celular (Storage)
  };

  return (
    <TouchableOpacity onLongPress={() => handleTransaction({ id, category, date, description, value })}>
      <View style={styles.itemContainer}>
        <CategoryItem category={category} />
        <View style={styles.textContainer}>
          <Text style={globalStyles.secondaryText}>
            {new Date(date).toLocaleDateString("pt-BR")}
          </Text>
          <View style={styles.bottomLineContainer}>
            <Text style={globalStyles.primaryText}>{description}</Text>
            <Text style={valueStyle}>
              {value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
        </View>
      </View>
      <View style={globalStyles.line} />
    </TouchableOpacity>
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
    flexDirection: "column",
    marginLeft: 12,
    paddingVertical: 8,
  },
  bottomLineContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
