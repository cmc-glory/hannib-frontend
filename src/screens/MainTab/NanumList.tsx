import React, {useState, useCallback} from 'react'
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {useQuery} from 'react-query'

import * as theme from '../../theme'
import {DownArrowIcon, BellIcon, MagnifierIcon, BottomSheet, FloatingButtonIcon, EmptyIcon} from '../../components/utils'
import {NanumListFilterTab, NanumListItem, GoodsListBottomSheetContent, Banner, CategoryDropdown} from '../../components/MainTab'
import {INanumMethod, INanumListItem, IAccountCategoryDto} from '../../types'
import {useAppSelector, useAnimatedValue, removeString} from '../../hooks'
import {getNanumByRecent, getNanumByPopularity, getNanumAll, queryKeys} from '../../api'

const NanumList = () => {
  // ******************** check login ********************
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  removeString('accountIdx') // async storage에서 accountIdx 제거
  removeString('email') // async storage에서 email 제거

  // ******************** utils ********************
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)
  console.log(user)

  // ******************** states ********************
  const [sharings, setSharings] = useState<INanumListItem[]>([]) // 나눔 게시글들
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [nanumMethodFilter, setNanumMethodFilter] = useState<'전체' | INanumMethod>('전체') // 필터1 : 전체, 우편, 오프라인
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순') // 필터2 : 전체, 우편, 오프라인
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false) // 인기순, 최신순, 추천순 필터링 bottom sheet 띄울지
  const [showSelectCategoryModal, setShowSelectCategoryModal] = useState<boolean>(false) // 카테고리 선택하는 드롭다운 띄울지
  const [userCategory, setUserCategory] = useState<IAccountCategoryDto>() // 현재 사용자가 선택한 카테고리.
  const [bannerInfo, setBannerInfo] = useState({
    imageUri: 'http://localhost:8081/src/assets/images/sanrio2.jpeg',
    title: '응원하는 셀럽의 생일/공연 홍보 배너를 걸어보세요',
    sharingid: '123445',
  })

  // ******************** react query ********************
  // 카테고리가 설정되지 않았을 때 (로그인하지 않았을 때) 전부 불러오기
  useQuery(queryKeys.nanumAll, getNanumAll, {
    onSuccess(data) {
      setSharings(data)
    },
    enabled: isLoggedIn == false, // 로그인 하지 않았을 때 전체 보기
  })

  if (userCategory != undefined) {
    useQuery(['nanumListRecent', userCategory], () => getNanumByRecent({job: userCategory.job, category: userCategory.category, accountIdx: 0}), {
      onSuccess: data => {
        setRefreshing(false) // 새로고침중이면 로딩 종료
        setSharings(data)

        if (nanumMethodFilter !== '전체') {
          // 현재 오프라인, 온라인 필터가 설정된 경우엔 보여질 아이템 재설정
          onPressLocationFilter(nanumMethodFilter)
        }
      },
      enabled: itemFilter == '최신순', // 필터가 최신순으로 설정됐을 때만
    })

    // 카테고리가 설정 됐을 때 인기순
    useQuery(['nanumListPopular', userCategory], () => getNanumByPopularity({job: userCategory.job, category: userCategory.category, accountIdx: 0}), {
      onSuccess(data) {
        setRefreshing(false) // 새로고침중이면 로딩 종료
        setSharings(data)
      },
      onError(err) {},
      enabled: itemFilter == '인기순',
    })
  }
  // 카테고리가 설정 됐을 때 최신순

  // ******************** callbacks ********************
  // 새로고침침 pull up이 일어났을 때
  const onRefresh = useCallback(() => {
    setRefreshing(true)
  }, [])

  // 모집글 작성 버튼 클릭 시
  const onPressWrite = useCallback(() => {
    if (isLoggedIn) {
      // 로그인 했으면 작성 페이지
      navigation.navigate('WriteNanumFormStackNavigator')
    } else {
      // 로그인 안했으면 로그인 페이지
      navigation.navigate('MyPageTabStackNavigator')
    }
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
  const onPressLocationFilter = useCallback(
    (type: INanumMethod | '전체') => {
      if (type == '전체') {
      } else {
        if (sharings != undefined) {
          console.log(sharings)
          setSharings(sharings.filter((item: INanumListItem) => item.nanumMethod == type))
        }
      }
    },
    [sharings],
  )

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        {isLoggedIn ? (
          <Pressable style={[styles.titleContainer]} onPress={onPressSelectCategory}>
            <Text style={styles.title}>{userCategory?.category}</Text>
            <DownArrowIcon onPress={onPressSelectCategory} />
          </Pressable>
        ) : (
          <Pressable style={[styles.titleContainer]}>
            <Text style={styles.title}>전체보기</Text>
          </Pressable>
        )}
        <View style={[theme.styles.rowFlexStart]}>
          <MagnifierIcon style={{marginRight: 16}} onPress={onPressMagnifier} />
          <BellIcon />
        </View>
      </View>
      {userCategory != undefined && (
        <CategoryDropdown
          showCategoryModal={showSelectCategoryModal}
          setShowCategoryModal={setShowSelectCategoryModal}
          userCategory={userCategory}
          setUserCategory={setUserCategory}
          categories={user.accountCategoryDtoList}
        />
      )}

      <View style={{flex: 1}}>
        <Banner imageUri={bannerInfo.imageUri} title={bannerInfo.title} sharingid={bannerInfo.sharingid} />
        <View style={{flex: 1, width: '100%'}}>
          <NanumListFilterTab
            locationFilter={nanumMethodFilter}
            setLocationFilter={setNanumMethodFilter}
            itemFilter={itemFilter}
            setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
            onPressLocationFilter={onPressLocationFilter}
          />
          {sharings.length == 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <EmptyIcon style={{marginBottom: 32}} />
              <View>
                <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>현재 나눔 리스트가 비어있어요.</Text>
                <View>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>하단의 + 버튼을 눌러</Text>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>보다 손쉽게 나눔을 진행해 보세요!</Text>
                </View>
              </View>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={[{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 6}]}
              data={sharings}
              renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
              refreshing={refreshing}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
              onRefresh={onRefresh}
            />
          )}
        </View>
      </View>

      <FloatingButtonIcon style={styles.floatingButton} onPress={onPressWrite} />
      <BottomSheet modalVisible={showItemFilterBottomShet} setModalVisible={setShowItemFilterBottomSheet}>
        <GoodsListBottomSheetContent itemFilter={itemFilter} setItemFilter={setItemFilter} />
      </BottomSheet>
    </SafeAreaView>
  )
}

export default NanumList

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