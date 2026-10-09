import { useEffect, useState } from 'react';
import {
    SafeAreaView, ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';
import ProgressBar from '../components/ProgressBar';
import TaskView from '../components/TaskView';
import { LESSONS } from '../data/lessons';
import { loadProgress, saveProgress } from '../store/progress';

export default function LessonScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const [stage, setStage] = useState('theory');
  const [taskIndex, setTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [theoryStep, setTheoryStep] = useState(0);

  useEffect(() => {
    navigation.setOptions({ title: `${lesson.icon} ${lesson.title}` });
  }, [lesson, navigation]);

  const handleCorrect = async () => {
    const gained = 10;
    const newScore = score + gained;
    setScore(newScore);

    if (taskIndex < lesson.tasks.length - 1) {
      setTaskIndex(taskIndex + 1);
    } else {
      await finishLesson(newScore, mistakes);
    }
  };

  const finishLesson = async (finalScore, mistakesCount) => {
    const p = await loadProgress();
    const perfect = mistakesCount === 0;
    const bonus = perfect ? 20 : 0;
    const totalScore = finalScore + bonus;

    p.crystals += totalScore;
    p.completedLessons[lesson.id] = { score: totalScore, perfect };

    const ach = new Set(p.achievements || []);
    if (lesson.id === 1) ach.add('first');
    if (perfect) ach.add('perfect');
    if (Object.keys(p.completedLessons).length === LESSONS.length) ach.add('master');
    p.achievements = Array.from(ach);

    await saveProgress(p);

    navigation.replace('Result', {
      lessonId: lesson.id,
      score: totalScore,
      perfect,
      mistakes: mistakesCount,
      nextLessonId: lesson.id < LESSONS.length ? lesson.id + 1 : null,
    });
  };

  if (stage === 'theory') {
    const total = lesson.theory.length;
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <ProgressBar value={theoryStep + 1} max={total} color={lesson.color} />
          </View>

          <View style={[styles.theoryCard, { borderTopColor: lesson.color }]}>
            <Text style={styles.theoryIcon}>{lesson.icon}</Text>
            <Text style={styles.theoryText}>{lesson.theory[theoryStep]}</Text>
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: lesson.color }]}
            onPress={() => {
              if (theoryStep < total - 1) setTheoryStep(theoryStep + 1);
              else setStage('tasks');
            }}
          >
            <Text style={styles.primaryBtnText}>
              {theoryStep < total - 1 ? 'Далее' : 'К заданиям ▶'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const task = lesson.tasks[taskIndex];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <ProgressBar value={taskIndex} max={lesson.tasks.length} color={lesson.color} />
          <Text style={styles.taskCounter}>
            Задание {taskIndex + 1} из {lesson.tasks.length}
          </Text>
          <Text style={styles.scoreText}>💎 {score}</Text>
        </View>

        <TaskView
          task={task}
          onCorrect={handleCorrect}
          onWrong={() => setMistakes((m) => m + 1)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { padding: 20, paddingBottom: 40 },
  theoryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    borderTopWidth: 6,
    marginBottom: 24,
    minHeight: 220,
    justifyContent: 'center',
  },
  theoryIcon: { fontSize: 44, textAlign: 'center', marginBottom: 16 },
  theoryText: { fontSize: 17, color: '#212121', lineHeight: 26 },
  primaryBtn: {
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  taskCounter: { marginTop: 12, color: '#757575', fontSize: 13 },
  scoreText: { marginTop: 4, fontSize: 15, color: '#FF9800', fontWeight: 'bold' },
});