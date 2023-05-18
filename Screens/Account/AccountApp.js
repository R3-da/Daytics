import { createStackNavigator} from '@react-navigation/stack';
import AccountScreen from './AccountScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
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