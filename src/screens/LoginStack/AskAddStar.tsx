import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, Animated, Pressable, Alert, Platform, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {launchImageLibrary} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import KeyboardManager from 'react-native-keyboard-manager'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {uploadCategoryImage, queryKeys, postCategory} from '../../api'
import {useToggle, useAnimatedValue, useMonitorAnimatedValue} from '../../hooks'
import {StackHeader, DownArrowIcon, PlusIcon, RemoveButtonIcon, NeccesaryField, RoundButton} from '../../components/utils'
import {ICategoryDto} from '../../types'
import * as theme from '../../theme'
import {CategoryDropdown} from '../../components/MainTab'

// ***************************** ios keyboard settings *****************************
if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true)
  KeyboardManager.setEnableDebugging(false)
  KeyboardManager.setKeyboardDistanceFromTextField(10)
  KeyboardManager.setLayoutIfNeededOnUpdate(true)
  KeyboardManager.setEnableAutoToolbar(false)
  KeyboardManager.setToolbarDoneBarButtonItemText('확인')
  KeyboardManager.setToolbarManageBehaviourBy('subviews') // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false)
  KeyboardManager.setToolbarTintColor('#007aff') // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF') // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true)
  KeyboardManager.setOverrideKeyboardAppearance(false)
  KeyboardManager.setKeyboardAppearance('default') // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true)
  KeyboardManager.setShouldPlayInputClicks(true)
  KeyboardManager.resignFirstResponder()
}

const IMAGE_SIZE = 64

// ******************** email Validation  ********************
function validateEmail(email: string) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (email.match(validRegex)) {
    return true
  } else {
    return false
  }
}

export const AskAddStar = () => {
  // ******************** react queries  ********************
  const uploadCategoryImageQuery = useMutation(queryKeys.categoryImage, uploadCategoryImage, {
    onSuccess(data, variables, context) {
      setImage(data)
    },
    onError(error, variables, context) {
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

  const postCategoryQuery = useMutation(queryKeys.category, postCategory, {
    onSuccess(data, variables, context) {
      console.log(data)
      navigation.navigate('AskAddStarComplete')
      //setImage(data)
    },
    onError(error, variables, context) {
      showMessage({
        // 에러 안내 메세지
        message: '문의하기 게시글 업로드 중 에러가 발생했습니다',
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

  // ******************** states  ********************
  const navigation = useNavigation()
  const [opend, toggleOpend] = useToggle(false) // 카테고리 select 토글
  const [mainCategory, setMainCategory] = useState<'가수' | '배우'>('가수') // 등록할 카테고리
  const [name, setName] = useState<string>('') // 이름 혹은 그룹명
  const [image, setImage] = useState<string>() // s3에서 받아온 공식 대표 이미지 url
  const [email, setEmail] = useState<string>('') // 연락 받을 이메일
  const [date, setDate] = useState<Date>(new Date())
  const [modalOpen, setModalOpen] = useState(false)

  // ******************** animations  ********************
  const animatedValue = useAnimatedValue(0.01)
  const open = Animated.timing(animatedValue, {
    // Select box 토글 애니메이션
    toValue: opend == true ? 0.01 : 1,
    duration: 200,
    useNativeDriver: false,
  })
  const animatedHeight = animatedValue.interpolate({
    // select box 높이
    inputRange: [0, 1],
    outputRange: [0, theme.INPUT_HEIGHT],
    extrapolate: 'clamp',
  })
  const animatedRotation = animatedValue.interpolate({
    // select arrow 회전 애니메이션
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  // ******************** callbacks  ********************
  const onPressOpen = useCallback(() => {
    // select box누르면 애니메이션 시작

    open.start(toggleOpend)
  }, [opend])

  const onPressCategory = useCallback(() => {
    // 카테고리 선택하면, set하고 닫음
    open.start(toggleOpend)
    setMainCategory(mainCategory => (mainCategory == '가수' ? '배우' : '가수'))
  }, [opend])

  // 선택한 이미지 삭제
  const onPressRemoveImage = useCallback(() => {
    setImage(undefined)
  }, [])

  const real = useMonitorAnimatedValue(animatedValue)
  console.log(real)

  const onPressSubmit = useCallback(() => {
    if (email != '' && !validateEmail(email)) {
      Alert.alert('이메일을 확인해주세요', '', [
        {
          text: '확인',
        },
      ])
      return
    }

    const cateogoryDto: ICategoryDto = {
      job: mainCategory,
      nickName: name,
      birth: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      imgUrl: image,
      email: email,
    }
    postCategoryQuery.mutate(cateogoryDto)
  }, [mainCategory, name, image, email, date])

  // 라이브러리에서 이미지 선택했을 때 호출되는 callback
  const onImageLibraryPress = useCallback(async () => {
    const response = await launchImageLibrary({selectionLimit: 1, mediaType: 'photo', includeBase64: false})
    if (response.didCancel) {
      console.log('User cancelled image picker')
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
      const fileSize = response.assets[0].fileSize
      if (fileSize && fileSize >= 10000000) {
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
      formData.append('categoryImg', {
        uri: response.assets[0].uri,
        type: 'multipart/form-data',
        name: 'image.jpg',
      })
      uploadCategoryImageQuery.mutate(formData) // s3에 이미지 저장
    }
  }, [])

  // 필수 항목 전부 채웠는지 확인
  const checkEnabled = useCallback(() => {
    if (name == '') {
      return false
    } else {
      return true
    }
  }, [name, email])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="문의하기" goBack />
      <View style={{padding: theme.PADDING_SIZE, flex: 1}}>
        <View style={styles.spacing}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>등록할 카테고리</Text>
            <NeccesaryField />
          </View>
          <Pressable
            onPress={onPressOpen}
            style={[
              styles.input,
              theme.styles.rowSpaceBetween,
              {height: theme.INPUT_HEIGHT},
              styles.borderTopRadius,
              opend == false && styles.borderBottomRadius,
            ]}>
            <Text style={{marginLeft: 16}}>{mainCategory}</Text>
            <Animated.View style={{transform: [{rotate: animatedRotation}], marginRight: 16}}>
              <DownArrowIcon />
            </Animated.View>
          </Pressable>
          <Pressable onPress={onPressCategory}>
            <Animated.View
              style={[
                theme.styles.rowSpaceBetween,
                styles.input,
                {
                  marginTop: -1,
                  height: animatedHeight,
                  borderWidth: animatedValue,
                },
                styles.borderBottomRadius,
              ]}>
              <Text style={{marginLeft: 16}}>{mainCategory == '가수' ? '배우' : '가수'}</Text>
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.spacing}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>이름 혹은 그룹명</Text>
            <NeccesaryField />
          </View>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="이름 혹은 공식 그룹명을 입력해주세요."
            placeholderTextColor={theme.gray300}
            style={[theme.styles.input]}
          />
        </View>
        <View style={styles.spacing}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>생년월일</Text>
            <NeccesaryField />
          </View>

          <DatePicker
            modal
            open={modalOpen}
            date={date}
            mode={'date'}
            onConfirm={date => {
              setModalOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setModalOpen(false)
            }}
          />
          <Pressable onPress={() => setModalOpen(true)}>
            <TextInput
              onPressIn={() => setModalOpen(true)}
              editable={false}
              value={moment(date).format('YYYY년 MM월 DD일')}
              placeholder="동명이인 구분을 위해 생년월일을 입력해 주세요."
              placeholderTextColor={theme.gray300}
              style={[theme.styles.input]}
            />
            <DownArrowIcon style={{position: 'absolute', right: 16, top: 12}} />
          </Pressable>
        </View>
        <View style={[styles.spacing]}>
          <Text style={[theme.styles.label]}>공식 대표 이미지</Text>
          <View style={[theme.styles.rowFlexStart]}>
            <Pressable onPress={onImageLibraryPress}>
              <View style={[styles.addImage]}>
                <PlusIcon onPress={onImageLibraryPress} />
              </View>
            </Pressable>
            {image !== undefined && (
              <View>
                <RemoveButtonIcon style={[styles.removeButton]} onPress={onPressRemoveImage} />
                <FastImage source={{uri: image}} style={styles.image} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.spacing}>
          <Text style={[theme.styles.label]}>연락 받을 이메일</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="문의 결과를 전달받을 이메일을 입력해주세요."
            placeholderTextColor={theme.gray300}
            style={[theme.styles.input]}
          />
        </View>
        <RoundButton label="카테고리 문의하기" enabled={postCategoryQuery.isLoading == false && checkEnabled()} onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  removeButton: {
    position: 'absolute',
    zIndex: 1,
    right: -8,
    top: -8,
  },
  input: {
    borderColor: theme.gray300,
    borderWidth: 1,
  },
  borderTopRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  borderBottomRadius: {
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    //borderBottomRightRadius: 40,
  },
  spacing: {
    marginBottom: 24,
  },
  addImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
  },
})
