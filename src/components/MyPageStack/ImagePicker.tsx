import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import type {Asset} from 'react-native-image-picker'
import {launchImageLibrary} from 'react-native-image-picker'
import * as theme from '../../theme'
import {PlusIcon, RemoveButtonIcon} from '../utils'

const IMAGE_SIZE = 64
const BORDER_SIZE = IMAGE_SIZE / 2

type ImagePickerProps = {
  images: Asset[]
  setImages: React.Dispatch<React.SetStateAction<Asset[]>>
  necessary?: boolean
}

export const ImagePreview = ({
  uri,
  fileName,
  onPressRemove,
}: {
  fileName: string | undefined
  uri: string | undefined
  onPressRemove: (filename: string | undefined) => void
}) => {
  return (
    <View>
      <RemoveButtonIcon style={[styles.removeButton]} size={22} onPress={() => onPressRemove(fileName)} />
      <FastImage source={{uri: uri}} style={styles.image}></FastImage>
    </View>
  )
}
export const ImagePicker = ({images, setImages, necessary = true}: ImagePickerProps) => {
  React.useEffect(() => {
    console.log('images : ', images)
  }, [images])

  const onImageLibraryPress = useCallback(async () => {
    if (images.length == 5) {
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
      console.log('User cancelled image picker')
    } else if (response.errorCode) {
      console.log('errorCode : ', response.errorCode)
    } else if (response.errorMessage) {
      console.log('errorMessage', response.errorMessage)
    } else if (response.assets) {
      setImages([...images, response?.assets[0]])
    }
  }, [images])

  const onPressRemove = useCallback(
    (filename: string | undefined) => {
      if (filename == undefined) {
        return
      }
      setImages(images.filter(images => images.fileName != filename))
    },
    [images],
  )

  return (
    <View style={[styles.contianer]}>
      <Text style={[theme.styles.label]}>대표 이미지 등록</Text>
      <View style={[styles.imageContainer]}>
        <Pressable onPress={onImageLibraryPress}>
          <View style={[styles.addImage, {marginBottom: 8}]}>
            <PlusIcon onPress={onImageLibraryPress} />
          </View>
        </Pressable>
        {images?.map(image => (
          <ImagePreview key={image.uri} uri={image.uri} fileName={image.fileName} onPressRemove={onPressRemove} />
        ))}
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

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    marginBottom: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: theme.gray300,
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
