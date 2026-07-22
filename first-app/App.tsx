import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome back</Text>
      <Text>Enter your name:</Text>
      <TextInput placeholder="Sam"/>
      <Text>Enter your surname:</Text>
      <TextInput placeholder="Richards"/>

      <Button title= "Add user"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79bddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
