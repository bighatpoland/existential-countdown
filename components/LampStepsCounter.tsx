import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';

interface LampStepsCounterProps {
  unit: 'steps';
}

export const LampStepsCounter: React.FC<LampStepsCounterProps> = ({ unit }) => {
  const [stepsToLamp, setStepsToLamp] = useState<number>(100); // Simulate 100 steps to next lamp
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

          const initialRemainder = baseSteps % 100;
          setStepsToLamp(initialRemainder === 0 ? 100 : 100 - initialRemainder);

          subscription = Pedometer.watchStepCount(result => {
            const totalSteps = baseStepsRef.current + result.steps;
            const remainder = totalSteps % 100;
            setStepsToLamp(remainder === 0 ? 100 : 100 - remainder);
          });
        }
      } catch (error) {
        console.error('Error initializing lamp steps counter:', error);
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
        <Text style={styles.timerText}>N/A</Text>
        <Text style={styles.unitText}>pedometer not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatNumber(stepsToLamp)}</Text>
      <Text style={styles.unitText}>steps to lamp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#44ff44',
    fontVariant: ['tabular-nums'],
  },
  unitText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 5,
  },
});