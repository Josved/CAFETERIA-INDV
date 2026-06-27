import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TextInputAlertScreen() {
  const [texto, setTexto] = useState('');

  const mostrarAlerta = () => {
    Alert.alert('Texto ingresado', texto.trim() || 'No escribiste nada');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TextInput & Alert</Text>
      <Text style={styles.subtitulo}>Escribe un texto para mostrarlo en una alerta</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe algo"
        value={texto}
        onChangeText={setTexto}
      />

      <Text style={styles.etiqueta}>Texto almacenado en State:</Text>
      <Text style={styles.resultado}>{texto || 'Sin texto capturado'}</Text>

      <Button title="Mostrar alerta" onPress={mostrarAlerta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  etiqueta: {
    fontSize: 14,
    marginBottom: 4,
  },
  resultado: {
    minHeight: 24,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
});
