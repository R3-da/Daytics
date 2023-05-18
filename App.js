import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoList from './Screens/Todolist/TodoListApp';

const Tab  = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name='Account'
          component={TodoList}
        />
        <Tab.Screen
          name='To Do'
          component={TodoList}
        />
        <Tab.Screen
          name='Time Tracker'
          component={TodoList}
        />
        <Tab.Screen
          name='Settings'
          component={TodoList}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}