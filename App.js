import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksScreen from './Screens/Todolist/TodoListScreen';
import TaskScreen from './Screens/Todolist/TaskScreen';

const Tab  = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: true}}>
        <Tab.Screen
          name='Tasks'
          component={TodoListScreen}
          options={{
            title: 'Tasks',
            headerTitleAlign: 'center',
          }}
        >

        </Tab.Screen>
        <Tab.Screen
          name='Detail'
          component={DetailScreen}
          options={{
            title: 'Detail',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}