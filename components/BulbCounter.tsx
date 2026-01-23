import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Gyroscope } from 'expo-sensors';

interface BulbCounterProps {
  unit: 'bulbs';
}

export const BulbCounter: React.FC<BulbCounterProps> = ({ unit }) => {
  const [bulbsBroken, setBulbsBroken] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    let subscription: any = null;

    const subscribe = async () => {
      if (Platform.OS === 'web') {
        setIsAvailable(false);
        return;
      }

      try {
        const available = await Gyroscope.isAvailableAsync();
        setIsAvailable(available);

        if (available) {
          Gyroscope.setUpdateInterval(100); // 100ms

          subscription = Gyroscope.addListener(gyroscopeData => {
            const { x, y, z } = gyroscopeData;
            const magnitude = Math.sqrt(x * x + y * y + z * z);
            if (magnitude > 10) { // Threshold for "drop"
              setBulbsBroken(prev => prev + 1);
            }
          });
        }
      } catch (error) {
        console.error('Error initializing bulb counter:', error);
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
        <Text style={styles.unitText}>gyroscope not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatNumber(bulbsBroken)}</Text>
      <Text style={styles.unitText}>bulbs broken</Text>
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