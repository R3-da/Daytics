import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Todolist/Home';
import Detail from './Screens/Todolist/Detail';

const Tab  = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Home',
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name='Detail'
          component={Detail}
          options={{
            title: 'Detail',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}