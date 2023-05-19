import { createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name='AccountScreen'
        component={LoginScreen}
        options={{
          title: 'Account',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}