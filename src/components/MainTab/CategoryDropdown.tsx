import React, {useCallback, useState} from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import uuid from 'react-native-uuid'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX} from 'react-native-iphone-x-helper'
import {useNavigation} from '@react-navigation/native'
import {IAccountCategoryDto} from '../../types'
import * as theme from '../../theme'

const MARGIN_TOP = isIphoneX() ? getStatusBarHeight() + 56 : 56

type CategoryDropdownProps = {
  showCategoryModal: boolean
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>
  userCategory: IAccountCategoryDto
  setUserCategory: React.Dispatch<React.SetStateAction<IAccountCategoryDto | undefined>>
  categories: IAccountCategoryDto[]
}

type CategoryItemProps = {
  userCategory: IAccountCategoryDto
  currentCategory: IAccountCategoryDto
  borderTop?: boolean
  borderBottom?: boolean
  onPressItem: (category: IAccountCategoryDto) => void
}

const CategoryItem = ({userCategory, currentCategory, borderTop, borderBottom, onPressItem}: CategoryItemProps) => {
  // ******************** utils ********************
  const selected: boolean = userCategory.category == currentCategory.category && userCategory.job == userCategory.job

  // ******************** renderer ********************
  return (
    <Pressable
      onPress={() => onPressItem(currentCategory)}
      style={[styles.itemContainer, selected && {backgroundColor: theme.main50}, borderTop && styles.borderTop, borderBottom && styles.borderBottom]}>
      <Text style={[selected && {fontFamily: 'Pretendard-Bold'}]}>{currentCategory.category}</Text>
    </Pressable>
  )
}

export const CategoryDropdown = ({showCategoryModal, setShowCategoryModal, userCategory, setUserCategory, categories}: CategoryDropdownProps) => {
  // ******************** utils ********************
  const navigation = useNavigation()

  // ******************** states ********************
  const [categoryPressed, setCategoryPressed] = useState<boolean>(false)

  // ******************** callbacks ********************

  const onPressItem = useCallback((category: IAccountCategoryDto) => {
    setUserCategory(category)
    setShowCategoryModal(false)
  }, [])

  const onPressEditCategory = useCallback(() => {
    setShowCategoryModal(false)
    setCategoryPressed(true)
    // 카테고리 수정하기로 이동하는 네비게이션 필요
  }, [])

  // ******************** renderer ********************

  return (
    <Modal
      isVisible={showCategoryModal}
      onBackdropPress={() => setShowCategoryModal(false)}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={200}
      animationOutTiming={200}
      onModalHide={() => {
        if (categoryPressed) {
          navigation.navigate('EditCategory')
          setCategoryPressed(false)
        }
      }}
      style={{margin: 0}}>
      <View style={[styles.container]}>
        {categories.map((item, index) => {
          if (index == 0) {
            return <CategoryItem key={item.category + index} userCategory={userCategory} currentCategory={item} onPressItem={onPressItem} borderTop />
          } else {
            return <CategoryItem userCategory={userCategory} currentCategory={item} onPressItem={onPressItem} key={item.category + index} />
          }
        })}
        <CategoryItem
          userCategory={userCategory}
          currentCategory={{category: '수정하기', job: '가수', accountIdx: 0}}
          borderBottom
          onPressItem={onPressEditCategory}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 144,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: theme.white,
    left: -12,
  },
  container: {
    position: 'absolute',
    top: MARGIN_TOP,
    zIndex: 100,
    left: 20,
  },
  borderTop: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  borderBottom: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
})
