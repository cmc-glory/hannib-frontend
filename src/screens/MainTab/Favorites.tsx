import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, FlatList, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader} from '../../components/utils'
import {GoodsListItemVer2} from '../../components/MainTab'
import {ISharingInfo} from '../../types'
import * as theme from '../../theme'

type CategoryItemProps = {
  name: string
  id: string
  onPressCategory: (id: string) => void
  selectedCategory: string
}

const CategoryItem = ({name, id, onPressCategory, selectedCategory}: CategoryItemProps) => {
  const selected = id == selectedCategory
  return (
    <Pressable onPress={() => onPressCategory(id)} style={[styles.categoryButton, selected ? styles.selectedCategoryButton : styles.unselectedCategoryButton]}>
      <Text style={selected ? styles.selectedCategoryText : styles.unselectedCategoryText}>{name}</Text>
    </Pressable>
  )
}

export const Favorites = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('0') // 선택된 카테고리의 id값 저장. (처음엔 전체의 id값)
  const [sharings, setSharings] = useState<ISharingInfo[]>([]) // 나눔 리스트
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 로딩 끝났는지

  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
      })
  }, [])

  const onPressCategory = useCallback((id: string) => {
    setSelectedCategory(id)

    // 해당 id에 일치하는 나눔 리스트만 state에 저장.
  }, [])

  // refresh pull up 하면 서버에서 가져옴
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
        setRefreshing(false)
      })
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]} edges={['top', 'left', 'right']}>
      <StackHeader title="찜한 리스트" />
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryItem id="0" name="전체" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
          <CategoryItem id="1" name="BTS" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
          <CategoryItem id="2" name="세븐틴" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
          <CategoryItem id="3" name="아이브" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
          <CategoryItem id="4" name="STACY" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
          <CategoryItem id="5" name="르세라핌" onPressCategory={onPressCategory} selectedCategory={selectedCategory} />
        </ScrollView>
      </View>

      <FlatList
        contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
        data={sharings}
        renderItem={({item}) => <GoodsListItemVer2 item={item}></GoodsListItemVer2>}
        refreshing={refreshing}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectedCategoryButton: {
    borderColor: theme.secondary,
    backgroundColor: theme.secondary,
  },
  unselectedCategoryButton: {
    borderColor: theme.gray500,
    backgroundColor: theme.white,
  },
  selectedCategoryText: {
    color: theme.white,
    fontFamily: 'Pretendard-Bold',
  },
  unselectedCategoryText: {
    color: theme.gray500,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {},
  container: {
    padding: theme.PADDING_SIZE,
  },
})