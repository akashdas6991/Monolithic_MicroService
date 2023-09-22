import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './component/Home';
import SignInNew from './component/SignInNew';
import SignUpNew from './component/SignUpNew';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>  
          
          <Stack.Screen name="SignInNew" component={SignInNew} />
          <Stack.Screen name="SignUpNew" component={SignUpNew} />
          <Stack.Screen name="Home"      component={Home}      />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}