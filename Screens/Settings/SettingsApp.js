import { createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  )
}