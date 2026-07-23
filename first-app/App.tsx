import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View>
     <Text style={styles.welcomeText}>Welcome to my app</Text>
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
  welcomeText: {
    paddingTop:50,
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});
