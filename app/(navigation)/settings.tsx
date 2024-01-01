import { View, Text, StyleSheet, TextInput, SafeAreaView, Pressable, Image, Keyboard } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function settings() {

  const logoutFunction = () => {
      //remove the user token from async storage
      try {
        AsyncStorage.removeItem('UserToken');
        } catch (err) {
          console.log(err);
        }
          Keyboard.dismiss();

      //navigate user to the login page
      router.replace('/login');
  }
  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      {/* search bar */}
      <View className="mx-5 mb-4">
        <View className="items-center justify-center">
                <Pressable onPress={logoutFunction} style={styles.button} className="mt-5 self">
                  <Text style={styles.btnText}>Logout</Text>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        marginHorizontal:'auto',
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
    })