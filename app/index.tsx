import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store';
import { CountdownTimer } from '@/components/CountdownTimer';
import { CountupTimer } from '@/components/CountupTimer';
import { StepCounter } from '@/components/StepCounter';
import { SunsetCountdown } from '@/components/SunsetCountdown';
import { CoffeeCounter } from '@/components/CoffeeCounter';
import { BulbCounter } from '@/components/BulbCounter';
import { SundayCounter } from '@/components/SundayCounter';
import { LampStepsCounter } from '@/components/LampStepsCounter';
import { ProcrastinationCounter } from '@/components/ProcrastinationCounter';
import { timers } from '@/data/timers';

export default function HomeScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const onboardingCompleted = useSelector((state: RootState) => state.settings.onboardingCompleted);
  const savedCounters = useSelector((state: RootState) => state.user.savedCounters);
  const customCounters = useSelector((state: RootState) => state.user.customCounters);
  const birthYear = useSelector((state: RootState) => state.user.birthYear);
  const dailyHabits = useSelector((state: RootState) => state.user.dailyHabits);
  const location = useSelector((state: RootState) => state.user.location);

  // Function to calculate dynamic dates based on user data
  const calculateDynamicTimer = (timer: typeof timers[0]) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentAge = currentYear - birthYear;

    switch (timer.id) {
      case 'life-expectancy':
        const remainingYears = 80 - currentAge;
        const lifeTarget = new Date(now);
        lifeTarget.setFullYear(now.getFullYear() + remainingYears);
        return { ...timer, targetDate: lifeTarget };

      case 'retirement':
        const retirementAge = 67;
        const yearsUntilRetirement = retirementAge - currentAge;
        const retirementTarget = new Date(now);
        retirementTarget.setFullYear(now.getFullYear() + yearsUntilRetirement);
        return { ...timer, targetDate: retirementTarget };

      case 'coffee-needed':
        // Assume last coffee was 3 hours ago, but could be based on habits
        const lastCoffee = new Date(now);
        lastCoffee.setHours(now.getHours() - 3);
        return { ...timer, startDate: lastCoffee };

      case 'birthday':
        // Assume January 1, but should be user input
        const birthday = new Date(now.getFullYear(), 0, 1);
        if (birthday < now) {
          birthday.setFullYear(now.getFullYear() + 1);
        }
        return { ...timer, targetDate: birthday };

      case 'procrastination':
        const todayMorning = new Date(now);
        todayMorning.setHours(9, 0, 0, 0);
        return { ...timer, startDate: todayMorning };

      default:
        return timer;
    }
  };

  useEffect(() => {
    if (!rootNavigationState?.key) {
      return;
    }
    if (!onboardingCompleted) {
      router.replace('/onboarding');
    }
  }, [onboardingCompleted, rootNavigationState?.key, router]);

  if (!rootNavigationState?.key || !onboardingCompleted) {
    return null; // or a loading screen
  }

  const displayedTimers = [
    ...timers.filter(timer => savedCounters.includes(timer.id)).map(calculateDynamicTimer),
    ...customCounters.map(counter => ({
      ...counter,
      targetDate: counter.targetDate ? new Date(counter.targetDate) : undefined,
      startDate: counter.startDate ? new Date(counter.startDate) : undefined,
    })),
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tagline}>
        Tick-tock your way to mild despair.{'\n'}
        Because why live in the moment when you can quantify its end?
      </Text>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayedTimers.map((timer) => (
          <View key={timer.id} style={styles.timerCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.timerTitle}>{timer.title}</Text>
              <TouchableOpacity style={styles.refreshButton}>
                <Text style={styles.refreshText}>🔄</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timerDescription}>{timer.description}</Text>
            
            {timer.id === 'sunset' ? (
              <SunsetCountdown latitude={location?.latitude} longitude={location?.longitude} unit={timer.unit as 'hours' | 'minutes'} />
            ) : timer.id === 'coffees-left' ? (
              <CoffeeCounter unit={'coffees'} birthYear={birthYear} coffeeIntake={dailyHabits.coffeeIntake} />
            ) : timer.id === 'bulbs-broken' ? (
              <BulbCounter unit={'bulbs'} />
            ) : timer.id === 'remaining-sundays' ? (
              <SundayCounter unit={'sundays'} />
            ) : timer.id === 'steps-to-lamp' ? (
              <LampStepsCounter unit={'steps'} />
            ) : timer.id === 'procrastination-count' ? (
              <ProcrastinationCounter unit={'phrases'} />
            ) : timer.unit === 'steps' ? (
              <StepCounter unit={timer.unit} />
            ) : timer.type === 'countdown' ? (
              <CountdownTimer
                targetDate={timer.targetDate instanceof Date ? timer.targetDate : new Date(timer.targetDate!)}
                unit={timer.unit as 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'years'}
              />
            ) : (
              <CountupTimer
                startDate={timer.startDate instanceof Date ? timer.startDate : new Date(timer.startDate!)}
                unit={timer.unit as 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'years'}
              />
            )}
            
            {timer.funFact && (
              <Text style={styles.funFact}>💀 {timer.funFact}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tagline: {
    color: '#888888',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  timerCard: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222222',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  refreshButton: {
    padding: 5,
  },
  refreshText: {
    fontSize: 18,
  },
  timerDescription: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  funFact: {
    color: '#666666',
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
