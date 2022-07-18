import React, {useState, useCallback, useEffect} from 'react'
import {View, Text, ScrollView, FlatList, Pressable, StyleSheet, ActivityIndicator, Alert, Platform, RefreshControl} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {useQueryClient, useQuery} from 'react-query'
import 'moment/locale/ko'

import * as theme from '../../theme'
import {DownArrowIcon, BellIcon, MagnifierIcon, BottomSheet, FloatingButtonIcon, EmptyIcon} from '../../components/utils'
import {NanumListFilterTab, NanumListItem, GoodsListBottomSheetContent, Banner, CategoryDropdown} from '../../components/MainTab'
import {INanumMethod, INanumListItem, IAccountCategoryDto} from '../../types'
import {useAppSelector} from '../../hooks'
import {getNanumByRecent, getNanumByPopularity, getNanumAllByFavorites, queryKeys, getNanumAllByRecent} from '../../api'
import moment from 'moment'
moment.locale('ko')

const NanumList = () => {
  // ******************** check login ********************
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  // ******************** utils ********************
  const navigation = useNavigation()
  const user = useAppSelector(state => state.auth.user)
  console.log('user:', user)
  const currentCategory = user.accountCategoryDtoList[0]
  const queryClient = useQueryClient()

  // ******************** states ********************
  const [sharings, setSharings] = useState<INanumListItem[]>([]) // 나눔 게시글들
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [nanumMethodFilter, setNanumMethodFilter] = useState<'전체' | INanumMethod>('전체') // 필터1 : 전체, 우편, 오프라인
  const [itemFilter, setItemFilter] = useState<'최신순' | '인기순' | '추천순'>('최신순') // 필터2 : 전체, 우편, 오프라인
  const [showItemFilterBottomShet, setShowItemFilterBottomSheet] = useState<boolean>(false) // 인기순, 최신순, 추천순 필터링 bottom sheet 띄울지
  const [showSelectCategoryModal, setShowSelectCategoryModal] = useState<boolean>(false) // 카테고리 선택하는 드롭다운 띄울지
  const [userCategory, setUserCategory] = useState<IAccountCategoryDto>({
    job: '가수',
    categoryName: '전체보기',
    accountIdx: 0,
    categoryIdx: 0,
  }) // 현재 사용자가 선택한 카테고리.
  const [bannerInfo, setBannerInfo] = useState({
    imageUri: '',
    title: '',
    nanumIdx: 0,
  })
  useEffect(() => {
    setUserCategory(currentCategory)
  }, [currentCategory])

  // ******************** react query ********************
  // 카테고리가 설정되지 않았을 때 (로그인하지 않았을 때) 전부 불러오기
  const nanumAllByRecent = useQuery([queryKeys.nanumList], getNanumAllByRecent, {
    onSuccess(data) {
      setRefreshing(false)
      setSharings(data)
    },
    enabled: isLoggedIn == false && itemFilter == '최신순', // 로그인 하지 않았을 때 전체 보기
  })

  const nanumAllByFavorites = useQuery([queryKeys.nanumList], getNanumAllByFavorites, {
    onSuccess(data) {
      setRefreshing(false)
      setSharings(data)
    },
    enabled: isLoggedIn == false && itemFilter == '인기순', // 로그인 하지 않았을 때 전체 보기
  })

  const nanumByRecent = useQuery([queryKeys.nanumList, userCategory], () => getNanumByRecent(userCategory.categoryName), {
    onSuccess: data => {
      setRefreshing(false) // 새로고침중이면 로딩 종료
      setSharings(data)

      if (nanumMethodFilter !== '전체') {
        // 현재 오프라인, 온라인 필터가 설정된 경우엔 보여질 아이템 재설정
        //onPressLocationFilter(nanumMethodFilter)
      }
    },
    enabled: isLoggedIn == true && itemFilter == '최신순', // 필터가 최신순으로 설정됐을 때만
  })

  // 카테고리가 설정 됐을 때 인기순
  const nanumByFaavorites = useQuery([queryKeys.nanumList, userCategory], () => getNanumByPopularity(userCategory.categoryName), {
    onSuccess(data) {
      setRefreshing(false) // 새로고침중이면 로딩 종료
      setSharings(data)
    },
    onError(err) {
      console.log(err)
    },
    enabled: isLoggedIn == true && itemFilter == '인기순',
  })
  // 카테고리가 설정 됐을 때 최신순

  // ******************** callbacks ********************
  // 새로고침침 pull up이 일어났을 때
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.nanumList])
  }, [])

  // 모집글 작성 버튼 클릭 시
  const onPressWrite = useCallback(() => {
    if (isLoggedIn) {
      // 로그인 했으면 작성 페이지
      navigation.navigate('WriteNanumFormStackNavigator')
    } else {
      if (Platform.OS == 'ios') {
        Alert.alert('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?', '', [
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
          {
            text: '취소',
          },
        ])
      } else {
        Alert.alert('로그인 후 이용할 수 있습니다', '로그인 페이지로 이동하시겠습니까?', [
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
          {
            text: '취소',
          },
        ])
      }
    }
  }, [isLoggedIn])

  // 검색 버튼 클릭시
  const onPressMagnifier = useCallback(() => {
    navigation.navigate('SearchStackNavigator')
  }, [])

  // 카테고리(에스파, 세븐틴 등) 클릭시
  const onPressSelectCategory = useCallback(() => {
    setShowSelectCategoryModal(showSelectCategoryModal => !showSelectCategoryModal)
  }, [])

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <View style={styles.headerContainer}>
        {isLoggedIn ? (
          <Pressable style={[styles.titleContainer]} onPress={onPressSelectCategory}>
            <Text style={styles.title}>{userCategory?.categoryName}</Text>
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

      <CategoryDropdown
        showCategoryModal={showSelectCategoryModal}
        setShowCategoryModal={setShowSelectCategoryModal}
        userCategory={userCategory}
        setUserCategory={setUserCategory}
        categories={user.accountCategoryDtoList}
      />

      <View style={{flex: 1}}>
        <Banner imageUri={bannerInfo.imageUri} title={bannerInfo.title} nanumIdx={bannerInfo.nanumIdx} />
        <View style={{flex: 1, width: '100%'}}>
          <NanumListFilterTab
            locationFilter={nanumMethodFilter}
            setLocationFilter={setNanumMethodFilter}
            itemFilter={itemFilter}
            setShowItemFilterBottomSheet={setShowItemFilterBottomSheet}
            //onPressLocationFilter={onPressLocationFilter}
          />
          {sharings.length == 0 ? (
            <ScrollView
              contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}>
              <EmptyIcon style={{marginBottom: 32}} />
              <View>
                <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>현재 나눔 리스트가 비어있어요.</Text>
                <View>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>하단의 + 버튼을 눌러</Text>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>보다 손쉽게 나눔을 진행해 보세요!</Text>
                </View>
              </View>
            </ScrollView>
          ) : nanumAllByFavorites.isLoading || nanumAllByRecent.isLoading || nanumByRecent.isLoading || nanumByFaavorites.isLoading ? (
            <View>
              <ActivityIndicator
                animating={
                  nanumAllByFavorites.isLoading || nanumAllByRecent.isLoading || nanumByRecent.isLoading || nanumByFaavorites.isLoading
                }></ActivityIndicator>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={[{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 6}]}
              data={nanumMethodFilter == '전체' ? sharings : sharings.filter(item => item.nanumMethod == nanumMethodFilter)}
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
    ...Platform.select({
      ios: {
        shadowColor: theme.gray800,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.24,
      },
      android: {
        elevation: 5,
      },
    }),
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
