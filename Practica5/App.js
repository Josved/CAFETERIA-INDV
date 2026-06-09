/*Zona 1: Importancia de archivos y Componentes */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from './components/Perfil';
import { Saludo } from './components/Saludo';
import { Saludos2 } from './components/Saludos2';


export default function App() {
  return (
    <View style={styles.container}>

      <Image source={require('./assets/wave.png')} />
      <Perfil />
      <Text>----------------------------------------</Text>
      <Text>Hola Mundo React Native </Text>
      <Text>----------------------------------------</Text>
      <Saludo />

      <Text>----------------------------------------</Text>
      <Saludos2 />
      <StatusBar style="auto" />
    </View>
  );
}

/*Zona 3:Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
