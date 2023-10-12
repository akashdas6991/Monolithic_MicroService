import React, { useEffect, useState } from 'react';
import { Box, NativeBaseProvider} from "native-base";

import Header from './Header';
import GenerateTabWithContentForWebHome from './GenerateTabWithContentForWebHome';

const Home = () => {

    //const [popUp, setPopUp] = useState([]);
    //const [token, setToken] = useState("");
    //const [userEmail, setUserEmail] = useState("");

    useEffect(() => {

        //check user logged In
        //loggedIn();

        //for mobile
        //backHandler.remove();
        

    }, []);

    //restrict back button of mobile - working
    // const backButtonAction = () => {
    //     ReactAlert.alert('Hold on !', 'Are you sure you want to exit ?', [
    //         {
    //             text: 'Cancel',
    //             onPress: () => null,
    //             style: 'cancel',
    //         },
    //         {
    //             text: 'Yes',
    //             onPress: () => BackHandler.exitApp()
    //         },
    //     ]);
    //     return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backButtonAction,
    // );

    //check logged In
    // const loggedIn = () => {
    //     try {
    //         AsyncStorage.getAllKeys((err, keys) => {
    //             AsyncStorage.multiGet(keys, (err, stores) => {
    //                 stores.map((result, i, store) => {
    //                     // get at each store's key/value so you can work with it
    //                     let key = store[i][0];
    //                     let value = store[i][1];

    //                     if (key == "token")
    //                         setToken(value);

    //                     if (key == "userEmail")
    //                         setUserEmail(value);

    //                     //if(key == "loggedIn")
    //                     //  navigation.replace("Home");
    //                 });
    //             });
    //         });
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // };

    // const handleSignOut = () => {

    //     let tokenData = token;
    //     let requestBody = {};
    //     requestBody.userEmail = userEmail;

    //     apiService.signOut(requestBody, tokenData)
    //         .then(response => response.json())
    //         .then((response) => {
    //             if (response.httpStatus == "OK") {
    //                 let keys = ['token', 'userEmail', 'loggedIn'];
    //                 AsyncStorage.multiRemove(keys, err => { });

    //                 setPopUp([{
    //                     icon: "success",
    //                     message: response.message
    //                 }]);

    //                 setTimeout(() => {
    //                     navigation.replace("SignInNew");
    //                 }, 1100);
    //             }
    //             else {
    //                 setPopUp([{
    //                     icon: "error",
    //                     message: response.message
    //                 }]);
    //             }
    //         }).catch(function (error) {
    //             console.log('There has been a problem with your fetch operation: ' + error.message);
    //         });
    // }

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} bgColor={'white'} >

                <Header usernamee={"Akash"} /> 

                <GenerateTabWithContentForWebHome/>

            </Box>
        </NativeBaseProvider>
    )
}

export default Home