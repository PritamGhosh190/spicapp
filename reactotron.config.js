import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    
    name: 'Spice Apps' ,
    //  host: "192.168.0.102"
  
  }) // App name
  .useReactNative() // add all built-in react native plugins
  .connect(); // connect to Reactotron app

console.tron = Reactotron; // optional: console.tron.log()

export default Reactotron;
