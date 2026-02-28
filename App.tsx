import { View, Text } from 'react-native';
import React from 'react';
import Stackmain from './src/navigation/Stackmain';
import { ToastProvider } from './src/constants/GlobalTost';

const App = () => {
  return (
    <ToastProvider>
      <Stackmain />
    </ToastProvider>
  );
};

export default App;
