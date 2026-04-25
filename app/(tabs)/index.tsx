import { FilePreview } from '@/components/file-preview';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [recents, setRecents] = useState<string[]>([]);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  async function fetchUserRecents() {
    const response = await fetch("http://localhost:3000/api/users/AJ29");
    const data = await response.json();
    data.recentFiles.forEach( (file: {fileID: string, }) => {getRecentData(file)});
  }
  async function getRecentData(file: {fileID: string, }) {
    const fileID: string = file.fileID;
    const findRecent = await fetch("http://localhost:3000/api/files/preview/" + fileID);
    const filePrevData = await findRecent.json();
    console.log(filePrevData);
    const newRecents = [...recents, filePrevData.title]
    setRecents(newRecents);
  }
  useEffect(() => { fetchUserRecents() }, [])

    return (
        <SafeAreaProvider> <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <View style={{height: 100, pointerEvents: "none"}} />
          <ThemedText type='title' style={styles.title}> Recents </ThemedText>
          <ScrollView style={{marginHorizontal: 20}}>
            { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
            <ThemedText style={{fontSize: 20, marginLeft: 50}}> ...that's all she wrote!</ThemedText>
          </ScrollView>
          <SearchBar />
        </SafeAreaView> </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  loggedOutContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  title: {
    fontSize: 40,
    margin: 20,
  },
});