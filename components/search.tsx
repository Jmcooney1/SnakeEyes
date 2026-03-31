import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Search(props: {searchVal: string}){
    const router = useRouter();
    const [list, setList] = useState(["entry1", "entry2", "entry3", "entry4"]);

    function handlePress(searchEntry: string){
        if(!searchEntry) return;

        console.log("Search pressed:", searchEntry);
        router.push(`/search-results/${searchEntry}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.divider}/>
            <Pressable style={({pressed}) => [styles.entries, pressed && styles.entryPressed]} onPress={() => handlePress(props.searchVal)}>
                <Text style={styles.entryText}>{(props.searchVal)? props.searchVal : "Search..."}</Text>
            </Pressable>
            {list.map((element, idx) => {
                if((props.searchVal))
                    return( 
                        <Pressable key={`${element}-${idx}`} style={({pressed}) => [styles.entries, pressed && styles.entryPressed]} onPress={() => handlePress(element)}>
                            <Text style={styles.entryText}>{element}</Text>
                        </Pressable>
                    );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
    },
        entries: {
        backgroundColor: "transparent",
        justifyContent: "center",
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "100%",
    },
    entryText: {
        color: "white",
        textAlign: "left",
    },
    entryPressed: {
        backgroundColor: "gray",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "white",
        marginBottom: 8,
    },
});