import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { crearUsuario } from '../services/usuariosApi';

function mostrarMensaje(titulo, mensaje) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensaje}`);
    return;
  }

  Alert.alert(titulo, mensaje);
}

export default function AltaUsuariosScreen() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  const guardarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadNumero = Number(edad);

    if (nombreLimpio.length < 3) {
      mostrarMensaje('Datos incompletos', 'Escribe un nombre de al menos 3 caracteres.');
      return;
    }

    if (edad.trim() === '' || !Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      mostrarMensaje('Edad no válida', 'Escribe una edad entera entre 0 y 120.');
      return;
    }

    try {
      setCargando(true);
      await crearUsuario({ nombre: nombreLimpio, edad: edadNumero });
      setNombre('');
      setEdad('');
      mostrarMensaje('Usuario registrado', 'La información se guardó correctamente.');
    } catch (error) {
      mostrarMensaje('No se pudo guardar', error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.pantalla} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.contenido}
      >
        <View style={styles.encabezado}>
          <Text style={styles.etiqueta}>PRÁCTICA 21</Text>
          <Text style={styles.titulo}>Registro de usuarios</Text>
          <Text style={styles.subtitulo}>
            Agrega un usuario para consultarlo, editarlo o eliminarlo.
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            accessibilityLabel="Nombre"
            autoCapitalize="words"
            editable={!cargando}
            maxLength={50}
            onChangeText={setNombre}
            placeholder="Nombre del usuario"
            placeholderTextColor="#8A94A6"
            style={styles.input}
            value={nombre}
          />

          <Text style={styles.label}>Edad</Text>
          <TextInput
            accessibilityLabel="Edad"
            editable={!cargando}
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={(valor) => setEdad(valor.replace(/[^0-9]/g, ''))}
            placeholder="Edad del usuario"
            placeholderTextColor="#8A94A6"
            style={styles.input}
            value={edad}
          />

          <Pressable
            accessibilityRole="button"
            disabled={cargando}
            onPress={guardarUsuario}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
              cargando && styles.botonDeshabilitado,
            ]}
          >
            <Text style={styles.textoBoton}>
              {cargando ? 'Guardando...' : 'Agregar usuario'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  encabezado: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    marginBottom: 24,
  },
  etiqueta: {
    color: '#2457D6',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
    marginBottom: 8,
  },
  titulo: {
    color: '#172033',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#657086',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  tarjeta: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E9F2',
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: 520,
    padding: 22,
    shadowColor: '#15203A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 4,
    width: '100%',
  },
  label: {
    color: '#303A4E',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFC',
    borderColor: '#D7DDE8',
    borderRadius: 10,
    borderWidth: 1,
    color: '#172033',
    fontSize: 16,
    marginBottom: 18,
    minHeight: 50,
    paddingHorizontal: 14,
  },
  boton: {
    alignItems: 'center',
    backgroundColor: '#2457D6',
    borderRadius: 10,
    marginTop: 4,
    paddingVertical: 15,
  },
  botonPresionado: {
    opacity: 0.86,
  },
  botonDeshabilitado: {
    opacity: 0.55,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
