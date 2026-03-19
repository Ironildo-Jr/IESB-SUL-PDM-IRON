import { ScrollView, StyleSheet, Text, View } from "react-native";

function MetasList({ metas }) {
  return (
    <View style={styles.metaContainer}>
      <ScrollView>
        {metas.length === 0 && <Text>Nenhuma meta cadastrada.</Text>}
        {metas.map((meta, index) => <Text key={index} style={styles.item}>{meta}</Text>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  metaContainer: {
    flex: 15,
  },
  item: {
    margin: 8,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  }
});

export default MetasList;