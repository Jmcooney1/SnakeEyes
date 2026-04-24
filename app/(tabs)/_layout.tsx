import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const loggedIn = true;

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  return (
   <Tabs>
    <Tabs.Protected guard={loggedIn}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => <MaterialIcons size={28} name="home-filled" color={focused ? colors.tint : color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => <MaterialIcons size={28} name="add" color={focused? colors.tint : color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color,  focused }) => <MaterialIcons size={28} name="settings" color={focused? colors.tint : color} />,
          headerShown: false
        }}
      />
    </Tabs.Protected>
    <Tabs.Protected guard={!loggedIn}>
      <Tabs.Screen
        name="homePublic"
        options={{
          tabBarStyle: {display: 'none'},
          headerShown: false
        }}
      />
    </Tabs.Protected>
   </Tabs>
 )
}