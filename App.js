import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import EditProfile from './src/screens/EditProfile';
import CreateTask from './src/screens/CreateTask';
import EditTask from './src/screens/EditTask';
import CreateAccount from './src/screens/CreateAccount';
import ShowTask from './src/screens/ShowTask';

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
