import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import FlatListScreen from './FlatlistScreen';
import SectionListScreen from './SectionListScreen';

export default function MenuScreen() {
  const [screen, setScreen] = useState(() => {
    const hash = globalThis.location?.hash?.replace('#', '');
    return hash === 'flatlist' || hash === 'sectionlist' ? hash : 'menu';
  });

  switch (screen) {
    case 'flatlist':
      return <FlatListScreen onBack={() => setScreen('menu')} />;

    case 'sectionlist':
      return <SectionListScreen onBack={() => setScreen('menu')} />;

    case 'menu':
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.titulo}>Practica No. 14</Text>
          <Text style={styles.subtitulo}>FlatList & SectionList</Text>

          <View style={styles.boton}>
            <Button
              title="Ver FlatList"
              onPress={() => setScreen('flatlist')}
            />
          </View>

          <View style={styles.boton}>
            <Button
              title="Ver SectionList"
              onPress={() => setScreen('sectionlist')}
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
    textAlign: 'center',
  },
  subtitulo: {
    color: '#555555',
    fontSize: 18,
    marginBottom: 30,
    marginTop: 6,
    textAlign: 'center',
  },
  boton: {
    marginBottom: 15,
    maxWidth: 340,
    width: '100%',
  },
});
