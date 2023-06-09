import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from './Screens/Account/AccountApp';
import Tasks from './Screens/Tasks/TasksApp';
import Timer from './Screens/TimeTracker/TimerApp';
import Settings from './Screens/Settings/SettingsApp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab  = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Account') {
              iconName = focused
                ? 'person'
                : 'person-outline';
            } else if (route.name === 'Tasks') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Timer') {
              iconName = focused ? 'stopwatch' : 'stopwatch-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name='Account'
          component={Account}
        />
        <Tab.Screen
          name='Tasks'
          component={Tasks}
        />
        <Tab.Screen
          name='Timer'
          component={Timer}
        />
        <Tab.Screen
          name='Settings'
          component={Settings}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}