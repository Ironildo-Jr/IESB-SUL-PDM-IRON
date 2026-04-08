import { StyleSheet, Text, View } from "react-native";

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((soma, despesa) => {
    return soma + despesa.valor;
  }, 0);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{periodo}</Text>
      <Text style={styles.itemText}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    marginTop: 0,
    backgroundColor: "gray",
    flexDirection: "row",
    alignContent: "space-between",
  },
  itemText: {
    flex: 1,
    padding: 2,
    margin: 2,
    color: "white",
    fontSize: 20,
  },
});
