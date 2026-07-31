import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import {
  eliminarUsuario,
  obtenerUsuario,
} from '../services/usuariosApi';

export default function DetalleUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const usuarioId = Array.isArray(id) ? id[0] : id;
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [eliminando, setEliminando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const cargarDetalle = useCallback(async () => {
    if (!usuarioId) {
      setError('No se recibió el identificador del usuario.');
      setCargando(false);
      return;
    }

    setCargando(true);
    setError('');

    try {
      setUsuario(await obtenerUsuario(usuarioId));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, [usuarioId]);

  useFocusEffect(
    useCallback(() => {
      cargarDetalle();
    }, [cargarDetalle])
  );

  const abrirEdicion = () => {
    router.push({
      pathname: '/actualizar-usuario',
      params: { id: String(usuario.id) },
    });
  };

  const confirmarEliminacion = async () => {
    try {
      setEliminando(true);
      await eliminarUsuario(usuario.id);
      setModalVisible(false);
      router.replace('/consulta');
    } catch (err) {
      setError(err.message);
      setModalVisible(false);
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator color="#2457D6" size="large" />
        <Text style={styles.mensaje}>Cargando detalle...</Text>
      </View>
    );
  }

  if (error || !usuario) {
    return (
      <View style={styles.centro}>
        <Text style={styles.errorTitulo}>No se pudo mostrar el usuario</Text>
        <Text style={styles.mensaje}>{error}</Text>
        <Pressable onPress={cargarDetalle} style={styles.botonPrimario}>
          <Text style={styles.textoBoton}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={['left', 'right', 'bottom']}>
      <View style={styles.contenido}>
        <Text style={styles.etiqueta}>INFORMACIÓN</Text>
        <Text style={styles.titulo}>Detalles del usuario</Text>

        <View style={styles.tarjeta}>
          <View style={styles.filaDato}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.valor}>{usuario.nombre}</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.filaDato}>
            <Text style={styles.label}>Edad</Text>
            <Text style={styles.valor}>{usuario.edad} años</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={abrirEdicion}
            style={({ pressed }) => [
              styles.botonActualizar,
              pressed && styles.botonPresionado,
            ]}
          >
            <Text style={styles.textoBotonOscuro}>Actualizar</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [
              styles.botonEliminar,
              pressed && styles.botonPresionado,
            ]}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => !eliminando && setModalVisible(false)}
        transparent
        visible={modalVisible}
      >
        <View style={styles.fondoModal}>
          <View style={styles.modal}>
            <View style={styles.iconoAlerta}>
              <Text style={styles.iconoAlertaTexto}>!</Text>
            </View>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario {usuario.nombre}?
              Esta acción no se puede deshacer.
            </Text>
            <View style={styles.accionesModal}>
              <Pressable
                accessibilityRole="button"
                disabled={eliminando}
                onPress={() => setModalVisible(false)}
                style={styles.cancelar}
              >
                <Text style={styles.cancelarTexto}>Cancelar</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={eliminando}
                onPress={confirmarEliminacion}
                style={[
                  styles.confirmar,
                  eliminando && styles.botonDeshabilitado,
                ]}
              >
                <Text style={styles.textoBoton}>
                  {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    color: '#2457D6',
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
    marginBottom: 22,
    marginTop: 5,
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
  filaDato: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    color: '#7A8498',
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'center',
  },
  valor: {
    color: '#172033',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  divisor: {
    backgroundColor: '#E7EBF2',
    height: 1,
    marginVertical: 8,
  },
  botonActualizar: {
    alignItems: 'center',
    backgroundColor: '#FFCA28',
    borderRadius: 10,
    marginTop: 28,
    paddingVertical: 14,
  },
  botonEliminar: {
    alignItems: 'center',
    backgroundColor: '#E92D36',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 14,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  textoBotonOscuro: {
    color: '#2C270F',
    fontSize: 15,
    fontWeight: '800',
  },
  botonPresionado: {
    opacity: 0.78,
  },
  centro: {
    alignItems: 'center',
    backgroundColor: '#F3F6FB',
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  mensaje: {
    color: '#657086',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 440,
    textAlign: 'center',
  },
  errorTitulo: {
    color: '#172033',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  botonPrimario: {
    backgroundColor: '#2457D6',
    borderRadius: 9,
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  fondoModal: {
    alignItems: 'center',
    backgroundColor: 'rgba(14, 20, 33, 0.62)',
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    maxWidth: 420,
    padding: 24,
    width: '100%',
  },
  iconoAlerta: {
    alignItems: 'center',
    backgroundColor: '#FDE8E9',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 14,
    width: 48,
  },
  iconoAlertaTexto: {
    color: '#D91F2A',
    fontSize: 26,
    fontWeight: '900',
  },
  modalTitulo: {
    color: '#D91F2A',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalTexto: {
    color: '#657086',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    textAlign: 'center',
  },
  accionesModal: {
    flexDirection: 'row',
    marginTop: 22,
    width: '100%',
  },
  cancelar: {
    alignItems: 'center',
    backgroundColor: '#EEF1F5',
    borderRadius: 9,
    flex: 1,
    marginRight: 6,
    paddingVertical: 12,
  },
  cancelarTexto: {
    color: '#3A4354',
    fontWeight: '800',
  },
  confirmar: {
    alignItems: 'center',
    backgroundColor: '#E92D36',
    borderRadius: 9,
    flex: 1,
    marginLeft: 6,
    paddingVertical: 12,
  },
  botonDeshabilitado: {
    opacity: 0.55,
  },
});
