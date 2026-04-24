import { useTranslation } from 'react-i18next';
import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '../../i18n';
import {useEffect, useState } from 'react';
import i18n from '@/i18n';

export default function RootLayout(){
  const [, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => setLanguage(lng);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, []);

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


