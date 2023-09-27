import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, NativeBaseProvider, Link, PresenceTransition, VStack, HStack, Alert, Avatar, AspectRatio, Image, Stack, Flex, Spacer, ScrollView, Divider, StatusBar, IconButton, Icon, Input, Button, ChevronDownIcon, Menu, HamburgerIcon, Popover } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Platform, Pressable, Alert as ReactAlert } from 'react-native';
import { EvilIcons, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Screen, ScreenContainer } from 'react-native-screens';
import { Dimensions } from 'react-native';



const Home = ({ props, navigation }) => {

    const [popUp, setPopUp] = useState([]);
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");

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
                        <Text color={"green.600"} fontSize={"4xl"} fontWeight={"extrabold"}>
                            Home
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

                <HStack w={"80%"} space={"50px"} alignSelf={'center'} mt={1}>
                    <HStack alignItems={'center'}>
                        <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png" }} size={"lg"} borderWidth={"13px"} borderColor={"orange.100"} bgColor={"orange.100"} />
                        <Text color={"red.400"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Delivery</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png" }} size={"lg"} borderWidth={"13px"} borderColor={"gray.100"} bgColor={"gray.100"} />
                        <Text color={"gray.500"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Dining Out</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png" }} size={"lg"} borderWidth={"13px"} borderColor={"gray.100"} bgColor={"gray.100"} />
                        <Text color={"gray.500"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Nightlife</Text>
                    </HStack>
                </HStack>

                <Divider mt={5} mb={6} />

                <HStack mb={6} w={"82%"} space={3} alignSelf={'center'}>
                    <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _text={{ color: "gray.400" }} _hover={{ bgColor: "gray.50" }}>
                        <HStack>
                            <Icon as={<FontAwesome5 name="filter" />} color={"gray.400"} size={3} mt={"6px"} mr={1} />
                            <Text fontSize={'md'} color={"gray.400"} >Filters</Text>
                        </HStack>
                    </Button>
                    <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _text={{ color: "gray.400" }} _hover={{ bgColor: "gray.50" }}>
                        <Text fontSize={'md'} color={"gray.400"} >Rating : 4.0+</Text>
                    </Button>
                    <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _text={{ color: "gray.400" }} _hover={{ bgColor: "gray.50" }}>
                        <Text fontSize={'md'} color={"gray.400"} >Pure Veg</Text>
                    </Button>
                    <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _hover={{ bgColor: "gray.50" }}>
                        <HStack >
                            <Text fontSize={'md'} color={'gray.400'}>Cuisines </Text>
                            <ChevronDownIcon size="3" color="gray.400" mt={1.5} ml={1} />
                        </HStack>
                    </Button>
                </HStack>

                <Box w={"100%"} bgColor={"gray.100"}>
                    <Box w={"82%"} alignSelf={'center'} bgColor={"gray.100"} pt={10} pb={8}>
                        <Heading fontWeight={'semibold'} size="lg" mb={2}>
                            Eat what makes you happy
                        </Heading>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                            <HStack space={"2xl"} justifyContent="center" p={3}>
                                {
                                    firstMenuItems.map((item) => {

                                        return (
                                            <VStack alignItems={'center'} space={1} key={item.id} >
                                                <Pressable >
                                                    {({ pressed }) => (
                                                        <Avatar {...pressed ? alert('Pressed!') : 'Press Me'} m={2} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
                                                    )}
                                                </Pressable>

                                                <Text fontSize={["sm", "md", "lg"]} fontWeight={'semibold'} > {item.name} </Text>
                                            </VStack>
                                        )
                                    })
                                }
                            </HStack>
                        </ScrollView>
                    </Box>
                </Box>

                <Box w={"82%"} alignSelf={'center'}>
                    <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                        Top brands for you
                    </Heading>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} p={"2"} bg={"white"}>
                        <HStack space={"2xl"} justifyContent="center" p={3}>
                            {
                                secondMenuItems.map((item) => {

                                    return (
                                        <VStack alignItems={'center'} space={3} key={item.id} >
                                            <Pressable >
                                                {({ pressed }) => (
                                                    <Avatar {...pressed ? alert('Pressed!') : 'Press Me'} size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
                                                )}
                                            </Pressable>
                                            <Text fontSize={["xs", "sm", "md"]} fontWeight={'normal'}  > {item.name} </Text>
                                            <Text fontSize={["2xs", "xs", "sm"]} fontWeight={'normal'} > {item.distance} </Text>
                                        </VStack>
                                    )
                                })
                            }
                        </HStack>
                    </ScrollView>
                </Box>

                {/* {(() => {
                        if (Platform.OS === 'web') {
                            return console.log("web");
                        }
                        else {
                            return console.log("mob");
                        }
                })()} */}

                <Box w={"82%"} alignSelf={'center'}>
                    <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                        Best Food in Kolkata
                    </Heading>
                    <HStack space={12} bgColor={'white'}>
                        <VStack width={"30%"} >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10} >



                                    <Box borderRadius={2}>
                                        <AspectRatio w="99%" ratio={4 / 3}>
                                            <Image borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/chains/9/21429/d505be0b3ee11e4f79581b7b9df2d04a_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
                                        </AspectRatio>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <HStack justifyContent={'space-between'}>
                                                <Heading fontWeight={'semibold'} size="md" >
                                                    Allen Kitchen
                                                </Heading>
                                                <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>4.2 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>
                        </VStack>

                        <VStack width={"30%"}  >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                    <Box borderRadius={2}>
                                        <AspectRatio w="100%" ratio={4 / 3}>
                                            <Image w="99%" borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/chains/5/23295/24d8c0a94d2d43259d290d13eab03b17_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
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
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>3.9 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>

                        </VStack>

                        <VStack width={"30%"}  >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                    <Box >
                                        <AspectRatio w="99%" ratio={4 / 3} >
                                            <Image borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/chains/0/22460/045fa3e9db1354d1675baacc778cd33b_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
                                        </AspectRatio>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <HStack justifyContent={'space-between'}>
                                                <Heading fontWeight={'semibold'} size="md" >
                                                    AnnaRas - Since 1989
                                                </Heading>
                                                <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>4.5 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>

                        </VStack>
                    </HStack>

                    <HStack space={12} bgColor={'white'}>
                        <VStack width={"30%"}  >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                    <Box borderRadius={2}>
                                        <AspectRatio w="99%" ratio={4 / 3}>
                                            <Image borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/chains/2/19418342/2a1d62b543591043a7d640f464811427_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
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
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>4.1 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>

                        </VStack>

                        <VStack width={"30%"}  >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                    <Box borderRadius={2}>
                                        <AspectRatio w="100%" ratio={4 / 3}>
                                            <Image w="99%" borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/1/21411/54778d99d9a20f5d73724971500c89ca_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
                                        </AspectRatio>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <HStack justifyContent={'space-between'}>
                                                <Heading fontWeight={'semibold'} size="md" >
                                                    Royal Indian Hotel - Since 1905
                                                </Heading>
                                                <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>4.2 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>

                        </VStack>

                        <VStack width={"30%"}  >

                            <Pressable onPress={() => alert("I'm Pressed")}>

                                <Box w={"100%"} bgColor={"white"} borderRadius={10}>
                                    <Box>
                                        <AspectRatio w="99%" ratio={4 / 3} >
                                            <Image borderRadius={12} source={{ uri: "https://b.zmtcdn.com/data/pictures/4/18823714/ac86d415484fa57155bc1c0a3386dfee_o2_featured_v2.jpg?output-format=webp" }} alt="image" />
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
                                                    <HStack>
                                                        <Text color={"white"} fontWeight={'bold'}>3.9 </Text>
                                                        <Icon as={<FontAwesome5 name="star" />} color={"white"} size={"10px"} mt={"5px"} />
                                                    </HStack>
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

                            </Pressable>

                        </VStack>
                    </HStack>
                </Box>


            </Box>
        </NativeBaseProvider>
    )
}

export default Home