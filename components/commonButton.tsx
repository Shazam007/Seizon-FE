import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'

interface TitleProps {
    kcal: string;
  }

const CommonButton = ({ kcal }:TitleProps) => {
    return (
      <Pressable style={styles.manageButtons} className="mt-2 self">
        <Text style={styles.btnText}>{kcal}</Text>
      </Pressable>
      )
};

export default CommonButton;



const styles = StyleSheet.create({
  manageButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    // marginHorizontal:'auto',
    borderRadius: 5,
    backgroundColor: '#4C59A4',
    width: 100,
    marginRight:10,
    marginTop:10
  },
  btnText: {
    fontSize: 17,
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