import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {SelectCategoryRouteProps} from '../../navigation/LoginStackNavigator'
import {StackHeader, Button, CategoryItem, FloatingBottomButton, XIcon} from '../../components/utils'
import {SearchStar, EmptyResult, InitScreen} from '../../components/LoginStack'
import * as theme from '../../theme'
import {IStar, IAccountDto, IAccountCategoryDto, ICategoryDto} from '../../types'
import {storeAccessToken, storeRefreshToken, login} from '../../redux/slices'
import {useAppDispatch, storeString} from '../../hooks'
import {queryKeys, postSignUp, searchCategory} from '../../api'

const BUTTON_GAP = 10

type SelectedStarTagProps = {
  item: IStar
  onPressRemove: (id: string) => void
}

const IMAGE_SIZE = (Dimensions.get('window').width - 40 - 32 - 18) / 3
const IMAGE_BORDER = IMAGE_SIZE / 2
const CIRCLE_SIZE = IMAGE_SIZE + 6
const CIRCLE_BORDER = CIRCLE_SIZE / 2

const SelectedStarTag = ({item, onPressRemove}: SelectedStarTagProps) => {
  const {name, id} = item
  return (
    <View style={[theme.styles.rowSpaceBetween, styles.tagContainer]}>
      <Text style={[theme.styles.text14]}>{name}</Text>
      <XIcon size={16} onPress={() => onPressRemove(id)} style={{marginLeft: 8}} />
    </View>
  )
}

export const SelectCategory = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const route = useRoute<SelectCategoryRouteProps>()
  const dispatch = useAppDispatch()
  const BUTTON_WIDTH = useMemo(() => (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2, [])
  const {email, name, profileImage} = useMemo(() => route.params, [])
  var accountCategoryDtoList: IAccountCategoryDto[] = []

  console.log(' params from before : ', email, name, profileImage)

  // ******************** react queries  ********************
  const postSignUpQuery = useMutation(queryKeys.signUp, postSignUp, {
    // 회원 가입 api
    onSuccess(data) {
      console.log('sign up success')
      console.log('data : ', data)

      dispatch(
        login({
          email: email,
          name: name,
          userCategory: accountCategoryDtoList,
          profileImageUri: profileImage,
          holdingSharingCnt: 0,
          participateSharingCnt: 0,
          accountIdx: 0,
        }),
      )
      navigation.navigate('MainTabNavigator')
    },
    onError(error) {
      showMessage({
        // 에러 안내 메세지
        message: '회원 가입 중 에러가 발생했습니다',
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

  const searchCategoryQuery = useMutation(queryKeys.searchCategory, searchCategory, {
    // 검색 api
    onSuccess(data, variables, context) {
      setResult(data)
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
  // ******************** states  ********************
  const [init, setInit] = useState<boolean>(true) // 처음에만 검색해보세요! 화면 띄움
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [keyword, setKeyword] = useState<string>('')
  const [result, setResult] = useState<ICategoryDto>({
    job: '가수',
    nickName: '방탄소년단',
    birth: '2013-06-13',
    imgUrl:
      'https://blogfiles.pstatic.net/MjAyMjA3MTBfMzYg/MDAxNjU3MzgxMzg5MjU1.zlXIrPWz8E-j2jq6eIWuP49vm-816tGDYDdC4QG8trYg.uGunW_xEVY94e47Y7klDCopWJXtmi754xw4f7r83oZwg.JPEG.js7056/bts.jpeg?type=w1',
    email: 'glory@gmail.com',
  })

  // ******************** callbacks  ********************
  const searchKeyword = useCallback(
    // 검색 api 호출
    (keyword: string) => {
      // 입력 값이 없을 때는 리턴
      if (keyword == '') return
      init && setInit(false) // 한번 검색을 하고 나면 init screen은 필요 없음
      //setStars(starsAll.filter(star => star.name.includes(keyword)))
      //const tempKeyword = keyword
      searchCategoryQuery.mutate(keyword)
      setKeyword('')
    },
    [keyword],
  )

  const onPressSignUp = useCallback(() => {
    accountCategoryDtoList.push({
      accountIdx: 0,
      job: result.job,
      category: result.nickName,
    })
    // 회원가입 api 호출
    const signUpForm: IAccountDto = {
      accountCategoryDtoList: accountCategoryDtoList,
      accountIdx: 0,
      creatorId: name,
      accountImg: profileImage,
      email: email,
    }
    //postSignUpQuery.mutate(signUpForm)
    dispatch(
      login({
        email: email,
        name: name,
        userCategory: accountCategoryDtoList,
        profileImageUri: profileImage,
        holdingSharingCnt: 0,
        participateSharingCnt: 0,
        accountIdx: 0,
      }),
    )
    navigation.navigate('MainTabNavigator')
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="카테고리" />
      <View style={[theme.styles.wrapper]}>
        <View style={[styles.mainCategoryContainer]}>
          <Button selected={singerSelected} label="가수" style={{width: BUTTON_WIDTH}} onPress={() => setSingerSelected(true)} />
          <Button selected={!singerSelected} label="배우" style={{width: BUTTON_WIDTH}} onPress={() => setSingerSelected(true)} />
        </View>

        <SearchStar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} />
        <Text>{JSON.stringify(result)}</Text>
        <FloatingBottomButton label="선택 완료" enabled={true} onPress={onPressSignUp} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: theme.gray50,
    marginRight: 8,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 26,
    marginBottom: 8,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  mainCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
})
