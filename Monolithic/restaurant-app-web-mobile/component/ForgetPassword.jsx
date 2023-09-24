import { Box, Button, Center, Heading, Input, NativeBaseProvider, Text, VStack } from 'native-base';
import React from 'react';

const ForgetPassword = () => {


    //submit form
    const handleSubmit = () => {

    }

    return (
        <NativeBaseProvider>
            <Center w="100%" flex={1} bg="#fff" >
                <Box safeArea w="2xs">
                    <VStack space={"xl"}>
                        <Heading fontWeight="bold" color={"green.600"} >Forgot Password</Heading>
                        <Text color="muted.400">
                            Not to worry! Enter email address associated with your account and
                            we’ll send a link to reset your password.
                        </Text>
                        <Input type="text" borderRadius={"35px"} _hover={{ borderColor: "green.800" }} _focus={{ borderColor: "green.800", bg: "white" }}  placeholder="Email" />
                        <Button w={"40"} alignSelf={"center"} _text={{ fontWeight: "bold" }} borderRadius={"35px"} bg={"green.600"} _hover={{ bg: "gray.600" }} _pressed={{ bg: "green.600" }} onPress={handleSubmit}>
                            Proceed
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}

export default ForgetPassword