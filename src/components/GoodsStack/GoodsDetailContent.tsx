import React, {useCallback, useEffect} from 'react'
import {View, StyleSheet, Text, Animated, Pressable, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import {getStatusBarHeight} from 'react-native-status-bar-height'

import {Tag, ProductTag, StarFilledIcon} from '../utils'
import {NoticeBanner} from './NoticeBanner'
import {RelatedSharing} from './RelatedSharing'
import {GoodsContentDetail} from './GoodsContentDetail'
import {SharingTimeLocation} from './SharingTimeLocation'
import {WriterProfile} from './WriterProfile'
import {SharingGoodsInfo} from './SharingGoodsInfo'
import {useLayout} from '../../hooks'
import * as theme from '../../theme'

type ContentProps = {
  headerHeight: number
  scrollY: Animated.Value
  animatedBorder: Animated.AnimatedInterpolation
}

const window = Dimensions.get('window')

export function GoodsDetailContent({headerHeight, scrollY, animatedBorder}: ContentProps) {
  const navigation = useNavigation()
  const [layout, onLayout] = useLayout()

  return (
    <View style={styles.rootContainer}>
      <Animated.ScrollView
        onLayout={e => onLayout(e)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            marginTop: headerHeight - 72 - getStatusBarHeight(),
            minHeight: window.height + headerHeight,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: headerHeight - 72 - getStatusBarHeight(),
          },
        ]}
        scrollEventThrottle={1}
        scrollEnabled
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
        bounces={false}>
        <View style={styles.padding}>
          <View style={[theme.styles.rowFlexStart]}>
            <Tag label="나눔"></Tag>
            <Tag label="우편"></Tag>
          </View>
          <View style={[{marginVertical: 16}, theme.styles.rowSpaceBetween]}>
            <Text style={[styles.title]}>BTS 키링 나눔</Text>
            <View style={{alignItems: 'center'}}>
              <StarFilledIcon size={30} />
              <Text style={{color: theme.gray500, fontSize: 12, fontFamily: 'Pretendard-Medium'}}>456</Text>
            </View>
          </View>
          <Text style={[styles.date]}>2022.06.07</Text>
          <SharingGoodsInfo />
          <SharingTimeLocation />
        </View>
        <NoticeBanner />
        <GoodsContentDetail />
        <WriterProfile />

        <View style={[styles.padding]}>
          <RelatedSharing />
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  userName: {
    color: theme.gray800,
    fontFamily: 'Pretendard-SemiBold',
  },
  userImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 15,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followText: {
    color: theme.white,
  },

  date: {
    color: theme.gray700,
    fontFamily: 'Pretendard-Medium',
  },
  starText: {
    fontFamily: 'Pretendard-Medium',
    color: theme.gray500,
    marginTop: 5,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: theme.gray800,
  },

  rootContainer: {
    flex: 1,
    zIndex: 99,
  },
  container: {
    backgroundColor: 'white',
  },
  itemContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 25,
    color: '#FFD800',
  },
  padding: {padding: 20},
})