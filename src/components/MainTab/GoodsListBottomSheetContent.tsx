import React, {useCallback} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import * as theme from '../../theme'

type GoodsListBottomSheetContentProps = {
  itemFilter: '최신순' | '인기순' | '추천순'
  setItemFilter: React.Dispatch<React.SetStateAction<'최신순' | '인기순' | '추천순'>>
}

type GoodsListBottomSheetContentItemProps = {
  label: '최신순' | '인기순' | '추천순'
  selected: boolean
  onPress: (label: '최신순' | '인기순' | '추천순') => void
}

const GoodsListBottomSheetContentItem = ({label, selected, onPress}: GoodsListBottomSheetContentItemProps) => {
  return (
    <Pressable style={styles.itemContainer} onPress={() => onPress(label)}>
      <Text style={{...styles.label, fontFamily: selected ? 'Pretendard-Bold' : 'Pretendard-Regular'}}>{label}</Text>
    </Pressable>
  )
}

export const GoodsListBottomSheetContent = ({itemFilter, setItemFilter}: GoodsListBottomSheetContentProps) => {
  const onPress = useCallback((label: '최신순' | '인기순' | '추천순') => {
    setItemFilter(label)
  }, [])
  return (
    <View style={[styles.rootContainer, theme.styles.wrapper]}>
      <GoodsListBottomSheetContentItem label="최신순" selected={itemFilter == '최신순'} onPress={onPress} />
      <GoodsListBottomSheetContentItem label="인기순" selected={itemFilter == '인기순'} onPress={onPress} />
      <GoodsListBottomSheetContentItem label="추천순" selected={itemFilter == '추천순'} onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: 'stretch',
  },
  itemContainer: {
    borderBottomColor: theme.gray200,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  label: {
    marginBottom: 14,
  },
})
