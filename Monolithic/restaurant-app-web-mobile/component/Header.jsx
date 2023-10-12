import { EvilIcons, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { AspectRatio, Avatar, ChevronDownIcon, Divider, HStack, Icon, Image, Input, Menu, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

const Header = (props) => {

    const windowWidth = Dimensions.get('window').width;

    let locationAndSearchBlock = 'flex';
    if(props.header === 'Payment' || windowWidth < 950)
    {
        locationAndSearchBlock = 'none';
    }

    let locationCarat = 'flex';
    if(windowWidth < 1260)
    {
        locationCarat = 'none';
    }


    return (        
            <HStack w={"82%"}  bg={"white"} pt={"10px"} pb={"20px"} alignSelf={'center'} justifyContent={'space-between'}>
                <HStack w={"14%"} alignItems={'center'}>
                        <Image  height={"28px"} width={"131px"} source={{ uri: "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" }} alt="logo" />
                </HStack>

                <HStack w={"64%"} h={"55px"} display={locationAndSearchBlock} borderRadius={5} borderWidth={"1px"} borderColor={"gray.300"} shadow={1}>
                    <HStack w={"35%"} alignItems={'center'} justifyContent={'space-between'}>
                        <HStack>
                            <Icon as={<MaterialIcons name="location-on" />} color={"red.400"} size={6} m={"6px"} />
                            <Input w={"80%"} variant="unstyled" placeholder="Kolkata" fontSize={'sm'} />
                        </HStack>
                        <HStack >
                            <Menu mt={5} bgColor={"white"} placement='bottom right' w={"245px"} trigger={triggerProps => {
                                return  <Pressable  {...triggerProps}>
                                            <Icon as={<FontAwesome name="caret-down" />} size={5} display={locationCarat} />
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

                    <Input w={"60%"} variant="unstyled" placeholder="Search for resturant, cuisine or a dish" fontSize={'md'} InputLeftElement={<Icon ml="2" size="7" color="gray.500" as={<EvilIcons name="search" />} />} />
                </HStack>

                <VStack w={"22%"} alignItems={'self-end'} pt={"5px"}>
                    <Menu placement='bottom right' w={"150px"} trigger={triggerProps => {
                        return  <Pressable  {...triggerProps}>
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

export default Header