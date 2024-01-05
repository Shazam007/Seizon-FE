import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'

interface TitleProps {
  date: string;
  onPress?: () => void;
}

const SmallSquareButton = ({ date, onPress }: TitleProps) => {
  return (
    <Pressable onPress={onPress} style={styles.timeButtons} className="mt-2 self">
      <Text style={styles.timeBtnText}>{date}</Text>
    </Pressable>
  )
};

export default SmallSquareButton;



const styles = StyleSheet.create({
  timeButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 15,
    // paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#4C59A4',
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 10
  },
  timeBtnText: {
    fontSize: 15,
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