import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { Link, router } from 'expo-router'
import { APIManager } from '../config';
import axios, { AxiosError } from "axios";
import JWT from 'expo-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginLogic = async () => {

    try {
      const response = await APIManager.post('/user/login', {
        email,
        password,
      });

      if (response.status == 200) {
        //save the user token in async storage
        try {
          await AsyncStorage.setItem('UserToken', response.data.token)
        } catch (e) {
          // saving error
        }
        //navigate user to Home page
        router.replace('/home');

      } else if (response.status === 404) {
        console.log('Incorrect username or password');
      } else {
        console.log('Server error');
      }
    } catch (error) {
      // check if error is an axios error
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 404) {
          console.log("Missing Username or Password");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }

    }




  }
  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      {/* search bar */}
      <View className="mx-5 mb-4">
        <Image
          style={styles.image}
          source={require('../assets/images/app/scaled.png')}
        />
        <Text style={styles.text} className="font-bold text-neutral-700">Sign In</Text>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6">
          <TextInput
            placeholder='Email'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={setUsername}
            returnKeyType="next"
          />
        </View>
        <View className="flex-row items-center bg-neutral-200 rounded-full p-3 space-x-2 pl-6 mt-3">
          <TextInput
            placeholder='Password'
            placeholderTextColor='#525252'
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            onChangeText={setPassword}
            secureTextEntry={true}
            returnKeyType="go"
          />
        </View>
        <View className="items-center justify-center">
          {/* <Link href="/home" asChild>
              <Pressable onPress={loginLogic} style={styles.button} className="mt-5 self">
                <Text style={styles.btnText}>Sign In</Text>
              </Pressable>
            </Link> */}
          <Pressable onPress={loginLogic} style={({ pressed }) => [{ backgroundColor: pressed ? '#010B42' : '#1A2251' }, styles.button]}>
            {({ pressed }) => (
              <Text style={[{ color: pressed ? 'white' : 'white' }, styles.btnText]}>
                Sign In
              </Text>
            )}
          </Pressable>
          {/*  */}
          <Link href="/signup" asChild>
            <Text style={styles.signupText} className='mt-4'>New to the journey? Sign up!</Text>
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
    width: 200,
    height: 200,
    marginBottom: 30,
    padding: 10,
    alignSelf: 'center'
  },
})