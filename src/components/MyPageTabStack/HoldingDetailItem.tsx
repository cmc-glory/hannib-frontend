import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {
  StackHeader,
  FloatingBottomButton,
  DownArrowIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SharingPreview,
  GoodsListItem,
  XIcon,
  MenuIcon,
  BottomSheet,
} from '../../components/utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {useNavigation} from '@react-navigation/native'
import {EditDeleteModal, HoldingSharingBottomSheetContent, HoldingSharingFilterTab} from '../../components/MyPageStack'
import {HoldingListItem} from '../../components/MyPageTabStack'

type HoldingDetailItem = {
  isOnline: boolean
  onPressLeftArrow: () => void
  onPressRightArrow: () => void
  cntList: number
  setIsDetail: (bool: boolean) => void
}

export const HoldingDetailItem = ({onPressLeftArrow, onPressRightArrow, cntList, setIsDetail}: HoldingDetailItem) => {
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween, {marginTop: 16}]}>
        <View style={[theme.styles.rowSpaceBetween, {width: 85}]}>
          <LeftArrowIcon size={24} onPress={onPressLeftArrow} />
          <Text> {cntList} / 12 </Text>
          <RightArrowIcon size={24} onPress={onPressRightArrow} />
        </View>
        <XIcon size={20} onPress={() => setIsDetail(false)} />
      </View>
      <HoldingSharingDetail />
    </View>
  )
}
