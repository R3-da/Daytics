import { createStackNavigator} from '@react-navigation/stack';
import TimerScreen from './TimerScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name='TimerScreen'
        component={TimerScreen}
        options={{
          title: 'Timer',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}