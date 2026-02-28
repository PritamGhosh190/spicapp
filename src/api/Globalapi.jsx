import React from 'react';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';


//Test Development URL
//  const url = "http://api.motoverse.ai/mobile/";



//Local host URL
 const url = "http://192.168.0.104:8000/auth/";


//production URL
//  const url = "http://api.motoverse.ai/";





export function userloginmobile(data) {
      console.log("your_datasssss==>",data)
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(url + "agent/login", data);
}


// export const newUserLicenceUpload = async (data) => {
//     // const token = await AsyncStorage.getItem("token");
//     // const toc = "Bearer " + token;
  
//     // axios.defaults.headers.common["Authorization"] = toc;
  
//     // Remove the JSON content-type for FormData
//     return axios.post(url + "mobile/adddrivinglicence", data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   };