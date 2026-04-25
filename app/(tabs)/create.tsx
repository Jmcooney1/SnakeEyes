import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedFontSize, setSelectedFontSize] = useState('12');
  const [selectedHighlight, setSelectedHighlight] = useState('none');
  const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
  const [selectedReadingSpeed, setSelectedReadingSpeed] = useState('200');

  const handleFileUpload = () => console.log('File upload button pressed');
  const handleTextInput = () => console.log('Text input button pressed');

  const pickerOptions = [
    { label: 'Font', icon: 'format-font', value: selectedFont, setter: setSelectedFont, items: [{ label: 'Arial', value: 'arial' }, { label: 'Times New Roman', value: 'times' }, { label: 'Courier New', value: 'courier' }] },
    { label: 'Font Size', icon: 'format-size', value: selectedFontSize, setter: setSelectedFontSize, items: [{ label: '12', value: '12' }, { label: '14', value: '14' }, { label: '16', value: '16' }] },
    { label: 'Highlight', icon: 'marker', value: selectedHighlight, setter: setSelectedHighlight, items: [{ label: 'None', value: 'None' }, { label: 'Word', value: 'Word' }, { label: 'Sentence', value: 'Sentence' }] },
    { label: 'Font Color', icon: 'format-color-text', value: selectedFontColor, setter: setSelectedFontColor, items: [{ label: 'White', value: 'White' }, { label: 'Black', value: 'Black' }, { label: 'Red', value: 'Red' }] },
    { label: 'Background Color', icon: 'format-color-fill', value: selectedBackgroundColor, setter: setSelectedBackgroundColor, items: [{ label: 'White', value: 'White' }, { label: 'Black', value: 'Black' }, { label: 'Red', value: 'Red' }] },
    { label: 'Reading Speed', icon: 'speedometer', value: selectedReadingSpeed, setter: setSelectedReadingSpeed, items: [{ label: 'Slow', value: 'Slow' }, { label: 'Medium', value: 'Medium' }, { label: 'Fast', value: 'Fast' }] },
  ];

  async function fetchFiles() {
    const response = await fetch("http://localhost:3000/api/files");
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Title */}
      <Text style={[styles.titleProperties, { color: colors.text }]}>
        Create a new post
      </Text>

      {/* Upload Buttons Card */}
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        <TouchableOpacity style={sharedStyles.row} onPress={handleFileUpload}>
          <MaterialCommunityIcons name="file-upload-outline" size={22} color="#4CAF50" />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>Upload File</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
        <View style={[sharedStyles.divider, { backgroundColor: colors.icon + '44' }]} />
        <TouchableOpacity style={sharedStyles.row} onPress={handleTextInput}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={22} color="#4CAF50" />
          <Text style={[sharedStyles.rowText, { color: colors.text }]}>Paste to text box</Text>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Creator Information Card */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>
        Creator Information
      </Text>
      <View style={[sharedStyles.card, { backgroundColor: colors.icon + '22' }]}>
        {[
          { label: 'Username', icon: 'account-outline', placeholder: 'Enter your username' },
          { label: 'File Title', icon: 'file-outline', placeholder: 'Enter file title' },
          { label: 'Description', icon: 'text-box-outline', placeholder: 'Enter file description' },
          { label: 'Publish Date', icon: 'calendar-outline', placeholder: 'Enter the date' },
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
        Uploader Recommendations
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
        <Text style={styles.submitText}>Submit</Text>
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