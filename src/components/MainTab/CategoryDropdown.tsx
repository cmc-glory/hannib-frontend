import React, {useCallback} from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import uuid from 'react-native-uuid'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX} from 'react-native-iphone-x-helper'
import {IUserCategory} from '../../types'
import * as theme from '../../theme'

const MARGIN_TOP = isIphoneX() ? getStatusBarHeight() + 56 : 56

type CategoryDropdownProps = {
  showCategoryModal: boolean
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>
  userCategory: IUserCategory
  setUserCategory: React.Dispatch<React.SetStateAction<IUserCategory>>
  categories: IUserCategory[]
}

type CategoryItemProps = {
  userCategory: IUserCategory
  currentCategory: IUserCategory
  borderTop?: boolean
  borderBottom?: boolean
  onPressItem: (category: IUserCategory) => void
}

const CategoryItem = ({userCategory, currentCategory, borderTop, borderBottom, onPressItem}: CategoryItemProps) => {
  const selected: boolean = userCategory.id == currentCategory.id
  return (
    <Pressable
      onPress={() => onPressItem(currentCategory)}
      style={[styles.itemContainer, selected && {backgroundColor: theme.main50}, borderTop && styles.borderTop, borderBottom && styles.borderBottom]}>
      <Text style={[selected && {fontFamily: 'Pretendard-Bold'}]}>{currentCategory.name}</Text>
    </Pressable>
  )
}

export const CategoryDropdown = ({showCategoryModal, setShowCategoryModal, userCategory, setUserCategory, categories}: CategoryDropdownProps) => {
  const onPressItem = useCallback((category: IUserCategory) => {
    setUserCategory(category)
    setShowCategoryModal(false)
  }, [])

  const onPressEditCategory = useCallback(() => {
    setShowCategoryModal(false)

    // 카테고리 수정하기로 이동하는 네비게이션 필요
  }, [])
  return (
    <Modal
      isVisible={showCategoryModal}
      onBackdropPress={() => setShowCategoryModal(false)}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={200}
      animationOutTiming={200}
      style={{margin: 0}}>
      <View style={[styles.container]}>
        {categories.length == 1 ? (
          <CategoryItem userCategory={userCategory} currentCategory={categories[0]} borderTop onPressItem={onPressItem} borderBottom />
        ) : (
          categories.map((item, index) => {
            if (index == 0) {
              return <CategoryItem key={item.id} userCategory={userCategory} currentCategory={item} onPressItem={onPressItem} borderTop />
            } else {
              return <CategoryItem userCategory={userCategory} currentCategory={item} onPressItem={onPressItem} key={item.id} />
            }
          })
        )}
        <CategoryItem
          userCategory={userCategory}
          currentCategory={{name: '수정하기', id: String(uuid.v1())}}
          borderTop
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
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    left: 0,
  },
  container: {
    position: 'absolute',
    top: MARGIN_TOP,
    zIndex: 100,
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
