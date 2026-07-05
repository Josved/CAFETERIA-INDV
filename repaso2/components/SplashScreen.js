import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.splash}>
      <StatusBar barStyle="light-content" />
      <View style={styles.circulo}>
        <Text style={styles.circuloTexto}>17</Text>
      </View>
      <Text style={styles.splashTitulo}>Practica No.17</Text>
      <Text style={styles.splashSubtitulo}>Registro de Libros Leidos</Text>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splash: {
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  circulo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginBottom: 20,
    width: 80,
  },
  circuloTexto: {
    color: '#1D4ED8',
    fontSize: 34,
    fontWeight: 'bold',
  },
  splashTitulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  splashSubtitulo: {
    color: '#DBEAFE',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});
