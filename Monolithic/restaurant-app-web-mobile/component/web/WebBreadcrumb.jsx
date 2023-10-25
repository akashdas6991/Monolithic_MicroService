import { Button, HStack, Text } from 'native-base'
import React from 'react'

const WebBreadcrumb = (props) => {


    if (props.type === "home")

        return (
            <HStack w={"82%"} alignSelf={'center'} alignItems={"center"} space={"2"} pt={"2"} pb={"2"}>
                <Button size="sm" variant="unstyled" p={"0"}>
                    <Text fontSize={"xs"} color={'gray.400'}>
                        Home
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"}>
                    <Text fontSize={"xs"} color={'gray.400'}>
                        India
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} disabled >
                    <Text fontSize={"xs"} color={'gray.200'}>
                        Kolkata Restaurants
                    </Text>
                </Button>
            </HStack>
        )

    else

        return (
            <HStack w={"82%"} alignSelf={'center'} alignItems={"center"} space={"2"} pt={"2"} pb={"2"}>
                <Button size="sm" variant="unstyled" p={"0"}>
                    <Text fontSize={"xs"} color={'gray.400'}>
                        Home
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"}>
                    <Text fontSize={"xs"} color={'gray.400'}>
                        India
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} >
                    <Text fontSize={"xs"} color={'gray.400'}>
                        Kolkata
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} >
                    <Text fontSize={"xs"} color={'gray.400'}>
                        North Kolkata
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} >
                    <Text fontSize={"xs"} color={'gray.400'}>
                        Hatibagan
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} >
                    <Text fontSize={"xs"} color={'gray.400'}>
                        Chowman
                    </Text>
                </Button>
                <Text color={'gray.400'}>/</Text>
                <Button size="sm" variant="unstyled" p={"0"} disabled>
                    <Text fontSize={"xs"} color={'gray.200'}>
                        Order Online
                    </Text>
                </Button>
            </HStack>
        )

}

export default WebBreadcrumb