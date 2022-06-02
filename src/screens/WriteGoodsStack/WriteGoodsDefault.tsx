import React, {useState} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'

import StackHeader from '../../components/utils/StackHeader'
import StepIndicator from '../../components/WriteGoodsStack/StepIndicator'
import ImagePicker from '../../components/WriteGoodsStack/ImagePicker'
export const WriteGoodsDefault = () => {
  const [images, setImages] = useState<Asset[]>([])
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <StepIndicator step={1} />
        <ImagePicker images={images} setImages={setImages} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
})
