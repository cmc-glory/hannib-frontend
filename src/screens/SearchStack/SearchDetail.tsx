import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useMutation} from 'react-query'

import {useAppSelector} from '../../hooks'
import {BottomSheet} from '../../components/utils'
import {INanumMethod, INanumListItem} from '../../types'
import {queryKeys, searchNanumByFavorites, searchNanumByRecent} from '../../api'
import {SearchDetailRouteProps} from '../../navigation/SearchStackNavigator'
import {MagnifierIcon, EmptyIcon, StackHeader} from '../../components/utils'
import * as theme from '../../theme'
import {NanumListItem, NanumListFilterTab, GoodsListBottomSheetContent} from '../../components/MainTab'
import {storeArray, getArray, removeArray} from '../../hooks'

export const SearchDetail = () => {
  // ********************* utils *********************
  const navigation = useNavigation()
  const route = useRoute<SearchDetailRouteProps>()
  const {isLoggedIn} = useAppSelector(state => state.auth)
  const accountIdx = isLoggedIn == false ? 0 : useAppSelector(state => state.auth.user.accountIdx)

  // ********************* states *********************
  const [nanums, setNanums] = useState<INanumListItem[]>([]) // 검색 결과
  const [keyword, setKeyword] = useState<string>(route.params.keyword) // 검색 키워드
  const [recentSearch, setRecentSearch] = useState<string[]>([]) // 최근 검색어
  const [nanumMethodFilter, setNanumMethodFilter] = useState<'전체' | INanumMethod>('전체') // 필터1 : 전체, 우편, 오프라인
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순') // 필터2 : 전체, 우편, 오프라인
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false) // 인기순, 최신순, 추천순 필터링 bottom sheet 띄울지

  // ********************* react queries *********************
  const searchNanumByFavoritesQuery = useMutation([queryKeys.search], searchNanumByFavorites, {
    onSuccess(data, variables, context) {
      console.log(data)
      setNanums(data.filter((item: INanumListItem) => item.block == 'N'))
    },
  })

  const searchNanumByRecentQuery = useMutation([queryKeys.search], searchNanumByRecent, {
    onSuccess(data, variables, context) {
      console.log(data)

      setNanums(data.filter((item: INanumListItem) => item.block == 'N'))
    },
  })

  // 처음에 컴포넌트가 마운트 될 때 async storage에서 최근 검색어를 가져와서 저장.
  useEffect(() => {
    getArray('recentSearch').then(res => {
      setRecentSearch(res)
    })
  }, [])

  useEffect(() => {
    if (itemFilter == '인기순') {
      searchNanumByFavoritesQuery.mutate({title: keyword, accountIdx})
    } else {
      searchNanumByRecentQuery.mutate({title: keyword, accountIdx})
    }
  }, [itemFilter, accountIdx])

  // ********************* callbacks *********************

  const onPressSearch = useCallback(() => {
    // 검색어가 없을 땐 그냥 리턴
    if (keyword == '') {
      return
    }

    const tempKeyword = keyword
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
    setKeyword('')
    if (itemFilter == '인기순') {
      searchNanumByFavoritesQuery.mutate({title: tempKeyword, accountIdx})
    } else {
      searchNanumByRecentQuery.mutate({title: tempKeyword, accountIdx})
    }
  }, [keyword, accountIdx])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="검색" goBack />
      <View style={[{flex: 1}]}>
        <View style={[theme.styles.wrapper]}>
          <TextInput
            style={[theme.styles.input, {marginBottom: 8, color: theme.gray800}]}
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
        <NanumListFilterTab
          locationFilter={nanumMethodFilter}
          setLocationFilter={setNanumMethodFilter}
          itemFilter={itemFilter}
          setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
        />

        {nanums.length == 0 ? (
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
              data={nanumMethodFilter == '전체' ? nanums : nanums.filter(item => item.nanumMethod == nanumMethodFilter)}
              renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
              //refreshing={refreshing}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
              //onRefresh={onRefresh}
            />
          </View>
        )}
      </View>
      <BottomSheet modalVisible={showItemFilterBottomShet} setModalVisible={setShowItemFilterBottomSheet}>
        <GoodsListBottomSheetContent itemFilter={itemFilter} setItemFilter={setItemFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: theme.PADDING_SIZE,
    height: 56,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  maginifier: {
    position: 'absolute',
    right: 14,
    top: 10,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: theme.gray800,
  },
})
