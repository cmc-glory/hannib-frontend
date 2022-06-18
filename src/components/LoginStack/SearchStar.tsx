import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import {Magnifier} from '../utils'
import * as theme from '../../theme'
import {IStar} from '../../types'

type SearchStarProps = {
  setStars: React.Dispatch<React.SetStateAction<IStar[]>>
  starsAll: IStar[]
}

export const SearchStar = ({setStars, starsAll}: SearchStarProps) => {
  const [keyword, setKeyword] = useState<string>('') // 검색 키워드

  const searchKeyword = useCallback(() => {
    // 입력 값이 없을 때는 리턴
    if (keyword == '') return
    setStars(starsAll.filter(star => star.name.includes(keyword)))
    setKeyword('')
  }, [keyword])

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>최대 5명까지 선택 가능합니다.</Text>
      <View>
        {keyword == '' && <Magnifier style={styles.maginfier} />}
        <TextInput
          style={[theme.styles.input, {color: theme.gray800}]}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="검색어를 입력해 주세요."
          onEndEditing={searchKeyword}
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
