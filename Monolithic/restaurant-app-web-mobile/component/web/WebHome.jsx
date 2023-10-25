import { Box, Heading, Text, Center, VStack, HStack, Avatar, AspectRatio, Image, Stack, ScrollView, StatusBar, Icon, Button, Modal, Divider } from "native-base";
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Pressable, Dimensions, Animated } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import apiService from '../service/apiService';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

const WebHome = () => {

    const navigation = useNavigation();
    const firstMenuItems = apiService.firstMenuItems();
    const secondMenuItems = apiService.secondMenuItems();

    const [box1, setBox1] = React.useState("none");
    const [box2, setBox2] = React.useState("none");
    const [box3, setBox3] = React.useState("none");
    const [box4, setBox4] = React.useState("none");

    const [modalVisible, setModalVisible] = React.useState(false);

    //tabs content start
    const Delivery = () => <>

        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"sm"}>
            <Modal.Content>
                <VStack space={'10'}>
                    <Modal.CloseButton />
                    <Text m={"5"} fontSize={"lg"} color={"red.400"}>
                        This feature is under development
                    </Text>
                </VStack>
            </Modal.Content>
        </Modal>

        <HStack w={"82%"} space={3} alignSelf={'center'} mt={5} mb={5}>
            <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _hover={{ bgColor: "gray.50" }} onPress={() => { setModalVisible(!modalVisible) }}>
                <HStack alignItems={"center"} space={'1'}>
                    <Icon as={<SimpleLineIcons name="equalizer" />} color={"gray.400"} size={3} />
                    <Text fontSize={'md'} color={"gray.400"} >
                        Filters
                    </Text>
                </HStack>
            </Button>
            <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _hover={{ bgColor: "gray.50" }} onPress={() => { setModalVisible(!modalVisible) }}>
                <HStack alignItems={"center"} space={'0'}>
                    <Text fontSize={'md'} color={"gray.400"} >
                        Rating : 4.0
                    </Text>
                    <Icon as={<AntDesign name="plus" />} color={"gray.400"} size={3} />
                </HStack>
            </Button>
            <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _hover={{ bgColor: "gray.50" }} onPress={() => { setModalVisible(!modalVisible) }}>
                <Text fontSize={'md'} color={"gray.400"} >
                    Pure Veg
                </Text>
            </Button>
            <Button size="sm" variant="outline" borderRadius={7} borderColor={"gray.200"} _hover={{ bgColor: "gray.50" }} onPress={() => { setModalVisible(!modalVisible) }}>
                <HStack alignItems={"center"} space={'1'}>
                    <Text fontSize={'md'} color={'gray.400'}>
                        Cuisines
                    </Text>
                    <Icon as={<AntDesign name="down" />} color={"gray.400"} size={3} mt={"1"} />
                </HStack>
            </Button>
        </HStack>

        <Box w={"100%"} bgColor={"gray.100"} >
            <Box w={"82%"} alignSelf={'center'} mt={7} mb={5}>
                <Heading fontWeight={'semibold'} size="lg">
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
                                                <Avatar {...pressed ? navigation.navigate("Order") : 'Press Me'} m={2} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
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
                                            <Avatar {...pressed ? navigation.navigate("Order") : 'Press Me'} size={"2xl"} source={{ uri: String(item.img) }} width={["60px", "80px", "150px"]} height={["60px", "80px", "150px"]} />
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

        <Box w={"82%"} alignSelf={'center'}>
            <Heading fontWeight={'normal'} size="lg" mt={10} mb={10}>
                Best Food in Kolkata
            </Heading>
            <HStack space={12} bgColor={'white'}>
                <VStack width={"30%"} >
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                            Royal Indian Hotel
                                        </Heading>
                                        <Center bg="green.700" mt={1} borderRadius={6} pr={1} pl={1} _text={{ color: "white", fontWeight: "bold", fontSize: "xs" }} h={5} >
                                            <HStack>
                                                <Text color={"white"} fontWeight={'bold'}>4.2 </Text>
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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
                    <Pressable onPress={() => navigation.navigate("Order")}>
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
                                                <Icon as={<AntDesign name="star" />} color={"white"} size={"10px"} mt={"5px"} />
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

        <Box w={"100%"} bgColor={"gray.50"} >
            <VStack w={"82%"} alignSelf={'center'} space={"5"} pt={"10"} pb={"10"}>
                <Text fontSize={"3xl"} fontWeight={"semibold"} >Explore options near me</Text>

                <VStack borderWidth={"1"} borderRadius={"10"} p={"5"} bgColor={"white"} borderColor={"gray.200"}>
                    <Pressable onPress={() => { box1 === "flex" ? setBox1("none") : setBox1("flex") }}>
                        <HStack justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"gray.600"}>Popular cuisines near me</Text>
                            <Icon as={<AntDesign name={box1 === "flex" ? "up" : "down"} />} color={"gray.400"} size={3} mt={"1"} />
                        </HStack>
                    </Pressable>
                    <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} display={box1} mt={"7"}>
                        Bakery food near me Bengali food near meBeverages food near meBiryani food near meBurger food near me
                        Chinese food near me Continental food near meDesserts food near meKebab food near meMomos food near me
                        Mughlai food near meNorth Indian food near mePizza food near meRolls food near meSandwich food near me
                        Seafood food near meShake food near meSichuan food near meSouth Indian food near meStreet food near me
                    </Text>
                </VStack>

                <VStack borderWidth={"1"} borderRadius={"10"} p={"5"} bgColor={"white"} borderColor={"gray.200"}>
                    <Pressable onPress={() => { box2 === "flex" ? setBox2("none") : setBox2("flex") }}>
                        <HStack justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"gray.600"}>Popular restaurant types near me</Text>
                            <Icon as={<AntDesign name={box2 === "flex" ? "up" : "down"} />} color={"gray.400"} size={3} mt={"1"} />
                        </HStack>
                    </Pressable>
                    <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} display={box2} mt={"7"}>
                        Bakeries near meBars near meBeverage Shops near meBhojanalya near meCafés near meCasual Dining near me
                        Clubs near meCocktail Bars near meConfectioneries near meDessert Parlors near meDhabas near me
                        Fine Dining near meFood Courts near meFood Trucks near meKiosks near meLounges near meMicrobreweries near me
                        Paan Shop near mePubs near meQuick Bites near meSweet Shops near me
                    </Text>
                </VStack>

                <VStack borderWidth={"1"} borderRadius={"10"} p={"5"} bgColor={"white"} borderColor={"gray.200"}>
                    <Pressable onPress={() => { box3 === "flex" ? setBox3("none") : setBox3("flex") }}>
                        <HStack justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"gray.600"}>Top Restaurant Chains</Text>
                            <Icon as={<AntDesign name={box3 === "flex" ? "up" : "down"} />} color={"gray.400"} size={3} mt={"1"} />
                        </HStack>
                    </Pressable>
                    <HStack display={box3} mt={"7"} space={"7"}>
                        <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Burger King</Text>
                        <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Burger Singh</Text>
                        <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Domino's</Text>
                        <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Haldiram's</Text>
                        <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >KFC</Text>
                    </HStack>
                </VStack>


                <VStack borderWidth={"1"} borderRadius={"10"} p={"5"} bgColor={"white"} borderColor={"gray.200"}>
                    <Pressable onPress={() => { box4 === "flex" ? setBox4("none") : setBox4("flex") }}>
                        <HStack justifyContent={'space-between'} alignItems={'center'}>
                            <Text fontSize={"xl"} fontWeight={"semibold"} color={"gray.600"}>Cities We Deliver To</Text>
                            <Icon as={<AntDesign name={box4 === "flex" ? "up" : "down"} />} color={"gray.400"} size={3} mt={"1"} />
                        </HStack>
                    </Pressable>
                    <HStack display={box4} mt={"7"} space={"7"}>
                        <VStack>
                            <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Delhi NCR</Text>
                            <Text>Burger Singh</Text>
                            <Text>Domino's</Text>
                            <Text>Haldiram's</Text>
                            <Text>KFC</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Kolkata</Text>
                            <Text>Burger Singh</Text>
                            <Text>Domino's</Text>
                            <Text>Haldiram's</Text>
                            <Text>KFC</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Mumbai</Text>
                            <Text>Burger Singh</Text>
                            <Text>Domino's</Text>
                            <Text>Haldiram's</Text>
                            <Text>KFC</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Bengaluru</Text>
                            <Text>Burger Singh</Text>
                            <Text>Domino's</Text>
                            <Text>Haldiram's</Text>
                            <Text>KFC</Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={"lg"} fontWeight={"normal"} color={"gray.400"} >Pune</Text>
                            <Text>Burger Singh</Text>
                            <Text>Domino's</Text>
                            <Text>Haldiram's</Text>
                            <Text>KFC</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    </>;

    const DiningOut = () => <Text fontSize={"7xl"} color={"red.400"}>This feature is under development</Text>

    const NightLife = () => <Text fontSize={"7xl"} color={"red.400"}>This feature is under development</Text>
    //tabs content end

    // Tab with content start
    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        first: Delivery,
        second: DiningOut,
        third: NightLife
    });

    function GenerateTabWithContentForWebHome() {
        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([{
            key: 'first',
            title: [
                <HStack alignItems={'center'} key={"first"} >
                    <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png" }} size={"60px"} borderWidth={"10px"} borderColor={"orange.100"} bgColor={"orange.100"} />
                    <Text color={"red.400"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Delivery</Text>
                </HStack>
            ]
        }, {
            key: 'second',
            title: [
                <HStack alignItems={'center'} key={"second"}>
                    <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png" }} size={"60px"} borderWidth={"10px"} borderColor={"blue.100"} bgColor={"blue.100"} />
                    <Text color={"gray.500"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Dining Out</Text>
                </HStack>
            ]
        }, {
            key: 'third',
            title: [
                <HStack alignItems={'center'} key={"third"}>
                    <Avatar source={{ uri: "https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png" }} size={"60px"} borderWidth={"10px"} borderColor={"blue.100"} bgColor={"blue.100"} />
                    <Text color={"gray.500"} fontSize={'xl'} fontWeight={'semibold'} pl={2}>Nightlife</Text>
                </HStack>
            ]
        }]);

        const renderTabBar = props => {

            return  <>
                        <HStack w={"82%"} alignSelf={"center"} space={"5"}>
                        
                        {props.navigationState.routes.map((route, i) => {

                            const color = index === i ? 'red.400' : 'gray.500';
                            const borderColor = index === i ? 'red.400' : 'gray.300';
                            return <Box borderBottomWidth={ borderColor === "red.400" ? "2" : "0" }  borderColor={borderColor}  alignItems="center" p="4" cursor="pointer" key={i}>
                                        
                                        
                                            <Pressable onPress={() => { setIndex(i); }} > 
                                                <Animated.Text style={{ color }} >
                                                    {route.title}
                                                </Animated.Text>
                                            </Pressable>
                                         
                                    </Box>;
                        })}
                        
                        </HStack>
                        <Divider bgColor={"gray.100"}/>
                    </>;
        };

        return <TabView navigationState={{ index, routes }}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        style={{ marginTop: StatusBar.currentHeight }} />;
    }
    //Tab with content end

    return (

        <GenerateTabWithContentForWebHome />
    )
}

export default WebHome