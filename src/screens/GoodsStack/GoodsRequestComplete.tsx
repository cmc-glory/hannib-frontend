import React, {useState, useMemo, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper'
import {useQueryClient} from 'react-query'
import {useAppSelector} from '../../hooks'

import {StackHeader, CompleteIcon, RoundButton} from '../../components/utils'
import * as theme from '../../theme'
import {queryKeys} from '../../api'

export const GoodsRequestComplete = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)

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
    queryClient.invalidateQueries([queryKeys.appliedNanumList, accountIdx])
    navigation.navigate('NanumList')
    navigation.navigate('MyPageTabStackNavigator', {
      screen: 'ParticipatingSharingList',
    })
  }, [accountIdx])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />

      <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
        <View
          style={[styles.container, {top: MARGIN_TOP}]}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}>
          <CompleteIcon />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>신청 완료</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>나눔 신청이 완료됐습니다.</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>신청 내역에서 확인해보세요!</Text>
          </View>
          <RoundButton label="신청 내역으로 이동" style={{alignSelf: 'stretch'}} enabled onPress={onPressButton} />
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
