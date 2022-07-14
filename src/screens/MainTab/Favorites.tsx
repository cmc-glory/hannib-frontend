import React, {useEffect, useRef, useState, useCallback} from 'react'
import {View, Text, FlatList, ScrollView, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {EmptyIcon} from '../../components/utils'
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
  scrollRef: React.RefObject<FlatList>
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
  const scrollRef = useRef<FlatList>(null)
  const user = useAppSelector(state => state.auth.user)
  console.log(user)

  // ******************** states ********************
  const [selectedCategory, setSelectedCategory] = useState<string>('0') // 선택된 카테고리의 id값 저장. (처음엔 전체의 id값)
  const [sharings, setSharings] = useState<INanumListItem[]>([]) // 나눔 리스트
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 로딩 끝났는지
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const onPressCategory = useCallback((id: string, currentIndex: number) => {
    setSelectedCategory(id)
    setSelectedIndex(currentIndex)
    scrollRef.current?.scrollToIndex({index: currentIndex})
    // 해당 id에 일치하는 나눔 리스트만 state에 저장.
  }, [])

  // refresh pull up 하면 서버에서 가져옴
  const onRefresh = useCallback(() => {}, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]} edges={['top', 'left', 'right']}>
      <StackHeader title="찜한 리스트" />
      {isLoggedIn ? (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            {user.accountCategoryDtoList != null && (
              <FlatList
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginBottom: 10}}
                data={[{categoryName: '전체보기'}].concat(user.accountCategoryDtoList)}
                renderItem={({item, index}) =>
                  index == 0 ? (
                    <CategoryItem
                      name={'전체보기'}
                      currentIndex={index}
                      selectedIndex={selectedIndex}
                      id={index.toString()}
                      onPressCategory={onPressCategory}
                      selectedCategory={selectedCategory}
                      scrollRef={scrollRef}
                    />
                  ) : (
                    <CategoryItem
                      name={item.categoryName}
                      currentIndex={index}
                      selectedIndex={selectedIndex}
                      id={index.toString()}
                      onPressCategory={onPressCategory}
                      selectedCategory={selectedCategory}
                      scrollRef={scrollRef}
                    />
                  )
                }></FlatList>
            )}
          </View>

          {sharings.length > 0 ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
              data={sharings}
              renderItem={({item}) => <NanumListItem item={item}></NanumListItem>}
              refreshing={refreshing}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
              onRefresh={onRefresh}
            />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <EmptyIcon style={{marginBottom: 32}} />
              <View>
                <Text style={[theme.styles.bold20, {marginBottom: 8}]}>현재 찜 리스트가 비어있어요.</Text>
                <View>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>관심 있는, 오픈 예정인 나눔을</Text>
                  <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>찜 리스트에 추가해보세요!</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <EmptyIcon style={{marginBottom: 32}} />
          <View>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>현재 찜 리스트가 비어있어요.</Text>
            <View>
              <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>관심 있는, 오픈 예정인 나눔을</Text>
              <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>찜 리스트에 추가해보세요!!</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selectedCategoryButton: {
    borderColor: theme.secondary,
    backgroundColor: theme.secondary,
    paddingHorizontal: 12,
  },
  unselectedCategoryButton: {
    borderColor: theme.gray500,
    backgroundColor: theme.white,
    paddingHorizontal: 12,
  },
  selectedCategoryText: {
    color: theme.white,
    fontFamily: 'Pretendard-SemiBold',
  },
  unselectedCategoryText: {
    color: theme.gray500,
    fontFamily: 'Pretendard-SemiBold',
  },
  categoryButton: {
    paddingVertical: 6,
    //paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Pretendard-Medium',
  },
  container: {
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
