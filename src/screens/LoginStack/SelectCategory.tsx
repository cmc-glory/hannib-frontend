import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {SelectCategoryRouteProps} from '../../navigation/LoginStackNavigator'
import {StackHeader, Button, CategoryItem, FloatingBottomButton, XIcon} from '../../components/utils'
import {SearchStar, EmptyResult} from '../../components/LoginStack'
import * as theme from '../../theme'
import {IStar} from '../../types'
import {login, storeAccessToken, storeRefreshToken} from '../../redux/slices'
import {useAppSelector, useAppDispatch} from '../../hooks'
import {storeString} from '../../hooks'

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
      <Text>{name}</Text>
      <XIcon size={20} onPress={() => onPressRemove(id)} />
    </View>
  )
}

export const SelectCategory = () => {
  const navigation = useNavigation()
  const route = useRoute<SelectCategoryRouteProps>()
  const dispatch = useAppDispatch()
  const BUTTON_WIDTH = useMemo(() => (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2, [])
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [starsAll, setStarsAll] = useState<IStar[]>([]) // 서버에서 받아온 연예인 데이터 전부
  const [singers, setSingers] = useState<IStar[]>([]) // 서버에서 받아온 가수 데이터 전부
  const [actors, setActors] = useState<IStar[]>([]) // 서버에서 받아온 배우 데이터 전부
  const [stars, setStars] = useState<IStar[]>([]) // 프론트 단에서 보여줄 연예인 데이터
  const [selectedStars, setSelectedStars] = useState<IStar[]>([]) // 사용자가 선택한 카테고리

  const {email, name, profileImage} = useMemo(() => route.params, [])

  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummyStars.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        result.forEach((item: any) => (item.selected = false)) // selected 초기화
        setStarsAll(result)
        const singers = result.filter((item: any) => item.maincategory == 'singer') // 가수만 골라서
        setSingers(singers) // singer에 저장
        setActors(result.filter((item: any) => item.maincategory == 'actor')) // 배우만 골라서 actors에 저장

        setStars(singers) // 초기 보여줄 화면은 singers
        setSelectedStars([])
      })
  }, [])

  const onPressSinger = useCallback(() => {
    setSingerSelected(true)
    setStars(singers)
  }, [singers])
  const onPressActor = useCallback(() => {
    setSingerSelected(false)
    setStars(actors)
  }, [actors])

  const onPressSelectCompletion = useCallback(() => {
    if (selectedStars.length == 0) return
    // email, name, image, category 백으로 전송하는 api.
    // 그리고 access token, refresh token 받아옴.

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
        profileImageUri: profileImage.uri,
        userCategory: selectedStars.map(category => {
          return {id: category.id, name: category.name}
        }),
      }),
    )

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

        <SearchStar starsAll={starsAll} setStars={setStars} />
        <View style={[theme.styles.rowFlexStart, {flexWrap: 'wrap'}]}>
          {selectedStars.map(item => (
            <SelectedStarTag key={item.name + item.id} item={item} onPressRemove={onPressRemove} />
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>
        {stars.length == 0 ? (
          <EmptyResult />
        ) : (
          <FlatList
            data={stars}
            renderItem={({item, index}) => (
              <CategoryItem
                category={item}
                onPress={onPressCategory}
                selectedStars={selectedStars}
                imageSize={IMAGE_SIZE}
                imageBorder={IMAGE_BORDER}
                circleSize={CIRCLE_SIZE}
                circleBorder={CIRCLE_BORDER}
                index={index}
              />
            )}
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'flex-start', marginVertical: 10}}
            contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE}}
          />
        )}
      </View>

      <FloatingBottomButton label="선택 완료" enabled={selectedStars.length != 0} onPress={onPressSelectCompletion} />
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
