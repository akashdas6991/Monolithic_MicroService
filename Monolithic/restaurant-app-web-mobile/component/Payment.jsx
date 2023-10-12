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
import Header from './Header';
import ApiService from './service/apiService';



const Payment = ({ navigation }) => {

    const wallets = ApiService.wallets();
    const banks = ApiService.banks();

    const [walletModal, setWalletModal] = useState(false);
    const [netbankingModal, setNetbankingModal] = useState(false);
    const [creditDebitModal, setCreditDebitModal] = useState(false);
    const [upiModal, setUpiModal] = useState(false);
    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    const Modals = () => {

        return <Center>

            {/* Wallet Modal Start */}

            <Modal isOpen={walletModal} onClose={() => setWalletModal(false)} size="lg" >
                <Modal.Content w="320px" h="320px">
                    <Modal.Body>
                        <VStack>

                            <HStack space={5} alignItems={'center'} p={5} justifyContent={"space-between"}>
                                <Text>Select a Wallet</Text>
                                <Modal.CloseButton />
                            </HStack>

                            {
                                wallets.map((item) => {

                                    return (
                                        <>
                                            <Pressable onPress={() => { 
                                                        setWalletModal(false); 
                                                        setPaymentProcessModal(true); 
                                                        setTimeout(() => {
                                                            setPaymentProcessModal(false);
                                                            setPaymentSuccessModal(true);
                                                        }, 1500);
                                                        setTimeout(() => {
                                                            setPaymentSuccessModal(false);
                                                        }, 3000);    }}  key={item.id} >

                                                <HStack space={5} alignItems={'center'} p={5} key={item.id}>
                                                    <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2}>
                                                        <Icon as={<FontAwesome5 name="wallet" />} size={4} />
                                                    </Box>
                                                    <VStack>
                                                        <Text fontSize={'md'}>
                                                            {item.name}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </Pressable>

                                        </>
                                    )
                                })
                            }

                        </VStack>

                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Wallet Modal End */}

            {/* Netbanking Modal Start */}

            <Modal isOpen={netbankingModal} onClose={() => setNetbankingModal(false)} size="lg" >
                <Modal.Content w="320px" h="320px" >
                    <Modal.Body >
                        <VStack >

                            <HStack space={5} alignItems={'center'} p={5} justifyContent={"space-between"}>
                                <Text>Select a Bank</Text>
                                <Modal.CloseButton />
                            </HStack>

                            {
                                banks.map((item) => {

                                    return (
                                        <>
                                            <Pressable onPress={() => { 
                                                        setNetbankingModal(false); 
                                                        setPaymentProcessModal(true); 
                                                        setTimeout(() => {
                                                            setPaymentProcessModal(false);
                                                            setPaymentFailedModal(true);
                                                        }, 1500);
                                                        setTimeout(() => {
                                                            setPaymentFailedModal(false);
                                                        }, 3000);    }}   >

                                                <HStack space={5} alignItems={'center'} p={5} key={item.id}>
                                                    <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2}>
                                                        <Icon as={<FontAwesome name="bank" />} size={4} />
                                                    </Box>
                                                    <VStack>
                                                        <Text fontSize={'md'}>
                                                            {item.name}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </Pressable>

                                        </>
                                    )
                                })
                            }                            

                        </VStack>

                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Netbanking Modal End */}

            {/* Credit/Debit Card Modal Start */}

            <Modal isOpen={creditDebitModal} onClose={() => setCreditDebitModal(false)} size="lg" >
                <Modal.Content w="320px" h="320px" >
                    <Modal.Body >
                        <VStack space={3} ml={5}>

                            <HStack space={5} alignItems={'center'} p={5} justifyContent={"space-between"}>
                                <Text>Credit / Debit Card</Text>
                                <Modal.CloseButton />
                            </HStack>  
 
                            <HStack>
                                <Input w="90%" borderRadius={25}  placeholder="Enter your name" textAlign="center"/>
                            </HStack>

                            <HStack>
                                <Input w="90%" borderRadius={25}  placeholder="Enter card number" textAlign="center"/>
                            </HStack>

                            <HStack w="90%" justifyContent={"space-between"}>
                                <Input w="50%" borderRadius={25}  placeholder="Valid ( MM / YY )" textAlign="center"/>
                                <Input w="40%" borderRadius={25}  placeholder="CVV" textAlign="center"/>
                            </HStack>
                           
                            <Button w="70%" alignSelf="center" borderRadius={25} bgColor="red.400" _hover={{ bgColor:"red.300" }}
                                    onPress={() => { setCreditDebitModal(false) ; setPaymentSuccessModal(true) ;
                                        setTimeout(() => { setPaymentSuccessModal(false) }, 1500); } }>
                                Verify and Pay
                            </Button>                               

                        </VStack>

                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Credit/Debit Card Modal End */}

            {/* UPI Modal Start */}

            <Modal isOpen={upiModal} onClose={() => setUpiModal(false)} size="lg" >
                <Modal.Content w="320px" h="320px" >
                    <Modal.Body>
                        <VStack>

                            <HStack space={5} alignItems={'center'} p={5} justifyContent={"space-between"}>
                                <Text>UPI</Text>
                                <Modal.CloseButton />
                            </HStack>  
 
                            <Input w="90%" h="25%" m={3} borderRadius={25}  placeholder="Enter your UPI ID" textAlign="center"/>
                           
                            <Button w="70%" m={3} alignSelf="center" borderRadius={25} bgColor="red.400" _hover={{ bgColor:"red.300" }}
                                    onPress={() => { setUpiModal(false) ; setPaymentSuccessModal(true) ;
                                        setTimeout(() => { setPaymentSuccessModal(false) }, 1500); } }>
                                Verify and Pay
                            </Button>                                                         

                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* UPI Modal End */}

            {/* Cash On Delivery Modal Start */}

            {/* Cash On Delivery Modal End */}

            {/* Payment Process Modal Start */}

            <Modal isOpen={paymentProcessModal} onClose={() => setPaymentProcessModal(false)} size="lg">
                <Modal.Content w="320px" h="320px">
                    <Modal.Body>
                        <VStack space={3} alignItems="center" p={5}>
                            <Spinner size="xl" width="150px" color="red.400" />
                            <Text fontSize="md" m={2}>Completing your payment ...</Text>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Payment Process Modal End */}

            {/* Payment Success Modal Start */}

            <Modal isOpen={paymentSuccessModal} onClose={() => setPaymentSuccessModal(false)} size="lg">
                <Modal.Content w="320px" h="320px">
                    <Modal.Body>
                        <VStack space={3} alignItems="center" p={5}>
                            <Icon as={<AntDesign name="checkcircleo" />} size={40} color="green.700" />
                            <Text fontSize="md" m={2}>Ordered Successfully.</Text>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Payment Success Modal End */}

            {/* Payment Failed Modal Start */}

            <Modal isOpen={paymentFailedModal} onClose={() => setPaymentFailedModal(false)} size="lg">
                <Modal.Content w="320px" h="320px">
                    <Modal.Body>
                        <VStack space={3} alignItems="center" p={5}>
                            <Icon as={<AntDesign name="closecircleo" />} size={40} color="red.700" />
                            <Text fontSize="md" m={2}>Order Failed.</Text>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Payment Failed Modal End */}

        </Center>;
    };

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} h={"100%"} bgColor={'white'} >

                <Header header={"Payment"} />

                <Divider />

                <VStack w={["80%","41%"]} alignSelf={'center'} m={5}>

                    <HStack justifyContent={'space-between'} bg={'red.400'} p={5} mt={3} mb={3} borderRadius={35}>
                        <Text color={'white'} fontSize={'lg'} fontWeight={'bold'}>Total</Text>
                        <Text color={'white'} fontSize={'lg'} fontWeight={'bold'}>₹ 821</Text>
                    </HStack>

                    <Modals />

                    <VStack borderColor={"gray.400"} borderWidth={"1px"} borderRadius={10}>

                        <Pressable onPress={() => setWalletModal(true)}>
                            <HStack space={5} alignItems={'center'} p={5}>
                                <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2}>
                                    <Icon as={<FontAwesome5 name="wallet" />} size={4} />
                                </Box>
                                <VStack>
                                    <Text fontSize={'md'}>
                                        Wallets
                                    </Text>
                                    <Text fontSize={'xs'}>
                                        (Paytm , Amazon Pay , PhonePe)
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>

                        <Divider />

                        <Pressable onPress={() => setNetbankingModal(true)}>
                            <HStack space={5} alignItems={'center'} p={5}>
                                <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2}>
                                    <Icon as={<FontAwesome name="bank" />} size={4} />
                                </Box>
                                <VStack>
                                    <Text fontSize={'md'}>
                                        Netbanking
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>

                        <Divider />

                        <Pressable onPress={() => setCreditDebitModal(true)}>
                            <HStack space={5} alignItems={'center'} p={5}>
                                <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2}>
                                    <Icon as={<FontAwesome5 name="credit-card" />} size={4} />
                                </Box>
                                <VStack>
                                    <Text fontSize={'md'}>
                                        Credit / Debit cards
                                    </Text>
                                    <Text fontSize={'xs'}>
                                        (Rupay , Visa , MasterCard)
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>

                        <Divider />

                        <Pressable onPress={() => setUpiModal(true)}>
                            <HStack space={5} alignItems={'center'} p={5}>
                                <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2} pl={3} pr={1}>
                                    <Icon as={<FontAwesome name="rupee" />} size={4} />
                                </Box>
                                <VStack>
                                    <Text fontSize={'md'}>
                                        UPI
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>

                        <Divider />

                        <Pressable onPress={() => { setPaymentSuccessModal(true) ;
                                                    setTimeout(() => { setPaymentSuccessModal(false) }, 1500); } }>
                            <HStack space={5} alignItems={'center'} p={5}>
                                <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={2} >
                                    <Icon as={<MaterialIcons name="delivery-dining" />} size={4} />
                                </Box>
                                <VStack>
                                    <Text fontSize={'md'}>
                                        Cash on Delivery
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>

                    </VStack>
                </VStack>

            </Box>
        </NativeBaseProvider >
    )
}

export default Payment