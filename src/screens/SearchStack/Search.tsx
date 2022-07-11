import React, {useState, useCallback} from 'react'
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import {queryKeys, getSearchData} from '../../api'
import {MagnifierIcon, EmptyIcon, StackHeader} from '../../components/utils'
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
      setResult(data)
    },
    onError(err) {
      console.log(err)
      showMessage({
        // 에러 안내 메세지
        message: '검색 중 에러가 발생했습니다',
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
    },
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
        <View style={[theme.styles.wrapper, {position: 'absolute', left: 0, right: 0, top: 0}]}>
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

        {result == '' ? (
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <EmptyIcon style={{marginBottom: 32}} />
            <View>
              <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>검색 결과가 없습니다.</Text>
              <View>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>나눔 게시글을 작성해 보세요!</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              bounces={false}
              contentContainerStyle={[{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 6}]}
              data={result}
              renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
              //refreshing={refreshing}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
              //onRefresh={onRefresh}
            />
          </View>
        )}
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
