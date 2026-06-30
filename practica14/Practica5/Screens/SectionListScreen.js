import React from 'react';
import { View, Text, SectionList, StyleSheet, Button } from 'react-native';

export default function SectionListScreen({ onBack }) {
    const datos = [
        {
            title: 'Ingenieria en Sistemas',
            data: [
                { nombre: 'Juan' },
                { nombre: 'Pedro' },
            ],
        },
        {
            title: 'Ingenieria Industrial',
            data: [
                { nombre: 'Alejandro' },
                { nombre: 'Roberto' },
            ],
        },
    ];

    return (
        <View style={styles.container}>
            <Button title="Regresar" onPress={onBack} />
            <Text style={styles.titulo}>Estudiantes de la carrera</Text>

            <SectionList
                sections={datos}
                keyExtractor={(item, index) => item.nombre + index}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.header}>{section.title}</Text>
                )}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.item}>{item.nombre}</Text>
                    </View>
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
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        paddingVertical: 8,
    },
    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10,
    },
    item: {
        fontSize: 16,
    },
});
