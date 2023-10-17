import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, NativeBaseProvider, Link, PresenceTransition, VStack, HStack, Alert, Avatar, AspectRatio, Image, Stack, Flex, Spacer, ScrollView, Divider, StatusBar, IconButton, Icon, Input, Button, ChevronDownIcon, Menu, HamburgerIcon, Popover, Badge, Modal, Radio, Spinner, CloseIcon, CheckIcon } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Platform, Pressable, Alert as ReactAlert } from 'react-native';
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Screen, ScreenContainer } from 'react-native-screens';
import { Dimensions } from 'react-native';
import ApiService from './service/apiService';




const Payment = ({ navigation }) => {
    
    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    const [upiBlock, setUpiBlock] = useState('none');
    const [mobikwikBlock, setMobikwikBlock] = useState('none');

    const Modals = () => {

        return  <Center>            
                    {/* Payment Process Modal Start */}

                    <Modal isOpen={paymentProcessModal} onClose={() => setPaymentProcessModal(false)} size="lg">
                        <Modal.Content w="2xs" >
                            <Modal.Body>
                                <VStack space={3} alignItems="center">
                                    <Spinner size="xl" color="red.400" />
                                    <Text fontSize="md" m={2}>Verifying UPI / Linking Wallet</Text>
                                </VStack>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/* Payment Process Modal End */}

                    {/* Payment Success Modal Start */}

                    <Modal isOpen={paymentSuccessModal} onClose={() => setPaymentSuccessModal(false)} size="lg">
                        <Modal.Content w="2xs" >
                            <Modal.Body>
                                <VStack space={3} alignItems="center">
                                    <Icon as={<AntDesign name="checkcircleo" />} size="3xl" color="green.700" />
                                    <Text fontSize="md" m={2}>Verifying UPI / Linking Wallet Successfully.</Text>
                                </VStack>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/* Payment Success Modal End */}

                    {/* Payment Failed Modal Start */}

                    <Modal isOpen={paymentFailedModal} onClose={() => setPaymentFailedModal(false)} size="lg">
                        <Modal.Content w="2xs" >
                            <Modal.Body>
                                <VStack space={3} alignItems="center" p={5}>
                                    <Icon as={<AntDesign name="closecircleo" />} size="3xl" color="red.700" />
                                    <Text fontSize="md" m={2}>Verifying UPI / Linking Wallet Failed.</Text>
                                </VStack>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/* Payment Failed Modal End */}

                </Center>;
    };

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} bgColor={'gray.100'}>

                <Modals />

                <Box alignSelf={'center'} w={'sm'} >

                    <HStack w={"100%"} mt={'4'} mb={'4'} alignItems={'center'}>
                        <Pressable onPress={() => navigation.replace("Checkout")}>
                            <Icon as={<AntDesign name="arrowleft" />} size={4} m={'3'} ml={'0'} />
                        </Pressable>
                        <Text fontSize={'md'} fontWeight={'bold'} ml={'2'}>Bill total: ₹821.00</Text>
                    </HStack>

                    <ScrollView w={"100%"} showsVerticalScrollIndicator={false} >

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>CARDS</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'icici'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/jpeg;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                ICICI CC
                                            </Text>
                                            <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                                ***** 1003
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Divider w={"90%"} alignSelf={'center'} bgColor={"gray.100"} />

                            <Pressable onPress={() => navigation.navigate("AddPayment" , { payment : 'card'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <FontAwesome name="credit-card" size={22} />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Add credit or debit Cards
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>ADD</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Divider w={"90%"} alignSelf={'center'} bgColor={"gray.100"} />

                            <Pressable onPress={() => navigation.navigate("AddPayment" , { payment : 'card'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "https://www.engagemartech.com/hubfs/Sodexo.png"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Add Sodexo
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>ADD</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>UPI</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15}>
                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'paytm upi'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Paytm UPI
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'cred pay upi'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                CRED pay UPI
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                
                                    if(upiBlock === 'none') 
                                    {
                                      setUpiBlock('flex') ; 
                                      setMobikwikBlock('none') ;
                                    }   
                                    else
                                      setUpiBlock('none');                
                                } }>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "https://pixlok.com/wp-content/uploads/2021/01/UPI_logo_PNG.jpg"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Add new UPI ID
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>ADD</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <VStack p={'3'} display={upiBlock} >
                              <Input placeholder="Enter your UPI ID" borderRadius={'10'}/>
                              <Text fontSize={'2xs'} mt={'2'} mb={"2"} color={'gray.400'}>Your UPI ID will be encrypted and is 100% safe with us</Text>
                              <Button bgColor={'red.400'} borderRadius={'7'}
                                  onPress={() => {
                                        setPaymentProcessModal(true);
                                        setTimeout(() => {
                                            setPaymentProcessModal(false);
                                        }, 1500);  
                                        setTimeout(() => {
                                            setPaymentSuccessModal(true);
                                        }, 1500);
                                        setTimeout(() => {
                                            navigation.navigate("Checkout" , { payment : 'new added upi'   } )
                                        }, 5000);
                                    }}> 
                                  Safe UPI ID 
                              </Button>
                            </VStack>
                            
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>WALLET</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'paytm wallet'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Paytm
                                            </Text>
                                            <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                                Balance: ₹0.00
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                
                                    if(mobikwikBlock === 'none') 
                                    {
                                      setMobikwikBlock('flex') ; 
                                      setUpiBlock('none') ;
                                    }   
                                    else
                                      setMobikwikBlock('none');
                                } }>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Mobikwik
                                            </Text>
                                            <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                                Link your Mobikwik wallet
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>Link</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <VStack p={'3'} display={mobikwikBlock} >
                                  <Input placeholder="Enter your mobile number" borderRadius={'10'}/>
                                  <Text fontSize={'2xs'} mt={'2'} mb={"2"} color={'gray.400'}>
                                    If you dont have a Mobikwik wallet, it will be created.
                                  </Text>
                                  <Button bgColor={'red.400'} borderRadius={'7'} 
                                      onPress={() => {
                                        setPaymentProcessModal(true);
                                        setTimeout(() => {
                                            setPaymentProcessModal(false);
                                        }, 1500);                                                    
                                        setTimeout(() => {
                                            setPaymentSuccessModal(true);
                                        }, 1500);
                                        setTimeout(() => {
                                            navigation.navigate("Checkout" , { payment : 'mobikwik wallet'   } );
                                        }, 5000);
                                    }}>
                                      Link wallet 
                                  </Button>
                            </VStack>

                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'amazon pay wallet'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5PP1DI0dcY4QFU_1SwCg5ni0sKUPsWfZTVA&usqp=CAU"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Amazon Pay
                                            </Text>
                                            <Text
                                                fontSize={'xs'}
                                                fontWeight={'normal'}
                                                color={'gray.500'}>
                                                Balance: ₹60.00
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>Link</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>PAY LATER</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'simpl'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"50%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARsAAACyCAMAAABFl5uBAAAAYFBMVEX///8A08EA0L2N5dve9/TD8eu87+l34dX3/f3v+/qG5NnQ9O9n3tHF8ez8//6q6+Pf9/Tn+fec6N9J2stV280t1sa27ufT9PAo1sVt39Oj6uGu7OSJ5Nrr+vh94tdA2cn1GgsXAAAJwElEQVR4nO1d24KiMAyVgiiKdxyZcYX//8v1SpOQ4oBRm5HztAsOtsc2l9O0DAY9evTo0aNHjx6PYLyL10W6yQNzRrDdpJN1HI3f3a43IxmG2ZmSgOB8LQtnH0rQOC6COimUoXwynL+7pS9Gstjc4QUQlO0/Z/jM978mpqInfnejX4Jo1I6YGz2T1btb/mwMyw7EXOnJpu9u/TMR552ZObOznb27B8/C7DFmzuyUf3LsRA2z6Rr1BXlu/+36aPbn7M58xHf3HOP928+Wif1sEs0Wk8wZ/Jh/7+vGMxCz/TRmE84S198cg+aS5ccEf2hijTOmiyYo7oe845j1+Ob7Fc1+BWb13hkz+vVvP/vm6Nk9s8Uvw6SeSZZfrZ4wX9Q9nFk/qbkvxLjmnkza4Tef1qalyeQb+1pEdVPR0QdHdaOl25tT//RQdFKLkIxmf/WDO/Ow840D8sB2dssn/CM9ETCfxLCbn8cf+RYUqB+mFDEPEXZZSt0VzhJMKPXc4knPfSHI6L/rt8eraHfE8nA3WB5qJyeEHTBlk+K7isM0NwDl93roTLOOSHLV5OwRNe70Z7VIOUXidG0UuwnNFBvkKaLG9cMe1nmTdnxM0/f8BFuij22e148n4ICo2fMfin+x2mDMN2OolujxuqgZQHtg+OWTn+AuMde/L6lIrJoaaA3MkPvEr5k5PwJL6KqpgZkCG9XP2jBzYcDGjZFmalaQGsaFJJwKeJedmz1XTQ00NmZSv/3VbSHG5NHpr3VTA4M+Rn5Ku69rrrVTAy1lXru76krMmYtsp5qawRY0vpZ4M6p6O3ZUUwNyhbqLWjy85quZmgFofUrvrT+bGqj00VQo/GxqEjCjaDz84aNmUNjmU/fdMazhoZAaOGyINrX7cGrAsKGSTSJJTWD0LYaPAQHk1tbd0U7kNCmmXsJaW7PAdwrRYXPE9j097A7QdnxjKk2NugKcmXPYSDMTqFvttWqfwTfqBTgS5GgyOdYSEye1egY1QVC+qZ9dYBNJ8pNupNgwGXyWplUp22wcEosZ4nOhFvz/4T0dbQ8b3ZFMqpSkBk1QNeGxFW6wJZZKFm7lfUADcqx8+Ye0anKBrmdcR7tTgx/48l52gx02aKHtIDNsQFEoyEyUFCZFjiklI2ihellQX2lU7OW0a5nYS0kwQ59pPaKO0pvK3OB8QcYSE4d0UDZwbGuX8PJEghryTKhKaxg4icPciFATUIc0BwPnhZ3siBlvbsRSKbKe41aKPERlivEg34vlCyTMs3fq68q+YcR3YsT1sxs52OiCgeO9dly5VWw2c76jXYCFPmBxRi/taAfwv+9cULkxEfpC6wC9t8aWBHg1asPNvTGGtSxr5X3POK0LR2Eav7u3I3Ce5pSLvIMdIMjZSi6B03WXL0dE5R2stocEioLvZEeQXXYuLc03DPnwJnX0siPw5LEP99tTVYYFC9xiKvr14Sv2Oz2XuKr4F4fwUlLxDWhQ2gChXlfoEyw3aF+HYOh3AfpSG296vca54LkRrp4g+YH1gl4bHMeckuYmQGXuVjfzOt/84m2xtL0hk8oaHJ/VP+unkPIvtP5iga1uRb3XubiVttCZRt/i3CCrW/CXPcOON4syajEECrutcuazamyzYhS7/ojmUyegnGrHZ3Gewa41osYPxblBeWXCf6tv4JPipTw3y/vf6huqSAbXJclzg3LuKu722onbZU0kJIgHODi2rGIEr8uUQr7x8o4KeaQqRiBisl/44sUteWOMYgQb4Pgc/EW8yxiLc4O8tR2tXp9P68htxA0Oip+qTNxvbqyjQs2UVdPd3Hi9DmOtLrKW4nXXGrmJHWKK9KRycOP1UgMowEGxhlglBcdNqMPeAIODK2KEuUElA9VE9vyAyMqfkuo84fAPqaK2ssXn+AYKBjilEiowvj2b1xX9XoWBZSa4IlpU/MMOyYqinm+mAovf6LrowMGTx15+aU/bw9YLEMsouZHVwCP/QOnTa7vaHrYHeFFfsnoLkWClM+93C9mtC8Q0CsY4KNW0Wb7XC5snAMNCdijL7UpES4M2LPZ/PwzY6It1OLETF7CGZcVGr1OGM8DOTLIoInWIiWNDgNeS6BW2NoDuzviWIQfNVTuHfXfhJ4BSKuo5REoqcORnB6PnlaIX5I5uPHxA2/Wh6Jk2m/J5ybcCLCiG12WoIe7PUuZ3Fn4DmDog5hCiBnPg2iHqLYCrsj0RooYoiqGeqPgKWI50XXGQooacn20XfP2P/C6AWffFfUhRQxJKMKWWXEN8BNgQfv5Bxagh55YAPfE9He0CeHzxVHDUEApUbfW9AW2akkvBSU3fl8IpNcDHLMiNGlKaZYMFr4uLaxAvuQ5qowOIjP5vgoaQPQTywgB53yiQQ5S9W1y+7IZMHHDMhfeSH4XkUcUn0PUncJKJzxVbPGSr9Wnd+cythWiApD02BXk4kEJ0pOAIohaHjg1Q7q7pAMQrRKmhRecJl+urgayfonXVwJbpszay1ND4BaxZqEoXzhClJqejBgaWyg4xlqWGedcAfKeKspAYU2M2DxFVc96oKENZJkWpGT10Ci2z1RAukGrz3zGhZjAYdx06Jq8XqkFtyPc6Noo6NYOubw/i5DxohzUd7XwCS02nF9yZknHPY/gJZaGNg5ojpnkrdkzA1eDP0fEWunyUm5rTzd+zYwLWASFqPC8opmik5ohh+St2TM5vhB8janQZm3vUHLGc3NPWjRk5BkSCPqYrIMaVWc62T4/0OPg5vRXbWZsWoY8qs8PkKL+GArzV12hr0DvDz//7XjSom5h5XasuA7qL7N5i43K4CEdpttlk6Sj8iaPm/d3kpSm6XNQJhJyNWA8SYsQ937vAgrxzVaqwlR4uqaAmlMGBkJMKnIQwpu//1ThqTkgCws7DZ/bQWoNcn625YU5MgykfWlrbbenjpBr6FtApYNLOUsKSpqjKQr46arvlTdpJ8Y5qLxpXlihwqCt9Jmu9RXlWV8SUpZc8aDxy6lewbuFfDut63iUYL70XzCkUxmwWv6LnsCiZjEtNnex9LDm1xphtOG0MeebTMOdSUbNVpg03w3GAiTFlsd8x02O82xdbR4r+B4wwhlskPmXdZTpZL/bxcBjvF+tJWgbGJV0c/ZzWULgB022jkmUqNH6q/AvuiUELkdjBTO73ASUPIW4eO3eYKf3fo/oQplnzpHESY9I/OpsgkrB9eXq7YFE1pkUbekxQfMCQAZj+Y8O6+lTKw88i5oIkPoV3ToKOt7ZF/ClTicF8t59kILapYpxssv/E8cIgiabHiPhnvf45RsfT6IMHS48ePXr06NGjRwN8fhFBjw/Af5efboGv/5ZdAAAAAElFTkSuQmCC"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Simpl
                                            </Text>
                                            <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                                Available Credit: ₹3900.00
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"50%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'lazypay'   } )}}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/jpeg;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                LazyPay
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>

                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'patym postpaid'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <Image source={{
                                                uri: "data:image/png;base64,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"
                                            }} alt="Alternate Text" size="2xs" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Paytm Postpaid
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right" />
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>NETBANKING</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15}>
                            <Pressable onPress={() => navigation.navigate("AddPayment" , { payment : 'bank'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <FontAwesome name="bank" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Netbanking
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <Text fontSize={'sm'} color={"red.500"}>ADD</Text>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'}>CASH ON DELIVERY</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15}>
                            <Pressable onPress={() => navigation.navigate("Checkout" , { payment : 'cash on delivery'   } )}>
                                <HStack m={'3'}>
                                    <HStack w={"90%"} space={5} alignItems={'center'} >
                                        <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                            <MaterialIcons name="delivery-dining" />
                                        </Box>
                                        <VStack>
                                            <Text fontSize={'md'} fontWeight={'bold'}>
                                                Cash On Delivery
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <VStack w={"10%"} alignSelf={'center'} alignItems={'flex-end'}>
                                        <AntDesign name="right"/>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        {/* footer space for safearea  */}
                        <Text mb="48"></Text>

                    </ScrollView>

                </Box>



            </Box>
        </NativeBaseProvider >
    )
}

export default Payment
