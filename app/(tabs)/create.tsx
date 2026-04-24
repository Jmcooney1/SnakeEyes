import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import type React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

export default function CreateScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { t } = useTranslation();

  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedFontSize, setSelectedFontSize] = useState('12');
  const [selectedHighlight, setSelectedHighlight] = useState('none');
  const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
  const [selectedReadingSpeed, setSelectedReadingSpeed] = useState('200');

  const handleFileUpload = () => console.log('File upload button pressed');
  const handleTextInput = () => console.log('Text input button pressed');

  type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

  const pickerOptions = [
    {
      label: t('create.font'),
      icon: 'format-font' as IconName,
      value: selectedFont,
      setter: setSelectedFont,
      items: [
        { label: t('create.fonts.arial'), value: 'arial' },
        { label: t('create.fonts.times'), value: 'times' },
        { label: t('create.fonts.courier'), value: 'courier' },
      ],
    },
    {
      label: t('create.fontSize'),
      icon: 'format-size' as IconName,
      value: selectedFontSize,
      setter: setSelectedFontSize,
      items: [
        { label: '12', value: '12' },
        { label: '14', value: '14' },
        { label: '16', value: '16' },
      ],
    },
    {
      label: t('create.highlight'),
      icon: 'marker' as IconName,
      value: selectedHighlight,
      setter: setSelectedHighlight,
      items: [
        { label: t('create.highlights.none'), value: 'none' },
        { label: t('create.highlights.word'), value: 'word' },
        { label: t('create.highlights.sentence'), value: 'sentence' },
      ],
    },
    {
      label: t('create.fontColor'),
      icon: 'format-color-text' as IconName,
      value: selectedFontColor,
      setter: setSelectedFontColor,
      items: [
        { label: t('create.colors.white'), value: 'white' },
        { label: t('create.colors.black'), value: 'black' },
        { label: t('create.colors.red'), value: 'red' },
      ],
    },
    {
      label: t('create.backgroundColor'),
      icon: 'format-color-fill' as IconName,
      value: selectedBackgroundColor,
      setter: setSelectedBackgroundColor,
      items: [
        { label: t('create.colors.white'), value: 'white' },
        { label: t('create.colors.black'), value: 'black' },
        { label: t('create.colors.red'), value: 'red' },
      ],
    },
    {
      label: t('create.readingSpeed'),
      icon: 'speedometer' as IconName,
      value: selectedReadingSpeed,
      setter: setSelectedReadingSpeed,
      items: [
        { label: t('create.speeds.slow'), value: 'slow' },
        { label: t('create.speeds.medium'), value: 'medium' },
        { label: t('create.speeds.fast'), value: 'fast' },
      ],
    },
  ];

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Title */}
      <Text style={[styles.titleProperties, { color: colors.text }]}>
        {t('create.title')}
      </Text>

      {/* Upload Buttons Card */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        <TouchableOpacity style={sharedStyles.row} onPress={handleFileUpload}>
          <MaterialCommunityIcons name="file-upload-outline" size={22} color="#4CAF50" />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('create.uploadFile')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
        <TouchableOpacity style={sharedStyles.row} onPress={handleTextInput}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={22} color="#4CAF50" />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>{t('create.pasteText')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Creator Information Card */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>
        {t('create.creatorInfo')}
      </Text>
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        {[
          { label: t('create.username'), icon: 'account-outline' as IconName, placeholder: t('create.usernamePlaceholder') },
          { label: t('create.fileTitle'), icon: 'file-outline' as IconName, placeholder: t('create.fileTitlePlaceholder') },
          { label: t('create.description'), icon: 'text-box-outline' as IconName, placeholder: t('create.descriptionPlaceholder') },
          { label: t('create.publishDate'), icon: 'calendar-outline' as IconName, placeholder: t('create.publishDatePlaceholder') },
        ].map(({ label, icon, placeholder }, index, arr) => (
          <View key={label}>
            <View style={sharedStyles.row}>
              <MaterialCommunityIcons name={icon} size={22} color="#4CAF50" />
              <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
                placeholder={placeholder}
                placeholderTextColor={colors.icon}
              />
            </View>
            {index < arr.length - 1 && (
              <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
            )}
          </View>
        ))}
      </View>

      {/* Uploader Preferences Card */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>
        {t('create.recommendations')}
      </Text>
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        {pickerOptions.map(({ label, icon, value, setter, items }, index, arr) => (
          <View key={label}>
            <View style={sharedStyles.row}>
              <MaterialCommunityIcons name={icon} size={22} color="#4CAF50" />
              <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
              <Picker
                style={styles.picker}
                selectedValue={value}
                onValueChange={(v) => setter(v)}>
                {items.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
            {index < arr.length - 1 && (
              <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
            )}
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => router.push('/speed_reading_file')}>
        <MaterialCommunityIcons name="send-outline" size={20} color="#fff" />
        <Text style={styles.submitText}>{t('common.submit')}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleProperties: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  label: {
    fontSize: 16,
    width: 120,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  picker: {
    flex: 1,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    marginBottom: 40,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});