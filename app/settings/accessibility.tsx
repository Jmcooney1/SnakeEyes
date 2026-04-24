import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';

export default function AccessibilityScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const [notifications, setNotifications] = useState(false); //this for to create boolean var for the notification
  const { t } = useTranslation();

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Header */}
      <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}> 
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        <Text style={[sharedStyles.backText, { color: colors.text }]}>{t('accessibility.title')}</Text>
      </TouchableOpacity>

      {/* Options */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>

        {/* Design Settings */}
        <TouchableOpacity style={sharedStyles.row} onPress={() => router.push('/settings/design')}>
          <MaterialCommunityIcons name="palette-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('accessibility.designSettings')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />

        {/* Notifications toggle */}
        <View style={sharedStyles.row}>
          <MaterialCommunityIcons name="bell-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('accessibility.notifications')}</Text>
          <Switch
            value={notifications}
            onValueChange={(value) => setNotifications(value)}
            trackColor={{ false: colors.icon, true: colors.tint }}
          />
        </View>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />

        {/* Language */}
        <TouchableOpacity style={sharedStyles.row} onPress={() => router.push('/settings/accessibilityf/language')}>
          <MaterialCommunityIcons name="web" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('accessibility.language')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}