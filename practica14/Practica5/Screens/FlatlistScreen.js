import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Estudiante } from '../components/Estudiantes';

export default function FlatListScreen({ onBack }) {
    const estudiantes = [
        {
            id: '1',
            nombre: 'Erick',
            carrera: 'ISC',
        },
        {
            id: '2',
            nombre: 'Josu',
            carrera: 'ISC',
        },
        {
            id: '3',
            nombre: 'Plebe',
            carrera: 'ISC',
        },
    ];

    return (
        <View style={styles.container}>
            <Button title="Regresar" onPress={onBack} />
            <Text style={styles.titulo}>Lista de estudiantes</Text>

            <FlatList
                data={estudiantes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Estudiante
                        nombre={item.nombre}
                        carrera={item.carrera}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});
