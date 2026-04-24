import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { t } = useTranslation();

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Profile Section */}
      <View style={[styles.profileSection, { backgroundColor: colors.background }]}>
        <View style={[styles.avatar, { backgroundColor: colors.icon + '33' }]}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={[styles.profileName, { color: colors.text }]}>Diego Bonilla</Text>
        <Text style={[styles.profileSub, { color: colors.icon }]}>{t('settings.memberSince')}</Text>
      </View>

      {/* Account Settings */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        <TouchableOpacity style={sharedStyles.row} onPress={() => router.push('/settings/account')}>
          <MaterialCommunityIcons name="account-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('settings.accountSettings')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Accessibility */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        <TouchableOpacity style={sharedStyles.row} onPress={() => router.push('/settings/accessibility')}>
          <MaterialCommunityIcons name="palette-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('settings.accessibility')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileSub: {
    fontSize: 14,
    marginTop: 4,
  },
});