import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Button } from "react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from "@/components/themed-view";

const router = useRouter();

export default function FileView() {
    const { fileID } = useLocalSearchParams();
    const [info, setInfo] = useState(["file title", "file author", "file date", "file uploader"]);
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    return(
        <View style={{backgroundColor: colors.background, height: "100%", alignItems: "center"}}>
            <ThemedView style={{margin: 20, borderRadius: 20, backgroundColor: colors.offBackground, padding: 20}}>
                <ThemedText type="title" style={{color: colors.text, marginBottom: 10}}> File View: "{fileID}" </ThemedText>
                {info.map((item, index) => (
                    <ThemedText type="default" key={index} style={{color: colors.text, marginHorizontal: 15}}> {item} </ThemedText>
                ))}
                <View style={{marginTop: 20, marginHorizontal: 7, width: 500}}>
                    <Button color={colors.tint} title="Read" onPress={() => {router.push(`/speed_reading_file`)}} />
                </View> 
            </ThemedView>
        </View>
    );
}