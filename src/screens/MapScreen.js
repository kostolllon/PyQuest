import { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { LESSONS } from '../data/lessons';
import { loadProgress, saveProgress } from '../store/progress';

export default function MapScreen({ navigation }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      const p = await loadProgress();
      setProgress(p);
    });
    return unsub;
  }, [navigation]);

  if (!progress) return null;

  const completed = progress.completedLessons || {};
  const total = LESSONS.length;
  const done = Object.keys(completed).length;

  const isUnlocked = (idx) => {
    if (idx === 0) return true;
    return !!completed[LESSONS[idx - 1].id];
  };

  const handleOpen = (lesson) => {
    navigation.navigate('Lesson', { lessonId: lesson.id });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Твой путь 🗺️</Text>
          <Text style={styles.headerSub}>
            Пройдено {done} из {total} уроков
          </Text>
          <View style={{ marginTop: 10 }}>
            <ProgressBar value={done} max={total} />
          </View>
        </View>

        {LESSONS.map((lesson, idx) => {
          const unlocked = isUnlocked(idx);
          const isDone = !!completed[lesson.id];
          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.8}
              disabled={!unlocked}
              onPress={() => handleOpen(lesson)}
              style={[
                styles.card,
                { borderLeftColor: lesson.color },
                !unlocked && styles.cardLocked,
              ]}
            >
              <View style={[styles.iconCircle, { backgroundColor: lesson.color + '22' }]}>
                <Text style={styles.icon}>{unlocked ? lesson.icon : '🔒'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>
                  Урок {lesson.id}. {lesson.title}
                </Text>
                <Text style={styles.cardDesc}>{lesson.description}</Text>
                {isDone && (
                  <Text style={styles.doneBadge}>
                    ✅ Пройдено • {completed[lesson.id].score} 💎
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.finishButton}
          onPress={async () => {
            const p = await loadProgress();
            p.crystals = 0;
            p.completedLessons = {};
            p.achievements = [];
            await saveProgress(p);
            setProgress(p);
          }}
        >
          <Text style={styles.finishText}>Сбросить прогресс</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { padding: 20, paddingBottom: 40 },
  header: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#212121' },
  headerSub: { fontSize: 14, color: '#757575', marginTop: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardLocked: { opacity: 0.55 },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: { fontSize: 28 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#212121' },
  cardDesc: { fontSize: 13, color: '#757575', marginTop: 2 },
  doneBadge: { fontSize: 12, color: '#4CAF50', marginTop: 6, fontWeight: '600' },
  finishButton: {
    marginTop: 24,
    alignSelf: 'center',
    padding: 12,
  },
  finishText: { color: '#9E9E9E', fontSize: 13, textDecorationLine: 'underline' },
});