import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, NativeBaseProvider, VStack, HStack, Image,  Divider,  Icon, Button,  Tooltip } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, Platform, Alert as ReactAlert } from 'react-native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Header from './Header';
import GenerateTabWithContentForWebOrder from './GenerateTabWithContentForWebOrder';



const Order = ({ props, navigation }) => {

  const [popUp, setPopUp] = useState([]);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {

    //check user logged In
    loggedIn();

    //restrict back button of mobile - working
    if (!Platform.OS === 'web') {
      const backButtonAction = () => {
        ReactAlert.alert('Hold on !', 'Are you sure you want to exit ?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backButtonAction,
      );

      return () => {
        backHandler.remove();
      }
    }

  }, []);

  //check logged In
  const loggedIn = () => {
    try {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];

            if (key == "token")
              setToken(value);

            if (key == "userEmail")
              setUserEmail(value);

            //if(key == "loggedIn")
            //  navigation.replace("Home");
          });
        });
      });
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <NativeBaseProvider>
      <Box safeArea w={"100%"} bgColor={'white'} >

        <Header usernamee={"Akash"} />

        <Divider w="100%" color={'gray.500'} />

        <HStack w={"82%"} alignSelf={'center'}>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" pl={0} >
              Home
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" >
              India
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" >
              Kolkata
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" >
              North Kolkata
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" >
              Hatibagan
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" >
              Chowman
            </Button>
            <Text color={'gray.400'} pt={"7px"}>/</Text>
          </HStack>
          <HStack>
            <Button size="sm" variant="link" colorScheme="secondary" isDisabled>
              Order Online
            </Button>
          </HStack>
        </HStack>

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

        <VStack w={"82%"} alignSelf={'center'} >
           
          <GenerateTabWithContentForWebOrder />
        
        </VStack>

      </Box>
    </NativeBaseProvider>
  )
}

export default Order