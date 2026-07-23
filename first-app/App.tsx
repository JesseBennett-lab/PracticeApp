import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Image } from 'react-native';

export default function App() {
  return (
    <View>

      


     <Text style={styles.welcomeText}>Welcome to my app</Text>
     <Image  style={styles.logo} source={require('./images/dogimage.jpg')}/>

     
      <Text style={styles.headingText}>Enter your name</Text>
      <TextInput placeholder="Sam"/>
      <Text style={styles.headingText}>Enter your surname</Text>
      <TextInput placeholder="Richards"/>

      <Button title= "Add user"/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    paddingTop:60,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor:'white', 
  },
  headingText: {
    paddingTop:50,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'auto',
    backgroundColor:'white', 
  },
logo:{
  width:150,
  height:250,
  alignSelf: 'center',
  
},

});

