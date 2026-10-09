import { useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { loadProgress } from '../store/progress';

export default function HomeScreen({ navigation }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      const p = await loadProgress();
      setProgress(p);
    });
    return unsub;
  }, [navigation]);

  const crystals = progress?.crystals ?? 0;
  const streak = progress?.streak ?? 1;
  const done = Object.keys(progress?.completedLessons || {}).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>🐍 PyQuest</Text>
        <Text style={styles.subtitle}>
          Изучай Python, играя! Короткие уроки, весёлые задания и настоящий код.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>💎</Text>
            <Text style={styles.statValue}>{crystals}</Text>
            <Text style={styles.statLabel}>Кристаллы</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Серия</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📚</Text>
            <Text style={styles.statValue}>{done}/3</Text>
            <Text style={styles.statLabel}>Уроки</Text>
          </View>
        </View>

        <View style={styles.heroBox}>
          <Text style={styles.heroTitle}>Готов начать?</Text>
          <Text style={styles.heroText}>
            Пройди 3 коротких урока и познакомься с переменными, условиями и циклами.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.startButtonText}>Начать обучение 🚀</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Всероссийский хакатон «ИТ-Прорыв» • Номинация «Мобильная разработка»
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#4CAF50' },
  container: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 28,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statEmoji: { fontSize: 22 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginTop: 4 },
  statLabel: { fontSize: 12, color: '#757575', marginTop: 2 },
  heroBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 24,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#212121', marginBottom: 8 },
  heroText: { fontSize: 15, color: '#555', lineHeight: 21 },
  startButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  startButtonText: { fontSize: 18, fontWeight: 'bold', color: '#212121' },
  footer: {
    color: '#C8E6C9',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 32,
  },
});