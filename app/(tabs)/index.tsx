
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View, ScrollView, Alert } from 'react-native';
import { Text } from '@/components/Themed';

export default function TabOneScreen() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [result, setResult] = useState<number | null>(null); 
  const [showMore, setShowMore] = useState(false);
  const colorScheme = useColorScheme();

  const handleCalculate = () => {
    const total = parseInt(input1) || 0;
    const attended = parseInt(input2) || 0;
    const workingDays = parseInt(input3) || 0;
    const lecturesPerDay = parseInt(input4) || 0;

    const additionalDays = workingDays || 0;
    const additionalClassesLeft = lecturesPerDay || 0;
    const additionalAttended = additionalClassesLeft * additionalDays;

    const newTotal = total + additionalDays * 6;
    const newAttended = attended + additionalAttended;

    const percentage = (newAttended / newTotal) * 100;

    setResult(percentage);
  };

  const getMessage = () => {
    if (result !== null) {
      const percentage = result;
      let message = '';

      if (percentage <= 75) {
        message = 'Debarred';
      } else {
        const requiredPercentage = 75.0;
        const percentageDifference = percentage - requiredPercentage;

        if (percentageDifference > 0) {
          const total = 100;
          const resultFloat = (percentageDifference * total) / 100;
          const result = Math.floor(resultFloat); // Convert to integer
          const dayBunkFloat = resultFloat / 6;
          const dayBunk = Math.floor(dayBunkFloat); // Convert to integer
          message = `Leave ${dayBunk} Day\nor\n${result} Lectures \n\nFor 75% Attendance.`;
        } else {
          message = 'No lectures to leave!';
        }
      }

      return message;
    } else {
      return '';
    }
  };

  // Function to show message in a dialog box
  const showHelpMessage = () => {
    Alert.alert(
      'Help',
      'Enter your total lectures, attended lectures, days left to attend, and lectures per day. Then click "Calculate" to get the result.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark'? '#0D1017' : '#fff' }]}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTextLeft}>Lecture Calculator</Text>
          <TouchableOpacity onPress={showHelpMessage}>
            <Text style={styles.headerTextRight}>HELP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Start by entering your Total lectures:</Text>
          <TextInput
            style={[styles.input, { color: colorScheme === 'dark'? '#fff' : '#fff' }]}
            placeholder="for example: 100"
            placeholderTextColor={colorScheme === 'dark'? '#C3CDD9' : '#fff'}
            value={input1}
            onChangeText={setInput1}
            keyboardType="numeric"
          />
          <View style={styles.separator} />
          <Text style={styles.label}>Now enter your Attended lectures:</Text>
          <TextInput
            style={[styles.input, { color: colorScheme === 'dark'? '#fff' : '#fff' }]}
            placeholder="ex: 75"
            placeholderTextColor={colorScheme === 'dark'? '#C3CDD9' : '#fff'}
            value={input2}
            onChangeText={setInput2}
            keyboardType="numeric"
          />
          <View style={styles.separator} />
          {!showMore && (
            <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowMore(true)}>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          )}
          {showMore && (
            <>
              <Text style={styles.label}>Enter days left to attend:</Text>
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark'? '#fff' : '#fff' }]}
                placeholder="ex: 10"
                placeholderTextColor={colorScheme === 'dark'? '#C3CDD9' : '#fff'}
                value={input3}
                onChangeText={setInput3}
                keyboardType="numeric"
              />
              <View style={styles.separator} />
              <Text style={styles.label}>Lectures Per Day you have:</Text>
              <TextInput
                style={[styles.input, { color: colorScheme === 'dark'? '#fff' : '#fff' }]}
                placeholder="ex: 6"
                placeholderTextColor={colorScheme === 'dark'? '#C3CDD9' : '#fff'}
                value={input4}
                onChangeText={setInput4}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowMore(false)}>
                <Text style={styles.showMoreText}>Show Less</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        
        {result !== null && (
          <View style={styles.card}>
            <Text style={styles.label}>Result</Text>
            <Text style={styles.result}>{result} %</Text>
            <View style={styles.separator} />
            <Text style={styles.label}>Message</Text>
            <Text style={styles.result}>{getMessage()}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    width: '90%',
    backgroundColor: '#161B21',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 12,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#C3CDD9',
    width: '85%',
    alignItems: 'center',
    padding: 9,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  result: {
    marginTop: 5,
    color: 'white',
  },
  showMoreButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  showMoreText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  label: {
    color: '#C3CDD9',
    fontSize: 14,
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    marginTop: 30,
  },
  headerTextLeft: {
    color: '#C3CDD9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerTextRight: {
    color: '#C3CDD9',
    fontSize: 12,
    fontWeight: 'bold',
  },
});