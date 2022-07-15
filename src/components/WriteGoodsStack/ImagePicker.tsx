import React, {useState, useCallback} from 'react'
import {View, Text, Pressable, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import FastImage from 'react-native-fast-image'
import type {Asset} from 'react-native-image-picker'
import {launchImageLibrary} from 'react-native-image-picker'
import {showMessage} from 'react-native-flash-message'
import * as theme from '../../theme'
import {PlusIcon, RemoveButtonIcon, NeccesaryField} from '../utils'
import {useMutation} from 'react-query'
import {queryKeys, uploadNanumImage} from '../../api'

const IMAGE_SIZE = 64

type ImagePickerProps = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export const ImagePreview = ({uri, onPressRemove}: {uri: string | undefined; onPressRemove: (filename: string | undefined) => void}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <View>
      <RemoveButtonIcon style={[styles.removeButton]} size={22} onPress={() => onPressRemove(uri)} />

      <FastImage
        source={{uri: uri}}
        style={styles.imageWrapper}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => {
          setIsLoading(false)
        }}>
        <ActivityIndicator animating={isLoading} />
      </FastImage>
    </View>
  )
}

export const ImagePicker = ({images, setImages}: ImagePickerProps) => {
  // ******************** react query ********************
  const uploadImageQuery = useMutation(queryKeys.nanumImage, uploadNanumImage, {
    onSuccess(data) {
      setImages(images => [...images, data]) // 이미지 저장 성공하면 s3 url을 images 배열에 저장
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

  // ******************** callbacks ********************
  const onImageLibraryPress = useCallback(async () => {
    if (images.length == 5) {
      // 사진을 5개 넘개 선택한 경우 alert 안내
      Alert.alert('사진은 최대 5개 선택 가능합니다.', '', [
        {
          text: '확인',
          style: 'default',
        },
      ])
      return
    }

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
      formData.append('nanumImg', {
        uri: response.assets[0].uri,
        type: 'multipart/form-data',
        name: 'image.jpg',
      })
      uploadImageQuery.mutate(formData) // s3에 이미지 저장
    }
  }, [images])

  const onPressRemove = useCallback(
    (uri: string | undefined) => {
      if (uri == undefined) {
        return
      }
      setImages(images.filter(item => item != uri))
    },
    [images],
  )

  return (
    <View style={[styles.contianer]}>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={[theme.styles.label]}>대표 이미지 등록 (최대 5개)</Text>
        <NeccesaryField />
      </View>

      <View style={[styles.imageContainer]}>
        <Pressable onPress={onImageLibraryPress}>
          <View style={[styles.addImage, {marginBottom: 8}]}>
            <PlusIcon onPress={onImageLibraryPress} />
          </View>
        </Pressable>
        {images?.map(image => (
          <ImagePreview key={image} uri={image} onPressRemove={onPressRemove} />
        ))}
        {uploadImageQuery.isLoading == true && (
          <View style={[styles.imageWrapper, {backgroundColor: theme.gray50, justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  removeButton: {
    position: 'absolute',
    zIndex: 1,
    right: 6.5,
    top: -11,
  },
  contianer: {
    marginBottom: 16,
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    marginBottom: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: theme.gray300,
    backgroundColor: theme.gray50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  addImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modal: {
    backgroundColor: theme.white,
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',

    margin: '40%',
    borderRadius: 8,
  },
  buttonView: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.black,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.black,
  },
})
