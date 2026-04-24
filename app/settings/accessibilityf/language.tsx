import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', labelKey: 'language.english', flag: '🇺🇸' },
  { code: 'es', labelKey: 'language.spanish', flag: '🇪🇸' },
];

export default function LanguageScreen() {

  const router = useRouter()
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>


      <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        <Text style={[sharedStyles.backText, { color: colors.text }]}>
          {t('language.title')}
        </Text>
      </TouchableOpacity>

    <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
      {LANGUAGES.map((lang, index) => (
        <View key={lang.code}>
          <TouchableOpacity
            style={sharedStyles.row}
            onPress={() => i18n.changeLanguage(lang.code)}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text style={[sharedStyles.rowText, { color: colors.text}]}>
                {t(lang.labelKey)}
                </Text>
                {currentLanguage === lang.code && (
                  <MaterialCommunityIcons name="check" size={22} color={colors.tint} />
                )}
            </TouchableOpacity>
            {index < LANGUAGES.length - 1 && (
               <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
            )}
            </View>
          ))}
          </View>

          </ScrollView>

          
          );
        }

    const styles = StyleSheet.create({
      flag: {
        fontSize: 24,
        marginRight: 8,
      },
    });
    