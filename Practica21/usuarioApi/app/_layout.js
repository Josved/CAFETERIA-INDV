import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#F3F6FB' },
        headerBackTitle: 'Atrás',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="detalle-usuario"
        options={{
          title: 'Detalle del usuario',
        }}
      />
      <Stack.Screen
        name="actualizar-usuario"
        options={{
          title: 'Actualizar usuario',
        }}
      />
    </Stack>
  );
}
