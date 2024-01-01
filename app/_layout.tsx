import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

export default function _layout() {
    const router = useRouter();
  return (
    <Stack
        screenOptions={{
            headerTitleAlign:'center'
        }}
    >
        <Stack.Screen name='index' options={{
            title:'Initial View',
            headerShown:false
        }}/>
        <Stack.Screen name='login' options={{
            title:'Login',
            headerShown:false
        }}/>
        <Stack.Screen name='signup' options={{
            title:'Sign Up',
            headerShown:false
        }}/>
        <Stack.Screen name='(navigation)' options={{
            headerShown:false
        }}/>
        <Stack.Screen name='(onboard)' options={{
            headerShown:false
        }}/>
        {/* <Stack.Screen name='mountain/index' options={{
            title:'Mountains',
            headerRight: ()=>(<Button title='Login' onPress={()=> router.push('/progress')}/>)
        }}/> */}
        <Stack.Screen name='[missing]' options={{
            title:'No page found'
        }}/>
        
    </Stack>
    
  )
}

// modal will neglect in android, only works with ios