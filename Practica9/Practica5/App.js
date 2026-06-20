/*Zona 1: Importancia de archivos y Componentes */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuScreen from './Screens/MenuScreen';


/*Zona 2: Main -Componentes */
export default function App() {
  return (
    <MenuScreen />
  );
}

/*Zona 3:Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    /// arriba y abajo
    justifyContent: 'center',
    /// izquierda y derecha
    flexDirection: 'row',
  }
});
