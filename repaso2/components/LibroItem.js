import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LibroItem({ titulo, autor, genero }) {
  return (
    <View style={styles.libro}>
      <Text style={styles.libroTitulo}>{titulo}</Text>
      <Text style={styles.libroTexto}>Autor: {autor}</Text>
      <Text style={styles.libroTexto}>Genero: {genero}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  libro: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
  },
  libroTitulo: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  libroTexto: {
    color: '#1F2937',
    fontSize: 14,
    marginBottom: 2,
  },
});
