import { Button, StyleSheet, TextInput, View } from "react-native";
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from "../mensagens";
import { useState } from "react";

function MetaInput({ onAdicionarMeta }) {

  const [inputMetaText, setInputMetaText] = useState('');
  return (
    <View style={styles.inputContainer}>
      <View style={{ width: '65%' }}>
        <TextInput
          placeholder={rotulo_input_meta}
          value={inputMetaText}
          onChangeText={setInputMetaText}
          style={styles.input}
        />
      </View>
      <View style={{ width: '30%' }}>
        <Button title={rotulo_btn_cadastro_meta} onPress={() => { onAdicionarMeta(inputMetaText); setInputMetaText(''); }} color={'red'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
    flex: 1
  },
  input: {
    height: 30,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 10,
  },
});

export default MetaInput;