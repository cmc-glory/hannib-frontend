import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import FastImage from 'react-native-fast-image'
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper'
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types'

import {Button, CheckboxMainIcon, FloatingBottomButton, XSmallIcon} from '../utils'
import {SearchStar} from '../LoginStack'
import {IAccountCategoryDto, ICategoryDto} from '../../types'
import {queryKeys, searchCategory} from '../../api'
import * as theme from '../../theme'

type SelectCategoryBannerProps = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  bottomSheetRef: React.RefObject<BottomSheetMethods>
}

const BUTTON_GAP = 10
const IMAGE_SIZE = (Dimensions.get('window').width - 40 - 32 - 18) / 3
const BOTTOM_SPACE = getBottomSpace()
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - BUTTON_GAP) / 2
const iphoneX = isIphoneX()

export const SelectCategory = ({category, setCategory, bottomSheetRef}: SelectCategoryBannerProps) => {
  // ******************** states ********************
  const [singerSelected, setSingerSelected] = useState(true) // 가수, 배우 대분류 선택
  const [keyword, setKeyword] = useState<string>('')
  const [resultList, setResultList] = useState<ICategoryDto[]>([
    {
      job: '가수',
      nickName: '방탄소년단',
      birth: '2013-06-13',
      imgUrl:
        'https://blogfiles.pstatic.net/MjAyMjA3MTBfMzYg/MDAxNjU3MzgxMzg5MjU1.zlXIrPWz8E-j2jq6eIWuP49vm-816tGDYDdC4QG8trYg.uGunW_xEVY94e47Y7klDCopWJXtmi754xw4f7r83oZwg.JPEG.js7056/bts.jpeg?type=w1',
      email: 'glory@gmail.com',
    },
  ])
  // ******************** react quries ********************
  const searchCategoryQuery = useMutation(queryKeys.searchCategory, searchCategory, {
    // 검색 api
    onSuccess(data, variables, context) {
      console.log(data)
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

      //setStars(starsAll.filter(star => star.name.includes(keyword)))
      //const tempKeyword = keyword
      searchCategoryQuery.mutate(keyword)
      setKeyword('')
    },
    [keyword],
  )

  // ******************** callbacks ********************
  const onPressCategory = useCallback(
    (item: ICategoryDto) => {
      // 이미 선택된 카테고리가 있는 경우에는 리턴
      if (category != '') {
        if (item.nickName == category) {
          setCategory('')
        }
        return
      }

      setCategory(item.nickName)
    },
    [category],
  )

  const onPressX = useCallback(() => {
    setCategory('')
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
        {category != '' && (
          <View style={[theme.styles.rowFlexStart, {marginBottom: 16}, styles.selectedCategoryButton]}>
            <Text style={[{marginRight: 8}, theme.styles.text14]}>{category}</Text>
            <XSmallIcon size={16} onPress={onPressX} />
          </View>
        )}
        {resultList.map(item => (
          <View style={{width: IMAGE_SIZE + 6}}>
            {category == item.nickName && <CheckboxMainIcon style={styles.checkboxMain} />}
            <Pressable style={[styles.pressableView, category == item.nickName && styles.selectedPressable]} onPress={() => onPressCategory(item)}>
              <FastImage source={{uri: item.imgUrl}} style={styles.image}></FastImage>
            </Pressable>
            <Text style={styles.starName}>{item.nickName}</Text>
          </View>
        ))}
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
    borderRadius: (IMAGE_SIZE + 6) / 2,
  },
  pressableView: {
    width: IMAGE_SIZE + 6,
    height: IMAGE_SIZE + 6,
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
    marginTop: 16,
    textAlign: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
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
