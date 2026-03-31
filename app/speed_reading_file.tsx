import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function SpeedReadingPage() {
    //sample text for now; will replace with actual file content once backend is set up
    const reading:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const words:string[] = (reading.trim().split(" "));
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrIndex(prev => (prev + 1)%words.length);
        }, 300 + words[currIndex].length * 10 + (words[currIndex].length > 8 ? 100 : 0)); //base time + extra time based on word length
        console.log(currIndex);
        return () => clearInterval(timer);
    }, [words.length]);

    return (
    <View style={styles.titleContainer}>
        <View style={styles.stepContainer}>
            <Text style={styles.titleProperties}>Speed Reading Page</Text>
            <Text style={styles.ColorProperties}>Here you can read your file at your desired reading speed!</Text>
            <View style={styles.infoContainer}>
            <Text style={styles.ColorProperties}> File Name</Text>
            <Text style={styles.ColorProperties}> File Description</Text>
            <Text style={styles.ColorProperties}> Publish Date</Text>
            <Text style={styles.ColorProperties}> Creator Name</Text>
            </View>
            <View style={styles.createrContainer}>
                <ThemedView style={styles.box}>
                    <ThemedText>{words[currIndex]}</ThemedText>
                </ThemedView>
            </View>
            <View style={styles.ButtonProperties}>
                <Button title="HOME" color="green" onPress={() => {router.push('/')}}/>
            </View>
        </View>
    </View>
    );
}


    const styles = StyleSheet.create({
        titleContainer: {
          flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        stepContainer: {
            gap: 8,
            marginBottom: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleProperties: {
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
        },
        createrContainer:{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            gap:10,
            marginTop: 30,
            marginBottom: 8,
        },
        infoContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap:10,
            marginBottom: 8,
        },

        ColorProperties:{
            color: 'white',
        },

       box: {
            width: 300,
            height: 200,
            borderRadius: 8,
            borderWidth: 1,
            padding: 16,
            margin: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        ButtonProperties:{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height:50,
            width: 150,
            gap:8,
            marginBottom: 10,
            marginTop: 20,
        }
    });
