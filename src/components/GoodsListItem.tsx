import React, {useCallback} from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import moment from 'moment'
import {white, black} from '../theme'
import type {IListItem} from '../types'

const ListItem = ({item}: IListItem) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {type, description, writer, openDate} = item

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = item.imageUri ? {uri: item.imageUri} : require('../assets/images/no-image.png')
  const navigation = useNavigation()

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    navigation.navigate('GoodsStackNavigator')
  }, [])

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={[styles.container]}>
        <Image style={[styles.image]} source={imageUri} />

        <View style={{flex: 1, justifyContent: 'space-between', paddingVertical: 5}}>
          <View style={[styles.typeView]}>
            <Text style={[styles.typeText]}>{type}</Text>
          </View>
          <View>
            <Text style={[styles.descriptionText, styles.black]}>{description}</Text>
          </View>

          <View style={[styles.writerDateView]}>
            <Text style={[styles.black]}>{writer}</Text>
            <Text style={[styles.black]}>{moment(openDate).format('YYYY-MM-DD')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

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
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
})
