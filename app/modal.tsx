import React from 'react';
import { StyleSheet, Text, View, ScrollView, useColorScheme } from 'react-native';

export default function ModalScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#0D1017' : '#fff' }]}>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Version</Text>
            <Text style={styles.sectionText}>1.0.0</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Developer</Text>
            <Text style={styles.sectionText}>Akshat Sharma</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Privacy Policy</Text>
            <Text style={styles.sectionText}>
Thank you for choosing BunkBuddy! This Privacy Policy outlines how BunkBuddy collects, uses, shares, and protects your information when you use our mobile application. Your privacy is important to us, and we are committed to ensuring the confidentiality and security of your personal information.
By using the BunkBuddy App, you consent to the terms of this Privacy Policy. If you do not agree with any part of this policy, please do not use our App.</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Feedback</Text>
            
          </View>
      
          
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help and More</Text>
            <Text style={styles.sectionText}>features comig soon...</Text>
          </View>
        </View>
        
          
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
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#C3CDD9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    color: '#C3CDD9',
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
    marginBottom: 10,
  },
});
