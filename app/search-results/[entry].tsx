import { FilePreview } from "@/components/file-preview";
import { ThemedText } from "@/components/themed-text";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, ScrollView } from "react-native";

const router = useRouter();

export default function SearchResults() {
    const { entry } = useLocalSearchParams();
    const [recents, setFiles] = useState(["file1", "file2", "file3", "file4", "file5", "file6"]);

    return(
        <View style={{flex: 1, margin: 20}}>
            <ThemedText style={{fontSize: 30}}> Search results for: "{entry}" </ThemedText>
            <ScrollView>
                { recents.map((element, idx) => { return(<FilePreview key={`${element}-${idx}`} title={element} author="author" date="date" user="user" />); })}
                <ThemedText style={{fontSize: 20, marginLeft: 50}}> end of results...</ThemedText>
            </ScrollView>
        </View>
    );
}