import React, {useState, useCallback, useEffect, useRef} from 'react'
import {View, ScrollView, Text, FlatList, TextInput, StyleSheet, RefreshControl} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import {StackActions} from '@react-navigation/native'

import {queryKeys, searchNanumByFavorites, searchNanumByRecent} from '../../api'
import {MagnifierIcon, EmptyIcon, StackHeader} from '../../components/utils'
import {RecentSearch} from '../../components/SearchStack'
import * as theme from '../../theme'
import {NanumListItem} from '../../components/MainTab'
import {storeArray, getArray, removeArray} from '../../hooks'

export const Search = () => {
  // ********************* utils *********************
  const navigation = useNavigation()

  const popAction = StackActions.pop(1)

  // ********************* states *********************
  const [keyword, setKeyword] = useState<string>('') // 검색 키워드
  const [recentSearch, setRecentSearch] = useState<string[]>([]) // 최근 검색어
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useEffect(() => {
    getArray('recentSearch').then(res => {
      setRecentSearch(res)
    })
  }, [])

  // ********************* callbacks *********************

  const onPressSearch = useCallback(() => {
    if (keyword == '') {
      return
    }
    const tempKeyword = keyword
    setKeyword('')
    const temp = recentSearch.slice()

    // 최근 검색어에 해당 검색어가 포함된다면
    if (temp.includes(tempKeyword)) {
      // 해당 검색어를 찾아서 제거
      console.log('same found')
      var index = temp.indexOf(tempKeyword)
      temp.splice(index, 1)
    } else {
      if (temp.length == 10) {
        temp.pop() // 마지막 검색어 제거
      }
    }

    temp.unshift(tempKeyword)
    setRecentSearch(temp)
    storeArray('recentSearch', temp)
    navigation.navigate('SearchDetail', {
      keyword: tempKeyword,
    })
  }, [keyword])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="검색" goBack />
      <View style={[{flex: 1}]}>
        <View style={[theme.styles.wrapper]}>
          <TextInput
            style={[theme.styles.input, {marginBottom: 20, color: theme.gray800}]}
            placeholder="검색어를 입력해 주세요"
            placeholderTextColor={theme.gray300}
            value={keyword}
            onChangeText={setKeyword}
            onEndEditing={() => onPressSearch()}
            blurOnSubmit={keyword == '' ? false : true} // 검색어를 아무것도 입력하지 않았을 때 검색 되는 것 방지
          />
          <View style={styles.maginifier}>
            <MagnifierIcon onPress={onPressSearch} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={[theme.styles.wrapper]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getArray('recentSearch').then(res => {
                  setRecentSearch(res)
                  setRefreshing(false)
                })
              }}
            />
          }>
          <RecentSearch recentSearch={recentSearch} setRecentSearch={setRecentSearch} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  maginifier: {
    position: 'absolute',
    right: 14,
    top: 10,
  },
})
