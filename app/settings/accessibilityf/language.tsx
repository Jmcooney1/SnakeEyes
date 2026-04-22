import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

expo default function LanguageScreen(){
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    return (
        <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
                <Text style={[sharedStyles.backText, { color: colors.text }]}>Language</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
