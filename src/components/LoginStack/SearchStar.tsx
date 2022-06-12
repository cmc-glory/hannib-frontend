import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import * as theme from '../../theme'

export const SearchStar = () => {
  const [keyword, setKeyword] = useState<string>('') // 검색 키워드

  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>최대 5명까지 선택 가능합니다.</Text>
      <View>
        {keyword == '' && <FastImage source={require('../../assets/Icon/Magnifier.png')} style={[styles.maginfier]}></FastImage>}
        <TextInput
          style={[theme.styles.input, {color: theme.gray800}]}
          value={keyword}
          onChangeText={setKeyword}
          placeholder="검색어를 입력해 주세요."
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
