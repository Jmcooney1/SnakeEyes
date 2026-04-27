import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getItem } from '@/store';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

async function recordView(fileID:number){
    if(getItem('username'))
        await fetch(`http://localhost:3000/api/addview?u=${getItem('username')}&f=${fileID}`, { method: 'PATCH', });
}

export default function SpeedReadingPage() {
    
    const { fileID } = useLocalSearchParams<{fileID: string}>();
    const [fileData, setFileData] = useState<any>(null);
    const [words, setWords] = useState<string[]>([]);
    const [currIndex, setCurrIndex] = useState(0);
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    useEffect(() => {recordView(parseInt(fileID));}, []);
    useEffect(() => {
    async function fetchFile() {
        try {
            const response = await fetch(`http://localhost:3000/api/files/${fileID}`);
            const data = await response.json();
            setFileData(data);
            setWords(data.textContent.trim().split(" "));
        } catch (err) {
            console.error("Error fetching file:", err);
        }
    }
    if (fileID) fetchFile();
}, [fileID]);

// ✅ Keep: timer with guard
    useEffect(() => {
        if (words.length === 0) return;
        const timer = setInterval(() => {
            setCurrIndex(prev => (prev + 1) % words.length);
        }, 300 + words[currIndex].length * 10 + (words[currIndex].length > 8 ? 100 : 0));
        return () => clearInterval(timer);
    }, [words.length, currIndex]);

    return (
    <View style={[styles.titleContainer, { backgroundColor: colors.background }]}>
      <View style={styles.stepContainer}>
        <ThemedText type="title" style={{ fontSize: 40 }}>Speed Reading Page</ThemedText>
        <View style={styles.infoContainer}>
          <ThemedText>{fileData?.title ?? 'Loading...'}</ThemedText>
          <ThemedText>{fileData?.fileDescription ?? ''}</ThemedText>
          <ThemedText>{fileData?.publishDate ?? ''}</ThemedText>
        </View>
        <View style={styles.creatorContainer}>
          <ThemedView style={[styles.box, { backgroundColor: colors.offBackground }]}>
            <ThemedText>{words[currIndex] ?? ''}</ThemedText>
          </ThemedView>
        </View>
        <View style={styles.butttonContainer}>
          <Button title="HOME" color={colors.tint} onPress={() => router.push('/')} />
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
            paddingTop: 30,
            height: '100%',
        },
        stepContainer: {
            gap: 8,
            marginBottom: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        creatorContainer:{
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
            padding: 16,
            margin: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        butttonContainer:{
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
