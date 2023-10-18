import { AntDesign, EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Box, Button, Center, Divider, HStack, Icon, Image, Input, Modal, NativeBaseProvider, Pressable, ScrollView, Spacer, Spinner, Text, VStack } from 'native-base'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiService from './service/apiService';
import { useState } from 'react';

const AddPayment = ({ route, navigation }) => {

    const {payment} = route.params.payment ;

    const popularBankList = ApiService.popularBankList();
    const allBankList = ApiService.allBankList();

    const header = () => {
        if (route.params.payment == "card")
            return  (
                <VStack>
                    <HStack w={"100%"} mt={'4'} mb={'4'} alignItems={'center'}>
                        <Pressable onPress={() => navigation.replace("Checkout")}>
                            <Icon as={<AntDesign name="arrowleft" />} size={4} m={'3'} ml={'0'} />
                        </Pressable>
                        <Text fontSize={'xl'} fontWeight={'semibold'} ml={'2'}>Add a Card</Text>
                    </HStack>
                </VStack>
            )
        else
            return  (
                <VStack>
                    <HStack w={"100%"} mt={'4'} mb={'4'} alignItems={'center'}>
                        <Pressable onPress={() => navigation.replace("Checkout")}>
                            <Icon as={<AntDesign name="arrowleft" />} size={4} m={'3'} ml={'0'} />
                        </Pressable>
                        <Text fontSize={'xl'} fontWeight={'semibold'} ml={'2'}>Select Bank</Text>                      
                    </HStack>

                    <Input InputLeftElement={<Icon as={<EvilIcons name="search" />} size={6} ml="4" color="gray.400" />} fontSize={'lg'} borderRadius={'7px'} placeholder='Search By Bank Name' bgColor={'gray.100'}/>

                    <Divider bgColor={"gray.100"} />
                </VStack>
            )
    }

    const bodyContent = () => {
        if (route.params.payment == "card")
            return (<VStack space={5}>
                        <Modals />

                        <Text fontWeight={'semibold'}>We accept Credit and Debit Cards from Visa, Mastercard, Rupay, Pluxee | Sodexo, American Express, Diners , Maestro & Discover.</Text>            
                    
                        <Input variant="underlined" placeholder="Name on card" fontSize={'md'}/>

                        <Input variant="underlined" placeholder="Card number" fontSize={'md'}/>

                        <Input variant="underlined" placeholder="Expiry date (MM/YY) " fontSize={'md'}/>                        

                        <Text fontWeight={'semibold'}>Nickname for card</Text>

                        <HStack space={4}>
                            <Button variant="solid"   size="xs" w={'20'} h={"6"} p={0} borderRadius={8} bgColor={"red.400"}><Text color={"white"} fontSize={'xs'} fontWeight={'semibold'}>Personal</Text></Button>
                            <Button variant="outline" size="xs" w={'20'} h={"6"} p={0} borderRadius={8}><Text color={"red.400"} fontSize={'xs'} fontWeight={'semibold'}>Business</Text></Button>
                            <Button variant="outline" size="xs" w={'20'} h={"6"} p={0} borderRadius={8}><Text color={"red.400"} fontSize={'xs'} fontWeight={'semibold'}>Other</Text></Button>
                        </HStack>

                        <Divider/>

                        {/* footer space for safearea  */}
                        <Divider mt={'48'}/>
            

                        <Button w="95%" alignSelf="center" bgColor="red.400" _hover={{ bgColor: "red.300" }}
                                onPress={() =>  {    
                                    setPaymentProcessModal(true);
                                    setTimeout(() => {
                                        setPaymentProcessModal(false);
                                    }, 1500);
            
                                    setTimeout(() => {
                                        setPaymentSuccessModal(true);
                                    }, 1500);
            
                                    setTimeout(() => {
                                        navigation.replace("Payment");
                                    }, 5000);
                                                }}>
                                    Make Payment
                        </Button>

                    </VStack>
            )
        else
            return  (
                <ScrollView bgColor={'white'} showsVerticalScrollIndicator={false}>

                    <Modals />

                    <Text fontWeight={'semibold'} fontSize={'xl'} mt={'5'} mb={'5'}>Popular Banks</Text>

                    <HStack space={'48px'}>{popularBankListContent()}</HStack>

                    <Text fontWeight={'semibold'} fontSize={'xl'} mt={'5'} mb={'5'}>All Banks</Text>

                    <VStack space={6} >{allBankListContent()}</VStack>

                    {/* footer space for safearea  */}
                    <Text mb="64"></Text>  

                </ScrollView>
            )
    }

    const popularBankListContent = () => {

        return (
            popularBankList.map((item) => {

                return (
                    <Pressable onPress={() => {
                        setPaymentProcessModal(true);
                        setTimeout(() => {
                            setPaymentProcessModal(false);
                        }, 1500);

                        setTimeout(() => {
                            setPaymentSuccessModal(true);
                        }, 1500);

                        setTimeout(() => {
                            navigation.replace("Payment");
                        }, 5000);
                    }}>
                        <VStack space={1} alignItems={'center'} key={item.id} >
                            <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                <Image source={{
                                    uri: String(item.img)
                                }} alt="Alternate Text" size="2xs" />
                            </Box>
                            <Text fontSize={'sm'}> {item.name} </Text>
                        </VStack>
                    </Pressable>
                )
            })
        )
    }

    const allBankListContent = () => {

        return (
            allBankList.map((item) => {

                return (
                    <Pressable onPress={() => {
                        setPaymentProcessModal(true);
                        setTimeout(() => {
                            setPaymentProcessModal(false);
                        }, 1500);

                        setTimeout(() => {
                            setPaymentSuccessModal(true);
                        }, 1500);

                        setTimeout(() => {
                            navigation.replace("Payment");
                        }, 5000);
                    }}>
                        <HStack space={2} alignItems={'center'} key={item.id}>
                            <Box borderWidth={"1px"} borderColor={"gray.200"} borderRadius={5} p={1}>
                                <Image source={{
                                    uri: String(item.img)
                                }} alt="Alternate Text" size="2xs" />
                            </Box>
                            <Text fontSize={'md'}> {item.name} </Text>
                        </HStack>
                    </Pressable>
                )
            })
        )
    }

    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    const Modals = () => {

        return (

            <Center>

                {/* Payment Process Modal Start */}

                <Modal isOpen={paymentProcessModal} onClose={() => setPaymentProcessModal(false)} size="lg">
                    <Modal.Content w="2xs" >
                        <Modal.Body>
                            <VStack alignItems="center">
                                <Spinner size="xl" color="red.400"  m={"4"}/>
                                <Text fontSize="sm" m={2}>Adding your card / Connecting Bank</Text>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/* Payment Process Modal End */}

                {/* Payment Success Modal Start */}

                <Modal isOpen={paymentSuccessModal} onClose={() => setPaymentSuccessModal(false)} size="lg">
                    <Modal.Content w="2xs" >
                        <Modal.Body>
                            <VStack alignItems="center">
                                <Icon as={<AntDesign name="checkcircleo" />} size="3xl" m={"4"} color="green.700" />
                                <Text fontSize="md" alignSelf={'center'}>Card added / Bank Verified</Text>
                                <Text fontSize="md" alignSelf={'center'}>Successfully.</Text>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/* Payment Success Modal End */}

                {/* Payment Failed Modal Start */}

                <Modal isOpen={paymentFailedModal} onClose={() => setPaymentFailedModal(false)} size="lg">
                    <Modal.Content w="320px" h="320px">
                        <Modal.Body>
                            <VStack alignItems="center">
                                <Icon as={<AntDesign name="closecircleo" />} size="3xl" m={"4"} color="red.700" />
                                <Text fontSize="md" alignSelf={'center'}>Card add / Bank verification</Text>
                                <Text fontSize="md" alignSelf={'center'}>Failed.</Text>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                {/* Payment Failed Modal End */}
            </Center>
        )

    }

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} bgColor={'white'}>
                <Box alignSelf={'center'} w={'sm'} >

                    {header()}

                    {bodyContent()}

                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

export default AddPayment
