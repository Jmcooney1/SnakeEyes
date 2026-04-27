import { FilePreview } from '@/components/file-preview';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getItem } from '@/store';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



const router = useRouter();


export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(true);

  const [recents, setRecents] = useState<{
    id: number, title: string, author: string, publishDate: Date, creator: any}[]>([]);
  const [owned, setOwned] = useState<{
    id: number, title: string, author: string, publishDate: Date, creator: any}[]>([]);

  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const username:string = getItem('username');

  async function fetchUserFiles() {
    const response = await fetch(`http://localhost:3000/api/users/${username}`);
    const data = await response.json();
    setRecents([]);
    data.recentFiles.forEach( (file: {fileID: string}) => {getFilePreviewDataR(file)});
    setOwned([]);
    data.createdFiles.forEach( (file: {id: string}) => {getFilePreviewDataO(file)});
  }
  async function getFilePreviewDataR(file: {fileID: string}) {
    const fileID: string = file.fileID;
    const findFile = await fetch(`http://localhost:3000/api/files/preview/${fileID}`);
    const filePrevData = await findFile.json();
    if(filePrevData.isPublic||username==filePrevData.creator.username){
        const newRecents = [...recents, filePrevData]
        setRecents(newRecents);
    }
  }
  async function getFilePreviewDataO(file: {id: string}) {
    const fileID: string = file.id;
    const findFile = await fetch(`http://localhost:3000/api/files/preview/${fileID}`);
    const filePrevData = await findFile.json();
    const newOwned = [...owned, filePrevData]
    setOwned(newOwned);
  }
  useEffect(() => { fetchUserFiles() }, []);

    return (
        <SafeAreaProvider> <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <View style={{height: 100, pointerEvents: "none"}} />
          <ThemedText type='title' style={styles.title}> Recents </ThemedText>
          <ScrollView>
            <ScrollView style={{marginHorizontal: 20, height: 265}}>
                { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} 
                id={element.id}
                title={element.title} 
                author={element.author? element.author : "author unknown"} 
                date={element.publishDate? `${element.publishDate}` : "date unknown"} 
                user={`${element.creator.username}`} />); })}
                <ThemedText style={{fontSize: 20, marginLeft: 50}}> {recents.length==0 ? "No recent files found." : "End of recents" }</ThemedText>
            </ScrollView>
            <ThemedText type='title' style={styles.title}> Your Files </ThemedText>
            <ScrollView style={{marginHorizontal: 20, height: 200}}>
                { owned.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} 
                id={element.id}
                title={element.title} 
                author={element.author? element.author : "author unknown"} 
                date={element.publishDate? `${element.publishDate}` : "date unknown"} 
                user={username} />); })}
                <ThemedText style={{fontSize: 20, marginLeft: 50}}> {owned.length==0 ? "We can't find any of your files." : "End of your files" }</ThemedText>
            </ScrollView>
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
  ButtonContainer: {
    width: '20%',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    },
Button: {
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
ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});