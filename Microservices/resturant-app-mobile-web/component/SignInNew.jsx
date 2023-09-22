import { React, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center ,NativeBaseProvider, PresenceTransition, Icon ,Alert } from "native-base";
import ApiService from "./service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';

const SignInNew = ({navigation})  => {

    const [popUp, setPopUp] = useState([]);
    const [errors, setErrors] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //check user logged In
    useEffect( () => {
        
        loggedIn();

    }, []);

    //get the stored value
    const loggedIn =  () => {
        try 
        {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                  stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        //if(key == "loggedIn"  && value == "true")
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

    //validate user inputs
    const validate = () => {

        var flag = true;

        if (userEmail === undefined || userEmail == "" || userEmail == null) {
            setErrors(  previousState => {
                return { ...previousState,email: 'Email is required' }
            });
          
            flag = false;
        }
        else
        {
            if('email' in errors)
                delete errors.email;
        } 
        
        if (userPassword === undefined || userPassword == "" || userPassword == null ) {
            setErrors(  previousState => {
                return { ...previousState, password: 'Password is required' }
            });

            flag = false;
        }
        else
        { 
            if('password' in errors)
                delete errors.password;
        } 
    
        return flag;
    };

    //submit form
    const handleSubmit = () => {
       
        let requestBody = {};
        requestBody.userEmail = userEmail;
        requestBody.userPassword = userPassword;

        if(validate())
        {
            ApiService.signIn(requestBody)
                      .then(response => response.json() )
                      .then( (response) =>  
                      { 
                        if(response.httpStatus == "FOUND")
                        {
                            AsyncStorage.multiSet( [ [ "token",response.token] , [ "userEmail",response.userEmail] , [ "loggedIn", "true"]   ]  );

                            setPopUp([{
                                icon : "success",
                                message : response.message
                            }]);

                            setTimeout(() => {
                                navigation.replace("Home");
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
    };  

    return (

        <NativeBaseProvider> 
            <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">                
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                            Welcome
                        </Heading>
                        <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
                            Sign in to continue!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl isRequired isInvalid={'email' in errors}>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input type="text"     onChangeText={(text) => setUserEmail(text)}   InputRightElement={<Icon as={<MaterialIcons name="email" />} size={5} mr="2"  color="muted.400" />} placeholder="Email"/>
                                {
                                    'email' in errors ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                                }
                            </FormControl>
                            <FormControl isRequired isInvalid={'password' in errors}>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type={showPassword ? "text" : "password"} onChangeText={(text) => setUserPassword(text)}   InputRightElement={   <Pressable onPress={() => setShowPassword(!showPassword)}>
                                                                                                                                                            <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                                                                                                                                        </Pressable>} placeholder="Password"/>
                                {
                                    'password' in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                                }
                                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
                                    Forget Password ?
                                </Link>
                            </FormControl>
                            <Button mt="2" onPress={handleSubmit}>
                                Sign in
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                                    I'm a new user.{" "}
                                </Text>
                                <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ () => props.navigation.navigate("SignUpNew") }>
                                    Sign Up
                                </Link>
                            </HStack>
                            
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
                        </VStack>
                    </Box>
                </Center>
            </Box>
        </NativeBaseProvider>
    );  
};

export default SignInNew;