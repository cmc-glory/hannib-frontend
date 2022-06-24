import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import {RightArrowWhiteIcon} from '../utils'
import * as theme from '../../theme'

type BannerProps = {
  imageUri: string
  title: string
  sharingid: string
}

export const Banner = ({imageUri, title, sharingid}: BannerProps) => {
  const navigation = useNavigation()
  const onPressBanner = useCallback(() => {
    navigation.navigate('GoodsStackNavigator', {
      screen: 'GoodsDetail',
      params: {
        sharingid: sharingid,
      },
    })
  }, [])
  return (
    <Pressable style={styles.container} onPress={onPressBanner}>
      <FastImage source={{uri: imageUri}} style={styles.bannerImage}></FastImage>
      <View style={[styles.bannerOverlay, styles.absolute]}></View>
      <View style={[styles.absolute, styles.textContainer]}>
        <Text style={[theme.styles.bold16, {color: theme.white}]}>{title}</Text>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16, color: theme.white}]}>나눔 보러가기</Text>
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
    height: '100%',
  },
  container: {
    height: 84,
  },
})
