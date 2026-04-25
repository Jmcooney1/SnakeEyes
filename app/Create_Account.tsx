import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



const API_URL = 'http://localhost:3000';



export default function SignUp() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});


    function validate(): boolean {
        const next: Record<string, string> = {};

        if(!email.trim()){
            next.email = 'Email is required'
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            next.email = 'Enter in a valid email'
        }

        if(!username.trim()){
            next.username = 'Username is required'
        }
        else if(username.length < 4){
            next.username = 'Username needs to be 4 letters long'
        }

        if(!password.trim()){
            next.password = 'Passoword is required'
        }
        else if(password.length < 4){
            next.password = 'Password length must be 4 letters long'
        }

        if(!confirmPassword.trim()){
            next.confirmPassword = 'Need to enter in the password again'
        }
        else if(password !== confirmPassword)
        {
            next.confirmPassword = 'Passwords do not match'
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    }


    async function handleCreateAccount(){
        if(!validate()) return;

        setLoading(true);

        try{
            const response = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });
            
            const data = await response.json();
            console.log("Data:", data);        // ← add this
            console.log("response.ok:", response.ok);

            if(!response.ok){
                if (response.status === 409) {
                    setErrors({ general: data.error });
                } else if (response.status === 400 && data.errors) {
                    setErrors({ general: data.errors.join('\n') });
                } else {
                    setErrors({ general: 'Something went wrong. Please try again.' });
                }
                return;
            }
            console.log("passed response.ok check");  // ← add
            const parsed = data;
            console.log("data is:", parsed);

            console.log('Account Created');
            router.replace('/(tabs)');

        }
        catch
        {
            setErrors({ general: 'Could not reach the server. Check your connection.' });
        } finally {
            setLoading(false);
        }
    }

    return (
    <View style={{backgroundColor: colors.background, flex: 1, alignItems: 'center'}}>
            <View style={styles.titlecontainer}>
                <Text style={[styles.title, {color: colors.text}]}>Sign Up</Text>
            </View>
            
            {errors.general ? (
                <Text style={styles.generalError}>{errors.general}</Text>
            ) : null}

            <View style={styles.formContainer}>
                <Text style={[styles.words, {color: colors.text}] }>Email:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your email"
                    value = {email}
                    onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: '' })); }}
                />
                {errors.email ? <Text style={styles.fieldError}>{errors.email}</Text> : null}
            </View>

            <View style={styles.formContainer}>
                <Text style={[styles.words, {color: colors.text}]}>Username:</Text>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter in a username"
                    value = {username}
                    onChangeText={(v) => { setUsername(v); setErrors((e) => ({ ...e, username: '' })); }}
                />
                {errors.username ? <Text style={styles.fieldError}>{errors.username}</Text> : null}
            </View>

            <View style={styles.formContainer}>
                <Text style={[styles.words, {color: colors.text}]}>Password:</Text>
                <TextInput
                    style={[styles.input,{color: colors.text}]}
                    placeholder="Enter your password"
                    value = {password}
                    onChangeText={(v) => {setPassword(v); setErrors((e) => ({...e,password: ''}));}}
                    secureTextEntry
                />
                {errors.password ? <Text style={styles.fieldError}>{errors.password}</Text> : null}
            </View>

            <View style={styles.formContainer}>
                <Text style={[styles.words, {color: colors.text}]}>Confirm Password:</Text>
                <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm your password"
                value = {confirmPassword}
                onChangeText={(v) => {setConfirmPassword(v); setErrors((e) => ({...e, confirmpassword:''}));}}
                secureTextEntry
                />
                {errors.confirmPassword ? <Text style={styles.fieldError}>{errors.confirmPassword}</Text> : null}
            </View>

            {/* Buttons */}
            <View style={styles.ButtonContainer}>
            <TouchableOpacity
                style={styles.Button}
                onPress={() => {handleCreateAccount()}}
                disabled ={loading}>
                <Text style={styles.ButtonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
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
  title:{
    fontSize: 40,
  },
  words:{
    fontSize: 20,
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
  fieldError: {
    color: '#e53935',
    fontSize: 12,
    marginTop: 4,
  },
  generalError: {
    color: '#e53935',
    fontSize: 14,
    marginTop: 8,
    width: '80%',
  },


});