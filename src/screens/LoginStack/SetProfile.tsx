import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {launchImageLibrary} from 'react-native-image-picker'
import type {Asset} from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'

import {SetProfileRouteProps} from '../../navigation/LoginStackNavigator'
import {StackHeader, SelectImageIcon, FloatingBottomButton} from '../../components/utils'
import NoUserSvg from '../../assets/Icon/noUser.svg'
import * as theme from '../../theme'

const names = ['test', '진실', 'ㅇㅇ']

export const SetProfile = () => {
  // ****************** utils  ******************
  const navigation = useNavigation()
  const route = useRoute<SetProfileRouteProps>()
  const [name, setName] = useState<string>('') // 사용자가 입력한 닉네임.
  const [profileImage, setProfileImage] = useState<{uri: string}>()
  const [duplicated, setDuplicated] = useState<boolean>(false) // 이메일 중복 여부

  // 이미지 상관 없이 닉네임이 null이 아닐 때만
  const checkButtonEnabled = useCallback((name: string) => {
    return name == '' ? false : true
  }, [])

  const onPressNext = useCallback(() => {
    // 중복 닉네임 판별
    if (names.includes(name)) {
      setDuplicated(true)
      return
    }

    navigation.navigate('SelectCategory', {email: route.params.email, name, profileImage})
  }, [name, profileImage])

  const onImageLibraryPress = useCallback(async () => {
    const response = await launchImageLibrary({selectionLimit: 1, mediaType: 'photo', includeBase64: false})
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.errorCode) {
      console.log('errorCode : ', response.errorCode)
    } else if (response.errorMessage) {
      console.log('errorMessage', response.errorMessage)
    } else if (response.assets) {
      response?.assets[0].uri && setProfileImage({uri: response?.assets[0].uri})
    }
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="프로필 설정" />
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          {profileImage == undefined ? (
            <Pressable style={[styles.image, styles.selectImage]} onPress={onImageLibraryPress}>
              <NoUserSvg width={54} height={54} />
            </Pressable>
          ) : (
            <FastImage source={profileImage} style={styles.image}></FastImage>
          )}

          <SelectImageIcon style={styles.cameraIcon} onPress={onImageLibraryPress} />
        </View>

        <Text style={theme.styles.label}>닉네임</Text>
        <TextInput
          style={[theme.styles.input, duplicated && {borderColor: theme.red}]}
          placeholder="닉네임을 입력해 주세요."
          placeholderTextColor={theme.gray300}
          value={name}
          onChangeText={text => {
            setDuplicated(false)
            setName(text)
          }}
        />
        {duplicated && <Text style={[{color: theme.red, fontSize: 12, marginTop: 4}, theme.styles.text12]}>중복된 닉네임입니다.</Text>}
      </View>
      <FloatingBottomButton label="다음" enabled={checkButtonEnabled(name)} onPress={onPressNext} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cameraIcon: {
    position: 'absolute',
    left: 72,
    top: 108,
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
  },
  selectImage: {
    backgroundColor: theme.gray100,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
