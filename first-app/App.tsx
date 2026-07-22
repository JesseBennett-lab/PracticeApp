import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome back</Text>
      <Text>Enter your name:</Text>
      <TextInput placeholder="June"/>
      <Text>Enter your surname:</Text>
      <TextInput placeholder="Doe"/>

      <Button title= "Add user"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
