import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors, sharedStyles } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getItem } from '@/store';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';

export default function LanguageScreen(){
    const router = useRouter();
    const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
    const colors = Colors[colorScheme];
    const API_BASE_URL = 'http://localhost:3000';
    const username = (getItem('username') as string | null) ?? null;
    const { t } = useTranslation();

    const [ownerID, setOwnerID] = useState<number | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
    const [isSaving, setIsSaving] = useState(false);

    async function resolveOwnerID() {
        if (!username) return null;
        const res = await fetch(`${API_BASE_URL}/api/users/username/${encodeURIComponent(username)}`);
        if (!res.ok) return null;
        const data = await res.json();
        const id = typeof data?.id === 'number' ? data.id : null;
        setOwnerID(id);
        return id;
    }

    async function loadLanguage() {
        const resolvedOwnerID = ownerID ?? (await resolveOwnerID());
        if (!resolvedOwnerID) return;
        const res = await fetch(`${API_BASE_URL}/api/user-settings/${resolvedOwnerID}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data?.language === 'en' || data?.language === 'es') {
            setSelectedLanguage(data.language);
            void i18n.changeLanguage(data.language);
        }
    }

    async function saveLanguage(next: 'en' | 'es') {
        setSelectedLanguage(next);
        void i18n.changeLanguage(next);
        setIsSaving(true);
        try {
            const resolvedOwnerID = ownerID ?? (await resolveOwnerID());
            if (!resolvedOwnerID) return;
            const res = await fetch(`${API_BASE_URL}/api/user-settings/${resolvedOwnerID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language: next }),
            });
            if (!res.ok) throw new Error(`Failed to save language (${res.status})`);
            await res.json();
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(() => {
        void loadLanguage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ScrollView style={[sharedStyles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={sharedStyles.backRow} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
                <Text style={[sharedStyles.backText, { color: colors.text }]}>{t('common.language')}</Text>
            </TouchableOpacity>

            {!username ? (
                <Text style={[sharedStyles.sectionTitle, { color: colors.text }]}>{t('auth.loginToChangeLanguage')}</Text>
            ) : (
                <View style={{ paddingHorizontal: 16, gap: 10 }}>
                    {(['en', 'es'] as const).map((lng) => (
                        <TouchableOpacity
                            key={lng}
                            style={[
                                sharedStyles.card,
                                { padding: 14, borderWidth: 2, borderColor: colors.icon, backgroundColor: colors.icon + '22' },
                                selectedLanguage === lng && { borderColor: colors.tint },
                                isSaving && { opacity: 0.7 },
                            ]}
                            disabled={isSaving}
                            onPress={() => void saveLanguage(lng)}
                        >
                            <Text style={{ color: colors.text, fontWeight: '700' }}>
                                {lng === 'en' ? 'English' : 'Español'} {selectedLanguage === lng ? '(selected)' : ''}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}
