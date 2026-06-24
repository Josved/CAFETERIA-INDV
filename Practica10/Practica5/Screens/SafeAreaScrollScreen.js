import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const temas = [
  {
    titulo: '1. SafeAreaView',
    descripcion:
      'Respeta las zonas seguras del dispositivo para que el contenido no quede debajo de la barra de estado, notch o barra de navegacion.',
  },
  {
    titulo: '2. ScrollView',
    descripcion:
      'Permite desplazar el contenido cuando la informacion es mas grande que el alto de la pantalla.',
  },
  {
    titulo: '3. Uso combinado',
    descripcion:
      'SafeAreaView protege los bordes del telefono y ScrollView permite recorrer toda la informacion verticalmente.',
  },
  {
    titulo: '4. Contenido inicial',
    descripcion:
      'El encabezado queda visible dentro del area segura y la lista inicia debajo de el.',
  },
  {
    titulo: '5. Tarjetas',
    descripcion:
      'Cada bloque de informacion se presenta como una tarjeta con titulo, descripcion y ejemplo de aplicacion.',
  },
  {
    titulo: '6. Padding',
    descripcion:
      'Se agrega padding al contenedor para separar los elementos de los bordes de la pantalla.',
  },
  {
    titulo: '7. Separacion',
    descripcion:
      'El margen inferior ayuda a que cada tarjeta se vea independiente y ordenada.',
  },
  {
    titulo: '8. Practica guiada',
    descripcion:
      'La practica se realizo siguiendo el video, creando una pantalla que demuestra ambos componentes nativos.',
  },
  {
    titulo: '9. Resultado',
    descripcion:
      'Al ejecutar la app, el usuario puede desplazarse para revisar todos los puntos de la practica.',
  },
  {
    titulo: '10. Entrega',
    descripcion:
      'El proyecto queda listo para evidenciar el uso de SafeAreaView y ScrollView en React Native.',
  },
];

export default function SafeAreaScrollScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.badge}>Practica No.10</Text>
        <Text style={styles.title}>SafeAreaView & ScrollView</Text>
        <Text style={styles.subtitle}>
          Componentes nativos para respetar el area segura y desplazar contenido.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        <Text style={styles.sectionTitle}>Ejemplo de contenido desplazable</Text>

        {temas.map((tema) => (
          <View key={tema.titulo} style={styles.card}>
            <Text style={styles.cardTitle}>{tema.titulo}</Text>
            <Text style={styles.cardText}>{tema.descripcion}</Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Fin del contenido. El ScrollView permitio llegar hasta esta parte.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#071E3D',
  },
  header: {
    backgroundColor: '#071E3D',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    color: '#071E3D',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#DDEBFF',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  scroll: {
    backgroundColor: '#F4F7FB',
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  sectionTitle: {
    color: '#0B2545',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#2B74E4',
    borderLeftWidth: 6,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 14,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#071E3D',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  cardText: {
    color: '#34495E',
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    backgroundColor: '#E8F1FF',
    borderRadius: 10,
    marginTop: 8,
    padding: 16,
  },
  footerText: {
    color: '#0B2545',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
