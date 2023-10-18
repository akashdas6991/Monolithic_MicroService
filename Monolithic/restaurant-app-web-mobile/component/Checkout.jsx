import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, NativeBaseProvider, Link, PresenceTransition, VStack, HStack, Alert, Avatar, AspectRatio, Image, Stack, Flex, Spacer, ScrollView, Divider, StatusBar, IconButton, Icon, Input, Button, ChevronDownIcon, Menu, HamburgerIcon, Popover, Badge, Modal, Radio, Spinner, CloseIcon, CheckIcon, Checkbox } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { BackHandler, Platform, Pressable, Alert as ReactAlert } from 'react-native';
import { AntDesign, EvilIcons, FontAwesome, FontAwesome5, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Screen, ScreenContainer } from 'react-native-screens';
import { Dimensions } from 'react-native';
import ApiService from './service/apiService';

const Checkout = ({ navigation }) => {

    const thirdMenuItems = ApiService.secondMenuItems();

    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    const Modals = () => {

        return <Center>
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
                        <VStack alignItems="center">
                            <Icon as={<AntDesign name="checkcircleo" />} size="3xl" m={"4"} color="green.700" />
                            <Text fontSize="md" alignSelf={'center'}>Verifying UPI / Linking Wallet</Text>
                            <Text fontSize="md" alignSelf={'center'}>Successfully.</Text>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            {/* Payment Success Modal End */}

            {/* Payment Failed Modal Start */}

            <Modal isOpen={paymentFailedModal} onClose={() => setPaymentFailedModal(false)} size="lg">
                <Modal.Content w="2xs" >
                    <Modal.Body>
                        <VStack alignItems="center">
                            <Icon as={<AntDesign name="closecircleo" />} size="3xl" m={"4"} color="red.700" />
                            <Text fontSize="md" alignSelf={'center'}>Verifying UPI / Linking Wallet</Text>
                            <Text fontSize="md" alignSelf={'center'}>Failed.</Text>
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

                    <HStack space={'2'} mt={'4'} mb={'4'} alignItems={'center'}>
                        <Pressable onPress={() => navigation.replace("Checkout")}>
                            <Icon as={<AntDesign name="left" />} size={'sm'} color={'black'} />
                        </Pressable>
                        <Text fontSize={'sm'} fontWeight={'bold'} >Kwality Wall's Frozen Dessert and  Ice Cream Shop</Text>
                    </HStack>

                    <ScrollView w={"100%"} showsVerticalScrollIndicator={false} >

                        <HStack mt={'5'} p={'3'} space={'2'} alignItems={'center'} bgColor={'white'} borderRadius={15} >
                            <Icon as={<Fontisto name="stopwatch" />} size={'md'} />
                            <Text fontSize={'sm'} fontWeight={'semibold'}>Delivery in</Text>
                            <Text fontSize={'sm'} fontWeight={'bold'}>20-25 min</Text>
                        </HStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>I T E M (S)  A D D E D</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >

                            <HStack m={'3'} >
                                <VStack w={"5%"} mt={'1'}>
                                    <Image source={{
                                        uri: "data:image/png;base64,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"
                                    }} alt="Alternate Text" h={'3'} w={'3'} />
                                </VStack>

                                <VStack w={"75%"}>
                                    <Text fontSize={'sm'} fontWeight={'bold'}>
                                        Peri Peri Fries
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'black'}>
                                        ₹119
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                        Regular, Green Chilli Dip
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'red.500'}>
                                        Edit
                                    </Text>
                                </VStack>

                                <VStack w={"20%"} mt={'1'} alignItems={'flex-end'}>
                                    <Button variant="outline" size="xs" w={'16'} h={"6"} p={0} borderRadius={8} borderColor={'red.600'} bgColor={'red.50'}>
                                        <Text color={"red.400"} fontSize={'xs'} fontWeight={'semibold'}>
                                            -  1  +
                                        </Text>
                                    </Button>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'black'}>₹119</Text>
                                </VStack>
                            </HStack>

                            <HStack m={'3'} >
                                <VStack w={"5%"} mt={'1'}>
                                    <Image source={{
                                        uri: "data:image/png;base64,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"
                                    }} alt="Alternate Text" h={'3'} w={'3'} />
                                </VStack>

                                <VStack w={"75%"}>
                                    <Text fontSize={'sm'} fontWeight={'bold'}>
                                        Peri Peri Fries
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'black'}>
                                        ₹119
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                        Regular, Green Chilli Dip
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'red.500'}>
                                        Edit
                                    </Text>
                                </VStack>

                                <VStack w={"20%"} mt={'1'} alignItems={'flex-end'}>
                                    <Button variant="outline" size="xs" w={'16'} h={"6"} p={0} borderRadius={8} borderColor={'red.600'} bgColor={'red.50'}>
                                        <Text color={"red.400"} fontSize={'xs'} fontWeight={'semibold'}>
                                            -  1  +
                                        </Text>
                                    </Button>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'black'}>₹119</Text>
                                </VStack>
                            </HStack>

                            {/* <HStack w={"95%"} alignSelf={'center'} alignItems={'center'} space={2} >
                                <Divider w={"29%"}/>
                                <Text fontSize={'10px'}>COMPLETE YOUR MEAL WITH</Text>
                                <Divider w={"29%"}/>
                            </HStack>
                            
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} p={"2"} bgColor={"white"}>
                                <HStack space={"2xl"} justifyContent="center" p={3}>
                                    {
                                        thirdMenuItems.map((item) => {

                                            return (
                                                <VStack alignItems={'center'} bgColor={'amber.500'} space={3} key={item.id} >
                                                    <Pressable >
                                                        {({ pressed }) => (
                                                            <Avatar {...pressed ? navigation.replace("Order") : 'Press Me'} size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
                                                        )}
                                                    </Pressable>
                                                    <Text fontSize={["xs", "sm", "md"]} fontWeight={'normal'}  > {item.name} </Text>
                                                    <Text fontSize={["2xs", "xs", "sm"]} fontWeight={'normal'} > {item.distance} </Text>
                                                </VStack>
                                            )
                                        })
                                    }
                                </HStack>
                            </ScrollView>  */}

                        </VStack>

                        <VStack space={'1'} mt={'3'} bgColor={'white'} borderRadius={15}>
                            <Pressable onPress={() => navigation.navigate("Order")}>
                                <HStack m={'3'}>
                                    <HStack w={"95%"} space={2} alignItems={'center'} >
                                        <Icon as={<AntDesign name="pluscircleo" />} size={'xs'} />
                                        <Text fontSize={'sm'} fontWeight={'semibold'}>
                                            Add more items
                                        </Text>
                                    </HStack>
                                    <HStack w={"5%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="right" />} size={'xs'} />
                                    </HStack>
                                </HStack>
                            </Pressable>

                            <Divider />

                            <Pressable onPress={() => { }}>
                                <HStack m={'3'}>
                                    <HStack w={"95%"} space={2} alignItems={'center'} >
                                        <Icon as={<AntDesign name="form" />} size={'xs'} />
                                        <Text fontSize={'sm'} fontWeight={'semibold'}>
                                            Add cooking instructions
                                        </Text>
                                    </HStack>
                                    <HStack w={"5%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="right" />} size={'xs'} />
                                    </HStack>
                                </HStack>
                            </Pressable>

                            <Divider />

                            <Pressable onPress={() => { }}>
                                <HStack m={'3'}>
                                    <HStack w={"92%"} space={2} alignItems={'center'} >
                                        <Icon as={<FontAwesome name="cutlery" />} size={'xs'} color={'green.400'} />
                                        <Text fontSize={'sm'} fontWeight={'semibold'}>
                                            Dont send cutlery with this order
                                        </Text>
                                    </HStack>
                                    <VStack w={"8%"} alignItems={'center'} >
                                        <Checkbox value="green" colorScheme="green" size={'sm'} defaultIsChecked />
                                    </VStack>
                                </HStack>
                            </Pressable>

                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>S A V I N G S   C O R N E R</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => { }}>
                                <HStack m={'3'}>
                                    <HStack w={"95%"} space={4} alignItems={'center'} >
                                        <Icon as={<AntDesign name="form" />} size={'sm'} />
                                        <Text fontSize={'sm'} fontWeight={'bold'}>
                                            Apply coupon
                                        </Text>
                                    </HStack>
                                    <HStack w={"5%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="right" />} size={'xs'} />
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>B I L L  S U M M A R Y</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15} >

                            <HStack m={'3'} mb={'0'} justifyContent={'space-between'}>
                                <Text fontSize={'sm'} fontWeight={'bold'}>Subtotal</Text>
                                <Text fontSize={'sm'} fontWeight={'bold'}>₹398</Text>
                            </HStack>

                            <HStack m={'3'}>
                                <HStack w={"90%"} space={2} alignItems={'center'} >
                                    <Icon as={<AntDesign name="form" />} size={'xs'} />
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>
                                        GST and restaurant charges i
                                    </Text>
                                </HStack>
                                <HStack w={"10%"} alignSelf={'center'}>
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>₹36.26</Text>
                                </HStack>
                            </HStack>

                            <HStack m={'3'}>
                                <HStack w={"90%"} space={2} alignItems={'center'} >
                                    <Icon as={<AntDesign name="form" />} size={'xs'} />
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>
                                        Delivery partner fee for 4km
                                    </Text>
                                </HStack>
                                <HStack w={"10%"} alignSelf={'center'}>
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>₹36</Text>
                                </HStack>
                            </HStack>

                            <HStack m={'3'}>
                                <HStack w={"90%"} space={2} alignItems={'center'} >
                                    <Icon as={<AntDesign name="form" />} size={'xs'} />
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>
                                        Platform fee i
                                    </Text>
                                </HStack>
                                <HStack w={"10%"} alignSelf={'center'}>
                                    <Text fontSize={'xs'} fontWeight={'semibold'}>₹2</Text>
                                </HStack>
                            </HStack>

                            <Divider />

                            <HStack m={'3'} justifyContent={'space-between'}>
                                <Text fontSize={'xs'} fontWeight={'bold'}>Grand Total</Text>
                                <Text fontSize={'xs'} fontWeight={'bold'}>₹472.26</Text>
                            </HStack>

                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>B E F O R E  Y O U  P L A C E  T H E  O R D E R</Text>

                        <VStack space={'1'} mt={'3'} p={'3'} bgColor={'white'} borderRadius={15} >


                            <Text fontSize={'sm'} fontWeight={'bold'}>
                                Tip your delivery partner
                            </Text>
                            <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                                Your kindness means a lot! 100% of your tip will go directly to them
                            </Text>

                            <HStack space={'2'} m={'2'}>
                                <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} p={'4'} h={'0'}>
                                    <Text fontSize={'xs'} fontWeight={'bold'}>₹15</Text>
                                </Button>
                                <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} p={'4'} h={'0'}>
                                    <Text fontSize={'xs'} fontWeight={'bold'}>₹20</Text>
                                </Button>
                                <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} p={'4'} h={'0'}>
                                    <Text fontSize={'xs'} fontWeight={'bold'}>₹30</Text>
                                </Button>
                                <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} p={'4'} h={'0'}>
                                    <Text fontSize={'xs'} fontWeight={'bold'}>Other</Text>
                                </Button>
                            </HStack>



                        </VStack>

                        <VStack space={'1'} mt={'3'} p={'3'} bgColor={'white'} borderRadius={15} >
                            
                                
                                    <VStack w={"95%"}>
                                        <Text fontSize={'sm'} fontWeight={'bold'}>
                                            Add delivery instructions
                                        </Text>
                                        <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                                            Help your delivery partner reach you faster
                                        </Text>
                                    </VStack>
                                
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} p={"2"} bgColor={"white"}>
                                    <HStack space={"2xl"} justifyContent="center" p={3}>
                                        {
                                            thirdMenuItems.map((item) => {

                                                return (
                                                    <VStack alignItems={'center'} bgColor={'amber.500'} space={3} key={item.id} >
                                                        <Pressable >
                                                            {({ pressed }) => (
                                                                <Avatar {...pressed ? navigation.replace("Order") : 'Press Me'} size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
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
                        </VStack>

                        <VStack space={'1'} mt={'3'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => { }}>
                                <HStack m={'3'} space={'1'}>
                                    <VStack w={"95%"}>
                                        <Text fontSize={'sm'} fontWeight={'bold'}>
                                            Your details
                                        </Text>
                                        <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                                            Akash Das, 9093040282
                                        </Text>
                                    </VStack>
                                    <HStack w={"5%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="right" />} size={'xs'} />
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <VStack space={'1'} mt={'3'} bgColor={'white'} borderRadius={15} >
                            <Pressable onPress={() => { }}>
                                <HStack m={'3'} space={'1'}>
                                    <HStack w={"10%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="form" />} size={'lg'} />
                                    </HStack>
                                    <VStack w={"85%"}>
                                        <Text fontSize={'sm'} fontWeight={'bold'}>
                                            Ordering for someone else ?
                                        </Text>
                                        <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                                            Add receiver details for a hassle free delivery
                                        </Text>
                                    </VStack>
                                    <HStack w={"5%"} alignSelf={'center'}>
                                        <Icon as={<AntDesign name="right" />} size={'xs'} />
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </VStack>

                        <Text color={"gray.400"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>C A N C E L L A T I O N   P O L I C Y</Text>

                        <VStack space={'1'} bgColor={'white'} borderRadius={15}>
                            <HStack m={'3'}>
                                <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.500'}>
                                    100% cancellation fee will be applicable if you decide to cancel
                                    the order anytime after order placement. Avoid cancellation as it
                                    leads to food wastage.
                                </Text>
                            </HStack>
                        </VStack>

                        {/* footer space for safearea  */}
                        <Text mb="48"></Text>

                    </ScrollView>

                </Box>



            </Box>
        </NativeBaseProvider >
    )
}

export default Checkout
