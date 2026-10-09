import { StyleSheet, View } from 'react-native';

export default function ProgressBar({ value, max = 100, color = '#4CAF50' }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
});