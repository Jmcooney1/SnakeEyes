import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';



export function Search(props: {searchVal: string}){

    async function fetchSearchResults() {
        if(props.searchVal.length==0) return;
        const response = await fetch(`http://localhost:3000/api/search/${props.searchVal}`);
        const data = await response.json();
        setList([]);
        for(let a=0;a<4;a++)
            if(data[a])
                setList([...list, data[a].title]);
    }
    useEffect(() => { fetchSearchResults() }, [props.searchVal])

    const router = useRouter();
    const [list, setList] = useState<string[]>([]);
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    function handlePress(searchEntry: string){
        if(!searchEntry) return;

        console.log("Search pressed:", searchEntry);
        router.push(`/search-results/${searchEntry}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.divider}/>
            <Pressable style={({pressed}) => [styles.entries, pressed && {backgroundColor: colors.text}]} onPress={() => handlePress(props.searchVal)}>
                <ThemedText style={styles.entryText}>{(props.searchVal)? props.searchVal : "Search..."}</ThemedText>
            </Pressable>
            {list.map((element, idx) => {
                if((props.searchVal))
                    return( 
                        <Pressable key={`${element}-${idx}`} style={({pressed}) => [styles.entries, pressed && {backgroundColor: colors.tabIconDefault}]} onPress={() => handlePress(element)}>
                            <ThemedText style={styles.entryText}>{element}</ThemedText>
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
        textAlign: "left",
    },
    divider: {
        width: "100%",
        height: 1,
        marginBottom: 8,
    },
});