import { Box, NativeBaseProvider } from "native-base";
import WebHeader from "./web/WebHeader";
import WebHome from "./web/WebHome";
import { Platform } from "react-native";
import MobileHome from "./mobile/MobileHome";
import MobileHeader from "./mobile/MobileHeader";
import WebFooter from "./web/WebFooter";
import WebBreadcrumb from "./web/WebBreadcrumb";

const Home = () => {

    const Content = () => {

        if (Platform.OS === "web")
            return (
                <>
                    <WebHeader usernamee={"Akash"} />
                    <WebBreadcrumb type={"home"} />
                    <WebHome />
                    <WebFooter />
                </>
            )
        else
            return (
                <>
                    <MobileHeader />
                    <MobileHome />
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

export default Home