import { FilePreview } from '@/components/file-preview';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const router = useRouter();


export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [recents, setFiles] = useState(["file1", "file2", "file3", "file4", "file5", "file6"]);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  function handlePress_login(){
    router.push("/sign_up");
    //setLoggedIn(true);
  }
  function handlePress_signin(){
    router.push("/create_account");
    //setLoggedIn(true);
  }

  async function fetchUsers() {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if(loggedIn)
    return (
        <SafeAreaProvider> <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
          <View style={{height: 100, pointerEvents: "none"}} />
          <Button title="Log in" onPress={handlePress_login} />
          <Button title="Sign up" onPress={handlePress_signin} />
          <ThemedText type='title' style={styles.title}> Recents </ThemedText>
          <ScrollView style={{marginHorizontal: 20}}>
            { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
            <ThemedText style={{fontSize: 20, marginLeft: 50}}> ...that's all she wrote!</ThemedText>
          </ScrollView>
          <SearchBar />
        </SafeAreaView> </SafeAreaProvider>
    );
  else
    return(
      <SafeAreaProvider><SafeAreaView style={{height: "100%"}}>
        <View style={{height: 100, pointerEvents: "none"}} />
        <View style={styles.loggedOutContainer}>
          <ThemedText type='title' style={styles.title}> You're not logged in </ThemedText>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={() => {router.push('/sign_up')}}>
                <Text style={styles.ButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={() => {router.push('/create_account')}}>
                <Text style={styles.ButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
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