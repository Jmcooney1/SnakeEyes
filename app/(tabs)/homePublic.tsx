import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const router = useRouter()

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  function handlePress(){ router.push("/sign_up"); }

  // async function toggleLoggedIn() { await SecureStore.setItemAsync("loggedIn", "false"); }

  async function fetchUsers() {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    fetchUsers()
  }, [])

    return(
      <SafeAreaProvider><SafeAreaView style={{height: "100%", backgroundColor: colors.background }}>
        <View style={{height: 100, pointerEvents: "none"}} />
        <View style={styles.loggedOutContainer}>
          <ThemedText type='title' style={styles.title}> You're not logged in </ThemedText>
          <Button title="Sign in" onPress={handlePress} color={colors.tint} />
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
  title: {
    fontSize: 40,
    margin: 20,
  },
});