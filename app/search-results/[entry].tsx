import { FilePreview } from "@/components/file-preview";
import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getItem } from "@/store";

export default function SearchResults() {
    const { entry } = useLocalSearchParams();
    const [files, setFiles] = useState<any[]>([]);
    const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
    const colors = Colors[colorScheme];

    async function fetchSearchResults() {
        const response = await fetch(`http://localhost:3000/api/search/${entry}`);
        const data = await response.json();
        setFiles([]);
        data.forEach( (file: {id: number, }) => {getFilePreviewData(file)});
    }
    async function getFilePreviewData(file: {id: number, }) {
        const id: number = file.id;
        const findRecent = await fetch(`http://localhost:3000/api/files/preview/${id}`);
        const filePrevData = await findRecent.json();
        console.log(filePrevData);
        if(filePrevData.isPublic || getItem('username')==filePrevData.creator.username){
            setFiles((prev) => [...prev, filePrevData]);
        }
    }
    useEffect(() => { fetchSearchResults() }, [entry])
    return(
        <View style={{flex: 1, backgroundColor: colors.background}}>
            <ThemedText type='title' style={[{fontSize: 30}, {color: colors.text, margin: 20}]}> Search results for: {String(entry ?? '')} </ThemedText>
            <ScrollView style={{marginHorizontal: 20}}>
                { files.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} 
                    id={element.id}
                    title={element.title} 
                    author={element.author? element.author : "author unknown"} 
                    date={element.publishDate? `${element.publishDate}` : "date unknown"} 
                    user={element.creator.username}
                />); })}
                <ThemedText style={{fontSize: 20, marginLeft: 50}}> end of results...</ThemedText>
            </ScrollView>
        </View>
    );
}