import React, {useState, useCallback, useEffect} from 'react'
import {View, RefreshControl, ScrollView, Text, FlatList, Pressable, Animated, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {useQuery, useQueryClient} from 'react-query'

import * as theme from '../../theme'
import {DownArrowIcon, BellIcon, MagnifierIcon, BottomSheet, FloatingButtonIcon} from '../../components/utils'
import {GoodsFilterTab, NanumListItem, GoodsListBottomSheetContent, Banner, CategoryDropdown} from '../../components/MainTab'
import {ISharingInfo, IUserCategory, ISharingType} from '../../types'
import {useAppSelector, useAnimatedValue, useToggle, useAnimatedStyle} from '../../hooks'
import {getNanumListAll, queryKeys} from '../../api'

const GoodsLists = () => {
  // ******************** utils ********************

  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const user = useAppSelector(state => state.auth.user)

  // ******************** react query ********************
  const {data} = useQuery(queryKeys.nanumList, getNanumListAll, {
    onSuccess: data => {
      setRefreshing(false) // 새로고침중이면 로딩 종료
      setSharings(data)
    },
  })

  // ******************** states ********************
  const [sharings, setSharings] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [locationFilter, setLocationFilter] = useState<'all' | 'offline' | 'online'>('all')
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순')
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false) // 인기순, 최신순, 추천순 필터링 탭 띄울지
  const [showSelectCategoryModal, setShowSelectCategoryModal] = useState<boolean>(false) // 카테고리 선택하는 드롭다운 띄울지
  const [userCategory, setUserCategory] = useState<IUserCategory>(user.userCategory[0]) // 현재 사용자가 선택한 카테고리.
  const [bannerInfo, setBannerInfo] = useState({
    imageUri: 'http://localhost:8081/src/assets/images/sanrio2.jpeg',
    title: '응원하는 셀럽의 생일/공연 홍보 배너를 걸어보세요',
    sharingid: '123445',
  })

  // ******************** animations ********************
  const animatedValue = useAnimatedValue() // 스크롤 업 다운할때마다 필터를 숨기거나 보여줌
  const animatedHeight = animatedValue.interpolate({
    inputRange: [0, 84],
    outputRange: [0, -84],
    extrapolate: 'clamp',
  })

  // ******************** callbacks ********************

  const onRefresh = useCallback(() => {
    // 새로고침침 pull up이 일어났을 때
    setRefreshing(true)
    queryClient.invalidateQueries(queryKeys.nanumList)
  }, [])

  const onPressWrite = useCallback(() => {
    // 모집글 작성 버튼 클릭 시
    navigation.navigate('WriteGoodsStackNavigator')
  }, [])

  const onPressMagnifier = useCallback(() => {
    // 검색 버튼 클릭시
    navigation.navigate('SearchStackNavigator')
  }, [])

  const onPressSelectCategory = useCallback(() => {
    // 카테고리(에스파, 세븐틴 등) 클릭시
    setShowSelectCategoryModal(showSelectCategoryModal => !showSelectCategoryModal)
  }, [])

  const onPressLocationFilter = useCallback((type: ISharingType | 'all') => {
    // 전체, 우편, 오프라인 클릭시
    console.log(data)

    if (type == 'all') {
      setSharings(data)
    } else {
      if (data !== undefined) {
        setSharings(data.filter((item: ISharingInfo) => item.type == type))
      }
    }
  }, [])

  // ******************** re-rendering ********************
  useEffect(() => {
    // 최신순, 인기순, 추천순 필터가 바뀔 때마다 새로 로드
    queryClient.invalidateQueries(queryKeys.nanumList)
  }, [itemFilter])

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        <Pressable style={[styles.titleContainer]} onPress={onPressSelectCategory}>
          <Text style={styles.title}>{userCategory?.name}</Text>
          <DownArrowIcon onPress={onPressSelectCategory} />
        </Pressable>
        <View style={[theme.styles.rowFlexStart]}>
          <MagnifierIcon style={{marginRight: 16}} onPress={onPressMagnifier} />
          <BellIcon />
        </View>
      </View>
      <CategoryDropdown
        showCategoryModal={showSelectCategoryModal}
        setShowCategoryModal={setShowSelectCategoryModal}
        userCategory={userCategory}
        setUserCategory={setUserCategory}
        categories={user.userCategory}
      />
      <View style={{flex: 1}}>
        <Banner imageUri={bannerInfo.imageUri} title={bannerInfo.title} sharingid={bannerInfo.sharingid} animatedHeight={animatedHeight} />
        <GoodsFilterTab
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          itemFilter={itemFilter}
          setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
          onPressLocationFilter={onPressLocationFilter}
        />
        <FlatList
          contentContainerStyle={[{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 6}]}
          data={sharings}
          renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
          onRefresh={onRefresh}
        />
      </View>

      <FloatingButtonIcon style={styles.floatingButton} onPress={onPressWrite} />
      <BottomSheet modalVisible={showItemFilterBottomShet} setModalVisible={setShowItemFilterBottomSheet}>
        <GoodsListBottomSheetContent itemFilter={itemFilter} setItemFilter={setItemFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}

export default GoodsLists

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: theme.gray800,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.24,
    elevation: 5,
  },

  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: theme.gray800,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: theme.PADDING_SIZE,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  container: {
    backgroundColor: theme.white,
    flex: 1,
  },
})
