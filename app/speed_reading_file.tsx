import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

const Box = ({ children } : { children: React.ReactNode }) => {
  return (
      <View style={styles.box}>{children} </View>
  );
};

export default function SpeedReadingPage() {
    return (
        <>
        <View style={styles.titleContainer}>
        <View style={styles.stepContainer}>
            <Text style={styles.titleProperties}>Speed Reading Page</Text>
            <Text style={styles.ColorProperties}>Here you can read your file at your desired reading speed!</Text>
            <View style={styles.infoContainer}>
            <Text style={styles.ColorProperties}> File Name</Text>
            <Text style={styles.ColorProperties}> File Description</Text>
            <Text style={styles.ColorProperties}> Publish Date</Text>
            <Text style={styles.ColorProperties}> Creator Name</Text>
            </View>
            <View style={styles.createrContainer}>
                <Text style={styles.ColorProperties}>Where the screen will be</Text>
                <Box>
                    <Text>Preview of file goes here...</Text>
                </Box>
            </View>
            <View style={styles.ButtonProperties}>
                <Button title="Go back to create page" color="green" onPress={() => {router.push('/(tabs)/create')}}/>
                <Button title="Go back to home page" color="green" onPress={() => {router.push('/')}}/>
             </View>
        </View>
    </View>
    </>
    );
}


    const styles = StyleSheet.create({
        titleContainer: {
          flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        stepContainer: {
            gap: 8,
            marginBottom: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleProperties: {
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
        },
        createrContainer:{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            gap:10,
            marginTop: 30,
            marginBottom: 8,
        },
        infoContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap:10,
            marginBottom: 8,
        },

        ColorProperties:{
            color: 'white',
        },

       box: {
            width: 300,
            height: 200,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#000',
            padding: 16,
            margin: 16,
        },
        ButtonProperties:{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height:50,
            width: 150,
            gap:8,
            marginBottom: 10,
            marginTop: 20,
        }
    });
