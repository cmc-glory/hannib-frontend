import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const EmptyResult = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>검색 결과가 존재하지 않습니다</Text>
      <Pressable style={[styles.button]}>
        <Text>카테고리 문의하기</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    borderColor: theme.gray800,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
})
