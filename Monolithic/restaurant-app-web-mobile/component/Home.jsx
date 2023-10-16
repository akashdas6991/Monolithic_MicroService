import { Box, NativeBaseProvider} from "native-base";
import WebHeader from "./web/WebHeader";
import WebHome from "./web/WebHome";
import { Platform } from "react-native";
import MobileHome from "./mobile/MobileHome";

const Home = () => {

    return (
        <NativeBaseProvider>
            <Box safeArea w={"100%"} bgColor={'white'} >

                { () => {
                    if( Platform.OS === "web" ){
                        <>
                            <WebHeader usernamee={"Akash"} /> 
                            <WebHome/>
                        </>
                    }
                    else{
                        <>
                            <WebHeader usernamee={"Akash"} /> 
                            <MobileHome/>
                        </>
                        
                    }
                }}

            </Box>
        </NativeBaseProvider>
    )
}

export default Home