import { View, StyleSheet, Pressable } from "react-native";
import { router, useRouter } from "expo-router";
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from "./themed-text";

//TODO: for now, using name as a placeholder for file ID; change once backend is set up

function handlePress(fileID: string){
    router.push(`/file-view/${fileID}`);
}
export function FilePreview(props: {title: string, author: string, date: string, user: string}){
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    return(
        <Pressable style={[styles.contStyle, { backgroundColor: colors.background, borderColor: colors.icon }]} onPress={() => handlePress(props.title)}>
            <ThemedText style={styles.titleStyle}>{props.title}</ThemedText>
            <ThemedText style={styles.infoStyle}>{props.author}, {props.date}</ThemedText>
            <ThemedText style={styles.infoStyle}>uploaded by: {props.user} </ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    contStyle: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    margin: 15,
    minWidth: 250,
    flex: 1,
    paddingVertical: 10,
    },
    titleStyle: {
        fontSize: 20,
        marginLeft: 15,
        height: 30,
    },
    infoStyle: {
        marginLeft: 20,
        height: 30,
        fontSize: 16,
    },
});