import React, {useCallback} from 'react'
import {View, Text, Alert, Pressable, StyleSheet} from 'react-native'
import {useMutation, useQueryClient} from 'react-query'
import {removeSearchKeywordWithId, removeSearchKeywordAll} from '../../api'
import {useAppSelector} from '../../hooks'
import {XIcon} from '../utils'
import * as theme from '../../theme'

type RecentSearchProps = {
  recentSearch: string[]
}

type RecentSearchItemProps = {
  keyword: string
  onPressDelete: () => void
}

const RecentSearchItem = ({keyword, onPressDelete}: RecentSearchItemProps) => {
  return (
    <View style={[theme.styles.rowSpaceBetween, styles.itemContainer]}>
      <Text>{keyword}</Text>
      <XIcon size={16} style={{marginLeft: 8}} onPress={onPressDelete} />
    </View>
  )
}

export const RecentSearch = ({recentSearch}: RecentSearchProps) => {
  const queryClient = useQueryClient()
  const userid = useAppSelector(state => state.auth.user.email)
  const removeSearchKeywordWithIdQuery = useMutation(removeSearchKeywordWithId, {
    onSuccess: () => {
      queryClient.invalidateQueries('recentSearch')
    },
  })

  const removeSearchKeywordAllQuery = useMutation(removeSearchKeywordAll, {
    onSuccess: () => {
      queryClient.invalidateQueries('recentSearch')
    },
  })

  // 전체 삭제 클릭했을 때
  const onPressDeleteAll = useCallback(() => {
    Alert.alert('전체 삭제 클릭')
    removeSearchKeywordAllQuery.mutate(userid)
  }, [])

  const onPressDeleteRecentSearch = useCallback(() => {
    Alert.alert('최근 검색어 삭제 클릭')
    removeSearchKeywordWithIdQuery.mutate()
  }, [])
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Text style={[theme.styles.bold16]}>최근 검색어</Text>
        <Pressable onPress={onPressDeleteAll}>
          <Text style={{color: theme.secondary}}>전체 삭제</Text>
        </Pressable>
      </View>
      <View style={[theme.styles.rowFlexStart, {marginTop: 15}]}>
        {recentSearch?.map(item => (
          <RecentSearchItem key={item} keyword={item} onPressDelete={onPressDeleteRecentSearch} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.gray50,
    borderRadius: 26,
    paddingHorizontal: 12,
    height: 32,
    marginBottom: 8,
    marginRight: 14,
  },
})
