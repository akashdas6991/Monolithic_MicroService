import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, NativeBaseProvider, Link, PresenceTransition, VStack, HStack, Alert, Avatar, AspectRatio, Image, Stack, Flex, Spacer, ScrollView, Divider, StatusBar, IconButton, Icon, Input, Button, ChevronDownIcon, Menu, HamburgerIcon, Popover, FormControl } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Platform, Pressable, Alert as ReactAlert } from 'react-native';
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Screen, ScreenContainer } from 'react-native-screens';
import { Dimensions } from 'react-native';



const Checkout = ({ props, navigation }) => {

    const [popUp, setPopUp] = useState([]);
    const [token, setToken] = useState("");
    const [errors, setErrors] = useState([]);
    const [userNamee, setUserNamee] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const firstMenuItems = apiService.firstMenuItems();
    const secondMenuItems = apiService.secondMenuItems();

    let count = 0;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    console.log(windowWidth + " aaaaaa " + windowHeight);

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });





    // restrict back button for web - not working
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

    useEffect(() => {

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen });

                console.log(window, screen);
            },
        );
        //return () => subscription?.remove();

        //check user logged In
        loggedIn();



        //restrict back button of mobile - working
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
    const loggedIn = () => {
        try {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];

                        if (key == "token")
                            setToken(value);

                        if (key == "userEmail")
                            setUserEmail(value);

                        //if(key == "loggedIn")
                        //  navigation.replace("Home");
                    });
                });
            });
        }
        catch (e) {
            console.log(e);
        }
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

    const handleSignOut = () => {

        let tokenData = token;
        let requestBody = {};
        requestBody.userEmail = userEmail;

        apiService.signOut(requestBody, tokenData)
            .then(response => response.json())
            .then((response) => {
                if (response.httpStatus == "OK") {
                    let keys = ['token', 'userEmail', 'loggedIn'];
                    AsyncStorage.multiRemove(keys, err => { });

                    setPopUp([{
                        icon: "success",
                        message: response.message
                    }]);

                    setTimeout(() => {
                        navigation.replace("SignInNew");
                    }, 1100);
                }
                else {
                    setPopUp([{
                        icon: "error",
                        message: response.message
                    }]);
                }
            }).catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
    }

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} bgColor={'white'} >

                <HStack w={"82%"} bg={"white"} pt={"15px"} pb={"20px"} justifyContent={'space-between'} alignSelf={'center'}>
                    <HStack w={"14%"} >
                        <Text color={"green.600"} fontSize={"3xl"} fontWeight={"extrabold"}>
                            Checkout
                        </Text>
                    </HStack>
                    <HStack w={"63%"} borderRadius={5} borderWidth={"1px"} borderColor={"gray.300"} shadow={3}>
                        <HStack w={"35%"} alignItems={'center'} justifyContent={'space-between'}>
                            <HStack>
                                <Icon as={<MaterialIcons name="location-on" />} color={"red.400"} size={6} m={"6px"} />
                                <Input w={"80%"} variant="unstyled" placeholder="Kolkata" fontSize={'sm'} />
                            </HStack>
                            <HStack >
                                <Menu mt={5} bgColor={"white"} placement='bottom right' w={"240px"} trigger={triggerProps => {
                                    return <Pressable  {...triggerProps}>
                                        <Icon as={<FontAwesome name="caret-down" />} size={5} />
                                    </Pressable>;
                                }}>
                                    <Menu.Item h={"60px"}>
                                        <HStack>
                                            <Icon as={<MaterialIcons name="my-location" />} color={"red.400"} size={5} />
                                        </HStack>
                                        <HStack>
                                            <VStack>
                                                <Text fontSize={'md'} color={'red.400'}>
                                                    Detect current location
                                                </Text>
                                                <Text fontSize={'sm'} color={'gray.500'}>Using GPS</Text>
                                            </VStack>
                                        </HStack>
                                    </Menu.Item>
                                    <Divider w="100%" color={'gray.500'} />
                                    <Menu.Item h={"60px"} pt={5}>
                                        <HStack>
                                            <Icon as={<FontAwesome5 name="plus" />} color={"red.400"} size={5} />
                                        </HStack>
                                        <HStack>
                                            <VStack>
                                                <Text fontSize={'md'} color={'red.400'}>
                                                    Add address
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Menu.Item>
                                    <Divider w="100%" color={'gray.500'} />
                                    <Menu.Group title="Saved Addresses">
                                        <Menu.Item h={"60px"}>
                                            <HStack>
                                                <Icon as={<MaterialIcons name="home" />} color={"gray.400"} size={5} />
                                            </HStack>
                                            <HStack>
                                                <VStack>
                                                    <Text fontSize={'md'} color={'gray.800'}>
                                                        Home
                                                    </Text>
                                                    <Text fontSize={'sm'} color={'gray.500'}>Kolkata , India - 700001</Text>
                                                </VStack>
                                            </HStack>
                                        </Menu.Item>
                                        <Menu.Item h={"60px"}>
                                            <HStack>
                                                <Icon as={<MaterialIcons name="shopping-bag" />} color={"gray.400"} size={5} />
                                            </HStack>
                                            <HStack>
                                                <VStack>
                                                    <Text fontSize={'md'} color={'gray.800'}>
                                                        Work
                                                    </Text>
                                                    <Text fontSize={'sm'} color={'gray.500'}>Kolkata , India - 700091</Text>
                                                </VStack>
                                            </HStack>
                                        </Menu.Item>
                                    </Menu.Group>
                                </Menu>
                            </HStack>
                        </HStack>

                        <Divider orientation="vertical" my={"1px"} bg="gray.200" />

                        <Input w={"64%"} variant="unstyled" placeholder="Search for resturant, cuisine or a dish" fontSize={'md'} InputLeftElement={<Icon ml="2" size="7" color="gray.500" as={<EvilIcons name="search" />} />} />
                    </HStack>
                    <VStack w={"23%"} bgColor={'white'} alignItems={'self-end'}>
                        <Menu placement='bottom right' w={"150px"} bg={"green.600"} trigger={triggerProps => {
                            return <Pressable  {...triggerProps}>
                                <HStack alignItems={'center'}>
                                    <Avatar size={'42px'} source={{ uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />
                                    <Text pl={"7px"} fontSize={"md"} fontWeight={"semibold"} >
                                        Akash
                                    </Text>
                                    <ChevronDownIcon size="3" pl={"7px"} pr={"5px"} />
                                </HStack>
                            </Pressable>;
                        }}>
                            <Menu.Item isFocused><Text color={"white"} fontWeight={'extrabold'} onPress={() => navigation.navigate("Home")}>Home</Text></Menu.Item>
                            <Menu.Item><Text color={"white"} fontWeight={'extrabold'} onPress={() => navigation.navigate("SignUpNew")}>Profile</Text></Menu.Item>
                            <Menu.Item><Text color={"white"} fontWeight={'extrabold'}>Sign Out</Text></Menu.Item>
                        </Menu>
                    </VStack>
                </HStack>

                <Divider w="100%" color={'gray.500'} />

                <HStack w={"82%"} bg={"white"} pt={"15px"} pb={"20px"} justifyContent={'space-between'} alignSelf={'center'}>

                    <VStack space={"md"} >
                        <Heading size="lg" fontWeight="extrabold" color={"green.600"} >
                            Sign Up
                        </Heading>
                        <FormControl isRequired isInvalid={'name' in errors}>
                            <Input onChangeText={setUserNamee} borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<FontAwesome5 name="user-alt" />} size={4} mr="2" color="muted.400" />} placeholder="Name" type="text" />
                        </FormControl>
                        <FormControl isRequired isInvalid={'email' in errors}>
                            <Input onChangeText={setUserEmail} borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<MaterialIcons name="email" />} size={4} mr="2" color="muted.400" />} placeholder="Email" type="email" />
                        </FormControl>
                        <FormControl isRequired isInvalid={'mobile' in errors}>
                            <Input onChangeText={setUserMobile} borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Icon as={<FontAwesome5 name="mobile" />} size={4} mr="1" color="muted.400" />} placeholder="Mobile" type="text" />
                        </FormControl>
                        <FormControl isRequired isInvalid={'password' in errors}>
                            <Input onChangeText={setUserPassword} borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }} InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                < Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={4} mr="2" color="muted.400" />
                            </Pressable>} placeholder="Password" type={showPassword ? "text" : "password"} />
                        </FormControl>
                        <Button w={"40"} alignSelf={"center"} _text={{ fontWeight: "bold" }} borderRadius={"35px"} bg={"green.600"} _hover={{ bg: "gray.600" }} _pressed={{ bg: "green.600" }} onPress={() => navigation.replace("Payment") }>
                            Proceed to Pay
                        </Button>


                    </VStack>

                    <VStack>
                        <HStack ml={4} mb={10}>
                            <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/d25/51f9a09412b772740a39072879e5dd25.jpg?fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                            <VStack w={"70%"}>
                                <HStack justifyContent={'space-between'}>
                                    <Text fontSize={'lg'} fontWeight={'semibold'}>Hot And Sour Soup Veg</Text>
                                    <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => alert("Added !")}>
                                        <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                            <Icon as={<FontAwesome5 name="minus" />} color={'white'} size={4} /> 
                                            Add to cart
                                            <Icon as={<FontAwesome5 name="plus" />} color={'white'} size={4} /> 
                                        </Text>
                                    </Button>
                                </HStack>
                                <HStack>
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                                    <Text color={'gray.400'}>5 Votes</Text>
                                </HStack>
                                <Text color={'gray.500'} mt={1} mb={1}>₹119</Text>
                                <Text color={'gray.500'}>This soup come in a spicy, soya based and brown colour with cabbage, carrot, tofu and shiitake mushroom.</Text>
                            </VStack>
                        </HStack>

                        <HStack ml={4} mb={10}>
                            <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/2aa/da9b7cb9d306e2d301360c5918fca2aa.jpg?fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                            <VStack w={"70%"}>
                                <HStack justifyContent={'space-between'}>
                                    <Text fontSize={'lg'} fontWeight={'semibold'}>Ginger Capsicum Flavored Rice</Text>
                                    <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                        <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                            <Icon as={<FontAwesome5 name="minus" />} color={'white'} size={4} /> 
                                            Add to cart
                                            <Icon as={<FontAwesome5 name="plus" />} color={'white'} size={4} /> 
                                        </Text>
                                    </Button>
                                </HStack>
                                <HStack>
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                                    <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                                    <Text color={'gray.400'}>35 Votes</Text>
                                </HStack>
                                <Text color={'gray.500'} mt={1} mb={1}>₹139</Text>
                                <Text color={'gray.500'}>Rice sauteed with shredded bell pepper, ginger and mushroom</Text>
                            </VStack>
                        </HStack>

                        <Input placeholder="Apply Coupon" fontSize={'sm'} />

                        <Text>Bill Details</Text>
                        <Text>Item Total ₹730</Text>
                        <Text>Delivery Fee | 5.0 kms i  ₹69</Text>
                        <Divider/>
                        <Text>Delivery Tip</Text>
                        <Text>Platoform fee i ₹2</Text>
                        <Text>GST and Resturant Charges i ₹30</Text>
                        <Text>Total Pay ₹831</Text>

                    </VStack>
                </HStack>



            </Box>
        </NativeBaseProvider>
    )
}

export default Checkout