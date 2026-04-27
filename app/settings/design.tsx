import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { READER_CONFIG } from '@/constants/reader-config';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DesignScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const [selectedFont, setSelectedFont] = useState('Default');
  const [selectedSize, setSelectedSize] = useState(16);
  const [selectedSpeed, setSelectedSpeed] = useState('Normal');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedHighlight, setSelectedHighlight] = useState('None');
  const [isSaving, setIsSaving] = useState(false);

  // Demo user id until login/auth is implemented
  const ownerID = 1;
  const API_BASE_URL = 'http://localhost:3000';

  async function loadSettings() {
    const res = await fetch(`${API_BASE_URL}/api/user-settings/${ownerID}`);
    if (!res.ok) throw new Error(`Failed to load settings (${res.status})`);
    const data = await res.json();

    if (data?.font) setSelectedFont(String(data.font));
    if (typeof data?.size === 'number') setSelectedSize(data.size);
    if (data?.speed) setSelectedSpeed(String(data.speed));
    if (data?.textColor) setSelectedColor(String(data.textColor));
    if (data?.highlighter) setSelectedHighlight(String(data.highlighter));
  }

  async function saveSettings() {
    setIsSaving(true);
    try {
      const payload = {
        font: selectedFont,
        size: selectedSize,
        speed: selectedSpeed,
        textColor: selectedColor,
        highlighter: selectedHighlight,
      };

      const res = await fetch(`${API_BASE_URL}/api/user-settings/${ownerID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed to save settings (${res.status})`);
      await res.json();
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    loadSettings().catch((e) => console.warn(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.tint }, isSaving && { opacity: 0.7 }]}
        disabled={isSaving}
        onPress={saveSettings}
      >
        <Text style={styles.saveButtonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>

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
  saveButton: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});