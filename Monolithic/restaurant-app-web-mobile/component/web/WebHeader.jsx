import { Avatar, Box, ChevronDownIcon, Divider, HStack, Icon, Image, Input, Menu, Pressable, Text, VStack } from 'native-base';
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import React from 'react';

const WebHeader = (props) => {

    const windowWidth = Dimensions.get('window').width;

    let locationAndSearchBlock = 'flex';
    if (props.header === 'Payment' || windowWidth < 950) {
        locationAndSearchBlock = 'none';
    }

    let locationCarat = 'flex';
    if (windowWidth < 1260) {
        locationCarat = 'none';
    }

    const [caret, setCaret] = React.useState("caret-down");

    const MenuContent = () => {

        return (
            <>        
                <Menu.Item  pl={"0"} >
                    <HStack space={"3"}>
                        <Icon as={<MaterialIcons name="my-location" />} color={"red.400"} size={"4"} mt={"1"}/>
                    
                        <VStack>
                            <Text fontSize={'md'} color={'red.400'}>
                                Detect current location
                            </Text>
                            <Text fontSize={'sm'} color={'gray.400'} fontWeight={'hairline'}>
                                Using GPS
                            </Text>
                        </VStack>
                    </HStack>                                                            
                </Menu.Item>
                <Divider bgColor={'gray.100'} />
                <Menu.Item pl={"0"} pt={"5"} pb={"5"}>                    
                    <HStack space={"3"} alignItems={'center'}>
                        <Icon as={<AntDesign name="plus" />} color={"red.400"} size={"4"} />
                    
                        <VStack>
                            <Text fontSize={'md'} color={'red.400'} fontWeight={"semibold"}>
                                Add address
                            </Text>                        
                        </VStack>
                    </HStack>                    
                </Menu.Item>
                <Divider bgColor={'gray.100'} />
                <Menu.Group title="Saved Addresses" _title={ {  fontSize : "md" ,  textTransform : "none" , color : "black"  } }>
                    <Menu.Item h={"60px"}>
                        <HStack space={"3"} alignItems={'center'}>
                            <Icon as={<Ionicons name="home-outline" />} size={4} />
                        
                            <VStack>
                                <Text fontSize={'md'}>
                                    Home
                                </Text>
                                <Text fontSize={'sm'} fontWeight={'hairline'}>
                                    Kolkata , India - 700001
                                </Text>
                            </VStack>
                        </HStack>
                    </Menu.Item>
                    <Menu.Item h={"60px"}>
                        <HStack space={"3"} alignItems={'center'}>
                            <Icon as={<SimpleLineIcons name="briefcase" />} size={4} />
                        
                            <VStack>
                                <Text fontSize={'md'}>
                                    Work
                                </Text>
                                <Text fontSize={'sm'} fontWeight={'hairline'}>
                                    Kolkata , India - 700091
                                </Text>
                            </VStack>
                        </HStack>
                    </Menu.Item>
                </Menu.Group>
            </>
        )
    }

    return (
        <HStack w={"82%"} bg={"white"} pt={"10px"} pb={"10px"} alignSelf={'center'} justifyContent={'space-between'}>
            <HStack w={"14%"} alignItems={'center'}>
                <Image height={"28px"} width={"131px"} source={{ uri: "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" }} alt="logo" />
            </HStack>

            <HStack w={"64%"} h={"55px"} display={locationAndSearchBlock} borderRadius={5} borderWidth={"1px"} borderColor={"gray.300"} shadow={1}>
                <HStack w={"35%"} justifyContent={'space-between'}>
                    <HStack alignItems={'center'}>
                        <Icon as={<MaterialIcons name="location-on" />} color={"red.400"} size={6} pl={"6px"} />
                        <Menu mt={"5"} ml={"32"} borderWidth={"1"} borderColor={"gray.200"} bgColor={"white"} placement='bottom'        w={"360px"} onOpen={() => { setCaret("caret-up") }} onClose={() => { setCaret("caret-down") }} trigger={triggerProps => {
                            return <Pressable  {...triggerProps} >
                                <Input variant="unstyled" placeholder="Kolkata" fontSize={'sm'} />
                            </Pressable>;
                        }}>
                            <MenuContent />
                        </Menu>
                    </HStack>
                    <HStack alignItems={'center'} >
                        <Menu mt={"7"} ml={"32%"} borderWidth={"1"} borderColor={"gray.200"} bgColor={"white"} placement='bottom right' w={"360px"} onOpen={() => { setCaret("caret-up") }} onClose={() => { setCaret("caret-down") }} trigger={triggerProps => {
                            return <Pressable  {...triggerProps} >
                                <Icon as={<FontAwesome name={caret} />} size={5} />{/*  display={locationCarat}   */}
                            </Pressable>;
                        }}>
                            <MenuContent />
                        </Menu>
                        <Text fontSize={'xl'} color={"gray.300"} mb={'2'}>|</Text>
                    </HStack>
                </HStack>

                {/* <HStack  w={"65%"} bgColor={'amber.500'}>
                    <Menu borderWidth={"1"} borderColor={"gray.200"} bgColor={"white"} placement='bottom' trigger={triggerProps => {
                        return <Pressable  {...triggerProps} >
                                    <Input w={"100%"} variant="unstyled" placeholder="Search for resturant, cuisine or a dish" fontSize={'md'} InputLeftElement={<Icon ml="2" size="7" color="gray.500" as={<EvilIcons name="search" />} />} />
                                </Pressable>;
                    }}>
                        <MenuContent />
                    </Menu> 
                </HStack> */}

                {/* <Menu borderWidth={"1"} borderColor={"gray.200"} bgColor={"white"} placement='bottom' trigger={triggerProps => {
                    return <Pressable  {...triggerProps} >
                                <Input w={"65%"} variant="unstyled" placeholder="Search for resturant, cuisine or a dish" fontSize={'md'} InputLeftElement={<Icon ml="2" size="7" color="gray.500" as={<EvilIcons name="search" />} />} />
                            </Pressable>;
                }}>
                    <MenuContent />
                </Menu> */}

                <Input w={"65%"} variant="unstyled" placeholder="Search for resturant, cuisine or a dish" fontSize={'md'} InputLeftElement={<Icon ml="2" size="7" color="gray.500" as={<EvilIcons name="search" />} />} />
                
            </HStack>
            
            <VStack w={"22%"} alignItems={'self-end'} pt={"5px"}>
                <Menu placement='bottom right' w={"150px"} trigger={triggerProps => {
                    return <Pressable  {...triggerProps}>
                        <HStack alignItems={'center'}>
                            <Avatar size={'42px'} source={{ uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" }} />
                            <Text pl={"7px"} fontSize={"md"} fontWeight={"semibold"} >
                                {props.usernamee}
                            </Text>
                            <ChevronDownIcon size="3" pl={"7px"} pr={"5px"} />
                        </HStack>
                    </Pressable>;
                }}>
                    <Menu.Item isFocused><Text onPress={() => navigation.navigate("Home")}>Home</Text></Menu.Item>
                    <Menu.Item><Text onPress={() => navigation.navigate("SignUpNew")}>Profile</Text></Menu.Item>
                    <Menu.Item><Text>Sign Out</Text></Menu.Item>
                </Menu>
            </VStack>
        </HStack>
    )
}

export default WebHeader