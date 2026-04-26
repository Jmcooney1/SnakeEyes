import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LogIn() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    
    return (
        <View style={{backgroundColor: colors.background, flex: 1, alignItems: 'center'}}>
            <View style={ {backgroundColor: colors.background,} }>
                <Text style={{ color: colors.text }}>Login to your account</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Username:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your username"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Password:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your password"
                    secureTextEntry
                />
            </View>
            {/* Buttons */}
             <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress = {() => {router.push('create_account')}}>
                    <Text style={styles.ButtonText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {router.push('/')}}>
                    <Text style={styles.ButtonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    titlecontainer: {
        alignContent: 'center',
        marginTop: 20,
    },
    input:{
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
