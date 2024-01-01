import { View, Text } from 'react-native'
import React from 'react'

export default function Missing() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Error 404! Not found the route</Text>
    </View>
  )
}