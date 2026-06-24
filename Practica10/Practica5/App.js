import { StatusBar } from 'expo-status-bar';
import SafeAreaScrollScreen from './Screens/SafeAreaScrollScreen';

export default function App() {
  return (
    <>
      <SafeAreaScrollScreen />
      <StatusBar style="light" />
    </>
  );
}
