import React, {useState, useMemo, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper'
import {useQueryClient} from 'react-query'
import NotExistsSvg from '../../assets/Icon/NotExists.svg'

import {queryKeys} from '../../api'
import {GoodsRequestErrorRouteProps} from '../../navigation/GoodsStackNavigator'
import {StackHeader, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

export const GoodsRequestError = () => {
  const navigation = useNavigation()
  const route = useRoute<GoodsRequestErrorRouteProps>()
  const queryClient = useQueryClient()
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
    queryClient.invalidateQueries([queryKeys.nanumRequestRequiredInfo, route.params.nanumIdx])
    navigation.goBack()
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />

      <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
        <View
          style={[styles.container, {top: MARGIN_TOP}]}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}>
          <NotExistsSvg />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>신청 실패</Text>
            <Text style={[{color: theme.gray700, fontSize: 16}, theme.styles.text16]}>선착순 마감으로 인해 신청을 실패하셨습니다.</Text>
            <Text style={[{color: theme.gray700, fontSize: 16}, theme.styles.text16]}>다른 제품을 신청해보시겠습니까?</Text>
          </View>
          <RoundButton label="잔여수량 확인하기" style={{alignSelf: 'stretch'}} enabled onPress={onPressButton} />
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
