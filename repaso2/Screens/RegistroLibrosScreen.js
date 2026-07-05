import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LibroItem from '../components/LibroItem';
import SplashScreen from '../components/SplashScreen';

const fondo = require('../assets/fondo-libros.png');

export default function RegistroLibrosScreen() {
  const [mostrarSplash, setMostrarSplash] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [cargando, setCargando] = useState(false);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);

    return () => clearTimeout(temporizador);
  }, []);

  const mostrarAlerta = (encabezado, mensaje) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.alert(`${encabezado}\n\n${mensaje}`);
      return;
    }

    Alert.alert(encabezado, mensaje);
  };

  const agregarLibro = () => {
    const tituloLimpio = titulo.trim();
    const autorLimpio = autor.trim();
    const generoLimpio = genero.trim();

    if (!tituloLimpio || !autorLimpio || !generoLimpio) {
      mostrarAlerta('Campos incompletos', 'Todos los campos deben estar llenos.');
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: tituloLimpio,
        autor: autorLimpio,
        genero: generoLimpio,
      };

      setLibros((listaActual) => [nuevoLibro, ...listaActual]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);
      mostrarAlerta('Libro agregado', 'El libro se guardo correctamente.');
    }, 4000);
  };

  if (mostrarSplash) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
      <StatusBar barStyle="light-content" />
      <View style={styles.capa}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={styles.contenedor}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.encabezado}>
                <Text style={styles.numero}>PRACTICA 17</Text>
                <Text style={styles.tituloPrincipal}>
                  Registro de Libros Leidos
                </Text>
                <Text style={styles.descripcion}>
                  Captura tus libros favoritos y visualizalos en una FlatList.
                </Text>
              </View>

              <View style={styles.tarjeta}>
                <Text style={styles.tarjetaTitulo}>Formulario</Text>

                <Text style={styles.label}>Titulo del libro</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ejemplo: El principito"
                  value={titulo}
                  onChangeText={setTitulo}
                />

                <Text style={styles.label}>Autor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ejemplo: Antoine de Saint-Exupery"
                  value={autor}
                  onChangeText={setAutor}
                />

                <Text style={styles.label}>Genero</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ejemplo: Novela"
                  value={genero}
                  onChangeText={setGenero}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.boton,
                    pressed && styles.botonPresionado,
                    cargando && styles.botonDesactivado,
                  ]}
                  onPress={agregarLibro}
                  disabled={cargando}
                >
                  <Text style={styles.botonTexto}>
                    {cargando ? 'Guardando...' : 'Agregar libro'}
                  </Text>
                </Pressable>

                {cargando && (
                  <View style={styles.carga}>
                    <ActivityIndicator size="large" color="#1D4ED8" />
                    <Text style={styles.cargaTexto}>
                      Simulando espera antes de guardar...
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.tarjeta}>
                <Text style={styles.tarjetaTitulo}>Libros registrados</Text>

                <FlatList
                  data={libros}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  ListEmptyComponent={
                    <Text style={styles.listaVacia}>
                      Aun no hay libros agregados.
                    </Text>
                  }
                  renderItem={({ item }) => (
                    <LibroItem
                      titulo={item.titulo}
                      autor={item.autor}
                      genero={item.genero}
                    />
                  )}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fondo: {
    flex: 1,
  },
  capa: {
    backgroundColor: 'rgba(15, 23, 42, 0.28)',
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contenedor: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'android' ? 42 : 20,
  },
  encabezado: {
    marginBottom: 18,
  },
  numero: {
    color: '#DBEAFE',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tituloPrincipal: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  descripcion: {
    color: '#E0F2FE',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 16,
    padding: 18,
  },
  tarjetaTitulo: {
    color: '#111827',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  label: {
    color: '#111827',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderColor: '#334155',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  boton: {
    alignItems: 'center',
    backgroundColor: '#1D4ED8',
    borderRadius: 10,
    paddingVertical: 14,
  },
  botonPresionado: {
    backgroundColor: '#1E40AF',
  },
  botonDesactivado: {
    backgroundColor: '#64748B',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carga: {
    alignItems: 'center',
    marginTop: 16,
  },
  cargaTexto: {
    color: '#334155',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  listaVacia: {
    color: '#475569',
    fontSize: 15,
    textAlign: 'center',
  },
});
