import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { APIManager } from '../config';
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  user_language: string;
  height: string;
  weight: string;
  age: number;
  gender: string;
  password: string;
  user_level: string;
  total_steps: string;
}

export default function signup() {

  // Create a state object to store user data
  const [userData, setUserData] = useState({
    username: 'testuser1',
    firstName: '',
    lastName: 'testlastname',
    email: '',
    user_language: '',
    height: '',
    weight: '',
    age: 0,
    gender: '',
    password: '',
    user_level: '',
    total_steps: '',
  });

  const [retypesPassword, setRetypedPassword] = useState('')

  // Handler function to update the state as the user types
  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // check passwords are matching
    if (userData.password == retypesPassword) {

      try {
        console.log('Request Payload:', userData);
        const response = await APIManager.post('/user/register', {
          ...userData
        });

        if (response.status == 200) {
          console.log(`${JSON.stringify(response.data)}`);
          //save the user token in async storage
          try {
            await AsyncStorage.setItem('UserToken', response.data.token)
          } catch (e) {
            // saving error
          }
          //navigate user to create avatar page
          router.replace('/createAvatar');

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

    } else {
      console.log('passwords are note same')
    }

  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      {/* search bar */}
      <View className="mx-5 mb-4">
        <Image
          style={styles.image}
          source={require('../assets/images/app/scaled.png')}
        />
        <Text style={styles.text} className="font-bold text-neutral-700">Sign Up</Text>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6">
          <TextInput
            placeholder='First Name'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => handleInputChange('firstName', text)}
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6 mt-3">
          <TextInput
            placeholder='Age'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => handleInputChange('age', text)}
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6 mt-3">
          <TextInput
            placeholder='Email'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => handleInputChange('email', text)}
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6 mt-3">
          <TextInput
            placeholder='Password'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => handleInputChange('password', text)}
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6 mt-3">
          <TextInput
            placeholder='Retype Password'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={(text) => setRetypedPassword(text)}
          />
        </View>
        <View className="items-center justify-center">
          {/* actually this should go to signup complete ui */}
          {/* <Link href="/createAvatar" asChild> */}

          <Pressable onPress={handleSubmit} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.button]}>
            {({ pressed }) => (
              <Text style={[{ color: pressed ? 'white' : 'white' }, styles.btnText]}>
                Sign Up
              </Text>
            )}
          </Pressable>
          <Link href="/login" asChild>
            <Text style={styles.signupText} className='mt-4'>Already have an account? Sign in!</Text>
          </Link>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    marginHorizontal: 'auto',
    borderRadius: 50,
    // backgroundColor: '#1A2251',
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
    width: 170,
    height: 170,
    marginBottom: 30,
    padding: 10,
    alignSelf: 'center'
  },
})