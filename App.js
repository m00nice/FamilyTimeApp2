import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'; 

//Function folder
import HomeScreen from './screens/functionScreens/HomeScreen';
import EconomyScreen from './screens/functionScreens/EconomyScreen';
import TimeScreen from './screens/functionScreens/TimeScreen';

//Family folder
import CreateFamilyScreen from './screens/familyScreens/CreateFamily';
import FamilyScreen from './screens/familyScreens/FamilyScreen';
import JoinFamilyScreen from './screens/familyScreens/JoinFamily';

//Profile folder
import CreateProfileScreen from './screens/profileScreens/CreateProfile';
import EditProfileScreen from './screens/profileScreens/EditProfile';
import ViewProfileScreen from './screens/profileScreens/ViewProfile';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>

        <Stack.Screen name="Welcome" component={HomeScreen}/>

        <Stack.Screen name="Economy" component={EconomyScreen}/>

        <Stack.Screen name="Timeplan" component={TimeScreen}/>

        <Stack.Screen name="Create a family" component={CreateFamilyScreen}/>

        <Stack.Screen name="Your family" component={FamilyScreen}/>

        <Stack.Screen name="Join a family" component={JoinFamilyScreen}/>

        <Stack.Screen name="Create profile" component={CreateProfileScreen}/>

        <Stack.Screen name="Edit profile" component={EditProfileScreen}/>

        <Stack.Screen name="View profile" component={ViewProfileScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


