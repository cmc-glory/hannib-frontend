import React, {useCallback} from 'react'
import {View, Text, Alert, Pressable, StyleSheet} from 'react-native'
import {showMessage} from 'react-native-flash-message'
import {useNavigation} from '@react-navigation/native'
import {useMutation, useQueryClient} from 'react-query'
import {storeArray} from '../../hooks'
import {useAppSelector, removeArray} from '../../hooks'
import {XSmallIcon} from '../utils'
import * as theme from '../../theme'

type RecentSearchProps = {
  recentSearch: string[]
  setRecentSearch: React.Dispatch<React.SetStateAction<string[]>>
}

type RecentSearchItemProps = {
  keyword: string
  onPressDelete: (currentKeyword: string) => void
  onPressRecentSearchItem: (currentKeyword: string) => void
}

const RecentSearchItem = ({keyword, onPressDelete, onPressRecentSearchItem}: RecentSearchItemProps) => {
  return (
    <Pressable style={[theme.styles.rowSpaceBetween, styles.itemContainer]} onPress={() => onPressRecentSearchItem(keyword)}>
      <Text>{keyword}</Text>
      <XSmallIcon style={{marginLeft: 8}} onPress={() => onPressDelete(keyword)} />
    </Pressable>
  )
}

export const RecentSearch = ({recentSearch, setRecentSearch}: RecentSearchProps) => {
  const navigation = useNavigation()
  // 전체 삭제 클릭했을 때
  const onPressDeleteAll = useCallback(() => {
    removeArray('recentSearch').then(() => {
      showMessage({
        message: '최근 검색어 삭제가 완료됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    })
    setRecentSearch([])
  }, [])

  const onPressDeleteRecentSearch = useCallback(
    (currentKeyword: string) => {
      const temp = recentSearch.slice() // 최근 검색어 state를 배열에 임시 할당
      var index = temp.indexOf(currentKeyword) // 최근 검색어의 인덱스를 찾아서
      temp.splice(index, 1) // 제거
      setRecentSearch(temp) // state에 새로 저장
      storeArray('recentSearch', temp) // async storage에도 저장
    },
    [recentSearch],
  )

  const onPressRecentSearchItem = useCallback(
    (currentKeyword: string) => {
      const temp = recentSearch.slice()

      // 최근 검색어에 해당 검색어가 포함된다면
      if (temp.includes(currentKeyword)) {
        // 해당 검색어를 찾아서 제거
        console.log('same found')
        var index = temp.indexOf(currentKeyword)
        temp.splice(index, 1)
      } else {
        if (temp.length == 10) {
          temp.pop() // 마지막 검색어 제거
        }
      }

      temp.unshift(currentKeyword)
      setRecentSearch(temp)
      storeArray('recentSearch', temp)
      // 최근 검색어에 해당 검색어가 포함된다면
      if (temp.includes(currentKeyword)) {
        // 해당 검색어를 찾아서 제거
        console.log('same found')
        var index = temp.indexOf(currentKeyword)
        temp.splice(index, 1)
      } else {
        if (temp.length == 10) {
          temp.pop() // 마지막 검색어 제거
        }
      }

      temp.unshift(currentKeyword)
      setRecentSearch(temp)
      storeArray('recentSearch', temp)
      navigation.navigate('SearchDetail', {
        keyword: currentKeyword,
      })
    },
    [recentSearch],
  )
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween]}>
        <Text style={[theme.styles.bold16]}>최근 검색어</Text>
        <Pressable onPress={onPressDeleteAll}>
          <Text style={{color: theme.secondary}}>전체 삭제</Text>
        </Pressable>
      </View>
      <Text style={{marginVertical: 8, color: theme.gray500}}>최근 10개의 검색어를 보여줍니다.</Text>
      <View style={[theme.styles.rowFlexStart, {marginTop: 15, flexWrap: 'wrap'}]}>
        {recentSearch?.map(item => (
          <RecentSearchItem key={item} keyword={item} onPressDelete={onPressDeleteRecentSearch} onPressRecentSearchItem={onPressRecentSearchItem} />
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
