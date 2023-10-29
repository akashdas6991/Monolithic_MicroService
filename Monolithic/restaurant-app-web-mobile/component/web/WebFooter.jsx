import React from 'react';
import { Box, Text, VStack, HStack, Image, Button, Divider, Icon, Popover } from "native-base";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const WebFooter = () => {

    return (
        <Box w={"100%"} bgColor={"gray.100"} >
            <VStack w={"82%"} alignSelf={'center'} pt={"12"} pb={"10"} space={"5"}>

                <HStack justifyContent={'space-between'}>
                    <Image height={"28px"} width={"131px"} source={{ uri: "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" }} alt="logo" />
                    <HStack space={'4'}>

                        <Popover placement='top right' trigger={triggerProps => {
                            return <Button {...triggerProps} variant={"unstyled"} borderWidth={'1'} borderRadius={"7"} borderColor={"gray.400"} size={"lg"} p={2} pt={1} pb={1} >
                                <HStack alignItems={'center'} space={"2"}>
                                    <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />
                                    <Text fontSize={"lg"}>India</Text>
                                    <Icon as={<AntDesign name="down" />} color={"gray.600"} size={3} />
                                </HStack>
                            </Button>;
                        }}>
                            <Popover.Content shadow={'9'}>
                                <Popover.Arrow />                                
                                <Popover.Body>                                    
                                    <HStack>

                                        <VStack space={'1'}>
                                            <Button variant={'unstyled'}  bgColor={"blue.100"}                            justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>India</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Chile</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Italy</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Philippines</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Singapore</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Turkey</Text>  </HStack>  </Button>
                                        </VStack>

                                        <VStack space={'1'}>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Australia</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Czech<br/>Republic</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Lebanon</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Poland</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Slovakia</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>UAE</Text>  </HStack>  </Button>                                           
                                        </VStack>

                                        <VStack space={'1'}>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Brazil</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Indonesia</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Malaysia</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Portugal</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>South Africa</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>United<br/>Kingdom</Text>  </HStack>  </Button>                                           
                                        </VStack>

                                        <VStack space={'1'}>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Canada</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Ireland</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>New Zealand</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Qatar</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>Sri Lanka</Text>  </HStack>  </Button>
                                            <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   justifyContent={'left'} h={'8'} w={'32'} p={0} >   <HStack space={'2'} alignItems={'center'}>  <Icon as={<AntDesign name="flag" />} color={"gray.600"} size={5} />  <Text fontSize={"sm"}>USA</Text>  </HStack>  </Button>                                           
                                        </VStack>
                                        
                                    </HStack>
                                </Popover.Body>                                
                            </Popover.Content>
                        </Popover>


                        <Popover trigger={triggerProps => {
                            return  <Button {...triggerProps} variant={"unstyled"} borderWidth={'1'} borderRadius={"7"} borderColor={"gray.400"} size={"lg"} p={2} pt={1} pb={1}>
                                        <HStack alignItems={'center'} space={"2"}>
                                            <Icon as={<Ionicons name="globe-outline" />} color={"gray.800"} size={5} />
                                            <Text fontSize={"lg"}>English</Text>
                                            <Icon as={<AntDesign name="down" />} color={"gray.600"} size={3} />
                                        </HStack>
                                    </Button>;
                        }}>
                            <Popover.Content shadow={'9'}>
                                <Popover.Arrow/>                                
                                <Popover.Body>
                                    <VStack space={'1'}>
                                        <Button variant={'unstyled'} bgColor={"blue.100"} p={1} justifyContent={'left'}><Text fontSize={"md"}>English</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Türkçe</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>हिंदी</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Português (BR)</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Indonesian</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Português (PT)</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Español</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Čeština</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Slovenčina</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Polish</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Italian</Text></Button>
                                        <Button variant={'unstyled'} _hover={ {   backgroundColor : "gray.100"  } }   p={1} justifyContent={'left'} ><Text fontSize={"md"}>Vietnamese</Text></Button>
                                    </VStack>
                                </Popover.Body>                                
                            </Popover.Content>
                        </Popover>

                    </HStack>
                </HStack>

                <HStack space={'85px'} mt={'5'}>
                    <VStack space={'1'}>
                        <Text fontSize={"sm"} fontWeight={"semibold"}>A B O U T  Z O M A T O</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Who We Are</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Blog</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Work With Us</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Investor Relations</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Report Fraud</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Press Kit</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Contact Us</Text>
                    </VStack>
                    <VStack space={'1'}>
                        <Text fontSize={"sm"} fontWeight={"semibold"} >Z O M A V E R S E</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Zomato</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Blinkit</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Feeding India</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Hyperpure</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Zomaland</Text>
                    </VStack>
                    <VStack space={'1'}>
                        <Text fontSize={"sm"} fontWeight={"semibold"} >F O R  R E S T A U R A N T S</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Partner With Us</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Apps For You</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>&nbsp;</Text>
                        <Text fontSize={"sm"} fontWeight={"semibold"} >F O R  E N T E R P R I S E S</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Zomato For Enterprise</Text>
                    </VStack>
                    <VStack space={'1'}>
                        <Text fontSize={"sm"} fontWeight={"semibold"} >L E A R N  M O R E</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Privacy</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Security</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Terms</Text>
                        <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.500"}>Sitemap</Text>
                    </VStack>
                    <VStack space={'3'}>
                        <Text fontSize={"sm"} fontWeight={"semibold"} >S O C I A L  L I N K S</Text>
                        <HStack space={'2'} mb={'2'}>
                            <Icon as={<Entypo name="linkedin-with-circle" />} size={6} color={"black"} />
                            <Icon as={<Entypo name="instagram-with-circle" />} size={6} color={"black"} />
                            <Icon as={<Entypo name="twitter-with-circle" />} size={6} color={"black"} />
                            <Icon as={<Entypo name="youtube-with-circle" />} size={6} color={"black"} />
                            <Icon as={<Entypo name="facebook-with-circle" />} size={6} color={"black"} />
                        </HStack>
                        <Image height={"10"} width={"145px"} source={{ uri: "https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" }} alt="logo" />
                        <Image height={"10"} width={"145px"} source={{ uri: "https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" }} alt="logo" />
                    </VStack>
                </HStack>

                <Divider mt={"10"} />

                <Text fontSize={"sm"} color={"gray.500"}>
                    By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.
                    All trademarks are properties of their respective owners. 2008-2023 © Zomato™ Ltd. All rights reserved.
                </Text>
            </VStack>
        </Box>
    )
}

export default WebFooter