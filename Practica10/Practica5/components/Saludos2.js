import { Button, Image, Text, View } from 'react-native';

export const Saludos2 = () => {
  return (
    <View>
      <Text>Hola RN: Componente Propio</Text>
      <Image source={require('../assets/wave.png')} />
      <Button
        title="HOLA S201"/>
    </View>
  );
};
