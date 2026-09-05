import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View,TextInput, Button,Image,SafeAreaView,ScrollView, Animated,ViewStyle,StyleProp,ImageSourcePropType,} from 'react-native';
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

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.welcomeText}>Welcome to my app!</Text>
        <Image style={styles.logo} source={require('./images/dogimage.jpg')} />
        
        <FadeInView>
          <Text style={styles.redTxt}>{Error ? 'Please enter your info' : ''}</Text>
          <Text style={styles.headingText}>Enter your name</Text>
          <TextInput
            style={styles.inputBoxTxt}
            placeholder="Sam"
            onChangeText={(newText) => setName(newText)}
            autoCapitalize="words"
            autoComplete="name"
            keyboardType="default"
          />
          <Text style={styles.headingText}>Enter your surname</Text>
          <TextInput
            style={styles.inputBoxTxt2}
            placeholder="Richards"
            onChangeText={(newText) => setSurname(newText)}
            autoCapitalize="words"
            autoComplete="name-family"
            keyboardType="default"
          />
        </FadeInView>

        <View style={{ marginTop: 20, gap: 10 }}>
          <Button
            title="Add user"
            onPress={() => {
              if (!isEmpty(Name) && !isEmpty(Surname)) {
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
          <Button
            title="Go to Skills List"
            onPress={() => navigation.navigate('ListSkills')}
          />
        </View>
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
  const [iSelected, setIntValue] = useState(1);

  // Array storing image sources corresponding to radio values (1, 2, 3)[cite: 22]
  const [blockArray] = useState<ImageSourcePropType[]>([
    undefined as unknown as ImageSourcePropType,
    require('./images/reactnative.jpg'),
    require('./images/kotlin.jpg'),
    require('./images/htmlandcss.jpg'),
  ]);

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
              status={selectedValue === '1' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('1')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>React Native</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="2"
              status={selectedValue === '2' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('2')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>Kotlin</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="3"
              status={selectedValue === '3' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('3')}
              color="#ff99e6"
            />
            <Text style={styles.radioLabel}>HTML and CSS</Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontWeight: 'bold',
          paddingTop: 30,
          textAlign: 'center',
        }}
      >
        Generate Chosen Language Image
      </Text>
      
      <Button
        title="Generate"
        onPress={() => {
          setIntValue(Number(selectedValue)); // Cast selection string to number for array index[cite: 22]
        }}
      />

      <View style={styles.container}>
        {blockArray[iSelected] && (
          <Image source={blockArray[iSelected]} style={styles.viewImage} />
        )}
      </View>

      <Button
        title="Manage Skills"
        onPress={() => navigation.navigate('ListSkills')}
      />
    </View>
  );
}

function ListSkills({ navigation }: ListSkillsProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState('');

  const renderSkills = () => {
    const arrOutput = [];
    for (let i = 0; i < skills.length; i++) {
      arrOutput.push(
        <Text key={i} style={styles.skillText}>
          {skills[i]}
        </Text>
      );
    }
    return arrOutput;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}>
          <View style={styles.logo}>
            <Image style={styles.bannerImg} source={require('./images/banner.jpg')} />
          </View>
          
          <Text style={styles.welcomeText}>List Your Skills</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your skill"
              value={skill}
              onChangeText={(newText) => setSkill(newText)}
            />
            <Button
              title="Add Skill"
              onPress={() => {
                if (skill.trim() !== '') {
                  setSkills([...skills, skill]);
                  setSkill('');
                }
              }}
            />
          </View>

          <View style={styles.skillContainer}>{renderSkills()}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    paddingTop: 20,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  headingText: {
    paddingTop: 20,
    color: 'pink',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
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
    marginTop: 10,
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
    paddingTop: 10,
  },
  viewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bannerImg: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e280a6',
    paddingBottom: 5,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#0c0c0c',
    width: 180,
    marginRight: 10,
    padding: 5,
  },
  skillContainer: {
    width: '100%',
    alignItems: 'center',
  },
  skillText: {
    fontSize: 15,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
    width: 200,
    textAlign: 'center',
  },
});