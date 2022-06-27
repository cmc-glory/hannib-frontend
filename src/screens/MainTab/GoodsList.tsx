import React, {useState, useCallback, useEffect} from 'react'
import {RefreshControl, View, Text, FlatList, Pressable, Animated, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import IconIcons from 'react-native-vector-icons/Ionicons'
import {useQuery, useQueryClient} from 'react-query'

import * as theme from '../../theme'
import {FloatingButton, DownArrowIcon, BellIcon, MagnifierIcon, BottomSheet, FloatingButtonIcon} from '../../components/utils'
import {GoodsFilterTab, GoodsListItemVer2, GoodsListBottomSheetContent, Banner, CategoryDropdown} from '../../components/MainTab'
import {ISharingInfo, IUserCategory, ISharingType} from '../../types'
import {useAppSelector} from '../../hooks'
import {getGoodsListAll, queryKeys} from '../../api'

const GoodsLists = () => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const user = useAppSelector(state => state.auth.user)
  // states
  const [sharings, setSharings] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [locationFilter, setLocationFilter] = useState<'all' | 'offline' | 'online'>('all')
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순')
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false) // 인기순, 최신순, 추천순 필터링 탭 띄울지
  const [showSelectCategoryModal, setShowSelectCategoryModal] = useState<boolean>(false) // 카테고리 선택하는 드롭다운 띄울지
  const [userCategory, setUserCategory] = useState<IUserCategory>(user.userCategory[0]) // 현재 사용자가 선택한 카테고리.
  const [bannerInfo, setBannerInfo] = useState({
    imageUri: 'http://localhost:8081/src/assets/images/aespa.jpeg',
    title: 'SEVENTEEN [BE THE SUN] - SEOUL',
    sharingid: '123445',
  })

  const {data} = useQuery(queryKeys.goodsList, getGoodsListAll, {
    onSuccess: () => {
      setRefreshing(false) // 새로고침중이면 로딩 종료
      setSharings(data)
    },
  })

  // callbacks

  // 새로고침침 pull up이 일어났을 때
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries(queryKeys.goodsList)
  }, [])

  // 모집글 작성 버튼 클릭 시
  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteGoodsStackNavigator')
  }, [])

  // 검색 버튼 클릭시
  const onPressMagnifier = useCallback(() => {
    navigation.navigate('SearchStackNavigator')
  }, [])

  // 카테고리(에스파, 세븐틴 등) 클릭시
  const onPressSelectCategory = useCallback(() => {
    setShowSelectCategoryModal(showSelectCategoryModal => !showSelectCategoryModal)
  }, [])

  // 전체, 우편, 오프라인 클릭시
  const onPressLocationFilter = useCallback((type: ISharingType | 'all') => {
    if (type == 'all') {
      setSharings(data)
    } else {
      setSharings(data.filter((item: ISharingInfo) => item.type == type))
    }
  }, [])

  // 최신순, 인기순, 추천순 필터가 바뀔 때마다 새로 로드
  useEffect(() => {
    queryClient.invalidateQueries(queryKeys.goodsList)
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
        <Banner imageUri={bannerInfo.imageUri} title={bannerInfo.title} sharingid={bannerInfo.sharingid} />
        <GoodsFilterTab
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          itemFilter={itemFilter}
          setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
          onPressLocationFilter={onPressLocationFilter}
        />
        <FlatList
          contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE}}
          data={sharings}
          renderItem={({item}) => <GoodsListItemVer2 item={item}></GoodsListItemVer2>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
          onRefresh={onRefresh}
        />
      </View>
      <FloatingButtonIcon style={styles.floatingButton} />
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
