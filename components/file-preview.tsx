import { View, StyleSheet, Text, Pressable } from "react-native";
import { router, useRouter } from "expo-router";

//TODO: for now, using name as a placeholder for file ID; change once backend is set up

function handlePress(fileID: string){
    router.push(`/file-view/${fileID}`);
}
export function FilePreview(props: {title: string, author: string, date: string, user: string}){
    return(
        <Pressable style={styles.contStyle} onPress={() => handlePress(props.title)}>
            <Text style={styles.titleStyle}>{props.title}</Text>
            <Text style={styles.infoStyle}>{props.author}, {props.date}</Text>
            <Text style={styles.infoStyle}>uploaded by: {props.user} </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    contStyle: {
    backgroundColor: "gray",
    borderWidth: 1,
    borderColor: "lightgray",
    borderStyle: "solid",
    borderRadius: 10,
    margin: 15,
    minWidth: 250,
    flex: 1,
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