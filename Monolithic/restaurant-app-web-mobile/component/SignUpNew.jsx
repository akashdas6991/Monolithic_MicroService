import { Text, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider, Icon, PresenceTransition, Alert } from "native-base";
import { useEffect, useState } from "react";
import ApiService from "./service/apiService";
import { Pressable } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpNew = ({navigation}) => {
  
  const [popUp, setPopUp] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userNamee , setUserNamee] = useState("");
  const [userEmail , setUserEmail] = useState("");
  const [userMobile , setUserMobile] = useState("");
  const [userPassword , setUserPassword] = useState("");
  const [showPassword , setShowPassword] = useState(false);

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

                      if(key == "loggedIn")
                          navigation.navigate("Home");
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

    if (userNamee === undefined || userNamee == "" || userNamee == null) 
    {
      setErrors(  previousState => {
          return { ...previousState,name: 'Name is required' }
      });
    
      flag = false;
    }
    else
    {
        if('name' in errors)
            delete errors.name;
    } 

    if (userEmail === undefined || userEmail == "" || userEmail == null) 
    {
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

    if (userMobile === undefined || userMobile == "" || userMobile == null) 
    {
        setErrors(  previousState => {
          return { ...previousState,mobile: 'Mobile is required' }
        });
      
        flag = false;
    }
    else
    {
        if('mobile' in errors)
            delete errors.mobile;
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

  //form submit
  const handleSignUp = () => {

    let requestBody = {};
    requestBody.userNamee = userNamee;
    requestBody.userEmail = userEmail;
    requestBody.userMobile = userMobile;
    requestBody.userPassword = userPassword;

    if(validate())
    {
      console.log("validate " + validate())

        ApiService.signUp(requestBody)
                  .then(response => response.json() )
                  .then( (response) =>  
                  { 
                    if(response.httpStatus == "CREATED")
                    {
                        setPopUp([{
                          icon : "success",
                          message : response.message
                        }]);

                        setTimeout(() => {
                          navigation.navigate("SignInNew");
                        }, 1600 );
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
  }

  return (

    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }} fontWeight="semibold">
              Welcome
            </Heading>
            <Heading size="xs" color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="medium"   mt="1">
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label>Name</FormControl.Label>
                <Input type="text"    onChangeText={ setUserNamee} InputRightElement={<Icon as={<FontAwesome5 name="user-alt" />} size={5} mr="2"  color="muted.400" />} placeholder="Name"/>
                {
                  'name' in errors ? <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label>Email</FormControl.Label>
                <Input type="email"   onChangeText={ setUserEmail} InputRightElement={<Icon as={<MaterialIcons name="email" />} size={5} mr="2"  color="muted.400" />} placeholder="Email"/>
                {
                  'email' in errors ? <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              <FormControl isRequired isInvalid={'mobile' in errors}>
                <FormControl.Label>Mobile</FormControl.Label>
                <Input type="text"   onChangeText={ setUserMobile} InputRightElement={<Icon as={<FontAwesome5 name="mobile" />} size={5} mr="2"  color="muted.400" />} placeholder="Mobile"/>
                {
                  'mobile' in errors ? <FormControl.ErrorMessage>{errors.mobile}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label>Password</FormControl.Label>
                <Input type={showPassword ? "text" : "password"} onChangeText={ setUserPassword} InputRightElement={  <Pressable onPress={() => setShowPassword(!showPassword)}>
                                                                                                                        < Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                                                                                                      </Pressable>} placeholder="Password"/>
                {
                  'password' in errors ? <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>
                }
              </FormControl>
              { popUp.map( (item) => {

                return(
                    
                    <PresenceTransition visible="true"  initial={{
                                                                    opacity: 0
                                                                }} 
                                                        animate={{
                                                                    opacity: 1,
                                                                    transition: {
                                                                        duration: 1500
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
              <Button mt="2" onPress={handleSignUp}>
                Sign up
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                    I'm a new user.{" "}
                </Text>
                <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={ () => props.navigation.navigate("SignInNew") }>
                    Sign In
                </Link>
            </HStack>
            </VStack>
          </Box>
        </Center>
      </Box>
    </NativeBaseProvider>
  )

};

export default SignUpNew