import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logins from '../authentication/login/Logins';
import BottmNav from './BottomNav';

const Stack = createNativeStackNavigator();

const Stackmain = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">


        <Stack.Screen name="Login" component={Logins} options={{ headerShown: false }} />
        <Stack.Screen name="BottomNav" component={BottmNav} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stackmain;