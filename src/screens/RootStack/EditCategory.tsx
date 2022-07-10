import React, {useMemo, useState, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import {useMutation, useQuery} from 'react-query'

import {StackHeader, Button, CategoryItem, FloatingBottomButton, XIcon} from '../../components/utils'
import {SearchStar, EmptyResult} from '../../components/LoginStack'
import * as theme from '../../theme'
import {IStar, IAccountCategoryDto} from '../../types'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {getAccountInfo, queryKeys} from '../../api'

const BUTTON_GAP = 10

type SelectedStarTagProps = {
  item: IAccountCategoryDto
  onPressRemove: () => void
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
      <XIcon size={16} onPress={() => onPressRemove()} style={{marginLeft: 8}} />
    </View>
  )
}

export const EditCategory = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  //const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const accountIdx = 2

  console.log('accountIdx : ', accountIdx)

  const BUTTON_WIDTH = useMemo(() => (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2, [])

  // ******************** states  ********************
  const [singerSelected, setSingerSelected] = useState<boolean>(true) // 선택한 대분류
  const [keyword, setKeyword] = useState<string>('')
  const [userCategories, setUserCategories] = useState<IAccountCategoryDto[]>([])
  var account = {}

  const searchKeyword = useCallback(
    (keyword: string) => {
      // 입력 값이 없을 때는 리턴
      if (keyword == '') return
      setKeyword('')
    },
    [keyword],
  )

  // ******************** react queries  ********************
  useQuery(queryKeys.category, () => getAccountInfo(accountIdx), {
    onSuccess(data) {
      account = data
      if (data.accountCategoryDtoList) {
        setUserCategories(data.accountCategoryDtoList)
      }
    },
    onError(err) {
      console.log('err')
      console.log(err)
    },
  })

  const removeCategoryQuery = useMutation(queryKeys.category)

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="카테고리 설정" x goBack />
      <View style={theme.styles.wrapper}>
        <View style={[styles.mainCategoryContainer]}>
          <Button
            selected={singerSelected}
            label="가수"
            style={{width: BUTTON_WIDTH}}
            onPress={() => {
              setSingerSelected(true)
            }}
          />
          <Button
            selected={!singerSelected}
            label="배우"
            style={{width: BUTTON_WIDTH}}
            onPress={() => {
              setSingerSelected(false)
            }}
          />
        </View>
        <SearchStar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} />
        <View style={[theme.styles.rowFlexStart, {flexWrap: 'wrap'}]}>
          {userCategories.map(item => (
            <SelectedStarTag key={item.category + item.accountIdx} item={item} onPressRemove={onPressRemove} />
          ))}
        </View>
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
