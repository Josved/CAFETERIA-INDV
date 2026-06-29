import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const OPCIONES = ['Si', 'No'];

const PREGUNTAS = [
  {
    campo: 'taller',
    etiqueta: 'Asistira al taller?',
  },
  {
    campo: 'constancia',
    etiqueta: 'Requiere constancia?',
  },
  {
    campo: 'deportes',
    etiqueta: 'Participara en actividades deportivas?',
  },
];

export default function RegistroEventoScreen() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    carrera: '',
    semestre: '',
  });
  const [respuestas, setRespuestas] = useState({
    taller: 'Si',
    constancia: 'No',
    deportes: 'Si',
  });

  const actualizarCampo = (campo, valor) => {
    setFormulario((datosActuales) => ({
      ...datosActuales,
      [campo]: valor,
    }));
  };

  const actualizarRespuesta = (campo, valor) => {
    setRespuestas((datosActuales) => ({
      ...datosActuales,
      [campo]: valor,
    }));
  };

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.alert(`${titulo}\n\n${mensaje}`);
      return;
    }

    Alert.alert(titulo, mensaje);
  };

  const enviarRegistro = () => {
    const nombre = formulario.nombre.trim();
    const carrera = formulario.carrera.trim();
    const semestre = formulario.semestre.trim();

    if (!nombre || !carrera || !semestre) {
      mostrarAlerta(
        'Registro incompleto',
        'No se permiten TextInput vacios.'
      );
      return;
    }

    if (!/^\d+$/.test(semestre)) {
      mostrarAlerta(
        'Semestre incorrecto',
        'El semestre debe ser numerico.'
      );
      return;
    }

    mostrarAlerta(
      'Registro enviado',
      `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\n\nTaller: ${respuestas.taller}\nConstancia: ${respuestas.constancia}\nDeportes: ${respuestas.deportes}`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.encabezado}>
            <Text style={styles.numeroPractica}>PRACTICA 13</Text>
            <Text style={styles.titulo}>Registro de Evento Universitario</Text>
            <Text style={styles.subtitulo}>
              Repaso de componentes nativos: TextInput, botones, State y Alert.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Datos del estudiante</Text>
            <Text style={styles.descripcion}>
              Captura la informacion requerida para simular el registro al
              congreso universitario.
            </Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ivan Isay"
              placeholderTextColor="#8A8F99"
              value={formulario.nombre}
              onChangeText={(valor) => actualizarCampo('nombre', valor)}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>Carrera</Text>
            <TextInput
              style={styles.input}
              placeholder="ISC"
              placeholderTextColor="#8A8F99"
              value={formulario.carrera}
              onChangeText={(valor) => actualizarCampo('carrera', valor)}
              autoCapitalize="characters"
              returnKeyType="next"
            />

            <Text style={styles.label}>Semestre</Text>
            <TextInput
              style={styles.input}
              placeholder="9"
              placeholderTextColor="#8A8F99"
              value={formulario.semestre}
              onChangeText={(valor) => actualizarCampo('semestre', valor)}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Preguntas del evento</Text>
            <Text style={styles.descripcion}>
              Selecciona Si o No para cada actividad del registro.
            </Text>

            {PREGUNTAS.map((pregunta) => (
              <View key={pregunta.campo} style={styles.pregunta}>
                <Text style={styles.preguntaTexto}>{pregunta.etiqueta}</Text>
                <View style={styles.opciones}>
                  {OPCIONES.map((opcion) => {
                    const activa = respuestas[pregunta.campo] === opcion;

                    return (
                      <TouchableOpacity
                        key={opcion}
                        style={[
                          styles.opcionBoton,
                          activa && styles.opcionBotonActiva,
                        ]}
                        onPress={() =>
                          actualizarRespuesta(pregunta.campo, opcion)
                        }
                        activeOpacity={0.85}
                        accessibilityRole="button"
                        accessibilityState={{ selected: activa }}
                      >
                        <Text
                          style={[
                            styles.opcionTexto,
                            activa && styles.opcionTextoActiva,
                          ]}
                        >
                          {opcion}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.resumen}>
            <Text style={styles.resumenTitulo}>Vista previa</Text>
            <Text style={styles.resumenTexto}>
              {formulario.nombre.trim() || 'Nombre completo'} -{' '}
              {formulario.carrera.trim() || 'Carrera'} -{' '}
              {formulario.semestre.trim() || 'Semestre'}
            </Text>
            <Text style={styles.resumenTexto}>
              Taller: {respuestas.taller} | Constancia: {respuestas.constancia} |
              Deportes: {respuestas.deportes}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botonPrincipal}
            onPress={enviarRegistro}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel="Enviar registro del evento universitario"
          >
            <Text style={styles.botonPrincipalTexto}>Enviar Registro</Text>
          </TouchableOpacity>

          <Text style={styles.pie}>React Native - Expo - Alert</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#12372F',
    flex: 1,
  },
  container: {
    paddingBottom: 42,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 42 : 20,
  },
  encabezado: {
    marginBottom: 20,
    paddingHorizontal: 2,
  },
  numeroPractica: {
    color: '#BFE3D2',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitulo: {
    color: '#D8EEE6',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D6E9E2',
    borderRadius: 18,
    borderWidth: 1,
    elevation: 4,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#06241D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 13,
  },
  cardTitulo: {
    color: '#12372F',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  descripcion: {
    color: '#5D6772',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  label: {
    color: '#263B37',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F4F8F7',
    borderColor: '#C6D8D2',
    borderRadius: 12,
    borderWidth: 1,
    color: '#172A26',
    fontSize: 15,
    marginBottom: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  pregunta: {
    borderBottomColor: '#E4EEEA',
    borderBottomWidth: 1,
    marginBottom: 14,
    paddingBottom: 14,
  },
  preguntaTexto: {
    color: '#263B37',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 10,
  },
  opciones: {
    flexDirection: 'row',
    gap: 10,
  },
  opcionBoton: {
    alignItems: 'center',
    backgroundColor: '#F4F8F7',
    borderColor: '#BFD5CE',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 11,
  },
  opcionBotonActiva: {
    backgroundColor: '#2E7D68',
    borderColor: '#2E7D68',
  },
  opcionTexto: {
    color: '#2E7D68',
    fontSize: 14,
    fontWeight: '800',
  },
  opcionTextoActiva: {
    color: '#FFFFFF',
  },
  resumen: {
    backgroundColor: '#EAF5F2',
    borderColor: '#A8D3C5',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    padding: 15,
  },
  resumenTitulo: {
    color: '#12372F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  resumenTexto: {
    color: '#38514A',
    fontSize: 13,
    lineHeight: 19,
  },
  botonPrincipal: {
    alignItems: 'center',
    backgroundColor: '#F5B942',
    borderRadius: 14,
    elevation: 3,
    paddingVertical: 15,
    shadowColor: '#2D2108',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 9,
  },
  botonPrincipalTexto: {
    color: '#1B1B1B',
    fontSize: 16,
    fontWeight: '900',
  },
  pie: {
    color: '#D8EEE6',
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
});
