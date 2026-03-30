import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Header */}
      <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        <Text style={[sharedStyles.backText, { color: colors.text }]}>Account Settings</Text>
      </TouchableOpacity>

      {/* Options */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        <TouchableOpacity style={sharedStyles.row}>
          <MaterialCommunityIcons name="email-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>Change Email</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
        <TouchableOpacity style={sharedStyles.row}>
          <MaterialCommunityIcons name="lock-outline" size={22} color={colors.icon} />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>Change Password</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
        <TouchableOpacity style={sharedStyles.row}>
          <MaterialCommunityIcons name="delete-outline" size={22} color="red" />
          <Text style={[sharedStyles.rowText, { color: 'red' }]}>Delete Account</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}