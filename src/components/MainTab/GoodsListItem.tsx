import React, {useCallback} from 'react'
import {View, Text, Pressable, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import {white, black, main} from '../../theme'
import type {IListItem} from '../../types'

export const GoodsListItem = ({item}: IListItem) => {
  // 나눔 게시글 아이템 구조분해 할당
  const {type, description, writer, openDate} = item

  // 이미지가 존재하면 이미지의 uri로, 없으면 기본 이미지로
  const imageUri = item.imageUri ? {uri: item.imageUri} : require('../../assets/images/no-image.jpeg')
  const navigation = useNavigation()

  // 상세 페이지로 이동
  const onPressItem = useCallback(() => {
    navigation.navigate('GoodsStackNavigator')
  }, [])

  return (
    <Pressable onPress={onPressItem} style={styles.container}>
      <View>
        <View style={styles.imageHeader}>
          <View style={styles.tagButton}>
            <Text style={styles.tagText}>우편</Text>
          </View>
          <FontAwesome5Icon name="star" size={16} color={black}></FontAwesome5Icon>
        </View>
        <Image style={styles.image} source={imageUri}></Image>
        <View style={styles.imageFooter}>
          <View style={styles.flexRow}>
            <Image source={require('../../assets/images/no_user.jpeg')} style={styles.userImage}></Image>
            <Text style={styles.footerText}>작가 이름</Text>
          </View>
          <View>
            <Text style={styles.footerText}>22/05/24 22:00 Open</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Lorem ipsum dolor sit amet, consectetur Lore</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: black,
    height: 50,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    opacity: 0.6,
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
    marginVertical: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 24,
  },
  imageHeader: {
    position: 'absolute',
    top: 15,
    zIndex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginTop: 10,
  },
})
