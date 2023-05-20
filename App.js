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
import LogIn from './screens/LogIn';
import EditAppointments from './screens/EditAppointments';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Log Ind'>

        <Stack.Screen name="Log Ind" component={LogIn} options={{ headerShown: false }}/>

        <Stack.Screen name="Welcome" component={HomeScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Economy" component={EconomyScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Timeplan" component={TimeScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Edit Appointments" component={EditAppointments} options={{ headerShown: false }}/>

        <Stack.Screen name="Create a family" component={CreateFamilyScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Your family" component={FamilyScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Join a family" component={JoinFamilyScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Create profile" component={CreateProfileScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="Edit profile" component={EditProfileScreen} options={{ headerShown: false }}/>

        <Stack.Screen name="View profile" component={ViewProfileScreen} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


