import { Box, Text, Center, VStack, HStack, Image, Divider, StatusBar, Icon, Input, Button, Checkbox, Heading, Tooltip } from "native-base";
import { AntDesign, EvilIcons, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import { Pressable, Dimensions, Animated } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const WebOrder = () => {

    const navigation = useNavigation();

    const RestaurantHead = () => {

        return (
            <>
                <HStack w={"82%"} space={2} alignSelf={'center'}>
                    <HStack w={"62%"}>
                        <Box>
                            <Image resizeMode="cover" height={"400px"} width={"685px"} source={{
                                uri: "https://b.zmtcdn.com/data/pictures/chains/5/21495/1cc4847655d023b812a3a2512cf9641f.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
                            }} alt="Picture of a Flower" />
                        </Box>
                    </HStack>
                    <HStack w={"18%"}>
                        <VStack space={2}>
                            <Box>
                                <Image resizeMode="cover" height={"195px"} width={"200px"} source={{
                                    uri: "https://b.zmtcdn.com/data/pictures/chains/5/21495/dd162b67fea9280d4af6ceb59e4968e5.jpg?fit=around|300:273&crop=300:273;*,*"
                                }} alt="Picture of a Flower" />
                            </Box>
                            <Box>
                                <Image resizeMode="cover" height={"195px"} width={"200px"} source={{
                                    uri: "https://b.zmtcdn.com/data/pictures/chains/5/21495/69a4a40468cb39f293ce0408d1b85b59.jpg?fit=around|300:273&crop=300:273;*,*"
                                }} alt="Picture of a Flower" />
                            </Box>
                        </VStack>
                    </HStack>
                    <HStack w={"18%"}>
                        <Box>
                            <Image resizeMode="cover" height={"400px"} width={"200px"} source={{
                                uri: "https://b.zmtcdn.com/data/pictures/chains/5/21495/0cb990840999386b5ea43e17e3cb7399.jpg?fit=around|300:273&crop=300:273;*,*"
                            }} alt="Picture of a Flower" />
                        </Box>
                    </HStack>
                </HStack>

                <VStack w={"82%"} alignSelf={'center'} mt={2} >
                    <HStack justifyContent={'space-between'} >
                        <HStack>
                            <Heading fontWeight={'semibold'} size="xl">
                                Chowman
                            </Heading>
                        </HStack>
                        <HStack space={2}>
                            <HStack bgColor={"green.700"} alignItems={'center'} borderRadius={10} p={"10px"} h={"30px"} mt={2}>
                                <Text color={"white"} fontWeight={'bold'} fontSize={'lg'}>4.4 </Text>
                                <Icon as={<AntDesign name="star" />} color={"white"} size={"12px"} />
                            </HStack>
                            <VStack>
                                <Text fontWeight={'bold'} color={"gray.600"}>928</Text>
                                <Text fontWeight={'normal'} color={"gray.500"}> <u style={{ borderBottom: "1px dashed", textDecoration: "none" }}>Dining reviews </u> </Text>
                            </VStack>
                            <HStack bgColor={"green.700"} alignItems={'center'} borderRadius={10} p={"10px"} h={"30px"} mt={2} ml={4}>
                                <Text color={"white"} fontWeight={'bold'} fontSize={'lg'}>4.5 </Text>
                                <Icon as={<AntDesign name="star" />} color={"white"} size={"12px"} />
                            </HStack>
                            <VStack>
                                <Text fontWeight={'bold'} color={"gray.600"}>14K</Text>
                                <Text fontWeight={'normal'} color={"gray.500"}> <u style={{ borderBottom: "1px dashed", textDecoration: "none" }}>Delivery reviews </u></Text>
                            </VStack>
                        </HStack>
                    </HStack>

                    <Text fontWeight={'normal'} color={"gray.500"} fontSize={"md"}>Chinese, Seafood, Sichuan, Beverages</Text>
                    <Text fontWeight={'normal'} color={"gray.400"} fontSize={"md"}>Hatibagan, Kolkata</Text>

                    <HStack mt={1} mb={2} alignContent={'center'}>
                        <Text fontWeight={'normal'} color={"orange.300"}>Open now </Text>
                        <Text fontWeight={'normal'} color={"gray.400"}> - 11:45am – 5pm, 5:45pm – 11pm (Today) </Text>
                        <Tooltip label={

                            <VStack space={2} p={4}>
                                <Heading fontSize={'3xl'} fontWeight={'normal'}>Opening Hours </Heading>
                                <HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.600"} >Mon, Wed: </Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.500"} >11:45am - 5pm, 5:45pm - 10:30pm</Text>
                                    </HStack>
                                </HStack>
                                <HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.600"} >Tue, Fri-Sun: </Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.500"} >11:45am - 5pm, 5:45pm - 11pm</Text>
                                    </HStack>
                                </HStack>
                                <HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.600"} >Thu: </Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize={'md'} color={"gray.500"} >11:45am - 11pm</Text>
                                    </HStack>
                                </HStack>
                            </VStack>

                        } placement='right top' bg={'white'} openDelay={500} borderRadius={10} borderWidth={2} borderColor={"gray.200"} shadow={'none'} >
                            <Button variant={'unstyled'} w={"5px"} h={"5px"}>
                                <Icon as={<Ionicons name="information-circle-outline" />} size={"sm"} color={"gray.400"} p={"2px"} />
                            </Button>
                        </Tooltip>
                    </HStack>

                    <HStack space={3} >
                        <Button h={"35px"} variant="outline" borderRadius={7} borderColor={"gray.400"} _hover={{ bgColor: "gray.50" }}>
                            <HStack alignItems={'center'}>
                                <Icon as={<FontAwesome5 name="directions" />} color={"red.400"} size={4} />
                                <Text fontSize={'md'} color={"gray.500"} > Direction</Text>
                            </HStack>
                        </Button>
                        <Button h={"35px"} variant="outline" borderRadius={7} borderColor={"gray.400"} _hover={{ bgColor: "gray.50" }}>
                            <HStack alignItems={'center'}>
                                <Icon as={<FontAwesome5 name="bookmark" />} color={"red.400"} size={4} />
                                <Text fontSize={'md'} color={"gray.500"} > Bookmark</Text>
                            </HStack>
                        </Button>
                        <Button h={"35px"} variant="outline" borderRadius={7} borderColor={"gray.400"} _hover={{ bgColor: "gray.50" }}>
                            <HStack alignItems={'center'}>
                                <Icon as={<FontAwesome5 name="share" />} color={"red.400"} size={4} />
                                <Text fontSize={'md'} color={"gray.500"} > Share</Text>
                            </HStack>
                        </Button>
                    </HStack>
                </VStack>
            </>
        )

    }

    const FirstTab = () => <>
        <HStack justifyContent={'space-between'} mt={2}>

            <VStack w={"25%"}>
                <Text fontSize={'lg'} p={2} fontWeight={'semibold'} color={"red.400"}>Happy Vegetarian Day Deals (13)</Text>
                <Text fontSize={'lg'} p={2}>Special Combos (2)</Text>
                <Text fontSize={'lg'} p={2}>Oriental Seafood Festival (15)</Text>
                <Text fontSize={'lg'} p={2}>Soup (26)</Text>
                <Text fontSize={'lg'} p={2}>Starters (94)</Text>
                <Text fontSize={'lg'} p={2}>Main Course (118)</Text>
                <Text fontSize={'lg'} p={2}>Rice (26)</Text>
                <Text fontSize={'lg'} p={2}>Noodles (27)</Text>
                <Text fontSize={'lg'} p={2}>Meifoon (11)</Text>
                <Text fontSize={'lg'} p={2}>Bankok Street Noodle Bowl (4)</Text>
                <Text fontSize={'lg'} p={2}>Ramen (3)</Text>
                <Text fontSize={'lg'} p={2}>Khao Suey (4)</Text>
                <Text fontSize={'lg'} p={2}>Thai (10)</Text>
                <Text fontSize={'lg'} p={2}>Dessert & Beverages (5)</Text>
                <Text fontSize={'lg'} p={2}>Flavourful Sauces</Text>
            </VStack>

            <Divider orientation="vertical" my={"1px"} bg="gray.200" />

            <VStack w={"75%"}>
                <HStack ml={4} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack>
                        <Text fontSize={'2xl'} >Order Online</Text>
                    </HStack>
                    <HStack borderColor={'gray.300'} borderWidth={"1px"} borderRadius={"5px"} mr={1}>
                        <Input placeholder="Search within menu" variant={'unstyled'} fontSize={'lg'} InputLeftElement={<Icon ml="2" size="7" color="gray.400" as={<EvilIcons name="search" />} />} InputRightElement={<Icon mr="2" size="3" color="gray.400" as={<EvilIcons name="close" />} />} />
                    </HStack>
                </HStack>
                <HStack ml={4} alignItems={'center'} space={2}>
                    <Icon as={<Fontisto name="compass" />} color={"gray.400"} size={4} />
                    <Text color={"gray.400"}>Live track your order  | </Text>
                    <Icon as={<AntDesign name="clockcircleo" />} color={"gray.400"} size={4} />
                    <Text color={"gray.400"}>39 min</Text>
                </HStack>

                <HStack m={4} space={3} >

                    <HStack bg="blue.700">
                        <VStack p={2}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={"xs"}>20% OFF up to ₹100</Text>
                            <Text color={'white'} fontWeight={'normal'} fontSize={"xs"}>use code IDBIFEAST</Text>
                        </VStack>
                    </HStack>

                    <HStack bg="blue.700">
                        <VStack p={2}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={"xs"}>Flat ₹100 OFF</Text>
                            <Text color={'white'} fontWeight={'normal'} fontSize={"xs"}>use code AUDC100</Text>
                        </VStack>
                    </HStack>

                    <HStack bg="blue.700">
                        <VStack p={2}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={"xs"}>Free Delivery</Text>
                            <Text color={'white'} fontWeight={'normal'} fontSize={"xs"}>exclusively for you</Text>
                        </VStack>
                    </HStack>

                    <HStack bg="blue.700">
                        <VStack p={2}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={"xs"}>10% OFF up to ₹100</Text>
                            <Text color={'white'} fontWeight={'normal'} fontSize={"xs"}>use code BIGMEAL</Text>
                        </VStack>
                    </HStack>

                    <HStack bg="blue.700">
                        <VStack p={2}>
                            <Text color={'white'} fontWeight={'bold'} fontSize={"xs"}>10% OFF up to ₹150</Text>
                            <Text color={'white'} fontWeight={'normal'} fontSize={"xs"}>use code DIGISMART</Text>
                        </VStack>
                    </HStack>

                </HStack>

                <Checkbox colorScheme="green" value="veg" ml={5} >veg only</Checkbox>

                <Text fontSize={'2xl'} ml={4} mb={4}>Happy Vegetarian Day Deals</Text>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/e9e/8be4976cc0611d4d9f253b3977795e9e.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"} >
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Chilli Garlic Noodles Veg</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack alignItems={'center'} mt={1} mb={1}>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}>  130 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹139</Text>
                        <Text color={'gray.500'}>Noodles with carrot, cabbage, mustard plant & bell peppers <br />tossed in chilli paste, tomato ketchup flavoured with chopped garlic</Text>
                    </VStack>
                </HStack>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/d22/e2e5f7931e01d9e33152646c7d5e3d22.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Chilli Garlic Rice Veg</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<FontAwesome5 name="star-half-alt" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}> 24 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹139</Text>
                        <Text color={'gray.500'}>Rice with carrot, american corn & beans tossed in chilli paste, tomato <br />ketchup flavoured with chopped garlic</Text>
                    </VStack>
                </HStack>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/b83/283069d51515a3dd23f760ebc7b83b83.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Coriander Burnt Garlic Veg Rice</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}> 103 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹139</Text>
                        <Text color={'gray.500'}>Coriander flavoured rice with carrots, beans and american corn flavoured <br />and garnished with burnt garlic and coriander leaf</Text>
                    </VStack>
                </HStack>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/3f6/f6dfb137552381d07050ff53f509f3f6.jpg?fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Darsaan</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}>235 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹99</Text>
                        <Text color={'gray.500'}>A hearty desert made with the fried Wonton noodles, dripping honey and <br />sprinkles of sesame seeds</Text>
                    </VStack>
                </HStack>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/2aa/da9b7cb9d306e2d301360c5918fca2aa.jpg?fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Ginger Capsicum Flavored Rice</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => navigation.replace("Checkout")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}>35 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹139</Text>
                        <Text color={'gray.500'}>Rice sauteed with shredded bell pepper, ginger and mushroom</Text>
                    </VStack>
                </HStack>

                <HStack ml={4} mb={10}>
                    <Image mr={4} borderRadius={10} source={{ uri: "https://b.zmtcdn.com/data/dish_photos/d25/51f9a09412b772740a39072879e5dd25.jpg?fit=around|130:130&crop=130:130;*,*" }} alt="Alternate Text" size="xl" />
                    <VStack w={"70%"}>
                        <HStack justifyContent={'space-between'}>
                            <Text fontSize={'lg'} fontWeight={'semibold'}>Hot And Sour Soup Veg</Text>
                            <Button bgColor={'red.400'} w={"100px"} h={"25px"} onPress={() => alert("Added !")}>
                                <Text fontSize={'xs'} fontWeight={'semibold'} color={'white'} >
                                    <Icon as={<FontAwesome5 name="shopping-cart" />} color={'white'} size={4} /> Add to cart
                                </Text>
                            </Button>
                        </HStack>
                        <HStack>
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"yellow.400"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Icon as={<AntDesign name="star" />} color={"gray.200"} size={4} />
                            <Text color={'gray.400'}>5 Votes</Text>
                        </HStack>
                        <Text color={'gray.500'} mt={1} mb={1}>₹119</Text>
                        <Text color={'gray.500'}>This soup come in a spicy, soya based and brown colour with cabbage, <br />carrot, tofu and shiitake mushroom.</Text>
                    </VStack>
                </HStack>


            </VStack>
        </HStack>

    </>;

    const SecondTab = () => <Center flex={1} my="4">
        This is Tab 2
    </Center>;

    const ThirdTab = () => <Center flex={1} my="4">
        This is Tab 3
    </Center>;

    const FourthTab = () => <Center flex={1} my="4">
        This is Tab 4
    </Center>;

    const FifthTab = () => <Center flex={1} my="4">
        This is Tab 5
    </Center>;

    const SixthTab = () => <Center flex={1} my="4">
        This is Tab 6
    </Center>;

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        first: FirstTab,
        second: SecondTab,
        third: ThirdTab,
        fourth: FourthTab,
        fifth: FifthTab,
        sixth: SixthTab
    });

    function GenerateTabsWithContent() {
        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([{
            key: 'first',
            title: 'Order Online'
        }, {
            key: 'second',
            title: 'Overview'
        }, {
            key: 'third',
            title: 'Reviews'
        }, {
            key: 'fourth',
            title: 'Photos'
        }, {
            key: 'fifth',
            title: 'Menu'
        }, {
            key: 'sixth',
            title: 'Book a Table'
        }]);

        const renderTabBar = props => {
            const inputRange = props.navigationState.routes.map((x, i) => i);
            return <Box flexDirection="row">
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                    });
                    const color = index === i ? 'red.400' : 'gray.500';
                    const fontWeight = index === i ? 'semibold' : 'normal';
                    const borderColor = index === i ? 'red.400' : 'gray.300';
                    return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer" key={i}>
                        <Pressable onPress={() => { setIndex(i); }}>
                            <Animated.Text>
                                <Text fontSize={"lg"} color={color} fontWeight={fontWeight}>{route.title}</Text>
                            </Animated.Text>
                        </Pressable>
                    </Box>;
                })}
            </Box>;
        };

        return <TabView navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={{ marginTop: StatusBar.currentHeight }} />;
    }



    return (

        <>
            <RestaurantHead />

            <VStack w={"82%"} alignSelf={'center'} >

                <GenerateTabsWithContent />

            </VStack>
        </>



    )
}

export default WebOrder