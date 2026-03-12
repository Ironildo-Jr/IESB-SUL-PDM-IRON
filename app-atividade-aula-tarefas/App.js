import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro_meta, rotulo_lista_metas } from './mensagens';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection:'row'}}>
        <View>
          <TextInput placeholder={rotulo_input_meta} style={styles.inputText} />
        </View>

        <View>
          <Button title={rotulo_btn_cadastro_meta} onPress={() => { }} />
        </View>
      </View>

      <View>
        <Text>{rotulo_lista_metas}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    paddingTop: 90,
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#cccccc',
  },
});
