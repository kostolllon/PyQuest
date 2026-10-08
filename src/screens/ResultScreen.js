import { useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import { ACHIEVEMENTS, LESSONS } from '../data/lessons';
import { loadProgress } from '../store/progress';

export default function ResultScreen({ route, navigation }) {
  const { lessonId, score, perfect, mistakes, nextLessonId } = route.params;
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    (async () => setProgress(await loadProgress()))();
  }, []);

  const totalDone = progress ? Object.keys(progress.completedLessons).length : 0;
  const isFinal = nextLessonId === null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.emoji}>{perfect ? '🏆' : '🎉'}</Text>
        <Text style={styles.title}>
          {isFinal ? 'Модуль пройден!' : 'Урок завершён!'}
        </Text>
        <Text style={styles.subtitle}>
          {perfect
            ? 'Идеально, без единой ошибки!'
            : `Ошибок: ${mistakes}. В следующий раз получится лучше!`}
        </Text>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreValue}>+{score} 💎</Text>
          <Text style={styles.scoreLabel}>Кристаллы знаний</Text>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statLine}>📚 Пройдено уроков: {totalDone}/{LESSONS.length}</Text>
          <Text style={styles.statLine}>🔥 Серия дней: {progress?.streak ?? 1}</Text>
          <Text style={styles.statLine}>
            🏅 Достижений: {progress?.achievements?.length ?? 0}/{ACHIEVEMENTS.length}
          </Text>
        </View>

        {isFinal && (
          <View style={styles.achBox}>
            <Text style={styles.achTitle}>Твои достижения:</Text>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = progress?.achievements?.includes(a.id);
              return (
                <Text
                  key={a.id}
                  style={[styles.achLine, !unlocked && { opacity: 0.35 }]}
                >
                  {unlocked ? a.title : '🔒 ' + a.desc}
                </Text>
              );
            })}
          </View>
        )}

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: lesson.color }]}
          onPress={() => {
            if (nextLessonId) {
              navigation.replace('Lesson', { lessonId: nextLessonId });
            } else {
              navigation.navigate('Map');
            }
          }}
        >
          <Text style={styles.btnText}>
            {nextLessonId ? 'Следующий урок →' : 'Вернуться на карту'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('Lesson', { lessonId })}
        >
          <Text style={styles.secondaryText}>Пройти урок заново 🔁</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.secondaryText}>К карте 🗺️</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { padding: 24, alignItems: 'center', paddingBottom: 40 },
  emoji: { fontSize: 72, marginTop: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#212121', marginTop: 12 },
  subtitle: { fontSize: 15, color: '#757575', textAlign: 'center', marginTop: 8, marginBottom: 20 },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  scoreValue: { fontSize: 40, fontWeight: 'bold', color: '#FFC107' },
  scoreLabel: { fontSize: 14, color: '#757575', marginTop: 6 },
  statsBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    marginBottom: 20,
  },
  statLine: { fontSize: 15, color: '#212121', marginVertical: 4 },
  achBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    marginBottom: 24,
  },
  achTitle: { fontSize: 16, fontWeight: 'bold', color: '#795548', marginBottom: 8 },
  achLine: { fontSize: 14, color: '#5D4037', marginVertical: 3 },
  btn: {
    width: '100%',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryText: { color: '#757575', fontSize: 14 },
});