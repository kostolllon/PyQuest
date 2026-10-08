import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View,
} from 'react-native';

export default function TaskView({ task, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [order, setOrder] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setSelected(null);
    setText('');
    setOrder(task.type === 'order' ? task.lines.map((_, i) => i) : []);
    setShowHint(false);
    setStatus('idle');
  }, [task]);

  const check = () => {
    let ok = false;
    if (task.type === 'multiple') {
      ok = selected === task.correct;
    } else if (task.type === 'fill') {
      ok = text.trim().toLowerCase() === task.answer.toLowerCase();
    } else if (task.type === 'order') {
      ok = JSON.stringify(order) === JSON.stringify(task.correctOrder);
    }

    if (ok) {
      setStatus('correct');
      setTimeout(() => onCorrect(), 700);
    } else {
      setStatus('wrong');
      setShowHint(true);
      onWrong && onWrong();
    }
  };

  const moveLine = (from, to) => {
    if (to < 0 || to >= order.length) return;
    const arr = [...order];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    setOrder(arr);
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.question}>{task.question}</Text>

      {task.type === 'multiple' && (
        <View style={{ marginTop: 16 }}>
          {task.options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selected === i && styles.optionSelected,
                status === 'correct' && i === task.correct && styles.optionCorrect,
                status === 'wrong' && selected === i && styles.optionWrong,
              ]}
              onPress={() => { setSelected(i); setStatus('idle'); }}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {task.type === 'fill' && (
        <TextInput
          style={[styles.input, status === 'correct' && styles.inputCorrect]}
          value={text}
          onChangeText={(t) => { setText(t); setStatus('idle'); }}
          placeholder="Введи ответ..."
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      {task.type === 'order' && (
        <View style={{ marginTop: 12 }}>
          {order.map((lineIdx, pos) => (
            <View key={lineIdx} style={styles.lineRow}>
              <Text style={styles.lineText}>{task.lines[lineIdx]}</Text>
              <View style={styles.lineBtns}>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  onPress={() => moveLine(pos, pos - 1)}
                >
                  <Text style={styles.arrowText}>▲</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.arrowBtn}
                  onPress={() => moveLine(pos, pos + 1)}
                >
                  <Text style={styles.arrowText}>▼</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {showHint && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>💡 {task.hint}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.checkBtn,
          status === 'correct' && { backgroundColor: '#4CAF50' },
          status === 'wrong' && { backgroundColor: '#F44336' },
        ]}
        onPress={check}
      >
        <Text style={styles.checkText}>
          {status === 'correct' ? 'Верно! ✅' : status === 'wrong' ? 'Попробуй ещё' : 'Проверить'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20 },
  question: { fontSize: 18, fontWeight: '600', color: '#212121', lineHeight: 26 },
  option: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  optionSelected: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  optionCorrect: { borderColor: '#4CAF50', backgroundColor: '#C8E6C9' },
  optionWrong: { borderColor: '#F44336', backgroundColor: '#FFEBEE' },
  optionText: { fontSize: 15, color: '#212121' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 16,
    fontSize: 16,
    marginTop: 16,
  },
  inputCorrect: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  lineText: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#212121',
  },
  lineBtns: { flexDirection: 'row' },
  arrowBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 4,
    backgroundColor: '#EEE',
    borderRadius: 8,
  },
  arrowText: { fontSize: 14, color: '#555' },
  hintBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  hintText: { color: '#795548', fontSize: 14, lineHeight: 20 },
  checkBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 18,
    marginTop: 24,
    alignItems: 'center',
  },
  checkText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});