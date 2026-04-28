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

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const colors = Colors[colorScheme];
  const username = (getItem('username') as string | null) ?? null;

  const [recents, setRecents] = useState<any[]>([]);
  const [owned, setOwned] = useState<any[]>([]);


  function handlePress_login(){
    router.push("/sign_up");
  }
  function handlePress_signin(){
    router.push("/Create_Account");
  }

  async function fetchUserFiles() {
    if (!username) return;
    const response = await fetch(`http://localhost:3000/api/users/${username}`);
    if (!response.ok) return;
    const data = await response.json();
    setRecents([]);
    setOwned([]);
    (data.recentFiles ?? []).forEach((file: { fileID: string }) => {
      void getFilePreviewDataR(file);
    });
    (data.createdFiles ?? []).forEach((file: { id: string }) => {
      void getFilePreviewDataO(file);
    });
  }
  async function getFilePreviewDataR(file: {fileID: string}) {
    const fileID: string = file.fileID;
    const findFile = await fetch(`http://localhost:3000/api/files/preview/${fileID}`);
    const filePrevData = await findFile.json();
    if (filePrevData?.isPublic || username === filePrevData?.creator?.username) {
      setRecents((prev) => [...prev, filePrevData]);
    }
  }
  async function getFilePreviewDataO(file: {id: string}) {
    const fileID: string = file.id;
    const findFile = await fetch(`http://localhost:3000/api/files/preview/${fileID}`);
    const filePrevData = await findFile.json();
    setOwned((prev) => [...prev, filePrevData]);
  }
  useEffect(() => {
    void fetchUserFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        <View style={{ height: 100, pointerEvents: 'none' }} />

        {!username ? (
          <View style={styles.loggedOutContainer}>
            <ThemedText type="title" style={styles.title}>
              You&apos;re not logged in
            </ThemedText>
            <Button title="Log in" onPress={handlePress_login} />
            <Button title="Sign up" onPress={handlePress_signin} />
            <SearchBar />
          </View>
        ) : (
          <>
            <Button title="Log in" onPress={handlePress_login} />
            <Button title="Sign up" onPress={handlePress_signin} />
            <ThemedText type="title" style={styles.title}>
              Recents
            </ThemedText>
            <ScrollView>
              <ScrollView style={{ marginHorizontal: 20, height: 265 }}>
                {recents.map((element, idx) => (
                  <FilePreview
                    key={`${element.id}-${idx}`}
                    id={element.id}
                    title={element.title}
                    author={element.author ? element.author : 'author unknown'}
                    date={element.publishDate ? `${element.publishDate}` : 'date unknown'}
                    user={`${element.creator.username}`}
                  />
                ))}
                <ThemedText style={{ fontSize: 20, marginLeft: 50 }}>
                  {recents.length === 0 ? 'No recent files found.' : 'End of recents'}
                </ThemedText>
              </ScrollView>
              <ThemedText type="title" style={styles.title}>
                Your Files
              </ThemedText>
              <ScrollView style={{ marginHorizontal: 20, height: 200 }}>
                {owned.map((element, idx) => (
                  <FilePreview
                    key={`${element.id}-${idx}`}
                    id={element.id}
                    title={element.title}
                    author={element.author ? element.author : 'author unknown'}
                    date={element.publishDate ? `${element.publishDate}` : 'date unknown'}
                    user={username}
                  />
                ))}
                <ThemedText style={{ fontSize: 20, marginLeft: 50 }}>
                  {owned.length === 0 ? "We can't find any of your files." : 'End of your files'}
                </ThemedText>
              </ScrollView>
            </ScrollView>
            <SearchBar />
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
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