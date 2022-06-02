import React, {useCallback} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, Pressable} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {white, black} from '../theme/index'
import Dots from '../assets/icons/dots_filled.svg'

type ItemType = {
  item: {
    imageUri: string | null
    state: string
  }
}

const MyPageListItem = ({item}: ItemType) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {state} = item

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = item.imageUri ? item.imageUri : require('../assets/images/no-image.png')

  //카드 클릭시 페이지 이동?
  const onPressItem = useCallback(() => {
    console.log('onprogress card clicked')
  }, [])

  return (
    <Pressable onPress={onPressItem}>
      <ImageBackground style={[styles.container]} imageStyle={styles.image} source={imageUri}>
        <Text style={styles.text}>{state}</Text>
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
  writerDateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeView: {
    backgroundColor: black,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  typeText: {
    color: white,
    fontSize: 12,
    fontWeight: '600',
    // backgroundColor: black,
    // paddingHorizontal: 6,
    // paddingVertical: 3,
    // borderRadius: 2,
  },
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    marginRight: 12,
    width: 220,
    height: 122,
  },
  image: {
    width: 220,
    height: 122,
    borderRadius: 8,
    marginRight: 15,
  },
  text: {
    color: white,
    position: 'absolute',
    top: 13,
    left: 12,
    fontSize: 14,
    fontWeight: '700',
  },
  infoIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
})
