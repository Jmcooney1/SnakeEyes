import { StyleSheet, View } from "react-native";

export function FileView(){
    return(
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.1)",
        position: "absolute",
        top: 0,
        left: 0,
    }
});