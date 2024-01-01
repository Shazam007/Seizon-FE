import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import SquareButton from '../../components/squareButton';
import SmallSquareButton from '../../components/smallSquareButton';
import CommonButton from '../../components/commonButton';

export default function createGoal() {

  const [showDailyUI, setDailyUI] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white justify-normal items-start py-20">

      <View className="mx-5 mb-4">
     
        <Text style={styles.text} className="font-bold text-neutral-700">Set Your Goals</Text>

        <ScrollView style={styles.scrollView}>

        <Text style={styles.subText} className="font-bold text-neutral-700">Manage the goal</Text>

        <View className="items-center" style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => setDailyUI(true)} style={styles.manageButtons} className="mt-2 self">
                <Text style={styles.btnText}>Daily</Text>
              </Pressable>
              <Pressable onPress={() => setDailyUI(false)} style={styles.manageButtons} className="mt-2 self">
                <Text style={styles.btnText}>Weekly</Text>
              </Pressable>
        </View>

        <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">{showDailyUI ? 'How many minutes per day' : 'How many minutes per week'}</Text>

        <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
            {showDailyUI ? (
            <>
              <SquareButton time='10' distance='equals to 1KM'/>
              <SquareButton time='20' distance='equals to 2KM'/>
              <SquareButton time='30' distance='equals to 3KM'/>
              <SquareButton time='60' distance='equals to 6KM'/>
              <SquareButton time='Custom' distance=''/>
            </>
          ):(
            <>
              <SquareButton time='60' distance='equals to 6KM'/>
              <SquareButton time='120' distance='equals to 12KM'/>
              <SquareButton time='180' distance='equals to 18KM'/>
              <SquareButton time='360' distance='equals to 36KM'/>
              <SquareButton time='Custom' distance=''/>
            </>
          )}
                            
        </View>
    
        <View >
            {!showDailyUI && (
            <>
            <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">Select dates for the goal</Text>
              <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
                <SmallSquareButton date='M' />
                <SmallSquareButton date='T' />
                <SmallSquareButton date='W' />
                <SmallSquareButton date='T' />
                <SmallSquareButton date='F' />
                <SmallSquareButton date='S' />
                <SmallSquareButton date='S' />
                </View>
            </>
          )}
                            
        </View>
        
        <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">Calories to burn (Kcal) by walking</Text>

        <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
            {showDailyUI ? (
            <>
              <CommonButton kcal='100'/>
              <CommonButton kcal='200'/>
              <CommonButton kcal='500'/>
              <CommonButton kcal='1000'/>
              <CommonButton kcal='Custom'/>
            </>
          ):(
            <>
              <CommonButton kcal='1000'/>
              <CommonButton kcal='2000'/>
              <CommonButton kcal='5000'/>
              <CommonButton kcal='10000'/>
              <CommonButton kcal='Custom'/>
            </>
          )}
                            
        </View>

        </ScrollView>

        

      </View>

      <View className="items-center justify-center">
            <Link href="/createGoal" asChild>
              <Pressable style={styles.continueButton} className="self">
                <Text style={styles.btnText}>Continue</Text>
              </Pressable>
            </Link>
        </View>
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text: {
        color: '#1A2251',
        fontSize: 30,
        fontWeight: '500',
        // textAlign: 'center',
        marginBottom:20,
      },
      scrollView:{

      },
      subText: {
        color: '#1A2251',
        fontSize: 20,
        fontWeight: '500',
        marginBottom:5,
      },
      manageButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        // marginHorizontal:'auto',
        borderRadius: 5,
        backgroundColor: '#4C59A4',
        width: 100,
        marginRight:10
      },
      continueButton: {
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginHorizontal:'auto',
        borderRadius: 5,
        backgroundColor: '#4C59A4',
        width: 100,
        // marginLeft:10
      },
    btnText: {
        fontSize: 17,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'white',
      },
    signupText: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.25,
        color: 'black',
      },
      image: {
        width: 150,
        height:150,
        marginBottom:30,
        padding:10,
        alignSelf:'center'
      },
    })