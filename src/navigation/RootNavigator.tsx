import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { AuthScreen } from '../screens/AuthScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'Discover' ? 'flame-outline' : 'person-outline';
          return <Ionicons name={icon as 'flame-outline' | 'person-outline'} color={color} size={size} />;
        }
      })}
    >
      <Tabs.Screen name="Discover" component={DiscoverScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="Main" component={MainTabs} /> : <Stack.Screen name="Auth" component={AuthScreen} />}
    </Stack.Navigator>
  );
}
