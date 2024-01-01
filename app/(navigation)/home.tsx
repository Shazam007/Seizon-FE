import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Link, router } from 'expo-router'
import { APIManager } from '../../config';
import axios, { AxiosError } from "axios";
import JWT from 'expo-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

export default function home() {

  const animatedValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //     // Animation configuration
  //     const animationConfig = {
  //     toValue: 0.5, // Animate to half of the progress level
  //     duration: 1000, // Animation duration in milliseconds
  //     useNativeDriver: false, // Set to true for better performance on native thread
  //   };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      {/* search bar */}
      <View className="mx-5 mb-4" style={{ flexDirection: 'row' }}>
        {/* user avatar icon */}
        <Image
          style={styles.image}
          source={require('../../assets/images/app/scaled.png')}
        />
        {/* username */}
        <Text style={styles.text} className="font-bold text-neutral-700">Sign In</Text>

        {/* userlevel and progress bar */}

        <View className="items-center justify-center"></View>

      </View>

      <View>
        <Progress.Bar progress={0.5} width={200} height={20} color="#00f" borderWidth={2} />
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
    backgroundColor: '#1A2251',
    width: 200,
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