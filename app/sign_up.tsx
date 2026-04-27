import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { setItem } from '@/store';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LogIn() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const [user, setUser] = useState(""), [pass, setPass] = useState("");
    
    async function handleLogInPress() {
        if(user.length == 0 || pass.length == 0) return;
        const attemptedUser =  await fetch(`http://localhost:3000/api/tryLogin?u=${user}&p=${pass}`);
        const result = await attemptedUser.json();
        if(result.validUser && result.validPass){
            setItem('isLoggedIn', true);
            setItem('username', user);
            router.push('/');
        }
        else console.log("Login Failed: Invalid username or password");
    } 

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
                    onChangeText={(text)=>{setUser(text);}}
                    onSubmitEditing={handleLogInPress}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: colors.text }}>Password:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your password"
                    onChangeText={(text)=>{setPass(text);}}
                    onSubmitEditing={handleLogInPress}
                    secureTextEntry
                />
            </View>
            {/* Buttons */}
             <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress = {() => {router.push('/Create_Account')}}>
                    <Text style={styles.ButtonText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={handleLogInPress}>
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
