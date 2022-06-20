import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'

export const WriterProfile = () => {
  return (
    <View style={[theme.styles.rowSpaceBetween, {paddingHorizontal: 20, paddingVertical: 16}]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FastImage source={require('../../assets/images/no_user.jpeg')} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}></FastImage>
        <Text style={[theme.styles.bold16, {color: theme.gray700}]}>춤추는 고양이</Text>
      </View>
      <Pressable style={[theme.styles.button, {paddingHorizontal: 16, paddingVertical: 6}]}>
        <Text style={{color: theme.white}}>팔로우</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({})
