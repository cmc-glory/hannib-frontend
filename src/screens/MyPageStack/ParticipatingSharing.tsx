import React from 'react'
import {View, ScrollView, Text, StyleSheet, LayoutChangeEvent} from 'react-native'

type ParticipatingSharingProps = {
  setTabViewHeight: React.Dispatch<React.SetStateAction<number>>
}

export const ParticipatingSharing = ({setTabViewHeight}: ParticipatingSharingProps) => {
  const onLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    setTabViewHeight(height + 100)
  }
  return (
    <ScrollView style={{height: 800, backgroundColor: 'red', marginVertical: 15}} onLayout={onLayout}>
      <Text>ParticipatingSharing</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
