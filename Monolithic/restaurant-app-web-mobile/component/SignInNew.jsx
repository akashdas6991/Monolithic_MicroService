import { React, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, Icon, Alert } from "native-base";
import ApiService from "./service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInNew = ({ navigation }) => {

    const [popUp, setPopUp] = useState([]);
    const [errors, setErrors] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //OnLoad Hook
    useEffect(() => {

        loggedIn();

    }, []);

    //loggedIn redirect
    const loggedIn = () => {
        try 
        {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        if (key == "loggedIn" && value == "true")
                            navigation.replace("Home");
                    });
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    };

    //validate user inputs
    const validate = () => {

        var flag = true;

        if (userEmail === undefined || userEmail == "" || userEmail == null) {
            setErrors(previousState => {
                return { ...previousState, email: 'Email is required' }
            });

            flag = false;
        }
        else {
            if ('email' in errors)
                delete errors.email;
        }

        if (userPassword === undefined || userPassword == "" || userPassword == null) {
            setErrors(previousState => {
                return { ...previousState, password: 'Password is required' }
            });

            flag = false;
        }
        else {
            if ('password' in errors)
                delete errors.password;
        }

        return flag;
    };

    //submit form
    const handleSubmit = () => {

        let requestBody = {};
        requestBody.userEmail = userEmail;
        requestBody.userPassword = userPassword;

        if (validate()) {
            ApiService.signIn(requestBody)
                      .then(response => response.json())
                      .then((response) => {
                        if (response.httpStatus == "FOUND") 
                        {
                            AsyncStorage.multiSet([["token", response.token], ["userEmail", response.userEmail], ["loggedIn", "true"]]);

                            setPopUp([{
                                icon: "success",
                                color: "success.600",
                                message: response.message
                            }]);

                            setTimeout(() => {
                                navigation.replace("Home");
                            }, 1100);
                        }
                        else 
                        {
                            setPopUp([{
                                icon: "error",
                                color: "error.600",
                                message: response.message
                            }]);
                        }
                    }).catch(function (error) {

                        setPopUp([{
                            icon: "error",
                            color: "error.600",
                            message: error.message
                        }]);
                    });
        }
    };

    return (

        <NativeBaseProvider>
            <Center w="100%" flex={1} bg="#fff" >
                <Box safeArea w="2xs" >
                    <VStack space={"xl"} >
                        <Heading size="lg" fontWeight="extrabold" color={"green.600"} >
                            Sign In
                        </Heading>
                        <FormControl isRequired isInvalid={'email' in errors}   >
                            <Input type="text" borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} onChangeText={(text) => setUserEmail(text)} InputRightElement={<Icon as={<MaterialIcons name="email" />} size={4} mr="2" color="muted.400" />} placeholder="Email" />
                            {/* {
                                    'email' in errors ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                                } */}
                        </FormControl>
                        <FormControl isRequired isInvalid={'password' in errors}>
                            <Input type={showPassword ? "text" : "password"} onChangeText={(text) => setUserPassword(text)} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={4} mr="2" color="muted.400" />
                            </Pressable>} borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} placeholder="Password" />
                            {/* {
                                    'password' in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                                } */}
                            <Link _text={{ fontSize: "xs", fontWeight: "bold", color: "green.600", textDecoration: "none" }} alignSelf="flex-end" onPress={() => navigation.navigate("ForgetPassword")}>
                                Forget Password ?
                            </Link>
                        </FormControl>
                        <Button w={"40"} alignSelf={"center"} _text={{ fontWeight: "bold" }} borderRadius={"35px"} bg={"green.600"} _hover={{ bg: "gray.600" }} _pressed={{ bg: "green.600" }} onPress={handleSubmit}>
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" >
                                I'm a new user.{" "}
                            </Text>
                            <Link _text={{ fontSize: "sm", fontWeight: "bold", color: "green.600", textDecoration: "none" }} onPress={() => navigation.navigate("SignUpNew")}>
                                Sign Up
                            </Link>
                        </HStack>

                        {popUp.map((item) => {

                            return (
                                
                                <Alert w={"80%"}  borderRadius={"35px"} variant="solid" alignSelf={"center"} status={item.icon}  key={item.icon}>
                                    <VStack space={1} flexShrink={1} w="100%" >
                                        <HStack space={2} flexShrink={1} alignItems={"center"} alignSelf={"center"}>
                                            <Alert.Icon />
                                            <Text color= "white" >
                                                {item.message}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </Alert>  
                            )
                        })}
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};

export default SignInNew;