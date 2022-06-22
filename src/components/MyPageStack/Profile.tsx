import React, {useCallback} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'

export const Profile = () => {
  const navigation = useNavigation()
  const onPressEdit = useCallback(() => {
    navigation.navigate('MyPageStackNavigator', {
      screen: 'EditProfile',
    })
  }, [])
  return (
    <View>
      <View style={[theme.styles.rowFlexStart, {marginBottom: 15}]}>
        <FastImage style={styles.image} source={{uri: 'http://localhost:8081/src/assets/images/iu.jpeg'}} />
        <View style={{alignSelf: 'stretch', justifyContent: 'center'}}>
          <Text style={[theme.styles.bold20, {color: theme.gray700}]}>춤추는 고양이</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={onPressEdit}>
        <Text style={styles.editProfileText}>프로필 수정</Text>
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
