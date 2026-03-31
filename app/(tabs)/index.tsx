import { FilePreview } from '@/components/file-preview';
import { SearchBar } from '@/components/search-bar';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const router = useRouter()


export default function HomeScreen() {  
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
          <Text style={styles.title}> Recents </Text>
          <ScrollView>
            { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
            <Text style={{color: "white", fontSize: 20, marginLeft: 50}}> ...that's all she wrote!</Text>
          </ScrollView>
          <SearchBar />
        </SafeAreaView> </SafeAreaProvider>
    );
  else
    return(
      <SafeAreaProvider><SafeAreaView style={{height: "100%"}}>
        <View style={{height: 100, pointerEvents: "none"}} />
        <View style={styles.loggedOutContainer}>
          <Text style={styles.title}> You're not logged in </Text>
          <Button title="Sign in" onPress={handlePress} />
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
    color: "white",
    fontSize: 40,
  },
});