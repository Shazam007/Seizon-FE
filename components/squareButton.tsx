import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'

interface TitleProps {
  time: string;
  distance: string;
  onPress?: () => void;
}

const SquareButton = ({ time, distance, onPress }: TitleProps) => {
  return (
    <Pressable onPress={onPress} style={styles.timeButtons} className="mt-2 self">
      <Text style={styles.timeBtnText}>{time}</Text>
      <Text style={styles.timeBtnSubText}>{distance}</Text>
    </Pressable>
  )
};

export default SquareButton;



const styles = StyleSheet.create({
  timeButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#4C59A4',
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 10
  },
  timeBtnText: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
  },
  timeBtnSubText: {
    fontSize: 9,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
  },
})