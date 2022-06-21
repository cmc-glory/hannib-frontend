import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import type {Asset} from 'react-native-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import * as theme from '../../theme'
import {PlusIcon} from '../utils'

const IMAGE_SIZE = 64
const BORDER_SIZE = IMAGE_SIZE / 2

type ImagePickerProps = {
  images: Asset[]
  setImages: React.Dispatch<React.SetStateAction<Asset[]>>
}

type ImageModalProps = {
  isVisible: boolean
  onClose: () => void
  onImageLibraryPress: () => void
  onCameraPress: () => void
}

export const ImagePreview = ({uri}: {uri: string | undefined}) => {
  return <FastImage source={{uri: uri}} style={styles.image}></FastImage>
}

export const ImagePicker = ({images, setImages}: ImagePickerProps) => {
  React.useEffect(() => {
    console.log('images : ', images)
  }, [images])

  const onImageLibraryPress = useCallback(async () => {
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

  return (
    <View style={[styles.contianer]}>
      <Text style={[theme.styles.label]}>대표 이미지 등록</Text>
      <View style={[styles.imageContainer]}>
        {images?.map(image => (
          <ImagePreview key={image.uri} uri={image.uri} />
        ))}
        <Pressable onPress={onImageLibraryPress}>
          <View style={[styles.addImage, {marginBottom: 8}]}>
            <PlusIcon />
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  contianer: {
    marginBottom: 16,
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 5,
    marginBottom: 8,
    marginRight: 8,
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
