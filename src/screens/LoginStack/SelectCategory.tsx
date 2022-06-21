import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {View, StyleSheet, Dimensions, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {StackHeader, Button, CategoryItem, FloatingBottomButton} from '../../components/utils'
import {SearchStar, EmptyResult} from '../../components/LoginStack'
import * as theme from '../../theme'
import {IStar} from '../../types'

const BUTTON_GAP = 10

export const SelectCategory = () => {
  const navigation = useNavigation()

  const BUTTON_WIDTH = useMemo(() => (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2, [])
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [starsAll, setStarsAll] = useState<IStar[]>([]) // 서버에서 받아온 연예인 데이터 전부
  const [singers, setSingers] = useState<IStar[]>([]) // 서버에서 받아온 가수 데이터 전부
  const [actors, setActors] = useState<IStar[]>([]) // 서버에서 받아온 배우 데이터 전부
  const [stars, setStars] = useState<IStar[]>([]) // 프론트 단에서 보여줄 연예인 데이터
  const [selectedStars, setSelectedStars] = useState<IStar[]>([]) // 사용자가 선택한 카테고리

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
    navigation.navigate('MainTabNavigator')
  }, [selectedStars])

  const onPressCategory = useCallback(
    (category: IStar) => {
      const {id} = category

      // 최대 선택 개수 초과
      if (selectedStars.length == 5) {
        const found = selectedStars.filter(star => star.id == id) // 5개 중 하나 선택 해제하는 경우

        if (found.length == 0) {
          // 선택된 5개 외에 다른 걸 선택한 경우
          Alert.alert('최대 5명까지 선택 가능합니다')
          return
        }
      }

      if (singerSelected) {
        const tempSinger = singers.map(star => {
          if (star.id == id) {
            star.selected = !star.selected
            star.selected ? setSelectedStars([...selectedStars, category]) : setSelectedStars(selectedStars.filter(selectedStar => selectedStar.id !== id))
          }
          return star
        })
        setSingers(tempSinger)
        setStars(tempSinger)
      } else {
        const tempActor = actors.map(star => {
          if (star.id == id) {
            star.selected = !star.selected
            star.selected ? setSelectedStars([...selectedStars, category]) : setSelectedStars(selectedStars.filter(selectedStar => selectedStar.id !== id))
          }
          return star
        })
        setActors(tempActor)
        setStars(tempActor)
      }
    },
    [stars],
  )

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="카테고리" />
      <View style={[theme.styles.wrapper, {flex: 1}]}>
        <View style={[styles.mainCategoryContainer]}>
          <Button selected={singerSelected} label="가수" style={{width: BUTTON_WIDTH}} onPress={onPressSinger} />
          <Button selected={!singerSelected} label="배우" style={{width: BUTTON_WIDTH}} onPress={onPressActor} />
        </View>
        <SearchStar starsAll={starsAll} setStars={setStars} />
        {stars.length == 0 ? (
          <EmptyResult />
        ) : (
          <FlatList
            data={stars}
            renderItem={({item}) => <CategoryItem category={item} onPress={onPressCategory} />}
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'space-between', marginVertical: 10}}
          />
        )}
      </View>
      <FloatingBottomButton label="선택 완료" enabled={selectedStars.length != 0} onPress={onPressSelectCompletion} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
