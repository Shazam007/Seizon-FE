import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import SquareButton from '../../components/squareButton';
import SmallSquareButton from '../../components/smallSquareButton';
import CommonButton from '../../components/commonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from "axios";
import { APIManager } from '../../config';

export default function createGoal() {

  const [showDailyUI, setDailyUI] = useState(true);

  const [selectedValues, setSelectedValues] = useState({
    goal_basis: 'Daily',
    total_time: 0,
    days: [],
    calories_to_burn: 0,
  });

  const handleManageButtonClick = (goalBasis: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      goal_basis: goalBasis,
    }));
  };

  const handleMinutesButtonClick = (totalTime: number) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      total_time: totalTime,
    }));
  };

  const handleDateButtonClick = (selectedDate: string) => {
    setSelectedValues((prevValues: any) => {
      return {
        ...prevValues,
        days: [...prevValues.days, selectedDate],
      };
    });
  };

  const handleCaloriesButtonClick = (kcal: number) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      calories_to_burn: kcal,
    }));
  };

  const handleSubmit = async () => {
    try {

      // calculate daily weekly values
      const standTime = selectedValues.total_time
      const stepsPerDay = showDailyUI ? standTime : Math.floor(standTime / 7);
      const stepsPerWeek = showDailyUI ? (standTime * 7) : standTime;


      const userToken = await AsyncStorage.getItem('UserToken');

      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
      };

      const response = await APIManager.post('/goal', {
        ...selectedValues,
        steps_per_day: stepsPerDay,
        steps_per_week: stepsPerWeek
      }, axiosConfig);

      if (response.status == 200) {
        console.log(`${JSON.stringify(response.data)}`);

        router.push('/home');

      } else {
        console.log('Server error');
      }
    } catch (error) {
      // check if error is an axios error
      console.log('Error:', error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 400) {
          console.log(error.message);
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }

    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white justify-normal items-start py-20">

      <View className="mx-5 mb-4">

        <Text style={styles.text} className="font-bold text-neutral-700">Set Your Goals</Text>

        <ScrollView style={styles.scrollView}>

          <Text style={styles.subText} className="font-bold text-neutral-700">Manage the goal</Text>

          <View className="items-center" style={{ flexDirection: 'row' }}>
            <Pressable onPress={() => {
              setDailyUI(true)
              handleManageButtonClick('Daily')
            }} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.manageButtons]}>
              <Text style={styles.btnText}>Daily</Text>
            </Pressable>
            <Pressable onPress={() => {
              setDailyUI(false)
              handleManageButtonClick('Weekly')
            }} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.manageButtons]}>
              <Text style={styles.btnText}>Weekly</Text>
            </Pressable>
          </View>

          <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">{showDailyUI ? 'How many minutes per day' : 'How many minutes per week'}</Text>

          <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
            {showDailyUI ? (
              <>
                <SquareButton time='10' distance='equals to 1KM' onPress={() => handleMinutesButtonClick(10)} />
                <SquareButton time='20' distance='equals to 2KM' onPress={() => handleMinutesButtonClick(20)} />
                <SquareButton time='30' distance='equals to 3KM' onPress={() => handleMinutesButtonClick(30)} />
                <SquareButton time='60' distance='equals to 6KM' onPress={() => handleMinutesButtonClick(60)} />
                <SquareButton time='Custom' distance='' />
              </>
            ) : (
              <>
                <SquareButton time='60' distance='equals to 6KM' onPress={() => handleMinutesButtonClick(60)} />
                <SquareButton time='120' distance='equals to 12KM' onPress={() => handleMinutesButtonClick(120)} />
                <SquareButton time='180' distance='equals to 18KM' onPress={() => handleMinutesButtonClick(180)} />
                <SquareButton time='360' distance='equals to 36KM' onPress={() => handleMinutesButtonClick(360)} />
                <SquareButton time='Custom' distance='' />
              </>
            )}

          </View>

          <View >
            {!showDailyUI && (
              <>
                <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">Select dates for the goal</Text>
                <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
                  <SmallSquareButton date='M' onPress={() => handleDateButtonClick('Monday')} />
                  <SmallSquareButton date='T' onPress={() => handleDateButtonClick('Tuesday')} />
                  <SmallSquareButton date='W' onPress={() => handleDateButtonClick('Wednesday')} />
                  <SmallSquareButton date='T' onPress={() => handleDateButtonClick('Thursday')} />
                  <SmallSquareButton date='F' onPress={() => handleDateButtonClick('Friday')} />
                  <SmallSquareButton date='S' onPress={() => handleDateButtonClick('Saturday')} />
                  <SmallSquareButton date='S' onPress={() => handleDateButtonClick('Sunday')} />
                </View>
              </>
            )}

          </View>

          <Text style={styles.subText} className="font-bold text-neutral-700 mt-3">Calories to burn (Kcal) by walking</Text>

          <View className="items-center flex-wrap" style={{ flexDirection: 'row' }}>
            {showDailyUI ? (
              <>
                <CommonButton kcal='100' onPress={() => handleCaloriesButtonClick(100)} />
                <CommonButton kcal='200' onPress={() => handleCaloriesButtonClick(200)} />
                <CommonButton kcal='500' onPress={() => handleCaloriesButtonClick(500)} />
                <CommonButton kcal='1000' onPress={() => handleCaloriesButtonClick(1000)} />
                <CommonButton kcal='Custom' />
              </>
            ) : (
              <>
                <CommonButton kcal='1000' onPress={() => handleCaloriesButtonClick(1000)} />
                <CommonButton kcal='2000' onPress={() => handleCaloriesButtonClick(2000)} />
                <CommonButton kcal='5000' onPress={() => handleCaloriesButtonClick(5000)} />
                <CommonButton kcal='10000' onPress={() => handleCaloriesButtonClick(10000)} />
                <CommonButton kcal='Custom' />
              </>
            )}

          </View>

        </ScrollView>



      </View>

      <View className="items-center justify-center">
        <Pressable onPress={handleSubmit} style={styles.continueButton} className="self">
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>
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
    marginBottom: 20,
  },
  scrollView: {

  },
  subText: {
    color: '#1A2251',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
  manageButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    // marginHorizontal:'auto',
    borderRadius: 5,
    // backgroundColor: '#4C59A4',
    width: 100,
    marginRight: 10,
    marginTop: 10
  },
  continueButton: {
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 'auto',
    borderRadius: 5,
    backgroundColor: '#4C59A4',
    width: 110,
    marginLeft: 150
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
    height: 150,
    marginBottom: 30,
    padding: 10,
    alignSelf: 'center'
  },
})