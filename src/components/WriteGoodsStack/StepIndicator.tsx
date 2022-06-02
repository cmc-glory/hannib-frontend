import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import RightArrowIcon from '../../assets/icons/right-arrow-next-svgrepo-com.svg'
import {black, gray300} from '../../theme'

const ICON_SIZE = 9
type stepIndicatorProps = {
  step: number
}

const StepIndicator = ({step}: stepIndicatorProps) => {
  return (
    <View style={[styles.container]}>
      <Text style={{color: step == 1 ? black : gray300, fontFamily: 'Pretendard-SemiBold'}}>단계 1 : 기본 정보 </Text>
      <RightArrowIcon width={ICON_SIZE} height={ICON_SIZE} fill={black} style={[styles.icon]} />
      <Text style={{color: step == 2 ? black : gray300, fontFamily: 'Pretendard-SemiBold'}}>단계 2 : 입력 폼 </Text>
    </View>
  )
}

export default StepIndicator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
})
