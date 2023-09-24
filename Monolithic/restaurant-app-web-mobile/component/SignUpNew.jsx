import { Text, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, Icon, PresenceTransition, Alert } from "native-base";
import { useEffect, useState } from "react";
import ApiService from "./service/apiService";
import { Pressable } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpNew = ({ navigation }) => {

  const [popUp, setPopUp] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userNamee, setUserNamee] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //onload hook
  useEffect(() => {

    loggedIn();

  }, []);

  //loggedIn 
  const loggedIn = () => {
    try {
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

    if (userNamee === undefined || userNamee == "" || userNamee == null) {
      setErrors(previousState => {
        return { ...previousState, name: 'Name is required' }
      });

      flag = false;
    }
    else {
      if ('name' in errors)
        delete errors.name;
    }

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

    if (userMobile === undefined || userMobile == "" || userMobile == null) {
      setErrors(previousState => {
        return { ...previousState, mobile: 'Mobile is required' }
      });

      flag = false;
    }
    else {
      if ('mobile' in errors)
        delete errors.mobile;
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
  const handleSignUp = () => {

    let requestBody = {};
    requestBody.userNamee = userNamee;
    requestBody.userEmail = userEmail;
    requestBody.userMobile = userMobile;
    requestBody.userPassword = userPassword;

    if (validate()) {
      ApiService.signUp(requestBody)
        .then(response => response.json())
        .then((response) => {
          if (response.httpStatus == "CREATED") {
            setPopUp([{
              icon: "success",
              color: "success.600",
              message: response.message
            }]);

            setTimeout(() => {
              navigation.replace("SignInNew");
            }, 1100);
          }
          else {
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
  }

  return (

    <NativeBaseProvider>
      <Center w="100%" flex={1} bg="#fff">
        <Box safeArea w="2xs" >
          <VStack space={"md"} >
            <Heading size="lg" fontWeight="extrabold" color={"green.600"} >
              Sign Up
            </Heading>
            <FormControl isRequired isInvalid={'name' in errors}>
              <Input onChangeText={setUserNamee}     borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<FontAwesome5 name="user-alt" />} size={4} mr="2" color="muted.400" />} placeholder="Name" type="text" />
            </FormControl>
            <FormControl isRequired isInvalid={'email' in errors}>
              <Input onChangeText={setUserEmail}     borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<MaterialIcons name="email" />}   size={4} mr="2" color="muted.400" />} placeholder="Email" type="email" />
            </FormControl>
            <FormControl isRequired isInvalid={'mobile' in errors}>
              <Input onChangeText={setUserMobile}    borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<FontAwesome5 name="mobile" />}   size={4} mr="1" color="muted.400" />} placeholder="Mobile" type="text" />
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <Input onChangeText={setUserPassword}  borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                < Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={4} mr="2" color="muted.400" />
              </Pressable>} placeholder="Password" type={showPassword ? "text" : "password"} />
            </FormControl>
            <Button w={"40"} alignSelf={"center"} _text={{ fontWeight: "bold" }} borderRadius={"35px"} bg={"green.600"} _hover={{ bg: "gray.600" }} _pressed={{ bg: "green.600" }} onPress={handleSignUp}>
              Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" >
                I'm a new user.{" "}
              </Text>
              <Link _text={{ fontSize: "sm", fontWeight: "bold", color: "green.600", textDecoration: "none" }} onPress={() => navigation.replace("SignInNew")}>
                Sign In
              </Link>
            </HStack>

            {popUp.map((item) => {

              return (

                <Alert w={"80%"} borderRadius={"35px"} variant="solid" alignSelf={"center"} status={item.icon} key={item.icon}>
                  <VStack space={1} flexShrink={1} w="100%" >
                    <HStack space={2} flexShrink={1} alignItems={"center"} alignSelf={"center"}>
                      <Alert.Icon />
                      <Text color="white" >
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
  )
};

export default SignUpNew