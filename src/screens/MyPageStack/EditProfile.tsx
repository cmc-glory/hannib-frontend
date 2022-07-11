import React, {useState, useCallback, useMemo} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import {launchImageLibrary} from 'react-native-image-picker'
import moment from 'moment'
import {useMutation} from 'react-query'
import {useDispatch} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import {showMessage, hideMessage} from 'react-native-flash-message'

import {StackHeader, SelectImageIcon} from '../../components/utils'
import {queryKeys, uploadProfileImage, updateAccountId} from '../../api'
import {updateProfileImage, updateName} from '../../redux/slices'

import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'
import NoUserSvg from '../../assets/Icon/noUser.svg'

export const EditProfile = () => {
  // ******************** utils ********************
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)
  const leftChangeNum = useMemo(() => {
    const thisMonth = moment().format('YYYY-MM')
    const lastMonthChanged = user.creatorIdDatetime.slice(0, 7)

    return thisMonth == lastMonthChanged ? 0 : 1
  }, [])

  // ******************** react queries ********************
  const uploadProfileId = useMutation(queryKeys.profileId, updateAccountId, {
    onSuccess: data => {
      console.log('response : ', data)
      name && dispatch(updateName(name)) // 리덕스에서도 이름 변경
      navigation.goBack()
    },
    onError(error, variables, context) {
      console.log(error)
      showMessage({
        message: '닉네임 변경 중 에러가 발생했습니다',
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
  const uploadProfileImageQuery = useMutation(queryKeys.profileImage, uploadProfileImage, {
    onSuccess: data => {
      console.log('response : ', data)
      setProfileImage(data)
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
    console.log('here')
    // 이름, 프로필 사진 중 바뀐 게 없으면 리턴.
    if (checkButtonEnabled(name, profileImage) == false) {
      return
    }
    if (name) {
      let updatedAccnountName = {
        accountIdx: user.accountIdx,
        creatorId: name,
      }
      uploadProfileId.mutate(updatedAccnountName)
    }
  }, [name, profileImage])

  const onImageLibraryPress = useCallback(async () => {
    const response = await launchImageLibrary({selectionLimit: 1, mediaType: 'photo', includeBase64: false})

    if (response.didCancel) {
      // 취소한 경우
    } else if (response.errorCode || response.errorMessage) {
      // 에러 발생
      showMessage({
        // 에러 안내 메세지
        message: '이미지를 가져오는 중 에러가 발생했습니다',
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
    } else if (response.assets) {
      // 이미지가 제대로 들어오면
      const fileSize = response.assets[0].fileSize
      if (fileSize && fileSize >= 1048576) {
        showMessage({
          // 에러 안내 메세지
          message: '최대 1MB까지 업로드 가능합니다',
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

        return
      }
      let formData = new FormData()
      formData.append('profileImg', {
        uri: response.assets[0].uri,
        type: 'multipart/form-data',
        name: 'image.jpg',
      })
      uploadProfileImageQuery.mutate(formData) // s3에 이미지 저장
    }
  }, [])

  // ********************* renderer *********************
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
          {profileImage == undefined ? (
            <Pressable style={[styles.image, styles.selectImage]} onPress={onImageLibraryPress}>
              <NoUserSvg width={54} height={54} />
            </Pressable>
          ) : (
            <FastImage source={{uri: profileImage}} style={styles.image}></FastImage>
          )}

          <SelectImageIcon style={styles.cameraIcon} onPress={onImageLibraryPress} />
        </View>

        <Text style={theme.styles.label}>닉네임</Text>
        <TextInput style={theme.styles.input} placeholder={user.name} placeholderTextColor={theme.gray300} value={name} onChangeText={setName} />
        <Text style={[theme.styles.text14, {marginTop: 8, color: theme.gray500}]}>이번달 잔여 수정 가능 횟수 : {leftChangeNum}회</Text>
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
