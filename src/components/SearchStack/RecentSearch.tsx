import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const RecentSearch = () => {
  // 전체 삭제 클릭했을 때
  const onPressDeleteAll = useCallback(() => {}, [])
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Text style={[theme.styles.bold16]}>최근 검색어</Text>
        <Pressable onPress={onPressDeleteAll}>
          <Text style={{color: theme.secondary}}>전체 삭제</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
