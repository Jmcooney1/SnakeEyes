import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    return (
        <View style={{backgroundColor: colors.background, flex: 1, alignItems: 'center'}}>
            <View style={styles.titlecontainer}>
                <Text style={{ color: colors.text }}>Sign Up</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Username:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter in a username"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Password:</Text>
                <TextInput
                    style={[styles.input,{color: colors.text}]}
                    placeholder="Enter your password"
                    secureTextEntry
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Confirm Password:</Text>
                <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm your password"
                />
            </View>
            {/* Buttons */}
            <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={() => {router.push('/')}}>
                <Text style={styles.ButtonText}>Create Account</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={() => router.push('/sign_up')}>
                <Text style={styles.ButtonText}>Have an account? Log In</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titlecontainer: {
    alignContent: 'center',
    marginTop: 20,
  },
input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    },
formContainer: {
    width: '80%',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
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