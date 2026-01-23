import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

interface StepCounterProps {
  unit: 'steps';
}

export const StepCounter: React.FC<StepCounterProps> = ({ unit }) => {
  const [stepCount, setStepCount] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const baseStepsRef = useRef<number>(0);

  useEffect(() => {
    let subscription: any = null;

    const subscribe = async () => {
      if (Platform.OS === 'web') {
        setIsAvailable(false);
        return;
      }

      try {
        const available = await Pedometer.isAvailableAsync();
        setIsAvailable(available);

        if (available) {
          const end = new Date();
          const start = new Date();
          start.setHours(0, 0, 0, 0);

          const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
          const baseSteps = pastStepCountResult?.steps ?? 0;
          baseStepsRef.current = baseSteps;
          setStepCount(baseSteps);

          subscription = Pedometer.watchStepCount(result => {
            setStepCount(baseStepsRef.current + result.steps);
          });
        }
      } catch (error) {
        console.error('Error initializing step counter:', error);
        setIsAvailable(false);
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.number}>N/A</Text>
        <Text style={styles.unit}>steps not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} accessibilityLabel={`Step counter showing ${formatNumber(stepCount)} steps today`}>
      <Text style={styles.number} accessibilityRole="text">{formatNumber(stepCount)}</Text>
      <Text style={styles.unit} accessibilityRole="text">steps today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
  },
  number: {
    color: '#44ff44',
    fontSize: 48,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    textShadowColor: '#44ff44',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  unit: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});