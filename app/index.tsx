import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Onboarding from './onboarding'

export default function index() {
  return (
    // <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //   <Text>Home page</Text>
    //   <Link href="/mountain/" asChild>
    //     <Button title="View Mountains"></Button>
    //   </Link>
    // </View>
    <Onboarding/>
  )
}