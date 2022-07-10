import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {MagnifierIcon} from '../utils'
import * as theme from '../../theme'
import {IStar} from '../../types'

type SearchStarProps = {
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
  searchKeyword: (keyword: string) => void
  label?: string
}

export const SearchStar = ({keyword, setKeyword, searchKeyword, label = '최대 5명까지 선택 가능합니다.'}: SearchStarProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>{label}</Text>
      <View>
        <MagnifierIcon style={styles.maginfier} onPress={() => searchKeyword(keyword)} />
        <TextInput
          style={[theme.styles.input, {color: theme.gray800}]}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="검색어를 입력해 주세요."
          onEndEditing={() => searchKeyword(keyword)}
          placeholderTextColor={theme.gray300}></TextInput>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  maginfier: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 12,
    top: 12,
  },
  container: {
    marginVertical: 15,
  },
  label: {
    color: theme.gray500,
    marginBottom: 10,
  },
})
