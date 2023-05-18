import { createStackNavigator} from '@react-navigation/stack';
import TasksScreen from './TasksScreen';
import TaskScreen from './TaskDetailScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name='TasksScreen'
          component={TasksScreen}
          options={{
            title: 'Tasks',
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