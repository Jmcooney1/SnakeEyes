import { FilePreview } from "@/components/file-preview";
import { ThemedText } from "@/components/themed-text";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const router = useRouter();

export default function SearchResults() {
    const { entry } = useLocalSearchParams();
    const [files, setFiles] = useState(["file1", "file2", "file3", "file4", "file5", "file6"]);
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    return(
        <View style={{flex: 1, backgroundColor: colors.background}}>
            <ThemedText type='title' style={[{fontSize: 30}, {color: colors.text, margin: 20}]}> Search results for: "{entry}" </ThemedText>
            <ScrollView style={{marginHorizontal: 20}}>
                { files.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
                <ThemedText style={{fontSize: 20, marginLeft: 50}}> end of results...</ThemedText>
            </ScrollView>
        </View>
    );
}