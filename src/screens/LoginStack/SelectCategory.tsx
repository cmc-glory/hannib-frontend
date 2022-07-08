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
import {IStar, IAccountDto, ICategoryDto} from '../../types'
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

  console.log(' params from before : ', email, name, profileImage)

  // ******************** react queries  ********************
  const postSignUpQuery = useMutation(queryKeys.signUp, postSignUp, {
    onSuccess(data) {
      console.log('sign up success')
      console.log('data : ', data)

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
    onSuccess(data, variables, context) {
      console.log(data)
      setResult(data)
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })
  // ******************** states  ********************
  const [init, setInit] = useState<boolean>(true) // 처음에만 검색해보세요! 화면 띄움
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [starsAll, setStarsAll] = useState<IStar[]>([]) // 서버에서 받아온 연예인 데이터 전부
  // const [singers, setSingers] = useState<IStar[]>([]) // 서버에서 받아온 가수 데이터 전부
  // const [actors, setActors] = useState<IStar[]>([]) // 서버에서 받아온 배우 데이터 전부
  const [stars, setStars] = useState<IStar[]>([]) // 프론트 단에서 보여줄 연예인 데이터
  const [result, setResult] = useState<ICategoryDto>()
  const [selectedStars, setSelectedStars] = useState<IStar[]>([]) // 사용자가 선택한 카테고리
  const [keyword, setKeyword] = useState<string>('')

  // ******************** callbacks  ********************
  const onPressSinger = useCallback(() => {
    setSingerSelected(true)
    //setStars(singers)
  }, [])
  const onPressActor = useCallback(() => {
    setSingerSelected(false)
    //setStars(actors)
  }, [])

  const searchKeyword = useCallback(
    (keyword: string) => {
      // 입력 값이 없을 때는 리턴
      if (keyword == '') return
      init && setInit(false) // 한번 검색을 하고 나면 init screen은 필요 없음
      //setStars(starsAll.filter(star => star.name.includes(keyword)))
      const tempKeyword = keyword
      searchCategoryQuery.mutate(tempKeyword)
      setKeyword('')
    },
    [keyword],
  )

  const onPressSelectCompletion = useCallback(() => {
    const accessToken = '111111'
    const refreshToken = '222222'

    storeString('accessToken', accessToken)
    storeString('refreshToken', refreshToken)

    dispatch(storeAccessToken(accessToken)) // access token redux에 저장
    dispatch(storeRefreshToken(refreshToken)) // refresh token redux에 저장
    // 사용자 정보 (email, name, selected category) redux에 저장
    dispatch(
      login({
        email,
        name,
        profileImageUri: profileImage,
        userCategory: selectedStars.map(category => {
          return {id: category.id, name: category.name}
        }),
        accountIdx: 0,
        holdingSharingCnt: 0,
        participateSharingCnt: 0,
      }),
    )
    const accountIdx = 0
    const accountDto: IAccountDto = {
      accountCategoryDtoList: [
        {
          accountIdx,
          job: '가수',
          categoryName: 'BTS',
        },
      ],
      accountIdx,
      creatorId: name,
      accountImg: profileImage == '' ? null : profileImage,
      email,
    }

    console.log(accountDto)

    //postSignUpQuery.mutate(accountDto)
    navigation.navigate('MainTabNavigator')
  }, [selectedStars])

  const onPressCategory = useCallback(
    (category: IStar) => {
      const {id} = category

      const selected: boolean = selectedStars.map(item => item.id).includes(id)
      // 최대 선택 개수 초과
      if (selectedStars.length == 5) {
        if (!selected) {
          // 선택된 5개 외에 다른 걸 선택한 경우
          Alert.alert('최대 5명까지 선택 가능합니다')
          return
        }
      }

      if (selected) {
        setSelectedStars(selectedStars => selectedStars.filter(item => item.id != id))
      } else {
        setSelectedStars(selectedStars => [...selectedStars, category])
      }
    },
    [stars, selectedStars],
  )

  const onPressRemove = useCallback((id: string) => {
    setSelectedStars(selectedStars => selectedStars.filter(item => item.id != id))
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="카테고리" />
      <View style={[theme.styles.wrapper]}>
        <View style={[styles.mainCategoryContainer]}>
          <Button selected={singerSelected} label="가수" style={{width: BUTTON_WIDTH}} onPress={onPressSinger} />
          <Button selected={!singerSelected} label="배우" style={{width: BUTTON_WIDTH}} onPress={onPressActor} />
        </View>

        <SearchStar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} />
        <View style={[theme.styles.rowFlexStart, {flexWrap: 'wrap'}]}>
          {selectedStars.map(item => (
            <SelectedStarTag key={item.name + item.id} item={item} onPressRemove={onPressRemove} />
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>
        {init == true ? (
          <InitScreen />
        ) : stars.length == 0 ? (
          <EmptyResult />
        ) : (
          // <FlatList
          //   data={stars}
          //   renderItem={({item, index}) => (
          //     <CategoryItem
          //       category={item}
          //       onPress={onPressCategory}
          //       selectedStars={selectedStars}
          //       imageSize={IMAGE_SIZE}
          //       imageBorder={IMAGE_BORDER}
          //       circleSize={CIRCLE_SIZE}
          //       circleBorder={CIRCLE_BORDER}
          //       index={index}
          //     />
          //   )}
          //   numColumns={3}
          //   columnWrapperStyle={{justifyContent: 'flex-start', marginVertical: 10}}
          //   contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE}}
          // />
          // <CategoryItem
          //   category={result}
          //   onPress={onPressCategory}
          //   selectedStars={selectedStars}
          //   imageSize={IMAGE_SIZE}
          //   imageBorder={IMAGE_BORDER}
          //   circleSize={CIRCLE_SIZE}
          //   circleBorder={CIRCLE_BORDER}
          // />
          <View></View>
        )}
        <FloatingBottomButton label="선택 완료" enabled={true} onPress={onPressSelectCompletion} />
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
