import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center ,NativeBaseProvider, Link, PresenceTransition, VStack, HStack , Alert} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Alert as ReactAlert} from 'react-native';

const Home = ({navigation}) => {

    const [popUp , setPopUp] = useState([]);
    const [token , setToken] = useState("");
    const [userEmail , setUserEmail] = useState("");

    //back button for web - not working
    // React.useEffect(
    //     () =>
    //       navigation.addListener('beforeRemove', (e) => {
    //         // if (!hasUnsavedChanges) {
    //         //   // If we don't have unsaved changes, then we don't need to do anything
    //         //   return;
    //         // }
    
    //         // Prevent default behavior of leaving the screen
    //         e.preventDefault();
    
    //         // Prompt the user before leaving the screen
    //         Alert.alert(
    //           'Discard changes?',
    //           'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //           [
    //             { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //             {
    //               text: 'Discard',
    //               style: 'destructive',
    //               // If the user confirmed, then we dispatch the action we blocked earlier
    //               // This will continue the action that had triggered the removal of the screen
    //               onPress: () => navigation.dispatch(e.data.action),
    //             },
    //           ]
    //         );
    //       }),
    //     [navigation]
    //   );

    useEffect( () => {

        //check user logged In
        loggedIn();

        //back button of mobile - working
        const backButtonAction = () => {
            ReactAlert.alert('Hold on !', 'Are you sure you want to exit ?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {   
                    text: 'Yes', 
                    onPress: () => BackHandler.exitApp()
                },
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backButtonAction,
        );
      
        return () => {
            backHandler.remove();
        }

    }, []);

    //     React.useEffect(() => {
    //         const unsubscribe = navigation.addListener('focusout', () => {
    //           alert('Screen is focused');
    //           // The screen is focused
    //           // Call any action
    //                     // Prompt the user before leaving the screen
    //             // alert(
    //             //   'Discard changes?',
    //             //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
    //             //   [
    //             //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //             //     {
    //             //       text: 'Discard',
    //             //       style: 'destructive',
    //             //       // If the user confirmed, then we dispatch the action we blocked earlier
    //             //       // This will continue the action that had triggered the removal of the screen
    //             //       onPress: () => navigation.dispatch(e.data.action),
    //             //     },
    //             //   ]
    //             // );

    //             let text = "Press a button!\nEither OK or Cancel.";
    //   if (confirm(text) == true) {
    //     text = "You pressed OK!";
    //   } else {
    //     text = "You canceled!";
    //   }

    //         });
        
    //         // Return the function to unsubscribe from the event so it gets removed on unmount
    //         return unsubscribe;
    //     }, []);

    //check logged In
    const loggedIn =  () => {
        try 
        {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                  stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];

                        if(key == "token")
                            setToken(value);

                        if(key == "userEmail")
                            setUserEmail(value);

                        //if(key == "loggedIn")
                          //  navigation.replace("Home");
                    });
                });
            });
        } 
        catch(e) 
        {
            console.log(e);
        }
    };

    const handleSignOut = () => {

        let tokenData = token;
        let requestBody = { };
        requestBody.userEmail = userEmail;
        
        apiService.signOut(requestBody,tokenData)
                    .then(response => response.json() )
                    .then( (response) =>  
                    { 
                        if(response.httpStatus == "OK")
                        {
                            let keys = ['token', 'userEmail' , 'loggedIn'];
                            AsyncStorage.multiRemove(keys, err => {});

                            setPopUp([{
                                icon : "success",
                                message : response.message
                            }]);

                            setTimeout(() => {
                                navigation.replace("SignInNew");
                            }, 1100 );
                        }
                        else
                        {
                            setPopUp([{
                                icon : "error",
                                message : response.message
                            }]);
                        }
                    }).catch(function(error) {
                        console.log('There has been a problem with your fetch operation: ' + error.message);
                    }); 
    }

    return (
        <NativeBaseProvider> 
                <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">                
                    <Center w="100%">
                        <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                            Sign Out
                        </Link>
                        <Box safeArea p="2" py="8" w="90%" maxW="290">
                            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                Welcome , User =  { ( userEmail ) }
                            </Heading> 
                        </Box>

                        { popUp.map( (item) => {

                            return(
                                
                                <PresenceTransition visible="true"  initial={{
                                                                                opacity: 0
                                                                            }} 
                                                                    animate={{
                                                                                opacity: 1,
                                                                                transition: {
                                                                                    duration: 1000
                                                                                }
                                                                            }} key={item.icon}>
                                    <Alert w="100%" variant="solid" colorScheme={item.icon} status={item.icon}>
                                        <VStack space={2} flexShrink={1} w="100%">
                                            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                                <HStack space={2} flexShrink={1} alignItems="center">
                                                    <Alert.Icon />
                                                    <Text color="warmGray.50">
                                                        {item.message}
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                        </VStack>
                                    </Alert>
                                </PresenceTransition>
                            )
                        })}

                        <Box safeArea p="2" py="8" w="90%" maxW="290">
                            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                User/Admin view
                            </Heading> 
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                User View
                            </Link>
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                User Update
                            </Link>
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                User Delete
                            </Link>
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                User Order List
                            </Link>
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                Order Food
                            </Link>
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                Order View
                            </Link>
                            
                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                Order Delete
                            </Link>

                            {/* admin view */}

                            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                Admin view
                            </Heading> 

                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                User List
                            </Link>

                            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ handleSignOut }>
                                Order List
                            </Link>
                        </Box>

                    </Center>
                </Box>
        </NativeBaseProvider>
    )
}

export default Home