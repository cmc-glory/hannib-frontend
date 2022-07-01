import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import {launchImageLibrary} from 'react-native-image-picker'
import {Mutation, useMutation} from 'react-query'
import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {showMessage, hideMessage} from 'react-native-flash-message'
import {StackHeader, SelectImageIcon} from '../../components/utils'
import {queryKeys, uploadProfileImage} from '../../api'
import {updateProfileImage} from '../../redux/slices'

import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'

export const EditProfile = () => {
  // ******************** utils ********************
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)
  const uploadProfileImageQuery = useMutation(queryKeys.profileImage, uploadProfileImage, {
    onSuccess: () => {
      profileImage && dispatch(updateProfileImage(profileImage)) // 리덕스에서도 프로필 이미지 변경
      navigation.goBack()
    },
    onError(error, variables, context) {
      console.log(error)
      showMessage({
        message: '프로필 이미지 업로드 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })

  // ******************** states ********************
  const [name, setName] = useState<string>(user.name)
  const [profileImage, setProfileImage] = useState<string | undefined>(user.profileImageUri)

  // ******************** callbacks ********************
  const checkButtonEnabled = useCallback((name: string, profileImage: string | undefined) => {
    // 이름도, profile image도 바뀐 게 없다면
    return name == user.name && profileImage == user.profileImageUri ? false : true
  }, [])

  const onPressComplete = useCallback(async () => {
    // 이름, 프로필 사진 중 바뀐 게 없으면 리턴.
    if (checkButtonEnabled(name, profileImage) == false) {
      return
    }

    // profile image uri가 들어 있으면
    if (profileImage) {
      // form data 만듦
      const formData = new FormData()
      let file = {
        uri: profileImage,
        type: 'multipart/form-data',
        name: 'image.jpg',
      }
      formData.append('profileImg', file)

      uploadProfileImageQuery.mutate(formData) // 백에 이미지 전송
    }
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
      console.log(response)
      setProfileImage(response?.assets[0].uri)
    }
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="프로필 수정">
        {uploadProfileImageQuery.isLoading ? (
          <ActivityIndicator animating={uploadProfileImageQuery.isLoading} />
        ) : (
          <Pressable onPress={onPressComplete}>
            <Text style={[theme.styles.bold16, {color: checkButtonEnabled(name, profileImage) ? theme.main : theme.gray300}]}>완료</Text>
          </Pressable>
        )}
      </StackHeader>
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          {profileImage == '' ? (
            <Pressable style={[styles.image, styles.selectImage]} onPress={onImageLibraryPress}></Pressable>
          ) : (
            <FastImage source={{uri: profileImage}} style={styles.image}></FastImage>
          )}

          <SelectImageIcon style={styles.cameraIcon} onPress={onImageLibraryPress} />
        </View>

        <Text style={theme.styles.label}>닉네임</Text>
        <TextInput style={theme.styles.input} placeholder={user.name} placeholderTextColor={theme.gray300} value={name} onChangeText={setName} />
        <Text style={[theme.styles.text14, {marginTop: 8, color: theme.gray500}]}>이번달 잔여 수정 가능 횟수 : 1회</Text>
      </View>
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
  imageOverlay: {
    position: 'absolute',
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(20,20,21, 0.16)',
    top: 32,
    zIndex: 1,
  },
  cameraContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.gray300,
    position: 'absolute',
    top: 68,
    zIndex: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  headerContainer: {
    height: 56,
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
