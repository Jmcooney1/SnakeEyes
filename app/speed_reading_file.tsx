import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function SpeedReadingPage() {
    //sample text for now; will replace with actual file content once backend is set up
    const reading:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const words:string[] = (reading.trim().split(" "));
    const [currIndex, setCurrIndex] = useState(0);
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

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
            <ThemedText style={styles.titleProperties}>Speed Reading Page</ThemedText>
            <View style={styles.infoContainer}>
            <ThemedText> File Name</ThemedText>
            <ThemedText> File Description</ThemedText>
            <ThemedText> Publish Date</ThemedText>
            <ThemedText> Creator Name</ThemedText>
            </View>
            <View style={styles.createrContainer}>
                <ThemedView style={styles.box}>
                    <ThemedText>{words[currIndex]}</ThemedText>
                </ThemedView>
            </View>
            <View style={styles.ButtonProperties}>
                <Button title="HOME" color={colors.tint} onPress={() => {router.push('/')}}/>
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
            marginTop: 30,
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
