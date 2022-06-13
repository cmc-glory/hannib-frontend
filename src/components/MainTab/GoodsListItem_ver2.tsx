import React, {useCallback, useMemo} from 'react'
import {View, Text, Pressable, Image, StyleSheet, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import {white, black, main, gray500} from '../../theme'
import type {IListItem} from '../../types'

const {width} = Dimensions.get('window')
const padding = 15
const margin = 10
var IMAGE_SIZE

export const GoodsListItemVer2 = ({item}: IListItem) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {type, description, writer, openDate} = item

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = item.imageUri ? {uri: item.imageUri} : require('../../assets/images/no-image.jpeg')
  const navigation = useNavigation()

  IMAGE_SIZE = useMemo(() => {
    return width / 2 - padding - margin
  }, [])

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    navigation.navigate('GoodsStackNavigator')
  }, [])

  return (
    <Pressable onPress={onPressItem} style={[styles.container, {width: IMAGE_SIZE}]}>
      <View style={{width: IMAGE_SIZE}}>
        <View style={[styles.imageHeader, {width: IMAGE_SIZE}]}>
          <View style={styles.tagButton}>
            <Text style={styles.tagText}>우편</Text>
          </View>
          <FontAwesome5Icon name="star" size={16} color={black}></FontAwesome5Icon>
        </View>
        <Image style={[styles.image, {width: IMAGE_SIZE, height: IMAGE_SIZE}]} source={imageUri}></Image>
      </View>
      <Text style={[styles.title, {width: IMAGE_SIZE}]}>Lorem ipsum dolor sit amet, consectetur Lore</Text>
      <Text style={[styles.writerName]}>작가 이름</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  writerName: {
    color: gray500,
    fontFamily: 'Pretendard-Medium',
    marginTop: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: white,
    marginLeft: 10,
    fontFamily: 'Pretendard-Medium',
  },
  userImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  imageFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 50,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,

    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagButton: {
    backgroundColor: main,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 3,
  },
  tagText: {
    color: white,
    fontSize: 13,
  },
  container: {
    marginBottom: 20,
  },
  image: {
    borderRadius: 24,
  },
  imageHeader: {
    position: 'absolute',
    top: 15,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginTop: 10,
    color: black,
  },
})
