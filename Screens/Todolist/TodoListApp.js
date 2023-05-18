import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TasksScreen from './TasksScreen';
import TaskScreen from './TaskDetailScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name='To Do'
          component={TasksScreen}
          options={{
            title: 'To Do',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name='Detail'
          component={TaskScreen}
        />
      </Stack.Navigator>
  )
}