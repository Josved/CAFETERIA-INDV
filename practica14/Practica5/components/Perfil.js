import {View, Text} from 'react-native'
import React,{useState} from 'react';
import { Button, StyleSheet } from 'react-native-web';

export const Perfil = ({nombre,carrera,materia,cuatri, style}) => {
    const [mostrar,setMostrar]= useState(false);
    return(
        <View style={[estilos.tarjeta, style]}>
            <Text style={estilos.nombre}>{nombre}</Text>

            {mostrar &&
            <> 
            <Text style={estilos.carrera}>{carrera}</Text>
            <Text style={estilos.otroTexto}>{materia}</Text>
            <Text style={estilos.otroTexto}>{cuatri}</Text>
            </>
            }

            <Button title="Ver Perfil" onPress={ () =>setMostrar(!mostrar)} />
        </View>
    )
}


const estilos = StyleSheet.create({
    nombre: {
        ///Tamaño de letra
        fontSize: 30
        ,
        fontWeight: 600
        ,
        TextTransform: 'uppercase'
    },
    carrera:{
        fontSize:18,
        color:'blue',
        fontFamily:'Roboto'
    },
    otroTexto:{
        fontSize:12,
        fontFamily:'Courier',
        fontStyle:'italic'
    },
    tarjeta:{
        borderWidth: 2,
        padding: 25,
        margin: 20,
    }
});
