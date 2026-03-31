import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Button } from "react-native";

const router = useRouter();

export default function FileView() {
    const { fileID } = useLocalSearchParams();
    const [info] = useState({title: "file title", author: "file author", date: "file date", user: "file uploader"});

    return(
        <View style={{margin: 20}}>
            <ThemedText style={{fontSize: 30}}> File View: "{fileID}" </ThemedText>
            <ThemedText> Title: {info.title} </ThemedText>
            <ThemedText> Author: {info.author} </ThemedText>
            <ThemedText> Date: {info.date} </ThemedText>
            <ThemedText> Uploader: {info.user} </ThemedText>
            <ThemedText> [ further info... ] </ThemedText>
            <Button title="Read" onPress={() => {}} /> 
        </View>
    );
}