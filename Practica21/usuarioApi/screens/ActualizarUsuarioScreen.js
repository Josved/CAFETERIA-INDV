import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  actualizarUsuario,
  obtenerUsuario,
} from '../services/usuariosApi';

function notificarExito(alFinalizar) {
  if (Platform.OS === 'web') {
    window.alert('Usuario actualizado\n\nLos cambios se guardaron correctamente.');
    alFinalizar();
    return;
  }

  Alert.alert(
    'Usuario actualizado',
    'Los cambios se guardaron correctamente.',
    [{ text: 'Aceptar', onPress: alFinalizar }]
  );
}

export default function ActualizarUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const usuarioId = Array.isArray(id) ? id[0] : id;
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let activo = true;

    const precargarUsuario = async () => {
      if (!usuarioId) {
        setError('No se recibió el identificador del usuario.');
        setCargando(false);
        return;
      }

      try {
        const usuario = await obtenerUsuario(usuarioId);
        if (activo) {
          setNombre(usuario.nombre);
          setEdad(String(usuario.edad));
        }
      } catch (err) {
        if (activo) {
          setError(err.message);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    precargarUsuario();
    return () => {
      activo = false;
    };
  }, [usuarioId]);

  const guardarCambios = async () => {
    const nombreLimpio = nombre.trim();
    const edadNumero = Number(edad);

    if (nombreLimpio.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (edad.trim() === '' || !Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      setError('La edad debe ser un número entero entre 0 y 120.');
      return;
    }

    setGuardando(true);
    setError('');

    try {
      await actualizarUsuario(usuarioId, {
        nombre: nombreLimpio,
        edad: edadNumero,
      });
      notificarExito(() => router.back());
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator color="#2457D6" size="large" />
        <Text style={styles.mensaje}>Preparando formulario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.contenido}
      >
        <Text style={styles.etiqueta}>EDICIÓN</Text>
        <Text style={styles.titulo}>Actualizar usuario</Text>
        <Text style={styles.subtitulo}>
          Los datos actuales están precargados. Modifica lo necesario y guarda.
        </Text>

        <View style={styles.tarjeta}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            autoCapitalize="words"
            editable={!guardando}
            maxLength={50}
            onChangeText={setNombre}
            placeholder="Nombre del usuario"
            style={styles.input}
            value={nombre}
          />

          <Text style={styles.label}>Edad</Text>
          <TextInput
            editable={!guardando}
            keyboardType="number-pad"
            maxLength={3}
            onChangeText={(valor) => setEdad(valor.replace(/[^0-9]/g, ''))}
            placeholder="Edad del usuario"
            style={styles.input}
            value={edad}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={guardando}
            onPress={guardarCambios}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
              guardando && styles.botonDeshabilitado,
            ]}
          >
            <Text style={styles.textoBoton}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
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
    alignSelf: 'center',
    maxWidth: 620,
    padding: 20,
    width: '100%',
  },
  etiqueta: {
    color: '#A16C00',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 6,
    textAlign: 'center',
  },
  titulo: {
    color: '#172033',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 5,
    textAlign: 'center',
  },
  subtitulo: {
    color: '#657086',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E9F2',
    borderRadius: 18,
    borderWidth: 1,
    padding: 22,
    shadowColor: '#15203A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 4,
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
  error: {
    backgroundColor: '#FFF0F1',
    borderRadius: 8,
    color: '#C91E28',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
    padding: 11,
  },
  boton: {
    alignItems: 'center',
    backgroundColor: '#FFCA28',
    borderRadius: 10,
    marginTop: 4,
    paddingVertical: 15,
  },
  botonPresionado: {
    opacity: 0.78,
  },
  botonDeshabilitado: {
    opacity: 0.55,
  },
  textoBoton: {
    color: '#2C270F',
    fontSize: 16,
    fontWeight: '800',
  },
  centro: {
    alignItems: 'center',
    backgroundColor: '#F3F6FB',
    flex: 1,
    justifyContent: 'center',
  },
  mensaje: {
    color: '#657086',
    marginTop: 10,
  },
});
