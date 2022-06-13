import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, Pressable, Image, StyleSheet, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import * as theme from '../../theme'
import type {ISharingInfo} from '../../types'
import {Tag} from '../utils'

const {width} = Dimensions.get('window')

var IMAGE_SIZE = (width - theme.PADDING_SIZE * 3) / 2

export const GoodsListItemVer2 = ({item}: {item: ISharingInfo}) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {type, title, writer, uri} = item
  const now = moment()
  const openDate = moment(item.openDate)

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = uri ? uri : 'http://localhost:8081/src/assets/images/no-image.jpeg'
  const navigation = useNavigation()

  const [isBefore, setIsBefore] = useState(false)
  useEffect(() => {
    setIsBefore(now < openDate ? true : false)
  }, [])

  useEffect(() => {
    console.log(isBefore)
  }, [isBefore])

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    navigation.navigate('GoodsStackNavigator')
  }, [])

  return (
    <Pressable onPress={onPressItem} style={[styles.container]}>
      {isBefore && (
        <View style={styles.overlay}>
          <Text style={[styles.overlayText, {marginBottom: 2.5}]}>{openDate.format('YY/MM/DD HH:MM')}</Text>
          <Text style={styles.overlayText}>오픈 예정</Text>
        </View>
      )}
      <View style={{width: IMAGE_SIZE}}>
        <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
          <FontAwesome5Icon name="star" size={18} color={theme.gray500} />
        </View>
        <FastImage style={[styles.image, {width: IMAGE_SIZE, height: IMAGE_SIZE}]} source={{uri: imageUri}}></FastImage>
      </View>
      <View style={{marginTop: 10}}>
        <Tag label="우편" />
        <Text style={[styles.title, {width: IMAGE_SIZE}]}>{title}</Text>
        <Text style={[styles.writerName]}>{writer}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  overlayText: {
    color: theme.white,
    fontFamily: 'Pretendard-SemiBold',
  },
  overlay: {
    position: 'absolute',
    zIndex: 1,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: 'rgba(32,32,33,0.66)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  writerName: {
    color: theme.gray500,
    fontFamily: 'Pretendard-Medium',
    marginTop: 2.5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    width: IMAGE_SIZE,
  },
  image: {
    borderRadius: 8,
  },
  imageHeader: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginTop: 5,
    color: theme.gray800,
  },
})
