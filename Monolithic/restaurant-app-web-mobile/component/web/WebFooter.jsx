import React from 'react';
import { Box, Text, VStack, HStack, Image, Button, Divider } from "native-base";

const WebFooter = () => {

    return (
        <Box w={"100%"} bgColor={"gray.100"} >
            <VStack w={"82%"} alignSelf={'center'} pt={"12"} pb={"10"} space={"5"}>

                <HStack justifyContent={'space-between'}>
                    <Image height={"28px"} width={"131px"} source={{ uri: "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" }} alt="logo" />
                    <HStack space={"8"}>
                        <Button variant={"outline"}>India</Button>
                        <Button variant={"outline"}>English</Button>
                    </HStack>
                </HStack>

                <HStack space={"5"}>
                    <VStack space={"5"}>
                        <Text fontSize={"md"} fontWeight={"normal"} >About Zomato</Text>
                        <Text>Burger Singh</Text>
                        <Text>Domino's</Text>
                        <Text>Haldiram's</Text>
                        <Text>KFC</Text>
                    </VStack>
                    <VStack space={"5"}>
                        <Text fontSize={"md"} fontWeight={"normal"} >Zomaverse</Text>
                        <Text>Burger Singh</Text>
                        <Text>Domino's</Text>
                        <Text>Haldiram's</Text>
                        <Text>KFC</Text>
                    </VStack>
                    <VStack space={"5"}>
                        <Text fontSize={"md"} fontWeight={"normal"} >For restaurant</Text>
                        <Text>Burger Singh</Text>
                        <Text>Domino's</Text>
                        <Text>Haldiram's</Text>
                        <Text>KFC</Text>
                    </VStack>
                    <VStack space={"5"}>
                        <Text fontSize={"md"} fontWeight={"normal"} >learn more</Text>
                        <Text>Burger Singh</Text>
                        <Text>Domino's</Text>
                        <Text>Haldiram's</Text>
                        <Text>KFC</Text>
                    </VStack>
                    <VStack space={"5"}>
                        <Text fontSize={"md"} fontWeight={"semibold"} >social links</Text>
                        <Text>Burger Singh</Text>
                        <Text>Domino's</Text>
                        <Text>Haldiram's</Text>
                        <Text>KFC</Text>
                    </VStack>
                </HStack>

                <Divider mt={"10"}/>

                <Text fontSize={"sm"} color={"gray.500"}>
                    By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.
                    All trademarks are properties of their respective owners. 2008-2023 © Zomato™ Ltd. All rights reserved.
                </Text>
            </VStack>
        </Box>
    )
}

export default WebFooter