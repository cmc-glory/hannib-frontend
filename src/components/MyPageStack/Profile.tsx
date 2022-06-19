import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'

export const Profile = () => {
  return (
    <View>
      <View style={[theme.styles.rowFlexStart, {marginBottom: 15}]}>
        <FastImage style={styles.image} source={{uri: 'http://localhost:8081/src/assets/images/iu.jpeg'}} />
        <View style={{alignSelf: 'stretch', paddingVertical: 20, justifyContent: 'space-between'}}>
          <Text style={[theme.styles.bold20, {color: theme.gray700}]}>춤추는 고양이</Text>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={styles.followText}>팔로잉</Text>
            <Text style={{...styles.followNumber, marginRight: 16}}>23</Text>
            <Text style={styles.followText}> 팔로잉</Text>
            <Text style={styles.followNumber}>23</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.editProfileText}>프로필 편집</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  editProfileText: {
    color: theme.gray700,
    fontFamily: 'Pretendard-Bold',
  },
  followNumber: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  followText: {
    marginRight: 6,
  },
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
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
