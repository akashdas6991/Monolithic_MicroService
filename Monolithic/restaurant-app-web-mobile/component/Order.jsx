import React from 'react';
import { Platform } from 'react-native';
import { Box, Divider, NativeBaseProvider } from "native-base";
import WebHeader from './web/WebHeader';
import WebBreadcrumb from './web/WebBreadcrumb';
import WebOrder from './web/WebOrder';
import WebFooter from './web/WebFooter';
import MobileHeader from './mobile/MobileHeader';
import MobileOrder from './mobile/MobileOrder';


const Order = () => {

  const Content = () => {

    if (Platform.OS === "web")
      return (
        <>
          <WebHeader usernamee={"Akash"} />
          <Divider w="100%" bgColor={'gray.100'} />
          <WebBreadcrumb type={"order"} />
          <WebOrder />
          <WebFooter />
        </>
      )
    else
      return (
        <>
          <MobileHeader />
          <MobileOrder />
        </>
      )
  }

  return (
    <NativeBaseProvider>
      <Box safeArea w={"100%"} bgColor={'white'} >

        <Content />

      </Box>
    </NativeBaseProvider>
  )
}

export default Order