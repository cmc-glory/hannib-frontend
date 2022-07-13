import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet, Animated, Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import {RightArrowWhiteIcon, HeartRedIcon, StarYellowIcon} from '../utils'
import RightArrowSvg from '../../assets/Icon/RightArrowGray700_20.svg'
import * as theme from '../../theme'

type BannerProps = {
  imageUri: string
  title: string
  nanumIdx: number
}

export const Banner = ({imageUri, title, nanumIdx}: BannerProps) => {
  const navigation = useNavigation()

  const onPressBanner = useCallback(async () => {
    imageUri == ''
      ? navigation.navigate('MyPageStackNavigator', {
          screen: 'CustomerService',
        })
      : undefined
  }, [])
  return imageUri == '' ? (
    <Pressable style={[styles.container, styles.bannerImage, {backgroundColor: theme.main50}]}>
      <View style={[styles.absolute, styles.textContainer]}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <Text style={[theme.styles.bold16, {color: theme.gray700, marginRight: 4}, theme.styles.text16]}>좋아하는 셀럽의</Text>
          <HeartRedIcon size={12} style={{marginTop: 4}} />
          <StarYellowIcon size={12} style={{marginTop: 4}} />
        </View>
        <View style={[theme.styles.rowSpaceBetween]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.bold16, {color: theme.main}, theme.styles.text16]}>생일·공연 홍보 배너</Text>
            <Text style={[theme.styles.bold16, {color: theme.gray700}, theme.styles.text16]}>를 걸어보세요</Text>
          </View>
          <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressBanner}>
            <Text style={{fontSize: 12, fontFamily: 'Pretendard-Medium', color: theme.gray700}}>배너 신청하기</Text>
            <RightArrowSvg />
          </Pressable>
        </View>
      </View>
    </Pressable>
  ) : (
    <Pressable style={styles.container} onPress={onPressBanner}>
      <FastImage source={{uri: imageUri}} style={styles.bannerImage}></FastImage>
      <View style={[styles.bannerOverlay, styles.absolute]}></View>
      <View style={[styles.absolute, styles.textContainer]}>
        <Text style={[theme.styles.bold16, {color: theme.white}]}>{title}</Text>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16, color: theme.white}]}>나눔 게시글 보기</Text>

          <RightArrowWhiteIcon size={20} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: theme.PADDING_SIZE,
  },

  bannerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bannerImage: {
    width: '100%',
    height: 84,
    resizeMode: 'cover',
  },
  container: {
    marginBottom: 6,
  },
})
