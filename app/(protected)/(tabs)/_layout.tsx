import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'
import "@/global.css";
const _layout = () => {
  return (
    <Tabs
    tabBar={props => <TabBar{...props}/>}
    screenOptions={{headerShown:false}}
    >
        <Tabs.Screen
        name='index'options={{title:"Home"}}
        />
        <Tabs.Screen
        name='explore'options={{title:"Explore"}}
        />
        <Tabs.Screen
        name='fun_zone'options={{title:"Fun Zone"}}
        />
        <Tabs.Screen
        name='favorite'options={{title:"Favorite"}}
        />
        <Tabs.Screen
        name='profile'options={{title:"Profile"}}
        />
       
    </Tabs>
  )
}

export default _layout