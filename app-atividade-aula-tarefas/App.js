import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import MetasList from './components/MetasList';
import { rotulo_btn_cadastro_meta, rotulo_input_meta } from './mensagens';
import MetaInput from './components/MetaInput';

export default function App() {
  const [metas, setMetas] = useState([]);

  const adicionarMetaHandler = (meta) => {
    if (meta.trim() === '') {
      return;
    }
    setMetas([...metas, meta]);
  };

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAdicionarMeta={adicionarMetaHandler} />
      <MetasList metas={metas} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    padding: 30,
    flex: 1,
    flexDirection: 'column',
  }
});
