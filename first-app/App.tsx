import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button, Image } from 'react-native';
import {useState} from 'react' ;
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {

 const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
  
        <Stack.Screen name= "Home" component ={MainScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen(){

const[Name, setName] = useState('');
const[Surname, setSurname] = useState('');

console.log("App works!");


  return(
  <View>

     <Text style={styles.welcomeText}>Welcome to my app</Text>
     <Image  style={styles.logo} 
     source={require('./images/dogimage.jpg')}/>

     
      <Text style={styles.headingText}>Enter your name</Text>
      <TextInput  style={styles.inputBoxTxt} 
       placeholder="Sam"
       onChangeText={newText => setName(newText)}/>
      <Text style={styles.headingText}>Enter your surname</Text>

      <TextInput  style={styles.inputBoxTxt2}
       placeholder="Richards"
       onChangeText={newText => setSurname(newText)}/>

      <Button title= "Add user"
         onPress={() => {
         console.log("Name: " + Name +
                     "Surname: " + Surname ) 
         }}
      />

      <StatusBar style="auto" />
    
    </View>
  )
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
inputFlex:{
  flexDirection:'row',
  marginTop:20,

},
inputBoxTxt: {
  borderBottomWidth: 1,
  fontSize: 20,
},
inputBoxTxt2: {
  borderBottomWidth:1,
  fontSize:20,
}

});

