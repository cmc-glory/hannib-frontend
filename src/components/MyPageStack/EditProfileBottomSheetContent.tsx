import React, {useCallback} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {CheckIcon} from '../utils'
import * as theme from '../../theme'

type EditProfileBottomSheetContentProps = {
  itemFilter: '최신순' | '인기순' | '추천순'
  setItemFilter: React.Dispatch<React.SetStateAction<'최신순' | '인기순' | '추천순'>>
  close?: () => void
}

type EditProfileBottomSheetContentItemProps = {
  label: '최신순' | '인기순' | '추천순'
  selected: boolean
  onPress: (label: '최신순' | '인기순' | '추천순') => void
}

const EditProfileBottomSheetContentItem = ({label, selected, onPress}: EditProfileBottomSheetContentItemProps) => {
  return (
    <Pressable style={[theme.styles.rowSpaceBetween, styles.itemContainer]} onPress={() => onPress(label)}>
      <Text style={{...styles.label, fontFamily: selected ? 'Pretendard-Bold' : 'Pretendard-Regular'}}>{label}</Text>
      {selected && <CheckIcon size={18} />}
    </Pressable>
  )
}

export const EditProfileBottomSheetContent = ({itemFilter, setItemFilter, close}: EditProfileBottomSheetContentProps) => {
  const onPress = useCallback((label: '최신순' | '인기순' | '추천순') => {
    setItemFilter(label)

    if (close) {
      close()
    }
  }, [])
  return (
    <View style={[styles.rootContainer, theme.styles.wrapper]}>
      <EditProfileBottomSheetContentItem label="최신순" selected={itemFilter == '최신순'} onPress={onPress} />
      <EditProfileBottomSheetContentItem label="인기순" selected={itemFilter == '인기순'} onPress={onPress} />
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
