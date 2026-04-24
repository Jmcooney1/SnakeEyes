import { FilePreview } from '@/components/file-preview';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';


export default function HomeScreen() {  
  const router = useRouter();
  const { t } = useTranslation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [recents, setFiles] = useState(["file1", "file2", "file3", "file4", "file5", "file6"]);

  function handlePress(){ 
    router.push("/sign_up");
    // setLoggedIn(true);
  }

  if(loggedIn)
    return (
        <SafeAreaProvider> <SafeAreaView style={{ flex: 1, marginLeft: 20 }} edges={['top']}>
          <View style={{height: 100, pointerEvents: "none"}} />
          <ThemedText style={styles.title}> {t('home.recents')} </ThemedText>
          <ScrollView>
            { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
            <ThemedText style={{fontSize: 20, marginLeft: 50}}>{t('home.allDone')}</ThemedText>
          </ScrollView>
          <SearchBar />
        </SafeAreaView> </SafeAreaProvider>
    );
  else
    return(
      <SafeAreaProvider><SafeAreaView style={{height: "100%"}}>
        <View style={{height: 100, pointerEvents: "none"}} />
        <View style={styles.loggedOutContainer}>
          <ThemedText style={styles.title}> {t('home.notLoggedIn')} </ThemedText>
          <Button title={t('home.signIn')} onPress={handlePress} />
        </View>
        <SearchBar />
      </SafeAreaView></SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  loggedOutContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
});