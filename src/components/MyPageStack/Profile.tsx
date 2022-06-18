import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'

export const Profile = () => {
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 15}]}>
      <FastImage style={styles.image} source={{uri: 'http://localhost:8081/src/assets/images/iu.jpeg'}} />
      <View style={{alignSelf: 'stretch', paddingVertical: 12, justifyContent: 'space-between'}}>
        <Text style={[theme.styles.bold16, {color: theme.gray700}]}>춤추는 고양이</Text>
        <Pressable style={styles.button}>
          <Text style={{color: theme.gray500}}>프로필 편집</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginRight: theme.PADDING_SIZE,
  },
  button: {
    borderRadius: 4,
    borderColor: theme.gray500,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
})
