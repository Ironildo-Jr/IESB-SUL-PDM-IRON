import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { titulo } from './util';
import titulo_padrao from './util';
import { useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');

  const onPressButton = (msg) => {
    setTarefas([...tarefas, msg]);
    setTarefa('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>

        <TextInput placeholder="Digite sua tarefa" style={styles.input} value={tarefa} onChangeText={setTarefa} />

        <TouchableOpacity style={styles.button} onPress={() => onPressButton(tarefa)}>
          <Text>Clique Aqui</Text>
        </TouchableOpacity>

        <FlatList
          data={tarefas.map((item, index) => ({ id: index.toString(), title: item }))}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={item => item.id}
        />
        <StatusBar style="auto"/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    margin: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 10,
    width: '80%',
    borderRadius: 10,
  },
  input: {
    margin: 20,
    fontSize: 16,
    backgroundColor: 'lightgray',
    padding: 10,
    width: '80%',
    borderRadius: 5,
    textAlign: 'center',
    color: 'black',
  }
});
