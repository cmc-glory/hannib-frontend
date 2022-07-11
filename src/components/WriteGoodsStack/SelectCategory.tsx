import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet, Pressable, Dimensions, Alert} from 'react-native'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import FastImage from 'react-native-fast-image'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper'
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types'

import {Button, CheckboxMainIcon, FloatingBottomButton, XSmallIcon} from '../utils'
import {SearchStar, EmptyResult} from '../LoginStack'
import {IAccountCategoryDto, ICategoryDto} from '../../types'
import {queryKeys, searchCategory} from '../../api'
import * as theme from '../../theme'

type SelectCategoryBannerProps = {
  category: {
    category: string
    job: '가수' | '배우'
  }
  setCategory: React.Dispatch<
    React.SetStateAction<{
      category: string
      job: '가수' | '배우'
    }>
  >
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}

const BUTTON_GAP = 10
const IMAGE_SIZE = (Dimensions.get('window').width - 40 - 32 - 18) / 3
const IMAGE_BORDER = IMAGE_SIZE / 2
const CIRCLE_SIZE = IMAGE_SIZE + 8
const CIRCLE_BORDER = CIRCLE_SIZE / 2
const BOTTOM_SPACE = getBottomSpace()
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2
const iphoneX = isIphoneX()

export const SelectCategory = ({category, setCategory, bottomSheetRef}: SelectCategoryBannerProps) => {
  // ******************** states ********************
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [keyword, setKeyword] = useState<string>('')
  const [init, setInit] = useState<boolean>(true) // 청므에 검색해보세요! 띄울 지
  const [result, setResult] = useState<ICategoryDto | ''>('')

  // ******************** react quries ********************
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
  const searchKeyword = useCallback(
    // 검색 api 호출
    (keyword: string) => {
      // 입력 값이 없을 때는 리턴
      if (keyword == '') return
      init && setInit(false) // 한번 검색을 하고 나면 init screen은 필요 없음

      searchCategoryQuery.mutate(keyword)
      setKeyword('')
    },
    [keyword],
  )

  // ******************** callbacks ********************

  const onPressCategory = useCallback(
    (item: ICategoryDto) => {
      // 이미 선택된 카테고리가 있는 경우에는 리턴
      if (category.category != '') {
        if (item.nickName == category.category) {
          setCategory({
            category: '',
            job: '가수',
          })
        } else {
          Alert.alert('카테고리는 최대 1개 선택 가능합니다.', '', [{text: '확인'}])
          return
        }
      }

      setCategory({category: item.nickName, job: item.job})
    },
    [category],
  )

  const onPressX = useCallback(() => {
    setCategory({
      category: '',
      job: '가수',
    })
  }, [])

  const onPressComplete = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  return (
    <View style={{flex: 1}}>
      <View style={[theme.styles.wrapper, {flex: 1}]}>
        <View style={[styles.mainCategoryContainer]}>
          <Button selected={singerSelected} label="가수" style={{width: BUTTON_WIDTH}} onPress={() => setSingerSelected(true)} />
          <Button selected={!singerSelected} label="배우" style={{width: BUTTON_WIDTH}} onPress={() => setSingerSelected(false)} />
        </View>

        <SearchStar keyword={keyword} setKeyword={setKeyword} searchKeyword={searchKeyword} label="카테고리를 선택해 주세요." />
        {category.category != '' && (
          <View style={[theme.styles.rowFlexStart, {marginBottom: 16}, styles.selectedCategoryButton]}>
            <Text style={[{marginRight: 8}, theme.styles.text14]}>{category.category}</Text>
            <XSmallIcon size={16} onPress={onPressX} />
          </View>
        )}
        {init == true ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={theme.styles.bold20}>관심 있는 스타를 검색해 보세요!</Text>
          </View>
        ) : result == '' ? (
          <EmptyResult />
        ) : (
          <View style={{width: CIRCLE_SIZE}}>
            <Pressable style={[styles.pressableView, category.category == result.nickName && styles.selectedPressable]} onPress={() => onPressCategory(result)}>
              {category.category == result.nickName && <CheckboxMainIcon style={styles.checkboxMain} />}
              <FastImage style={styles.image} source={{uri: result.imgUrl}}></FastImage>
            </Pressable>
            <Text style={styles.starName}>{result.nickName}</Text>
          </View>
        )}
      </View>

      <View style={[iphoneX && {marginBottom: BOTTOM_SPACE}]}>
        <FloatingBottomButton label="선택 완료" enabled={true} onPress={onPressComplete} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  checkboxMain: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 1,
  },
  selectedPressable: {
    backgroundColor: theme.main,
    borderRadius: CIRCLE_BORDER,
  },
  pressableView: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: theme.gray50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderRadius: 26,
  },
  starName: {
    color: theme.gray700,
    marginTop: 8,
    textAlign: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_BORDER,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
})
