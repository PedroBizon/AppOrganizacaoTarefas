import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import HomeScreen from './src/Screens/HomeScreen';
import LoadingScreen from './src/Screens/LoadingScreen';
import EditProfile from './src/Screens/EditProfile';
import CreateTask from './src/Screens/CreateTask';
import EditTask from './src/Screens/EditTask';
import CreateAccount from './src/Screens/CreateAccount';
import ShowTask from './src/Screens/ShowTask';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="EditTask" component={EditTask} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ShowTask" component={ShowTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
