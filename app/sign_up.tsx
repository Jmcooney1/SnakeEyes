import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LogIn() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    
    return (
        <View style={{backgroundColor: colors.background, flex: 1, alignItems: 'center'}}>
        <View style={ {backgroundColor: colors.background,} }>
            <Text>Login to your account</Text>
        </View>
        <View style={styles.formContainer}>
            <Text>Username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
            />
        </View>
        <View style={styles.formContainer}>
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
            />
        </View>
            <Button title="Don't have an account? Sign Up" onPress = {() => {router.push('create_account')}} />
            <Button title="Log In" onPress={() => {router.push('/')}}/>
            

        </View>
    );
    }
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
    }
});
