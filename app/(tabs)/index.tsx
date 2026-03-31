import { router } from 'expo-router';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const RECENT_FILES = [
  {
    id: '1',
    preview: 'Blah,blah,blah...',
    fileName: 'File Name',
  },
  {
    id: '2',
    preview: 'blah, la, la.',
    fileName: 'File Name',
  },
  {
    id: '3',
    preview: 'blah,blah la la la la .',
    fileName: 'File Name',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      <View style={{ marginBottom: 20 }}>
        <Button title="Go to Login" onPress={() => router.push('/sign_up')} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a file..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Recents Section */}
      <Text style={styles.sectionTitle}>Recents</Text>

      {/* List of recent files */}
      {RECENT_FILES.map((file) => (
        <View key={file.id} style={styles.fileCard}>
          <Text style={styles.filePreview}>{file.preview}</Text>
          <View style={styles.fileNameTag}>
            <Text style={styles.fileName}>{file.fileName}</Text>
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  fileCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  filePreview: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  fileNameTag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  fileName: {
    fontSize: 13,
    color: '#333',
  },
});