import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Componente1 from './Componente1';
import ComponentesNativosScreen from './ComponentesNativosScreen';
import TarjetasScreen from './TarjetasScreen';

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'tarjetas':
      return <TarjetasScreen />;

    case 'componente1':
      return <Componente1 />;

    case 'componentesNativos':
      return <ComponentesNativosScreen />;

    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.titulo}>Menú Principal de Prácticas</Text>

          <View style={styles.boton}>
            <Button
              title="Prácticas de Tarjetas"
              onPress={() => setScreen('tarjetas')}
            />
          </View>

          <View style={styles.boton}>
            <Button
              title="Práctica de Componente1"
              onPress={() => setScreen('componente1')}
            />
          </View>

          <View style={styles.boton}>
            <Button
              title="Práctica Componentes Nativos"
              onPress={() => setScreen('componentesNativos')}
              color="#6C3EC1"
            />
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  boton: {
    marginBottom: 15,
    maxWidth: 340,
    width: '100%',
  },
});
