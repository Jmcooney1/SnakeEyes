import { router } from 'expo-router';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { setItem, getItem } from "../store";

export default function SignIn() {

    function handlePress(){ 
        setItem('isLoggedIn', true);
        router.push("/");
    }

    return (
        <View style={styles.container}>
        <View style={ styles.titlecontainer }>
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
            {/*<Button title="Don't have an account? Sign Up" onPress = {() => {router.push('create_account')}} /> */}
            <Button title="Log In" onPress={handlePress}/>

        </View>
    );
    }
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
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
