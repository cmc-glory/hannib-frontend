import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery} from 'react-query'
import {queryKeys, getSearchData} from '../../api'
import {MagnifierIcon, StackHeader} from '../../components/utils'
import {RecentSearch} from '../../components/SearchStack'
import * as theme from '../../theme'

export const Search = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [recentSearch, setRecentSearch] = useState<string[]>([])
  const {data, isLoading, error} = useQuery(queryKeys.notifications, getSearchData)

  return (
    <SafeAreaView>
      <StackHeader title="검색" goBack />
      <View style={[theme.styles.wrapper]}>
        <TextInput
          style={[theme.styles.input, {marginBottom: 20, color: theme.gray800}]}
          placeholder="검색어를 입력해 주세요"
          placeholderTextColor={theme.gray300}
          value={keyword}
          onChangeText={setKeyword}
        />
        {keyword == '' && (
          <View style={styles.maginifier}>
            <MagnifierIcon />
          </View>
        )}
        <RecentSearch recentSearch={data?.recentSearch} />
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
