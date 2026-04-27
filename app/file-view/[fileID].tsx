import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Button, Pressable } from "react-native";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from "@/components/themed-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getItem } from "@/store";

const router = useRouter();
const isPublic = {
    backgroundColor: "green",
    borderRadius: 5,
    width: 10,
    height: 10,
};
const isPrivate = {
    backgroundColor: "red",
    borderRadius: 5,
    width: 10,
    height: 10,
};

export default function FileView() {
    const { fileID } = useLocalSearchParams();
    const [info, setInfo] = useState<{
        id: number, title: string, fileDescription: string, createdAt: Date, author: string,
        publishDate: string, isPublic: boolean, views: number, textContent: string, creator: any, creatorID: number,
    } | null>(null);
    const [dates, setDates] = useState<{createdAt: Date, publishDate: Date} | null>(null);
    const username = getItem('username');
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    async function getFileInfo() {
        const file = await fetch(`http://localhost:3000/api/files/view/${fileID}`);
        const data = await file.json();
        setInfo(data);
        setDates({ createdAt: new Date(data.createdAt), publishDate: new Date(data.publishDate) });
    }
    useEffect(()=>{getFileInfo()}, []);

    return(
        <View style={{backgroundColor: colors.background, height: "100%", alignItems: "center"}}>
            <ThemedView style={{margin: 20, borderRadius: 20, backgroundColor: colors.offBackground, padding: 20}}>
                <View style={{flexDirection: "row", alignItems: "center", width: 500}}>
                    <ThemedText type="title" style={{color: colors.text, marginBottom: 10}}> File View: {info?.title} </ThemedText>
                    <View style={info?.isPublic? isPublic:isPrivate} />
                    <Pressable style={(username==info?.creator.username)? {position: "absolute", right: 0, width: 20, height: 20}:{display: "none"}} onPress={()=>{}}>
                        <MaterialIcons color={colors.tabIconDefault} name="edit" size={20} />
                    </Pressable>
                </View>
                <ThemedText style={{color: colors.text, marginVertical: 10}}> {info?.fileDescription} </ThemedText>
                <View style={{marginHorizontal: 15}}>
                    <ThemedText> Uploaded by: {info?.creator.username}</ThemedText>
                    <ThemedText> Uploaded at: {dates?.createdAt.toLocaleString()}</ThemedText>
                    <ThemedText> Author: {(info?.author)?info.author:"unknown"}</ThemedText>
                    <ThemedText> Published on: {(dates?.publishDate)?dates.publishDate.toLocaleDateString():"unknown"}</ThemedText>
                    <ThemedText> Views: {info?.views}</ThemedText>
                </View>
                <View style={{marginTop: 20, marginHorizontal: 7, width: 500}}>
                    <Button color={colors.tint} title="Read" onPress={() => {router.push(`/speed_reading_file/?fileID=${fileID}`)}} />
                </View> 
            </ThemedView>
        </View>
    );
}