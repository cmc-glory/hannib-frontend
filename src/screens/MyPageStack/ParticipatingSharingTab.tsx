import React from 'react'
import {View, ScrollView, Text, StyleSheet, LayoutChangeEvent} from 'react-native'

type ParticipatingSharingProps = {
  setTabViewHeight: React.Dispatch<React.SetStateAction<number>>
}

export const ParticipatingSharingTab = () => {
  return (
    <ScrollView style={{height: 800, backgroundColor: 'red', marginVertical: 15}}>
      <Text>ParticipatingSharing</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
