import React, { useState } from 'react';
import { Box, Text, Center, NativeBaseProvider, VStack, HStack, Image, ScrollView, Divider, Icon, Input, Button, Modal, Spinner, Checkbox, Actionsheet, useDisclose, KeyboardAvoidingView } from "native-base";
import { Platform, Pressable } from 'react-native';
import { AntDesign, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ApiService from './service/apiService';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Checkout = ({ navigation }) => {

    const [paymentProcessModal, setPaymentProcessModal] = useState(false);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [paymentFailedModal, setPaymentFailedModal] = useState(false);

    const [platformFeeModal, setPlatformFeeModal] = useState(false);
    const [gstModal, setGstModal] = useState(false);

    const [calculatedFee, setCalculatedFee] = useState("none");

    const { isOpen, onOpen, onClose } = useDisclose(); // for action sheet

    const FooterContent = () => {

        return  <>
                    <HStack space={'2'} p={'2'} >
                        <HStack w={"5%"}>
                            <Icon as={<MaterialIcons name="location-on" />} color={"red.400"} size={5} />
                        </HStack>

                        <VStack w={"80%"}>
                            <Text fontSize={'xs'} fontWeight={'semibold'}>Delivery at Home</Text>
                            <Text fontSize={'2xs'} fontWeight={'normal'} color={'gray.500'}>1/104 mirpara road , jalaa math , liluah howrah , bhatta nagar , liluah , howrah </Text>
                        </VStack>

                        <HStack w={"15%"}>
                            <Text fontSize={'xs'} fontWeight={'normal'} color={'red.600'}>Change</Text>
                        </HStack>
                    </HStack>

                    <Divider />

                    <HStack space={'3'} p={"3"} justifyContent={'space-between'}>

                        <Box w={"35%"}>
                            <Pressable onPress={() => { navigation.navigate("Payment") }}>
                                <VStack pt={'2'}>
                                    <HStack space={'1'} alignItems={'center'}>
                                        <Text fontSize={'2xs'}>PAYTM</Text>
                                        <Text fontSize={'2xs'}>PAY USING</Text>
                                        <Icon as={<FontAwesome name="caret-up" />} color={'black'} size={'3'} />
                                    </HStack>
                                    <Text fontSize={'sm'} fontWeight={'normal'}>Paytm UPI</Text>
                                </VStack>
                            </Pressable>
                        </Box>

                        <Box w={"62%"} bgColor={'red.400'} p={'2'} borderRadius={'7'} >
                            <Pressable onPress={() => { alert("order successfully") }} >
                                <HStack justifyContent={'space-between'}>
                                    <VStack>
                                        <Text fontSize={'sm'} color={'white'} fontWeight={'bold'}>₹104.36</Text>
                                        <Text fontSize={'xs'} color={'white'} fontWeight={'thin'}>Total</Text>
                                    </VStack>
                                    <HStack alignItems={'center'} space={'1'}>
                                        <Text fontSize={'md'} color={'white'} fontWeight={'bold'}>Place Order</Text>
                                        <Icon as={<FontAwesome name="caret-right" />} color={'white'} size={'4'} />
                                    </HStack>
                                </HStack>
                            </Pressable>
                        </Box>

                    </HStack>
                </>
    }

    const ActionSheets = () => {
        return  <KeyboardAvoidingView  behavior={'height'} >
                    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator >
                        <Actionsheet.Content >                        
                            <VStack space={"2"}>
                                
                                <HStack justifyContent={'space-between'} p={"2"}>
                                    <Text fontSize={'lg'} fontWeight={'semibold'}>
                                        Speacial cooking instructions   
                                    </Text>
                                    <Icon as={<AntDesign name="close" />} size="sm" onPress={() => { }}/>
                                </HStack>

                                <Divider/>
                                <Text fontSize={'xs'} color={'red.400'} p={"2"}>
                                    Start typing..   
                                </Text>
                                <Input variant={'underlined'} p={"2"} borderBottomColor={"red.400"}/>
                                <Text fontSize={'xs'} color={'red.400'} p={"2"}>
                                    The restaurant will try their best to follow your instructions. However, no cancellation order
                                    refund will be possible if youor request is not met. Please note - instructions once added can't be removed   
                                </Text>
                                <Button bgColor={'red.400'}>Add</Button>
                            </VStack>
                        </Actionsheet.Content>
                    </Actionsheet>
                </KeyboardAvoidingView>
    }

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

                    {/* Platform fee Modal Start */}

                    <Modal isOpen={platformFeeModal} onClose={() => setPlatformFeeModal(false)} size="lg">
                        <Modal.Content w="sm" >
                            <Modal.Body >
                                <VStack space={'2'}>
                                    <Text fontSize="xs" fontWeight={"bold"} color={"gray.600"}>
                                        Platform Fee
                                    </Text>
                                    <Text fontSize="xs">
                                        This small fee helps us pay the bills so that we can keep Zomato running.
                                    </Text>
                                    <Divider />
                                    <Button variant={'unstyled'} size="sm" onPress={() => { setPlatformFeeModal(false) }}>
                                        <Text color={"red.400"}>OKAY</Text>
                                    </Button>
                                </VStack>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/* Platform fee Modal End */}

                    {/* GST Modal Start */}

                    <Modal isOpen={gstModal} onClose={() => setGstModal(false)} size="lg">
                        <Modal.Content w="sm" >
                            <Modal.Body >
                                <VStack space={'2'}>
                                    <Text fontSize="xs" color={"gray.600"}>
                                        Zomato has no role to play in taxes levied by the govt.
                                    </Text>
                                    <Divider />
                                    <HStack justifyContent={'space-between'}>
                                        <Text fontSize="xs" fontWeight={"bold"}>GST on item total</Text>
                                        <Text fontSize="xs" fontWeight={"bold"}>₹6</Text>
                                    </HStack>
                                    <HStack justifyContent={'space-between'}>
                                        <Text fontSize="xs" fontWeight={"bold"}>GST on platform fee</Text>
                                        <Text fontSize="xs" fontWeight={"bold"}>₹0.54</Text>
                                    </HStack>
                                    <Divider />
                                    <HStack justifyContent={'space-between'}>
                                        <Text fontSize="xs" fontWeight={"bold"}>Total</Text>
                                        <Text fontSize="xs" fontWeight={"bold"}>₹6.54</Text>
                                    </HStack>
                                    <Button variant={'unstyled'} size="sm" onPress={() => { setGstModal(false) }}>
                                        <Text color={"red.400"}>OKAY</Text>
                                    </Button>
                                </VStack>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>

                    {/* GST Modal End */}

                </Center>
    };

    const ScrollViewContent = () => {
        return  <>
                    <HStack mt={'5'} p={'3'} space={'2'} alignItems={'center'} bgColor={'white'} borderRadius={15} >
                        <Icon as={<Fontisto name="stopwatch" />} size={'md'} />
                        <Text fontSize={'sm'} fontWeight={'semibold'}>Delivery in</Text>
                        <Text fontSize={'sm'} fontWeight={'bold'}>20-25 min</Text>
                    </HStack>

                    <Text color={"gray.600"} mt={'7'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>I T E M (S)   A D D E D</Text>

                    <VStack space={'1'} bgColor={'white'} borderRadius={15}>

                        {/* dynamic */}

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
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'black'}>
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
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'black'}>₹119</Text>
                            </VStack>
                        </HStack>

                        {/* dynamic */}

                        <HStack w={"95%"} alignSelf={'center'} alignItems={'center'} space={2} >
                            <Divider w={"25%"} color={'gray.200'} />
                            <Text fontSize={'8px'} color={'gray.500'} fontWeight={'bold'}>C O M P L E T E  Y O U R  M E A L  W I T H</Text>
                            <Divider w={"25%"} color={'gray.200'} />
                        </HStack>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} bgColor={"white"} borderRadius={15}>
                            <HStack space={'3'} p={"3"} >
                                
                                {/* dynamic */}
                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                <Box w={'150px'} h={'150px'} borderRadius={'15'} borderWidth={'1'} borderColor={'gray.100'}>
                                    Tap here and hold
                                </Box>

                                {/* dynamic */}

                            </HStack>
                        </ScrollView>

                    </VStack>

                    <VStack space={'1'} mt={'3'} bgColor={'white'} borderRadius={15}>
                        <Pressable onPress={() => { navigation.navigate("Order") }}>
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

                        <Pressable onPress={onOpen}>
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

                    <Text color={"gray.600"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>S A V I N G S    C O R N E R</Text>

                    <VStack space={'1'} bgColor={'white'} borderRadius={15} >
                        <Pressable onPress={() => { navigation.navigate("Utility", { payment: 'apply coupon' }) }}>
                            <HStack m={'3'}>
                                <HStack w={"95%"} space={2} alignItems={'center'} >
                                    <Icon as={<MaterialCommunityIcons name="brightness-percent" />} size={'md'} />
                                    <Text fontSize={'sm'} fontWeight={'semibold'}>
                                        Apply coupon
                                    </Text>
                                </HStack>
                                <HStack w={"5%"} alignSelf={'center'}>
                                    <Icon as={<AntDesign name="right" />} size={'xs'} />
                                </HStack>
                            </HStack>
                        </Pressable>
                    </VStack>

                    <Text color={"gray.600"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>B I L L   S U M M A R Y</Text>

                    <VStack space={'3'} p={'3'} bgColor={'white'} borderRadius={15} >
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'sm'} fontWeight={'bold'}>Subtotal</Text>
                            <Text fontSize={'sm'} fontWeight={'bold'}>₹398</Text>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <HStack space={'2'} alignItems={'center'}>
                                <HStack>
                                    <Icon as={<FontAwesome name="bank" />} size={'xs'} />
                                </HStack>
                                <HStack space={'1'} alignItems={'center'}>
                                    <Text fontSize={'xs'} fontWeight={'semibold'} >
                                        GST and restaurant charges
                                    </Text>
                                    <Icon as={<MaterialCommunityIcons name="information-outline" />} size={'xs'} onPress={() => { setGstModal(true) }} />
                                </HStack>
                            </HStack>
                            <HStack>
                                <Text fontSize={'xs'} fontWeight={'semibold'}>₹36.26</Text>
                            </HStack>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                            <HStack space={'2'}>
                                <HStack>
                                    <Icon as={<MaterialIcons name="delivery-dining" />} size={'sm'} />
                                </HStack>

                                <VStack space={'0.5'}>
                                    <HStack space={'1'} alignItems={'center'}>
                                        <Text fontSize={'xs'} fontWeight={'semibold'} >
                                            Delivery partner fee for 4km
                                        </Text>
                                    </HStack>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.400'}>
                                        goes to them for their time and effort
                                    </Text>
                                    <Text fontSize={'xs'} fontWeight={'normal'} color={'orange.400'}>
                                        order above ₹150 to save ₹10
                                    </Text>

                                    <Pressable onPress={() => { calculatedFee === "flex" ? setCalculatedFee("none") : setCalculatedFee("flex") }}>
                                        <HStack w={'48'} space={"2"} alignItems={'center'} p={'2'} bgColor={'gray.50'} borderRadius={'10'} borderColor={'gray.200'} borderWidth={'1'}>
                                            <Text fontSize={'xs'} fontWeight={'normal'}>
                                                See how this is calculated
                                            </Text>
                                            <Icon as={<FontAwesome name={calculatedFee === "flex" ? "caret-up" : "caret-down"} />} color={'black'} size={'3'} />
                                        </HStack>
                                    </Pressable>
                                </VStack>
                            </HStack>
                            <HStack>
                                <Text fontSize={'xs'} fontWeight={'semibold'}>₹36</Text>
                            </HStack>
                        </HStack>
                        <VStack display={calculatedFee} space={'4'} p={'2'} bgColor={'gray.50'} ml={"6"} borderTopLeftRadius={'0'} borderRadius={'10'} borderColor={'gray.200'} borderWidth={'1'}>
                            <HStack justifyContent={'space-between'}>
                                <VStack>
                                    <Text fontSize={'xs'} fontWeight={'normal'}>
                                        Base fee for 2 km
                                    </Text>
                                    <Text fontSize={'2xs'} fontWeight={'normal'} color={'gray.400'}>
                                        ₹33 per order plus ₹2 per km
                                    </Text>
                                </VStack>
                                <Text fontSize={'xs'} fontWeight={'normal'}>
                                    ₹37
                                </Text>
                            </HStack>
                            <HStack justifyContent={'space-between'}>
                                <VStack>
                                    <Text fontSize={'xs'} fontWeight={'normal'}>
                                        Small order fee
                                    </Text>
                                    <Text fontSize={'2xs'} fontWeight={'normal'} color={'orange.400'}>
                                        order above ₹150 to save ₹10
                                    </Text>
                                </VStack>
                                <Text fontSize={'xs'} fontWeight={'normal'}>
                                    ₹10
                                </Text>
                            </HStack>
                        </VStack>

                        <HStack justifyContent={'space-between'}>
                            <HStack space={'1'}>
                                <HStack>
                                    <Icon as={<FontAwesome name="mobile" />} size={'sm'} />
                                </HStack>
                                <HStack space={'1'} alignItems={'center'}>
                                    <Text fontSize={'xs'} fontWeight={'semibold'} >
                                        Platform
                                    </Text>
                                    <Icon as={<MaterialCommunityIcons name="information-outline" />} size={'xs'} onPress={() => { setPlatformFeeModal(true) }} />
                                </HStack>
                            </HStack>
                            <HStack>
                                <Text fontSize={'xs'} fontWeight={'semibold'}>₹2</Text>
                            </HStack>
                        </HStack>

                        <Divider />

                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'xs'} fontWeight={'bold'}>Grand Total</Text>
                            <Text fontSize={'xs'} fontWeight={'bold'}>₹472.26</Text>
                        </HStack>
                    </VStack>

                    <Text color={"gray.600"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>B E F O R E    Y O U    P L A C E    T H E    O R D E R</Text>

                    <VStack space={'0.5'} mt={'3'} p={'3'} bgColor={'white'} borderRadius={15} >
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            Tip your delivery partner
                        </Text>
                        <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                            Your kindness means a lot! 100% of your tip will go directly to them
                        </Text>
                        <HStack space={'2'} m={'2'}>
                            <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} variant="outline">
                                <Text fontSize={'xs'} fontWeight={'bold'}>₹15</Text>
                            </Button>
                            <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} variant="outline">
                                <Text fontSize={'xs'} fontWeight={'bold'}>₹20</Text>
                            </Button>
                            <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} variant="outline">
                                <Text fontSize={'xs'} fontWeight={'bold'}>₹30</Text>
                            </Button>
                            <Button startIcon={<Icon as={Ionicons} name="cloud-download-outline" size='2xs' />} borderRadius={'10'} variant="outline">
                                <Text fontSize={'xs'} fontWeight={'bold'}>Other</Text>
                            </Button>
                        </HStack>
                    </VStack>

                    <VStack space={'1'} mt={'3'} p={'3'} bgColor={'white'} borderRadius={15} >
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            Add delivery instructions
                        </Text>
                        <Text fontSize={'xs'} fontWeight={'normal'} color={'gray.600'}>
                            Help your delivery partner reach you faster
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} bgColor={"white"}>
                            <HStack space={'2'} pt={'1'} pb={'1'}>
                                
                                {/* dynamic */}

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                <Box w={'100px'} h={'100px'} shadow={'1'} borderRadius={'15'}  >
                                    Tap here and hold
                                </Box>

                                {/* dynamic */}

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

                    <VStack space={'1'} mt={'3'} bgColor={'purple.100'} borderRadius={15} borderColor={'purple.600'}>
                        <Pressable onPress={() => { }}>
                            <HStack m={'3'} space={'1'}>
                                <HStack w={"10%"} alignSelf={'center'}>
                                    <Icon as={<AntDesign name="form" />} size={'lg'} />
                                </HStack>
                                <VStack w={"85%"} >
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

                    <Text color={"gray.600"} mt={'4'} mb={'4'} alignSelf={'center'} fontSize={'xs'} fontWeight={'semibold'}>C A N C E L L A T I O N    P O L I C Y</Text>

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
                    <Text mb="32"></Text>
                </>
    }

    const Scrollview = () => {        
        
            return  <Box alignSelf={'center'} w={'sm'} >                    
                        <ScrollView w={"100%"} showsVerticalScrollIndicator={false} >
                            <ScrollViewContent/>
                        </ScrollView>
                    </Box>
    }

    const Header = () => {
        
            return  <HStack space={'2'} mt={'4'} mb={'4'} alignItems={'center'} alignSelf={'center'} w={'sm'} >
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon as={<AntDesign name="left" />} size={'sm'} color={'black'} />
                        </Pressable>
                        <Text fontSize={'sm'} fontWeight={'bold'} >Kwality Wall's Frozen Dessert and  Ice Cream Shop</Text>
                    </HStack>
    }

    const Footer = () => {

        if (Platform.OS === "web")
            return  <VStack bgColor={'white'} borderTopRadius={'15'} shadow={'9'} alignSelf={'center'}  w={"sm"} style={{ position:"fixed" , bottom: 0 }}>
                        <FooterContent />
                    </VStack>
        else
            return  <VStack bgColor={'white'} borderTopRadius={'15'} shadow={'9'}>
                        <FooterContent />
                    </VStack>
    }

    const Body = () => {

        if (Platform.OS === "web")
            return  <Box w={"100%"} bgColor={'gray.100'}>
                        <Modals />
                        <ActionSheets/>
                        <Header />
                        <Scrollview/>
                        <Footer />
                    </Box>
        else
            return  <Box safeArea w={"100%"} h={"76%"} bgColor={'gray.100'}>
                        <Modals />
                        
                        <Header />
                        <Scrollview/>
                        <Footer />
                        <ActionSheets/>
                    </Box>
    }

    return (
        <NativeBaseProvider>
            <Body/>
        </NativeBaseProvider >
    )
}

export default Checkout
