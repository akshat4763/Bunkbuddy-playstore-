import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function TabTwoScreen() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [workingDays, setWorkingDays] = useState<number>(0);
  const [lectures75, setLectures75] = useState<number>(0);
  const [lectures85, setLectures85] = useState<number>(0);
  const [lectures95, setLectures95] = useState<number>(0);
  const [bunks75, setBunks75] = useState<number>(0);
  const [bunks85, setBunks85] = useState<number>(0);
  const [bunks95, setBunks95] = useState<number>(0);

  const calculateWorkingDays = () => {
    if (!startDate || !endDate) return;

    let currentDate = new Date(startDate);
    let totalWorkingDays = 0;
    while (currentDate <= new Date(endDate)) {
      if (currentDate.getDay() !== 0) {
        totalWorkingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWorkingDays(totalWorkingDays);

    // Calculate total lectures required for 75%, 85%, and 95% attendance
    const totalLectures = totalWorkingDays * 6;
    setLectures75(Math.ceil(totalLectures * 0.75));
    setLectures85(Math.ceil(totalLectures * 0.85));
    setLectures95(Math.ceil(totalLectures * 0.95));

    // Calculate remaining days as bunks
    setBunks75(Math.max(0, totalLectures - lectures75));
    setBunks85(Math.max(0, totalLectures - lectures85));
    setBunks95(Math.max(0, totalLectures - lectures95));
  };

  const showHelpMessage = () => {
    Alert.alert(
      'Help',
      'Select the start and end date of your semester. The app will calculate the total working days, total number of lectures, and the required attendance for 75%, 85%, and 95%.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
          <Text style={styles.headerTextLeft}>WorkDay Calculator</Text>
          <TouchableOpacity onPress={showHelpMessage}>
            <Text style={styles.headerTextRight}>HELP</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Select Semester Start Date:</Text>
          <Calendar
            onDayPress={(day) => setStartDate(day.dateString)}
            markedDates={startDate ? { [startDate]: { selected: true, selectedColor: 'blue' } } : {}}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Select Semester End Date:</Text>
          <Calendar
            onDayPress={(day) => setEndDate(day.dateString)}
            markedDates={endDate ? { [endDate]: { selected: true, selectedColor: 'blue' } } : {}}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={calculateWorkingDays}>
          <Text style={styles.buttonText}>Calculate Working Days</Text>
        </TouchableOpacity>
        {workingDays > 0 && (
          <View style={styles.card}>
            <Text style={styles.result}>Total Working Days: {workingDays}</Text>
            <Text style={styles.result}>Total Number of Lectures: {workingDays * 6}</Text>
            <View style={styles.attendanceContainer}>
              <View style={styles.attendanceColumn}>
                <Text style={styles.attendanceText}>75% Attendance</Text>
                <Text style={styles.attendanceLectures}>Lec:{lectures75}</Text>
                <Text style={styles.attendanceBunks}>Bunks: {bunks75}</Text>
              </View>
              <View style={styles.attendanceColumn}>
                <Text style={styles.attendanceText}>85% Attendance</Text>
                <Text style={styles.attendanceLectures}>Lec:{lectures85}</Text>
                <Text style={styles.attendanceBunks}>Bunks: {bunks85}</Text>
              </View>
              <View style={styles.attendanceColumn}>
                <Text style={styles.attendanceText}>95% Attendance</Text>
                <Text style={styles.attendanceLectures}>Lec:{lectures95}</Text>
                <Text style={styles.attendanceBunks}>Bunks: {bunks95}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    marginLeft: 35,
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#161B21',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  attendanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  attendanceColumn: {
    flex: 1,
    alignItems: 'center',
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  attendanceLectures: {
    fontSize: 16,
  },
  attendanceBunks: {
    fontSize: 16,
  },
});
