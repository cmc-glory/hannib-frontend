import React, {useCallback, useEffect} from 'react'
import {View, StyleSheet, Text, Animated, Pressable, Dimensions} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import {getStatusBarHeight} from 'react-native-status-bar-height'

import {Tag, ProductTag} from '../utils'
import {NoticeBanner} from './NoticeBanner'
import {RelatedSharing} from './RelatedSharing'
import {FloatingBottomButton} from '../utils/FloatingBottomButton'
import {useLayout} from '../../hooks'
import {main, gray800, gray500, gray700, secondary, styles as s, white} from '../../theme'

const window = Dimensions.get('window')

export function Content(props: any) {
  const {headerHeight} = props
  const navigation = useNavigation()
  const [layout, onLayout] = useLayout()
  const onPressRequest = useCallback(() => {
    navigation.navigate('GoodsRequest')
  }, [])

  // useEffect(() => {
  //   console.log('scrollY:', props.scrollY)
  // }, [props.scrollY])

  useEffect(() => {
    console.log('scrollViewLayout:', layout)
  }, [layout])

  return (
    <View style={styles.rootContainer}>
      <Animated.ScrollView
        onLayout={e => onLayout(e)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, {marginTop: headerHeight - 72 - getStatusBarHeight(), minHeight: window.height + headerHeight}]}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: props.scrollY}}}], {useNativeDriver: true})}
        bounces={false}>
        <View style={styles.padding}>
          <View style={styles.tagContainer}>
            <Tag label="나눔"></Tag>
            <Tag label="우편"></Tag>
          </View>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}]}>
            <Text style={[styles.title]}>Lorem ipsum dolor sit amet, consectetur</Text>
            <View>
              <Pressable>
                <FontAwesome5Icon name="star" size={24} color={'#FFD84D'} solid></FontAwesome5Icon>
                <Text style={[styles.starText]}>456</Text>
              </Pressable>
            </View>
          </View>
          <Text style={[styles.date]}>2022.06.07</Text>
          <View style={[{marginTop: 15}]}>
            <View style={[styles.tagContainer, {marginBottom: 10}]}>
              <ProductTag label="BTS 진 컨셉의 하트 키링" />
              <Text style={[styles.quantityText]}>30개</Text>
            </View>
            <View style={[styles.tagContainer, {marginBottom: 10}]}>
              <ProductTag label="BTS 지민 컨셉의 스페이드 키링" />
              <Text style={[styles.quantityText]}>30개</Text>
            </View>
            <View style={[styles.tagContainer, {marginBottom: 10}]}>
              <ProductTag label="BTS 뷔 컨셉의 클로버 키링" />
              <Text style={[styles.quantityText]}>30개</Text>
            </View>
          </View>
        </View>
        <NoticeBanner />
        <View style={[styles.followContainer, styles.padding]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage source={require('../../assets/images/no_user.jpeg')} style={[styles.userImage]}></FastImage>
            <Text style={styles.userName}>춤추는 고양이</Text>
          </View>
          <Pressable style={[s.button, styles.followButton]}>
            <Text style={styles.followText}>팔로우</Text>
          </Pressable>
        </View>
        <View style={[styles.padding]}>
          <RelatedSharing />
        </View>
      </Animated.ScrollView>
      <FloatingBottomButton label="신청하기" onPress={onPressRequest} enabled />
    </View>
  )
}

const styles = StyleSheet.create({
  userName: {
    color: gray800,
    fontFamily: 'Pretendard-SemiBold',
  },
  userImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 15,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  followText: {
    color: white,
  },
  followContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Pretendard-Medium',
    color: gray800,
    marginRight: 15,
  },
  date: {
    color: gray700,
  },
  starText: {
    fontFamily: 'Pretendard-Medium',
    color: gray500,
    marginTop: 5,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: gray800,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rootContainer: {
    flex: 1,
    zIndex: 99,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
