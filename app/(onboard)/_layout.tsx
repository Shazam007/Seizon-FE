import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {
    // const router = useRouter();
  return (
    <Stack
        screenOptions={{
            headerTitleAlign:'center'
        }}
    >
        <Stack.Screen name='createAvatar' options={{
            title:'Initial View',
            headerShown:false
        }}/>
        <Stack.Screen name='createGoal' options={{
            title:'Goal View',
            headerShown:false
        }}/>
        {/* <Stack.Screen name='(onboard)' options={{
            headerShown:false
        }}/> */}
        
    </Stack>
  )
}