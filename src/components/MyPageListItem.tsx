import React, {useCallback, useMemo} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Pressable, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {white, black, main} from '../theme/index'
import Dots from '../assets/icons/dots_filled.svg'

type ItemType = {
  item: {
    imageUri: string | null
    state: string
  }
}
const {width} = Dimensions.get('window')
const padding = 15
const margin = 10
var IMAGE_SIZE

const MyPageListItem = ({item}: ItemType) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {state} = item
  IMAGE_SIZE = useMemo(() => {
    return width / 2 - padding - margin
  }, [])

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = item.imageUri ? item.imageUri : require('../assets/images/no-image.png')

  //카드 클릭시 페이지 이동?
  const onPressItem = useCallback(() => {
    console.log('onprogress card clicked')
  }, [])

  return (
    <Pressable onPress={onPressItem}>
      <ImageBackground style={[styles.container, {width: IMAGE_SIZE, height: IMAGE_SIZE}]} imageStyle={styles.image} source={imageUri}>
        <View style={styles.stateContainer}>
          <Text style={styles.text}>{state}</Text>
        </View>

        <TouchableOpacity style={styles.infoIcon}>
          <Dots color="#fff" />
        </TouchableOpacity>
      </ImageBackground>
    </Pressable>
  )
}

export default MyPageListItem

const styles = StyleSheet.create({
  black: {
    color: black,
  },
  descriptionText: {
    fontWeight: '500',
  },
  container: {
    marginVertical: 15,
    marginRight: 12,
  },
  image: {
    borderRadius: 8,
  },
  stateContainer: {
    backgroundColor: main,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 13,
    left: 12,
  },
  text: {
    color: white,
    fontSize: 12,
    fontWeight: '400',
  },
  infoIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
})
