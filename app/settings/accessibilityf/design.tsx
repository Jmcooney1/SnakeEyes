import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { READER_CONFIG } from '@/constants/reader-config';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DesignScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [selectedFont, setSelectedFont] = useState('Default');
  const [selectedSize, setSelectedSize] = useState(16);
  const [selectedSpeed, setSelectedSpeed] = useState('Normal');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedHighlight, setSelectedHighlight] = useState('None');

  return (
    <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>

      {/* Header */}
      <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        <Text style={[sharedStyles.backText, { color: colors.text }]}>Design Settings</Text>
      </TouchableOpacity>

      {/* Font */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>Font</Text>
      <View style={styles.optionsRow}>
        {READER_CONFIG.fonts.map((font) => (
          <TouchableOpacity
            key={font}
            style={[styles.optionButton, { borderColor: colors.icon }, selectedFont === font && { backgroundColor: colors.tint, borderColor: colors.tint }]}
            onPress={() => setSelectedFont(font)}>
            <Text style={[styles.optionText, { color: colors.text }, selectedFont === font && { color: '#fff' }]}>
              {font}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Size */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>Size</Text>
      <View style={styles.optionsRow}>
        {READER_CONFIG.sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.optionButton, { borderColor: colors.icon }, selectedSize === size && { backgroundColor: colors.tint, borderColor: colors.tint }]}
            onPress={() => setSelectedSize(size)}>
            <Text style={[styles.optionText, { color: colors.text }, selectedSize === size && { color: '#fff' }]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Speed */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>Speed</Text>
      <View style={styles.optionsRow}>
        {READER_CONFIG.speeds.map((speed) => (
          <TouchableOpacity
            key={speed}
            style={[styles.optionButton, { borderColor: colors.icon }, selectedSpeed === speed && { backgroundColor: colors.tint, borderColor: colors.tint }]}
            onPress={() => setSelectedSpeed(speed)}>
            <Text style={[styles.optionText, { color: colors.text }, selectedSpeed === speed && { color: '#fff' }]}>
              {speed}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Color */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>Text Color</Text>
      <View style={styles.optionsRow}>
        {READER_CONFIG.colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && { borderColor: colors.tint }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      {/* Highlighter */}
      <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>Highlighter</Text>
      <View style={styles.optionsRow}>
        {READER_CONFIG.highlighters.map((highlight) => (
          <TouchableOpacity
            key={highlight}
            style={[styles.optionButton, { borderColor: colors.icon }, selectedHighlight === highlight && { backgroundColor: colors.tint, borderColor: colors.tint }]}
            onPress={() => setSelectedHighlight(highlight)}>
            <Text style={[styles.optionText, { color: colors.text }, selectedHighlight === highlight && { color: '#fff' }]}>
              {highlight}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
});