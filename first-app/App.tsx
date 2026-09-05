import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, SafeAreaView, ScrollView, Animated, ViewStyle, StyleProp } from 'react-native';
import { useState, useRef, useEffect, ReactNode } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';

type RootStackParamList = {
  Home: undefined;
  View: { NameSend: string; SurnameSend: string };
  ListSkills: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ViewDetailsProps = NativeStackScreenProps<RootStackParamList, 'View'>;
type ListSkillsProps = NativeStackScreenProps<RootStackParamList, 'ListSkills'>;

// Helpers moved to top level so every screen can see them
function isEmpty(value: any) {
  return (
    value === null ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

interface FadeInViewProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const FadeInView = ({ children, style }: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...(style as object), opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="View" component={ViewDetails} />
        <Stack.Screen name="ListSkills" component={ListSkills} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }: MainScreenProps) {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error, setError] = useState(false);

  console.log("App works!");

  return (
    <View>
      <SafeAreaView />
      <ScrollView>
        <Text style={styles.welcomeText}>Welcome to my app!</Text>
        <Image style={styles.logo} source={require('./images/dogimage.jpg')} />
        <FadeInView>
          <Text style={styles.redTxt}>{Error ? "Please enter your info" : ""}</Text>
          <Text style={styles.headingText}>Enter your name</Text>
          <TextInput
            style={styles.inputBoxTxt}
            placeholder="Sam"
            onChangeText={newText => setName(newText)}
            autoCapitalize="words"
            autoComplete="name"
            keyboardType="default"
          />
          <Text style={styles.headingText}>Enter your surname</Text>
          <TextInput
            style={styles.inputBoxTxt2}
            placeholder="Richards"
            onChangeText={newText => setSurname(newText)}
            autoCapitalize="words"
            autoComplete="name-family"
            keyboardType="default"
          />
        </FadeInView>

        <Button
          title="Add user"
          onPress={() => {
            if (isEmpty(Name) === false && isEmpty(Surname) === false) {
              navigation.navigate('View', {
                NameSend: Name,
                SurnameSend: Surname,
              });
              setError(false);
            } else {
              setError(true);
            }
          }}
        />
        <StatusBar style="auto" />
      </ScrollView>
      <SafeAreaView />
    </View>
  );
}

function ViewDetails({ navigation, route }: ViewDetailsProps) {
  const NameGet = route.params.NameSend;
  const SurnameGet = route.params.SurnameSend;
  const [selectedValue, setSelectedValue] = useState('1');
  // iSelected drives which image is actually shown; only updates when "Generate" is pressed
  const [iSelected, setIntValue] = useState(1);

  const blockArray = [
    undefined,
    require('./images/reactnative.jpg'),
    require('./images/kotlin.jpg'),
    require('./images/htmlandcss.jpg'),
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 25, paddingBottom: 20 }}>
          Welcome {NameGet} {SurnameGet}!
        </Text>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingBottom: 20 }}>
          Please select an option
        </Text>
      </View>

      <View style={styles.radioContainer}>
        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="1"
              status={selectedValue == '1' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('1')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>React Native</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="2"
              status={selectedValue == '2' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('2')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>Kotlin</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="3"
              status={selectedValue == '3' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('3')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>HTML and CSS</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}></View>

      <Text
        style={{
          fontWeight: "bold",
          flex: 0,
          paddingTop: 30,
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        Generate Chosen Language Image
      </Text>
      <Button
        title="Generate"
        onPress={() => {
          setIntValue(Number(selectedValue));
        }}
      />
      <View style={styles.container}>
        {blockArray[iSelected] && (
          <Image source={blockArray[iSelected]} style={styles.viewImage} />
        )}
      </View>
    </View>
  );
}

function ListSkills({ navigation, route }: ListSkillsProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState(''); 

  const renderSkills = () => {
    const arrOutput=[];

    for (let i = 0; i < skills.length; i++) {
      arrOutput.push(
        <Text key={i} style={styles.skillText}>
          {skills[i]}
        </Text>
      );
    }
    return arrOutput;
  }

  return (
    <View style={styles.container}>
      <View >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.logo}>
              <Image style={styles.bannerImg} source={require('./images/banner.jpg')} />
            </View>
            {/*Our main heading for the page*/}
             <Text style={styles.welcomeText}>List Your Skills</Text>

             <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your skill"
                onChangeText={(newText) => setSkill(newText)}
              />
              <Button
                title="Add Skill"
                onPress={() => {
                  setSkills([...skills, skill]);
                  setSkill('');
                }}/>

             </View>
                <View style={styles.skillContainer}>
                  {renderSkills()}


                </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    paddingTop: 60,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  headingText: {
    paddingTop: 50,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'auto',
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 250,
    alignSelf: 'center',
  },
  inputFlex: {
    flexDirection: 'row',
    marginTop: 20,
  },
  inputBoxTxt: {
    borderBottomWidth: 1,
    fontSize: 20,
  },
  inputBoxTxt2: {
    borderBottomWidth: 1,
    fontSize: 20,
  },
  redTxt: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  radioContainer: {
    flex: 0,
    backgroundColor: '#ff99e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 15,
    marginLeft: 5,
    color: '#000000',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 15,
    elevation: 5,
    shadowColor: '#8585ad',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  viewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bannerImg: {
    height: 350,
    alignContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e280a6',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#0c0c0c',
    width: '70%',
    marginRight: 7,
    padding: 5,
  },
  appContainer: {
    flex: 1,
    padding:50,
    paddingHorizontal: 15,

  },
  skillText: {
    fontSize: 15,
    marginVertical: 15,
    borderBottomWidth: 1,

  },
});