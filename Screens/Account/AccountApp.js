import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import AccountScreen from './AccountScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          title: 'Login',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{
          title: 'Account',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}