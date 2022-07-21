import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet, Platform, ActionSheetIOS, TouchableOpacity, Linking, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {launchImageLibrary} from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import Modal from 'react-native-modal'

import {SetProfileRouteProps} from '../../navigation/LoginStackNavigator'
import {StackHeader, SelectImageIcon, FloatingBottomButton, CheckboxIcon, DownArrowIcon, RightArrowIcon} from '../../components/utils'
import NoUserSvg from '../../assets/Icon/noUser.svg'
import * as theme from '../../theme'
import {queryKeys, uploadProfileImage, checkNicknameDuplicated} from '../../api'
import {gray700, PADDING_SIZE} from '../../theme'

const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/
const WIDTH = Dimensions.get('window').width

export const SetProfile = () => {
  // ****************** utils  ******************
  const navigation = useNavigation()
  const route = useRoute<SetProfileRouteProps>()

  const [essentialSelected, setEssentialSelected] = useState<boolean>(false)
  const [optionalSelected, setOptionalSelected] = useState<boolean>(false)

  // ****************** react queris  ******************
  const uploadImageQuery = useMutation(queryKeys.nanumImage, uploadProfileImage, {
    onSuccess(data) {
      console.log('Image upload to s3 completed successfully')
      setImage(data) // 이미지 저장 성공하면 s3 url을 images 배열에 저장
    },
    onError(error) {
      showMessage({
        // 에러 안내 메세지
        message: '이미지 업로드 중 에러가 발생했습니다',
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
      console.log(error)
    },
  })

  const checkNicknameDuplicatedQuery = useMutation(queryKeys.nicknameDuplicated, checkNicknameDuplicated, {
    onSuccess(data, variables, context) {
      // 같은 닉네임을 찾지 못해서 응답이 blank이면
      if (data == '') {
        // 카테고리 선택 창으로 이동
        navigation.navigate('SelectCategory', {email: route.params.email, name, profileImage: image})
      }
      // 같은 닉네임이 있으면
      else {
        setDuplicated(true)
      }
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '닉네임 중복 확인 중 에러가 발생했습니다',
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
      console.log(error)
    },
  })

  // ****************** states  ******************

  const [name, setName] = useState<string>('') // 사용자가 입력한 닉네임.
  const [image, setImage] = useState<string>('')
  const [duplicated, setDuplicated] = useState<boolean>(false) // 이메일 중복 여부
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 이미지 상관 없이 닉네임이 null이 아닐 때만
  const checkButtonEnabled = useCallback(
    (name: string) => {
      return name != '' && essentialSelected == true ? true : false
    },
    [essentialSelected],
  )

  const onPressNext = useCallback(() => {
    // 닉네임 길이 validation
    if (name.length > 10 || name.length < 2) {
      showMessage({
        // 에러 안내 메세지
        message: '닉네임을 2~10자 사이로 입력해주세요.',
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
        position: 'center',
      })
      return
    }

    // 한글, 영어, 숫자, 공백 제외 validation
    if (regex.test(name) == false) {
      showMessage({
        // 에러 안내 메세지
        message: '공백 제외 한글, 영문, 숫자만 입력 가능합니다.',
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
        position: 'center',
      })
      return
    }

    // 중복 닉네임 판별
    checkNicknameDuplicatedQuery.mutate(name)
  }, [name, image])

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
      if (fileSize && fileSize >= 10485760) {
        showMessage({
          // 에러 안내 메세지
          message: '최대 10MB까지 업로드 가능합니다',
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
      uploadImageQuery.mutate(formData) // s3에 이미지 저장
    }
  }, [])

  const onPressImage = useCallback(() => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['취소', '앨범에서 선택', '기본 이미지로 변경'],
          cancelButtonIndex: 0,
          userInterfaceStyle: 'light',
          title: '프로필 사진 변경',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            onImageLibraryPress()
          } else if (buttonIndex === 2) {
            setImage('')
          }
        },
      )
    } else {
      setModalVisible(true)
    }
  }, [])

  // const onPressCheckbox = useCallback(() => {
  //   // 선택된 상태면 제거
  //   if (selected) {
  //     const temp = requestForm.product.filter(productItem => productItem.productid != item.goodsIdx)
  //     setRequestForm({...requestForm, product: temp})
  //   } else {
  //     const temp = requestForm.product.concat({productid: item.goodsIdx})
  //     setRequestForm({...requestForm, product: temp})
  //   }
  // }, [optionalSelected, essentialSelected])

  const clickOpenEssential = useCallback(() => {
    console.log('open')
    Linking.openURL('https://nutritious-silk-3f4.notion.site/0e1bdcc9b30d4907806f374b52fe2823')
  }, [])

  const clickOpenOptional = useCallback(() => {
    console.log('open')
    Linking.openURL('https://nutritious-silk-3f4.notion.site/eca2ade0702b46e884bfb9cf75fa3061')
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader goBack title="프로필 설정" />
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          {image == '' ? (
            <Pressable style={[styles.image, styles.selectImage]} onPress={onPressImage}>
              <NoUserSvg width={54} height={54} />
              <ActivityIndicator animating={uploadImageQuery.isLoading} style={{position: 'absolute'}} />
            </Pressable>
          ) : (
            <Pressable onPress={onPressImage}>
              <FastImage
                source={{uri: image}}
                style={styles.image}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => {
                  setIsLoading(false)
                }}>
                <ActivityIndicator animating={uploadImageQuery.isLoading || isLoading == true} />
              </FastImage>
            </Pressable>
          )}
          <SelectImageIcon style={styles.cameraIcon} onPress={onPressImage} />
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
        <View style={{marginTop: 32}}>
          <Text style={{fontWeight: '700', fontSize: 16}}>이용약관 동의</Text>

          <View style={[theme.styles.rowFlexStart, {marginTop: 16}]}>
            {essentialSelected ? (
              <CheckboxIcon onPress={() => setEssentialSelected(false)} style={{marginRight: 8}} />
            ) : (
              <TouchableOpacity onPress={() => setEssentialSelected(true)} style={styles.checkbox} />
            )}

            <Pressable style={[theme.styles.rowSpaceBetween, {width: WIDTH - theme.PADDING_SIZE * 2 - 24}]} onPress={clickOpenEssential}>
              <Text style={{color: gray700, fontSize: 16}}>(필수) 서비스 이용약관 </Text>
              <RightArrowIcon onPress={clickOpenEssential} />
            </Pressable>
          </View>

          <View style={[theme.styles.rowFlexStart, {marginTop: 16}]}>
            {optionalSelected ? (
              <CheckboxIcon onPress={() => setOptionalSelected(false)} style={{marginRight: 8}} />
            ) : (
              <TouchableOpacity onPress={() => setOptionalSelected(true)} style={styles.checkbox} />
            )}

            <Pressable style={[theme.styles.rowSpaceBetween, {width: WIDTH - theme.PADDING_SIZE * 2 - 24}]} onPress={clickOpenOptional}>
              <Text style={{color: gray700, fontSize: 16}}>(선택) 마켓팅 수신 동의</Text>
              <RightArrowIcon onPress={clickOpenOptional} />
            </Pressable>
          </View>
        </View>
      </View>

      <FloatingBottomButton label="다음" enabled={checkButtonEnabled(name)} onPress={onPressNext} />
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} backdropOpacity={0.1} style={{margin: '10%'}}>
        <View style={styles.modalView}>
          <Pressable style={[styles.modalButton, {marginBottom: 20}]}>
            <Text style={[styles.modalTitle]}>프로필 사진 변경</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, {marginBottom: 20}]}
            onPress={() => {
              setModalVisible(false)
              onImageLibraryPress()
            }}>
            <Text style={[styles.modalText]}>갤러리에서 선택</Text>
          </Pressable>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(false)
              setImage('')
            }}>
            <Text style={styles.modalText}>기본 이미지로 변경</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalTitle: {
    color: theme.gray700,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  modalText: {
    color: theme.gray700,
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalView: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: 20,
  },
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
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.gray300,
    marginRight: 8,
  },
})
