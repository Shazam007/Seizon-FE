import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import axios, { AxiosError } from "axios";
import { APIManager } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function createAvatar() {

  const [isMale, setIsMale] = useState(true);

  const toggleAvatar = () => {
    setIsMale((prevIsMale) => !prevIsMale);
  };

  const handleSubmit = async () => {
    try {

      const userToken = await AsyncStorage.getItem('UserToken');

      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      };

      const response = await APIManager.post('/avatar', {
        gender: `${isMale ? 'male' : 'female'}`
      }, axiosConfig);

      if (response.status == 200) {
        console.log(`${JSON.stringify(response.data)}`);

        //navigate user to create avatar page
        router.push('/createGoal');

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

  const avatarSource = isMale
    ? require('../../assets/images/avatar/male-avatar.png')
    : require('../../assets/images/avatar/female-avatar.png');
  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      {/* search bar */}
      <View className="mx-5 mb-4">

        <Text style={styles.text} className="font-bold text-neutral-700">Create Your Avatar</Text>
        <Image
          style={styles.image}
          source={avatarSource}
        />

        <Text style={styles.subText} className="font-bold text-neutral-700 mt-5">Select your gender</Text>

        <View className="items-center justify-center mx-4">
          <Pressable onPress={() => setIsMale(true)} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.selectButtons]}>
            {({ pressed }) => (
              <Text style={[{ color: pressed ? 'white' : 'white' }, styles.btnText]}>
                Male
              </Text>
            )}
          </Pressable>
          <Pressable onPress={() => setIsMale(false)} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.selectButtons]}>
            {({ pressed }) => (
              <Text style={[{ color: pressed ? 'white' : 'white' }, styles.btnText]}>
                Female
              </Text>
            )}
          </Pressable>
        </View>


        <View className="items-center justify-center mt-10">
          <Pressable onPress={handleSubmit} style={styles.button} className="mt-5 self">
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#1A2251',
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    // marginLeft:10
  },
  subText: {
    color: '#1A2251',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    // marginLeft:10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginHorizontal: 'auto',
    borderRadius: 50,
    backgroundColor: '#1A2251',
    width: 200,
  },
  selectButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginHorizontal: 'auto',
    borderRadius: 5,
    // backgroundColor: '#4C59A4',
    width: 200,
    marginTop: 25
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