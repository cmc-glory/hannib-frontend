import React, {useState, useMemo, useCallback, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper'
import {useQueryClient} from 'react-query'
import {StackActions} from '@react-navigation/native'

import {WriteNanumFormCompleteRouteProps} from '../../navigation/WriteNanumFormStackNavigator'
import {StackHeader, CompleteIcon, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

export const WriteNanumFormComplete = () => {
  const navigation = useNavigation()
  const route = useRoute<WriteNanumFormCompleteRouteProps>()
  const nanumIdx = route.params.nanumIdx
  const queryClient = useQueryClient()
  const popAction = StackActions.pop(2)

  const [height, setHeight] = useState<number>(0)
  const MARGIN_TOP = useMemo(() => {
    const status = getStatusBarHeight()
    if (isIphoneX()) {
      return (Dimensions.get('window').height - status - getBottomSpace() - height) / 2 - 56
    } else {
      return (Dimensions.get('window').height - status - height) / 2 - 56
    }
  }, [height])

  const onPressButton = useCallback(() => {
    navigation.navigate('NanumList')
    navigation.navigate('GoodsStackNavigator', {
      screen: 'NanumDetail',
      params: {
        nanumIdx: nanumIdx,
      },
    })
    queryClient.invalidateQueries('nanumListRecent')
    queryClient.invalidateQueries('nanumListPopular')
  }, [])

  const goBackToNanumList = () => {
    queryClient.invalidateQueries('nanumListRecent')
    queryClient.invalidateQueries('nanumListPopular')
    navigation.navigate('NanumList')
  }

  //신청하기 완료 화면에서 뒤로가기 버튼 클릭 시 신청폼으로 다시 이동 못하게
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault()
      goBackToNanumList()
    })
  }, [navigation])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack customGoBack={goBackToNanumList} />
      <View>
        <View
          style={[styles.container, {top: MARGIN_TOP}]}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}>
          <CompleteIcon />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>모집폼 등록 완료</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>모집글 등록이 완료됐습니다.</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>모집글이 잘 등록 됐는지 확인해보세요!</Text>
          </View>
          <RoundButton label="등록한 게시글로 이동" style={{alignSelf: 'stretch'}} enabled onPress={onPressButton} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  image: {
    width: 53,
    height: 53,
  },
})
