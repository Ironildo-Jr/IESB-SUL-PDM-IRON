import { Pressable, StyleSheet, Text, View } from "react-native";

function DespesaItem({item}) {
  function formatarData(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{formatarData(item.data)}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>R$ {item.valor}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flex: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "lightgray",
    flexDirection: "row",
  },
  itemText : {
    flex: 1,
    padding: 2,
    margin: 2,
    alignContent: "left",
  }
});