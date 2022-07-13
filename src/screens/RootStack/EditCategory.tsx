import React, {useState, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions, Pressable, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {StackHeader, Button, XSmallIcon, CheckboxMainIcon, FloatingBottomButton} from '../../components/utils'
import {SearchStar, EmptyResult} from '../../components/LoginStack'
import * as theme from '../../theme'
import {ICategoryDto, IAccountCategoryDto, IUpdateCategoryDto} from '../../types'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {queryKeys, searchCategory, updateUserSelectedCategory} from '../../api'
import {updateCategory} from '../../redux/slices'

const BUTTON_GAP = 10

const IMAGE_SIZE = (Dimensions.get('window').width - 40 - 32 - 18) / 3
const IMAGE_BORDER = IMAGE_SIZE / 2
const CIRCLE_SIZE = IMAGE_SIZE + 6
const CIRCLE_BORDER = CIRCLE_SIZE / 2
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2

export const EditCategory = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const user = useAppSelector(state => state.auth.user)
  // ******************** states  ********************
  const [init, setInit] = useState<boolean>(true) // 처음에만 검색해보세요! 화면 띄움
  const [singerSelected, setSingerSelected] = useState<boolean>(true) // 선택한 대분류
  const [keyword, setKeyword] = useState<string>('')
  const [result, setResult] = useState<ICategoryDto[]>([])
  const [userSelectedCategories, setUserSelectedCategories] = useState<IAccountCategoryDto[]>(user.accountCategoryDtoList)

  // ******************** react queries  ********************
  const searchCategoryQuery = useMutation(queryKeys.searchCategory, searchCategory, {
    // 검색 api
    onSuccess(data, variables, context) {
      console.log(data)
      setResult(data)
      console.log(data == '')
    },
    onError(error, variables, context) {
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
      console.log(error)
    },
  })
  const updateUserSelectedCategoryQuery = useMutation(queryKeys.accountInfo, updateUserSelectedCategory, {
    onSuccess(data, variables, context) {
      console.log('update success')
      queryClient.invalidateQueries(queryKeys.accountInfo)
      dispatch(updateCategory(userSelectedCategories))
      navigation.goBack()
    },
    onError(error, variables, context) {
      showMessage({
        message: '회원 정보 업데이트 중 에러가 발생했습니다',
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
  // ******************** callbacks  ********************
  const searchKeyword = useCallback(
    (keyword: string) => {
      // 입력 값이 없을 때는 리턴
      init && setInit(false) // 한번 검색을 하고 나면 init screen은 필요 없음
      searchCategoryQuery.mutate({
        job: singerSelected ? '가수' : '배우',
        nickName: keyword,
        birth: '',
        imgUrl: '',
        email: '',
      })
      setKeyword('')
    },
    [keyword, singerSelected],
  )

  const onPressRemoveCategory = useCallback(
    (param: IAccountCategoryDto) => {
      console.log('pressed')
      setUserSelectedCategories(userSelectedCategories =>
        userSelectedCategories.filter(item => {
          console.log(item, param)
          return item.job != param.job || item.categoryName != param.categoryName
        }),
      )
    },
    [userSelectedCategories],
  )

  const isSelected = useCallback(
    (category: ICategoryDto) => {
      return userSelectedCategories.filter(item => item.job == category.job && item.categoryName == category.nickName).length == 0 ? false : true
    },
    [userSelectedCategories],
  )

  const onPressCategory = useCallback(
    (category: ICategoryDto) => {
      if (isSelected(category)) {
        setUserSelectedCategories(userSelectedCategories.filter(item => item.job != category.job || item.categoryName != category.nickName))
      } else {
        if (userSelectedCategories.length == 5) {
          Alert.alert('최대 5명까지 선택 가능합니다')
          return
        }
        const temp = userSelectedCategories.slice()
        temp.unshift({
          job: category.job,
          categoryName: category.nickName,
          accountIdx: 0,
        })

        setUserSelectedCategories(temp)
      }
    },
    [userSelectedCategories],
  )

  const onPressSave = useCallback(() => {
    if (userSelectedCategories.length == 0) {
      Alert.alert('최소 한 개의 카테고리를 선택해야 합니다.')
      return
    }
    let accountDto: IUpdateCategoryDto = {
      accountIdx: user.accountIdx,
      accountCategoryDto: userSelectedCategories,
    }
    console.log(accountDto)
    updateUserSelectedCategoryQuery.mutate(accountDto)
  }, [userSelectedCategories, user])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="카테고리 설정" x goBack />
      <View style={[theme.styles.wrapper, {flex: 1}]}>
        <View style={[styles.mainCategoryContainer]}>
          <Button
            selected={singerSelected}
            label="가수"
            style={{width: BUTTON_WIDTH}}
            onPress={() => {
              setSingerSelected(true)
              setInit(true)
            }}
          />
          <Button
            selected={!singerSelected}
            label="배우"
            style={{width: BUTTON_WIDTH}}
            onPress={() => {
              setInit(true)

              setSingerSelected(false)
            }}
          />
        </View>
        <SearchStar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} />
        <View style={{flex: 1}}>
          <View style={[theme.styles.rowFlexStart, {flexWrap: 'wrap', marginBottom: 16}, result.length == 0 && {position: 'absolute', zIndex: 1}]}>
            {userSelectedCategories.length > 0 &&
              userSelectedCategories.map(item => (
                <View key={item.categoryName + item.job} style={[theme.styles.rowFlexStart, {marginBottom: 8}, styles.selectedCategoryButton]}>
                  <Text style={[{marginRight: 8}, theme.styles.text14]}>{item.categoryName}</Text>
                  <XSmallIcon size={16} onPress={() => onPressRemoveCategory(item)} />
                </View>
              ))}
          </View>
          {init == true ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={theme.styles.bold20}>관심 있는 스타를 검색해 보세요!</Text>
            </View>
          ) : result.length == 0 ? (
            <EmptyResult />
          ) : (
            <FlatList
              data={result}
              numColumns={3}
              columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16}}
              renderItem={({item, index}) => (
                <View style={{width: CIRCLE_SIZE}}>
                  <Pressable style={[styles.pressableView, isSelected(item) && styles.selectedPressable]} onPress={() => onPressCategory(item)}>
                    {isSelected(item) && <CheckboxMainIcon style={styles.checkboxMain} />}
                    <FastImage style={styles.image} source={{uri: item.imgUrl}}></FastImage>
                  </Pressable>
                  <Text style={styles.starName}>{item.nickName}</Text>
                </View>
              )}></FlatList>
          )}
        </View>
      </View>
      <FloatingBottomButton
        label="저장하기"
        enabled={user.accountCategoryDtoList != userSelectedCategories && updateUserSelectedCategoryQuery.isLoading == false}
        onPress={onPressSave}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectedCategoryButton: {
    backgroundColor: theme.gray50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 26,
    marginRight: 8,
  },
  starName: {
    color: theme.gray700,
    marginTop: 8,
    textAlign: 'center',
  },
  checkboxMain: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 1,
  },
  selectedPressable: {
    backgroundColor: theme.main,
  },
  pressableView: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    //width: IMAGE_SIZE,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,

    borderRadius: IMAGE_BORDER,
    resizeMode: 'cover',
  },
  tagContainer: {
    backgroundColor: theme.gray50,
    marginRight: 8,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 26,
    marginBottom: 8,
  },

  mainCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
})
