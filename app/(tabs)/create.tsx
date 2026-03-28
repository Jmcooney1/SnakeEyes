import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';



export default function CreateScreen() {
  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedFontSize, setSelectedFontSize] = useState('12');
  const [selectedHighlight, setSelectedHighlight] = useState('none');
  const [selectedFontColor, setSelectedFontColor] = useState('#000000');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
  const [selectedReadingSpeed, setSelectedReadingSpeed] = useState('200');

  const handleFileUpload = () => {
    // Handle file upload logic here
    console.log('File upload button pressed');
  }
  const handleTextInput = () => {
    // Handle text input logic here
    console.log('Text input button pressed');
  }
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Submit button pressed');
  }
  
  return (
    <>
    <View style={styles.titleContainer}>
      <View style={styles.stepContainer}>
        <Text style={styles.titleProperties}>Create a new post</Text>
        <View style={styles.ButtonProperties}>
          <Button title="Upload File" color="green" onPress={() => {handleFileUpload()}} />
          <Button title="Paste to text box" color="green" onPress={() => {handleTextInput()}} />
        </View>
        <View style={styles.createrContainer}>
          <Text style={styles.headerProperties}>Creator information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.ColorProperties}>Username:</Text>
            {/* Temparty text input, will be replaced with google sign in */}
            <TextInput style={styles.ColorProperties} placeholder="Enter your username" />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.ColorProperties}>File Title: </Text>
            <TextInput style={styles.ColorProperties} placeholder="Enter file title" />
          </View>
        </View>
        <View style={styles.uploaderContainer}>
          <Text style={styles.headerProperties}>Uploader Recommendation for Speed reading</Text>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>Font:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedFont}
              onValueChange={(itemValue) => setSelectedFont(itemValue)}
            >
              <Picker.Item label="Arial" value="arial" />
              <Picker.Item label="Times New Roman" value="times" />
              <Picker.Item label="Courier New" value="courier" />
            </Picker>
          </View>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>Font Size:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedFontSize}
              onValueChange={(itemValue) => setSelectedFontSize(itemValue)}
            >
              <Picker.Item label="12" value="12" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="16" value="16" />
            </Picker>
          </View>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>HighLight:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedHighlight}
              onValueChange={(itemValue) => setSelectedHighlight(itemValue)}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Word" value="Word" />
              <Picker.Item label="Sentence" value="Sentence" />
            </Picker>
          </View>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>Font Color:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedFontColor}
              onValueChange={(itemValue) => setSelectedFontColor(itemValue)}
            >
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Red" value="Red" />
            </Picker>
          </View>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>Background Color:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedBackgroundColor}
              onValueChange={(itemValue) => setSelectedBackgroundColor(itemValue)}
            >
              <Picker.Item label="White" value="White" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="Red" value="Red" />
            </Picker>
          </View>
          <View style={styles.PickerProperties}>
            <Text style={styles.TextProperties}>Reading Speed:</Text>
            <Picker
              style={styles.PickerProperties}
              selectedValue={selectedReadingSpeed}
              onValueChange={(itemValue) => setSelectedReadingSpeed(itemValue)}
            >
              <Picker.Item label="Slow" value="Slow" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Fast" value="Fast" />
            </Picker>
          </View>
        </View>
        <View style={styles.ButtonProperties}>
          <Button title="Submit" color="green" onPress={() => {handleSubmit()}} />
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createrContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
    marginBottom: 8,
    marginTop: 40,
  },
  infoContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
    marginBottom: 8,
  },
  uploaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  ButtonProperties:{
    height:50,
    width: 150,
    gap:8,
    marginBottom: 10,
  },
  titleProperties:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  headerProperties:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  ColorProperties:{
    color: 'white',
  },
  TextProperties:{
    color: 'black',
  },
  PickerProperties:{
    width: 200,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fffdfd',
  },
  picker: {
    color: 'black',
  },
  result: {
    color: 'white',
    marginTop: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});