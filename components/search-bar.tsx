import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Search } from "./search";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export function SearchBar() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];
    const [isOpen, setIsOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const inputRef = useRef(null);
    const router = useRouter();  

    useEffect(() => { 
        if(isOpen) 
            inputRef.current.focus();
        else {
            inputRef.current.blur();
            inputRef.current.clear();
        }
    }, [isOpen]);
    
    function handlePress(){ setIsOpen(!isOpen); }
    function handleFocus(){ setIsOpen(true); }
    function handleSubmit(){ 
        if (!searchVal) return;

        router.push(`/search-results/${searchVal}`); 
        setIsOpen(false);
        inputRef.current.blur();
        inputRef.current.clear();
        setSearchVal("");
    }

    if (Platform.OS == 'web')
        return (
            <View style={[stylesWeb.container, { backgroundColor: colors.offBackground}]}>
                <View style={stylesWeb.barContain}>
                    <MaterialIcons size={28} name={isOpen ? "clear" : "search"} color="lightgray" style={{marginLeft: 20, color: colors.tint}}/>
                    <Pressable style={stylesWeb.button} onPress={handlePress} />
                    {isOpen && <Pressable style={stylesWeb.exit} onPress={handlePress} />}
                    <TextInput ref={inputRef} style={[stylesMobile.input, { color: colors.text }]} placeholder="Search..."
                        onChangeText={(text) => setSearchVal(text)}
                        onSubmitEditing={handleSubmit}
                    />
                </View>
                {isOpen && <Search searchVal={searchVal} />}
            </View>
        );
    else
        return(
            <View style={[isOpen ? stylesMobile.containerOpen : stylesMobile.container, { backgroundColor: colors.background }]}>
                <View style={stylesMobile.barContain}>
                    <MaterialIcons size={28} name={isOpen ? "clear" : "search"} color="lightgray" style={{marginLeft: 20, color: colors.tint}}/>
                    <Pressable style={stylesMobile.button} onPress={handlePress} />
                    <TextInput ref={inputRef} style={[stylesMobile.input, { color: colors.text }]} placeholder="Search..."
                        onChangeText={(text) => setSearchVal(text)}
                        onSubmitEditing={handleSubmit}
                        onFocus={handleFocus}
                    />
                    {isOpen && <Pressable style={stylesMobile.exit} onPress={()=>{setIsOpen(false);}} />}
                </View>
                {isOpen && <Search searchVal={searchVal} />}
            </View>
        );
}

const stylesWeb = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: 400,
        maxWidth: "85%",
        margin: 25,
        borderRadius: 20,
    },
    barContain: {
        top: 0,
        left: 0,
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 0,
    },
    input: {
        backgroundColor: "transparent",
        marginLeft: 20,
        height: 50,
        width: "100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 0,
    },
    button: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 0
    },
    exit: {
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        width: "100%",
        height: "100%",
    },
    open: {
        color: "white",
        width: "100%",
    },
});

const stylesMobile = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "column",
        justifyContent: "flex-start",
        minWidth: 400,
        maxWidth: "85%",
        margin: 25,
        borderRadius: 20,
        top: 50,
    },
    containerOpen: {
        position: "absolute",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "120%",
        height: "120%",
        margin: 0,
        left: -25,
        top: 50,
    },
    barContain: {
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 0,
    },
    input: {
        backgroundColor: "transparent",
        marginLeft: 20,
        height: 50,
        width: "100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 0,
    },
    button: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 0
    },
    exit: {
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
    }
});