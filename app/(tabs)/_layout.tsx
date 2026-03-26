import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
 return (
   <Tabs>
     <Tabs.Screen
       name="index"
       options={{
         title: "",
         tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home-filled" color={color} />,
         headerShown: false
       }}
     />
     <Tabs.Screen
       name="create"
       options={{
         title: "",
         tabBarIcon: ({ color }) => <MaterialIcons size={28} name="add" color={color} />,
         headerShown: false
       }}
     />
     <Tabs.Screen
       name="settings"
       options={{
         title: "",
         tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
         headerShown: false
       }}
     />
   </Tabs>
 )
}