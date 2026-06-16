/*Zona 1: Importancia de archivos y Componentes */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import { Saludos2 } from './components/Saludos2';
import {Perfil} from './components/Perfil';

/*Zona 2: Main -Componentes */
export default function App() {
  return (
    <View style={styles.container}>
      
      <Perfil style={styles.tarjetaVerde} nombre = "Joan" carrera = "Ing" materia = "Móvil" cuatri = "9"/>
      
      <Perfil style={styles.tarjetaRoja} nombre = "Joan" carrera = "Ingieneria en sistemas commputacionales" materia = "Desarrollo de aplicaciones moviles" cuatri = "6"/>

      <Perfil style={styles.tarjetaAzul} nombre = "Joan" carrera = "Ingieneria en sistemas commputacionales" materia = "Desarrollo de aplicaciones moviles" cuatri = "10"/>

      {/* <Text> ------------------------------------- </Text>
      <Image source={require('./assets/wave.png')}/>
      <Text>Hola Mundo React Native </Text>
      <Text> -----------------------------S-------- </Text>
      <Saludo/>

      <Text> ------------------------------------- </Text>
      <Saludos2/> */}
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
    /// arriba y abajo
    justifyContent: 'space-evenly',
    /// izquierda y derecha
    flexDirection: 'row',
  },
  tarjetaVerde:{backgroundColor: '#6BCB77'},
  tarjetaRoja:{backgroundColor: '#FF6B6B'},
  tarjetaAzul:{backgroundColor: '#4D96FF'},

});