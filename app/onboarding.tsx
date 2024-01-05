import { View, Text, StyleSheet, ImageBackground, Button, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('UserToken');

      if (userToken) {
        router.replace('/home');
      } else {
        console.log('No token found')
      }
    } catch (error) {
      // Handle AsyncStorage error
      console.error('Error checking user token:', error);
      // Navigate to the login screen as a fallback
      router.push('/login');
    }
  };

  //need to check the async storage here to check the user token
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/splash.png')} style={styles.image}>
        <Link href="/login" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  // image: {
  //     flex: 1,
  //     resizeMode: 'cover',
  //     justifyContent: 'center',
  //   },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: 'white',
    width: 200,
    bottom: 80
  },
  btnText: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: '#1D1C3B',
  },
})