import React, {useState, useCallback} from 'react'
import {View, FlatList, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation} from 'react-query'
import {queryKeys, getSearchData} from '../../api'
import {MagnifierIcon, StackHeader} from '../../components/utils'
import {RecentSearch} from '../../components/SearchStack'
import * as theme from '../../theme'
import {NanumListItem} from '../../components/MainTab'

export const Search = () => {
  // ********************* states *********************
  const [keyword, setKeyword] = useState<string>('')
  const [recentSearch, setRecentSearch] = useState<string[]>([])
  const [result, setResult] = useState()

  // ********************* react quries *********************

  const searchQuery = useMutation([queryKeys.search], getSearchData, {
    onSuccess(data) {
      console.log(data)
      setResult(data)
    },
    onError(err) {
      console.log(err)
    },
    //enabled: Boolean(keyword),
  })

  // ********************* callbacks *********************

  const onPressSearch = useCallback(() => {
    setKeyword('')
    //queryClient.invalidateQueries(queryKeys.search)
    searchQuery.mutate(keyword)
  }, [keyword])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="검색" goBack />
      <View style={[{flex: 1}]}>
        <View style={theme.styles.wrapper}>
          <TextInput
            style={[theme.styles.input, {marginBottom: 20, color: theme.gray800}]}
            placeholder="검색어를 입력해 주세요"
            placeholderTextColor={theme.gray300}
            value={keyword}
            onChangeText={setKeyword}
            onEndEditing={() => onPressSearch()}
          />
          <View style={styles.maginifier}>
            <MagnifierIcon onPress={onPressSearch} />
          </View>
          <RecentSearch recentSearch={['BTS 키링', 'BTS']} />
        </View>

        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={[{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 6}]}
            data={result}
            renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
            //refreshing={refreshing}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
            //onRefresh={onRefresh}
          />
        </View>
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
