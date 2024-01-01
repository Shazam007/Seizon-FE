import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen name='home' options={{
            headerTitle:'Home',
            tabBarLabel:'Home',
            headerTitleAlign:'center',
            headerShown:false,
            tabBarIcon: () => <Feather name="home" size={24} color="black" />
        }}/>
        <Tabs.Screen name='goals' options={{
            headerTitle:'Goals',
            tabBarLabel:'Goals',
            headerTitleAlign:'center',
            headerShown:false,
            tabBarIcon: () => <FontAwesome5 name="crosshairs" size={24} color="black" />
            
        }}/>
        <Tabs.Screen name='inventory' options={{
            headerTitle:'Inventory',
            tabBarLabel:'Inventory',
            headerTitleAlign:'center',
            headerShown:false,
            tabBarIcon: () => <FontAwesome5 name="mask" size={24} color="black" />
        }}/>
        <Tabs.Screen name='friends' options={{
            headerTitle:'Friends',
            tabBarLabel:'Friends',
            headerTitleAlign:'center',
            headerShown:false,
            tabBarIcon: () => <FontAwesome5 name="user-friends" size={24} color="black" />
            
        }}/>
        <Tabs.Screen name='settings' options={{
            headerTitle:'Settings',
            tabBarLabel:'Settings',
            headerTitleAlign:'center',
            headerShown:false,
            tabBarIcon: () => <FontAwesome5 name="cog" size={24} color="black" />
        }}/>
    </Tabs>
  )
}