import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { obtenerUsuarios } from '../services/usuariosApi';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [error, setError] = useState('');

  const cargarUsuarios = useCallback(async (esActualizacion = false) => {
    esActualizacion ? setActualizando(true) : setCargando(true);
    setError('');

    try {
      setUsuarios(await obtenerUsuarios());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarUsuarios();
    }, [cargarUsuarios])
  );

  const verDetalle = (id) => {
    router.push({
      pathname: '/detalle-usuario',
      params: { id: String(id) },
    });
  };

  const renderUsuario = ({ item }) => (
    <View style={styles.tarjeta}>
      <View style={styles.datos}>
        <Text numberOfLines={1} style={styles.nombre}>
          {item.nombre}
        </Text>
        <Text style={styles.edad}>Edad: {item.edad} años</Text>
      </View>

      <Pressable
        accessibilityLabel={`Ver detalle de ${item.nombre}`}
        accessibilityRole="button"
        onPress={() => verDetalle(item.id)}
        style={({ pressed }) => [
          styles.botonDetalle,
          pressed && styles.botonPresionado,
        ]}
      >
        <Text style={styles.textoDetalle}>Ver detalle</Text>
        <Text style={styles.flecha}>›</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.pantalla} edges={['top', 'left', 'right']}>
      <View style={styles.encabezado}>
        <Text style={styles.etiqueta}>CONSULTA</Text>
        <Text style={styles.titulo}>Lista de usuarios</Text>
        <Text style={styles.contador}>
          {usuarios.length} {usuarios.length === 1 ? 'registro' : 'registros'}
        </Text>
      </View>

      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator color="#2457D6" size="large" />
          <Text style={styles.mensaje}>Consultando usuarios...</Text>
        </View>
      ) : error ? (
        <View style={styles.centro}>
          <Text style={styles.errorTitulo}>No se pudo cargar la lista</Text>
          <Text style={styles.mensaje}>{error}</Text>
          <Pressable onPress={() => cargarUsuarios()} style={styles.reintentar}>
            <Text style={styles.reintentarTexto}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={[
            styles.lista,
            usuarios.length === 0 && styles.listaVacia,
          ]}
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <View style={styles.centro}>
              <Text style={styles.errorTitulo}>Aun no hay usuarios</Text>
              <Text style={styles.mensaje}>
                Registra el primero desde la pestaña Alta.
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              colors={['#2457D6']}
              onRefresh={() => cargarUsuarios(true)}
              refreshing={actualizando}
              tintColor="#2457D6"
            />
          }
          renderItem={renderUsuario}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  encabezado: {
    borderBottomColor: '#E2E7F0',
    borderBottomWidth: 1,
    paddingBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  etiqueta: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  titulo: {
    color: '#000000',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  contador: {
    color: '#657086',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  lista: {
    alignSelf: 'center',
    maxWidth: 720,
    padding: 16,
    paddingBottom: 32,
    width: '100%',
  },
  listaVacia: {
    flexGrow: 1,
  },
  tarjeta: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E4E9F2',
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 12,
    padding: 15,
    shadowColor: '#15203A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  datos: {
    alignItems: 'center',
    width: '100%',
  },
  nombre: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  edad: {
    color: '#657086',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  botonDetalle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  textoDetalle: {
    color: '#2457D6',
    fontSize: 13,
    fontWeight: '800',
  },
  flecha: {
    color: '#2457D6',
    fontSize: 24,
    lineHeight: 20,
    marginLeft: 4,
  },
  botonPresionado: {
    opacity: 0.55,
  },
  centro: {
    alignItems: 'center',
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
  reintentar: {
    backgroundColor: '#2457D6',
    borderRadius: 9,
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  reintentarTexto: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
