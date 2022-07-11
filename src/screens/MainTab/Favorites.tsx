import React, {useEffect, useRef, useState, useCallback} from 'react'
import {View, Text, FlatList, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useAppSelector} from '../../hooks'
import {StackHeader} from '../../components/utils'
import {NanumListItem} from '../../components/MainTab'
import {INanumListItem} from '../../types'
import * as theme from '../../theme'

type CategoryItemProps = {
  name: string
  id: string
  onPressCategory: (id: string, index: number) => void
  selectedCategory: string
  currentIndex: number
  selectedIndex: number
  scrollRef: React.RefObject<ScrollView>
}

const CategoryItem = ({name, id, onPressCategory, selectedCategory, currentIndex, selectedIndex, scrollRef}: CategoryItemProps) => {
  const selected = id == selectedCategory
  return (
    <Pressable
      onPress={() => onPressCategory(id, currentIndex)}
      style={[styles.categoryButton, selected ? styles.selectedCategoryButton : styles.unselectedCategoryButton]}>
      <Text style={selected ? styles.selectedCategoryText : styles.unselectedCategoryText}>{name}</Text>
    </Pressable>
  )
}

export const Favorites = () => {
  // ******************** utils ********************
  const scrollRef = useRef<ScrollView>(null)
  // ******************** states ********************
  const [selectedCategory, setSelectedCategory] = useState<string>('0') // 선택된 카테고리의 id값 저장. (처음엔 전체의 id값)
  const [sharings, setSharings] = useState<INanumListItem[]>([]) // 나눔 리스트
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 로딩 끝났는지
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
      })
  }, [])

  const onPressCategory = useCallback((id: string, currentIndex: number) => {
    setSelectedCategory(id)
    setSelectedIndex(currentIndex)
    // 해당 id에 일치하는 나눔 리스트만 state에 저장.
  }, [])

  // refresh pull up 하면 서버에서 가져옴
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch('http://localhost:8081/src/data/dummyNanums.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
        setRefreshing(false)
      })
  }, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]} edges={['top', 'left', 'right']}>
      <StackHeader title="찜한 리스트" />
      {isLoggedIn ? (
        <View>
          <View style={styles.container}>
            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginBottom: 10}}>
              <CategoryItem
                currentIndex={0}
                selectedIndex={selectedIndex}
                id="0"
                name="전체"
                onPressCategory={onPressCategory}
                selectedCategory={selectedCategory}
                scrollRef={scrollRef}
              />
              <CategoryItem
                currentIndex={1}
                selectedIndex={selectedIndex}
                id="1"
                name="BTS"
                onPressCategory={onPressCategory}
                selectedCategory={selectedCategory}
                scrollRef={scrollRef}
              />
              <CategoryItem
                selectedIndex={selectedIndex}
                currentIndex={2}
                id="2"
                name="세븐틴"
                onPressCategory={onPressCategory}
                selectedCategory={selectedCategory}
                scrollRef={scrollRef}
              />
              <CategoryItem
                selectedIndex={selectedIndex}
                currentIndex={3}
                id="3"
                name="아이브"
                onPressCategory={onPressCategory}
                selectedCategory={selectedCategory}
                scrollRef={scrollRef}
              />
            </ScrollView>
          </View>

          <FlatList
            contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
            data={sharings}
            renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
            refreshing={refreshing}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
            onRefresh={onRefresh}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}></View>
      )}
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
    // fontFamily: 'Pretendard-Bold',
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
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
