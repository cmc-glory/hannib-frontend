import React, {useCallback} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {CheckIcon} from '../utils'
import * as theme from '../../theme'

type HoldingSharingBottomSheetContentProps = {
  stateFilter: '전체보기' | '수령완료' | '미수령'
  setStateFilter: React.Dispatch<React.SetStateAction<'전체보기' | '수령완료' | '미수령'>>
  close?: () => void
}

type HoldingSharingBottomSheetContentItemProps = {
  label: '전체보기' | '수령완료' | '미수령'
  selected: boolean
  onPress: (label: '전체보기' | '수령완료' | '미수령') => void
}

const HoldingSharingBottomSheetContentItem = ({label, selected, onPress}: HoldingSharingBottomSheetContentItemProps) => {
  return (
    <Pressable style={[theme.styles.rowSpaceBetween, styles.itemContainer]} onPress={() => onPress(label)}>
      <Text style={{...styles.label, fontFamily: selected ? 'Pretendard-Bold' : 'Pretendard-Regular'}}>{label}</Text>
      {selected && <CheckIcon size={18} />}
    </Pressable>
  )
}

export const HoldingSharingBottomSheetContent = ({stateFilter: itemFilter, setStateFilter: setItemFilter, close}: HoldingSharingBottomSheetContentProps) => {
  const onPress = useCallback((label: '전체보기' | '수령완료' | '미수령') => {
    setItemFilter(label)
    if (close) {
      close()
    }
  }, [])
  return (
    <View style={[styles.rootContainer, theme.styles.wrapper]}>
      <HoldingSharingBottomSheetContentItem label="전체보기" selected={itemFilter == '전체보기'} onPress={onPress} />
      <HoldingSharingBottomSheetContentItem label="수령완료" selected={itemFilter == '수령완료'} onPress={onPress} />
      <HoldingSharingBottomSheetContentItem label="미수령" selected={itemFilter == '미수령'} onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
  },
  itemContainer: {
    borderBottomColor: theme.gray200,
    borderBottomWidth: 1,

    width: '100%',
    paddingVertical: 20,
  },
  label: {},
})
