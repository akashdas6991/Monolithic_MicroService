import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, NativeBaseProvider, Link, PresenceTransition, VStack, HStack, Alert, Avatar, AspectRatio, Image, Stack, Flex, Spacer, ScrollView, Divider, StatusBar, IconButton, Icon, Input, Button, ChevronDownIcon, Menu, HamburgerIcon } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Platform, Pressable, Alert as ReactAlert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Screen, ScreenContainer } from 'react-native-screens';
import { Dimensions } from 'react-native';


const Home = ({ props, navigation }) => {

    const [popUp, setPopUp] = useState([]);
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const firstMenuItems = apiService.firstMenuItems();
    const secondMenuItems = apiService.secondMenuItems();

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
            <Box safeArea w={"100%"} _web={{ w: "80%" }} alignSelf={'center'} bgColor={'white'}>
                <HStack bg={"white"} p={"15px"} w={"100%"} justifyContent={'space-between'} >
                    <HStack>
                        <Text color={"green.600"} fontSize={"3xl"} fontWeight={"extrabold"}>
                            Home
                        </Text>
                    </HStack>
                    {/* <HStack w={"60%"} >
                        <Input  w={"90%"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }}  placeholder="Search" variant="filled"  borderRadius="50" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                    </HStack> */}
                    <HStack>
                        <Menu placement='bottom right' w={"150px"} bg={"green.600"} trigger={triggerProps => {
                            return <Pressable  {...triggerProps}>
                                <HStack>
                                    <Avatar borderColor={"green.600"} borderWidth={"3px"} source={{ uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />
                                    <Text color={"green.600"} fontSize={"xl"} fontWeight={"extrabold"} p={"10px"}>
                                        Akash
                                    </Text>
                                    <ChevronDownIcon size="5" mt="4" color="emerald.500" />
                                </HStack>
                            </Pressable>;
                        }}>
                            <Menu.Item isFocused><Text color={"white"} fontWeight={'extrabold'} onPress={() => navigation.navigate("Home")}>Home</Text></Menu.Item>
                            <Menu.Item><Text color={"white"} fontWeight={'extrabold'} onPress={() => navigation.navigate("SignUpNew")}>Profile</Text></Menu.Item>
                            <Menu.Item><Text color={"white"} fontWeight={'extrabold'}>Sign Out</Text></Menu.Item>
                        </Menu>
                    </HStack>
                </HStack>


                























                <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                    Eat what makes you happy
                </Heading>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} p={"2"} bg={"white"}>
                    <HStack space={"2xl"} justifyContent="center" p={3}>
                        {
                            firstMenuItems.map((item) => {

                                return (
                                    <VStack alignItems={'center'} space={3} key={item.id} >
                                        <Avatar size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
                                        <Text fontSize={["sm", "md", "lg"]} fontWeight={'bold'} color={"gray.500"} > {item.name} </Text>
                                    </VStack>
                                )
                            })
                        }
                    </HStack>
                </ScrollView>

                <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                    Top brands for you
                </Heading>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} p={"2"} bg={"white"}>
                    <HStack space={"2xl"} justifyContent="center" p={3}>
                        {
                            secondMenuItems.map((item) => {

                                return (
                                    <VStack alignItems={'center'} space={3} key={item.id} >
                                        <Avatar size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
                                        <Text fontSize={["xs", "sm", "md"]} fontWeight={'bold'} color={"gray.500"} > {item.name} </Text>
                                        <Text fontSize={["2xs", "xs", "sm"]} fontWeight={'semibold'} color={"gray.500"} > {item.distance} </Text>
                                    </VStack>
                                )
                            })
                        }
                    </HStack>
                </ScrollView>

                <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                    Best Food in Kolkata
                </Heading>

                {(() => {
                    if (Platform.OS === 'web') {
                        return console.log("web");
                    }
                    else {
                        return console.log("mob");
                    }
                })()}

                <HStack space={12} bgColor={'white'}>
                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box borderRadius={2}>
                                    <AspectRatio w="99%" ratio={4 / 3}>
                                        <Image borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/chains/9/21429/d505be0b3ee11e4f79581b7b9df2d04a_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                Allen Kitchen
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                4.2 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                Bengali , Seafood
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>24 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>

                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box borderRadius={2}>
                                    <AspectRatio w="100%" ratio={4 / 3}>
                                        <Image w="99%" borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/chains/5/23295/24d8c0a94d2d43259d290d13eab03b17_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                    <Center bg="blue.500" _text={{
                                        color: "warmGray.50",
                                        fontWeight: "400",
                                        fontSize: "xs"
                                    }} position="absolute" borderTopRightRadius={2} borderBottomRightRadius={2} bottom="2" px="1.5" py="0.3">
                                        20% OFF
                                    </Center>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                Denzong Kitchen
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                3.9 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                Momos , Chinese , Tib.. 
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>56 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>

                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box >
                                    <AspectRatio w="99%" ratio={4 / 3} >
                                        <Image borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/chains/0/22460/045fa3e9db1354d1675baacc778cd33b_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                AnnaRas - Since 1989
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                4.5 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                Gujarati , Street Food , 
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>32 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>
                </HStack>

                <HStack space={12} bgColor={'white'}>
                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box borderRadius={2}>
                                    <AspectRatio w="99%" ratio={4 / 3}>
                                        <Image borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/chains/2/19418342/2a1d62b543591043a7d640f464811427_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                    <Center bg="blue.500" _text={{
                                        color: "warmGray.50",
                                        fontWeight: "400",
                                        fontSize: "xs"
                                    }} position="absolute" borderTopRightRadius={2} borderBottomRightRadius={2} bottom="2" px="1.5" py="0.3">
                                        ₹125 OFF
                                    </Center>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                Shangai
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                4.1 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                Chinese , Sichuan
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>51 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>

                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box borderRadius={2}>
                                    <AspectRatio w="100%" ratio={4 / 3}>
                                        <Image w="99%" borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/1/21411/54778d99d9a20f5d73724971500c89ca_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                Royal Indian Hotel - Since 1905
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                4.2 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                Mughlai , Kebab 
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>25 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>

                        <VStack width={"30%"}  >                        
                            <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                <Box >
                                    <AspectRatio w="99%" ratio={4 / 3} >
                                        <Image borderRadius={12} source={{
                                            uri: "https://b.zmtcdn.com/data/pictures/4/18823714/ac86d415484fa57155bc1c0a3386dfee_o2_featured_v2.jpg?output-format=webp"
                                        }} alt="image" />
                                    </AspectRatio>
                                    <Center bg="blue.500" _text={{
                                        color: "warmGray.50",
                                        fontWeight: "400",
                                        fontSize: "xs"
                                    }} position="absolute" borderTopRightRadius={2} borderBottomRightRadius={2} bottom="2" px="1.5" py="0.3">
                                        ₹125 OFF
                                    </Center>
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <HStack justifyContent={'space-between'}>
                                            <Heading fontWeight={'semibold'} size="md" >
                                                Kake Di Hatti
                                            </Heading>
                                            <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                3.9 *
                                            </Center>
                                        </HStack>
                                        <HStack justifyContent={'space-between'} >
                                            <Text fontSize="sm" color={'gray.500'} fontWeight="normal" >
                                                North Indian , Mughlai
                                            </Text>
                                            <Text color={'gray.500'}>₹100 for one</Text>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} >
                                            <Text>51 min</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Box>    
                        </VStack>
                </HStack>

                
            </Box>
        </NativeBaseProvider>
    )
}

export default Home