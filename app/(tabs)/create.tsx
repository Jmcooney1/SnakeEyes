import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_URL = 'http://localhost:3000';

export default function CreateScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  

  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedFontSize, setSelectedFontSize] = useState('12');
  const [selectedHighlight, setSelectedHighlight] = useState('none');
  const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
  const [selectedReadingSpeed, setSelectedReadingSpeed] = useState('200');

  const [fileContent, setFileContent] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [username, setUsername] = useState('');

  const handleTextInput = () => console.log('Text input button pressed');

  const pickerOptions = [
    { label: 'Font', icon: 'format-font', value: selectedFont, setter: setSelectedFont, items: [{ label: 'Arial', value: 'arial' }, { label: 'Times New Roman', value: 'times' }, { label: 'Courier New', value: 'courier' }] },
    { label: 'Font Size', icon: 'format-size', value: selectedFontSize, setter: setSelectedFontSize, items: [{ label: '12', value: '12' }, { label: '14', value: '14' }, { label: '16', value: '16' }] },
    { label: 'Highlight', icon: 'marker', value: selectedHighlight, setter: setSelectedHighlight, items: [{ label: 'None', value: 'None' }, { label: 'Word', value: 'Word' }, { label: 'Sentence', value: 'Sentence' }] },
    { label: 'Font Color', icon: 'format-color-text', value: selectedFontColor, setter: setSelectedFontColor, items: [{ label: 'White', value: 'White' }, { label: 'Black', value: 'Black' }, { label: 'Red', value: 'Red' }] },
    { label: 'Background Color', icon: 'format-color-fill', value: selectedBackgroundColor, setter: setSelectedBackgroundColor, items: [{ label: 'White', value: 'White' }, { label: 'Black', value: 'Black' }, { label: 'Red', value: 'Red' }] },
    { label: 'Reading Speed', icon: 'speedometer', value: selectedReadingSpeed, setter: setSelectedReadingSpeed, items: [{ label: 'Slow', value: 'Slow' }, { label: 'Medium', value: 'Medium' }, { label: 'Fast', value: 'Fast' }] },
  ];

  
async function handleFileUpload() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'text/plain',
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const pickedFile = result.assets[0];

    if (!pickedFile.name.endsWith('.txt')) {
      console.log("Not the correct file type. Please give a .txt file");
      return;
    }

    let content = '';

    if (Platform.OS === 'web') {
      const response = await fetch(pickedFile.uri);
      content = await response.text();
    } else {
      content = await FileSystem.readAsStringAsync(pickedFile.uri);
    }

    console.log("Content length:", content.length);
    setFileContent(content);
    setFileTitle(pickedFile.name.replace('.txt', ''));
    console.log("File loaded successfully");

  } catch (err) {
    console.error('Error uploading file', err);
  }
}

async function handleSubmit() {
  try {
    if (!fileContent) {
      console.error("No file uploaded. Please upload a .txt file first.");
      return;
    }
    if (!username) {
      console.error("Please enter a username.");
      return;
    }
    if (!fileTitle) {
      console.error("Please enter a file title.");
      return;
    }

    // Step 1: Get user
    const userResponse = await fetch(`${API_URL}/api/users/username/${username}`);
    if (!userResponse.ok) throw new Error('User not found');
    const user = await userResponse.json();

    console.log("Submitting with fileContent length:", fileContent.length);
    console.log("Submitting with creatorID:", user.id);

    // Step 2: Create File
    const fileResponse = await fetch(`${API_URL}/api/files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        textContent: fileContent,   // ✅ fixed
        fileDescription: fileDescription,
        title: fileTitle,
        author: author,
        publishDate: publishDate || null,
        creatorID: user.id,
      }),
    });

    const fileData = await fileResponse.json();
    console.log("File response status:", fileResponse.status);
    console.log("File response body:", fileData);

    if (!fileResponse.ok) throw new Error(`Failed to create File: ${JSON.stringify(fileData)}`);

    // Step 3: Create FileSetting
    const fileSettingResponse = await fetch(`${API_URL}/api/file-settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileID: fileData.id,                              // ✅ use fileData directly, correct key name
        font: selectedFont,                               // ✅ was missing
        size: parseInt(selectedFontSize),
        highlighter: selectedHighlight,
        textColor: selectedFontColor,
        isDarkMode: selectedBackgroundColor === 'Black',  // ✅ must be boolean not a string
        speed: selectedReadingSpeed,
      }),
    });

    const fileSettingData = await fileSettingResponse.json();
    console.log("FileSetting response status:", fileSettingResponse.status);
    console.log("FileSetting response body:", fileSettingData);

    if (!fileSettingResponse.ok) throw new Error('Failed to create FileSetting in create');

    console.log("Both models saved successfully");
    router.push(`/speed_reading_file?fileID=${fileData.id}`);

  } catch (err) {
    console.error('Error submitting:', err);
  }
}




  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Title */}
      <Text style={[styles.titleProperties, { color: colors.text }]}>
        Create a new File
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
          { label: 'Username', icon: 'account-outline', placeholder: 'Enter your username', value: username, setter: setUsername},
          { label: 'File Title', icon: 'file-outline', placeholder: 'Enter file title', value: fileTitle, setter: setFileTitle },
          { label: 'Description', icon: 'text-box-outline', placeholder: 'Enter file description', value: fileDescription, setter: setFileDescription },
          { label: 'Author of the file', icon:'account-outline',placeholder:'Enter in file Author', value: author, setter: setAuthor},
          { label: 'Publish Date', icon: 'calendar-outline', placeholder: 'Enter the date', value: publishDate, setter: setPublishDate},
        ].map(({ label, icon, placeholder, value, setter }, index, arr) => (
          <View key={label}>
            <View style={sharedStyles.row}>
              <MaterialCommunityIcons name={icon} size={22} color="#4CAF50" />
              <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
                placeholder={placeholder}
                placeholderTextColor={colors.icon}
                value={value}
                onChangeText={setter}
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
        onPress={handleSubmit}>
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