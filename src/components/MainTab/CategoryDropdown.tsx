import React, {useCallback} from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
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
  setUserCategory: React.Dispatch<React.SetStateAction<IUserCategory>>
  currentCategory: IUserCategory
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>
  borderTop?: boolean
  borderBottom?: boolean
  onPressItem: (category: IUserCategory) => void
}

const CategoryItem = ({userCategory, setUserCategory, currentCategory, setShowCategoryModal, borderTop, borderBottom, onPressItem}: CategoryItemProps) => {
  const selected: boolean = userCategory.id == currentCategory.id
  return (
    <Pressable onPress={()=>onPressItem(currentCategory)} style={[styles.itemContainer, selected && {backgroundColor: theme.main50}, borderTop && styles.borderTop, borderBottom && styles.borderBottom]}>
      <Text>{currentCategory.name}</Text>
    </Pressable>
  )
}

export const CategoryDropdown = ({showCategoryModal, setShowCategoryModal, userCategory, setUserCategory, categories}: CategoryDropdownProps) => {
  const onPressItem = useCallback((category : IUserCategory)=>{
    setUserCategory(category)
    setShowCategoryModal(false)
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
          <CategoryItem
            userCategory={userCategory}
            setUserCategory={setUserCategory}
            currentCategory={categories[0]}
            setShowCategoryModal={setShowCategoryModal}
            borderTop
            onPressItem={onPressItem}
            borderBottom
          />
        ) : (
          categories.map((item, index) => {
            if (index == 0) {
              return (
                <CategoryItem
                  key={item.id}
                  userCategory={userCategory}
                  setUserCategory={setUserCategory}
                  currentCategory={item}
                  setShowCategoryModal={setShowCategoryModal}
                  onPressItem={onPressItem}
                  borderTop
                />
              )
            } else if (index == categories.length - 1) {
              return (
                <CategoryItem
                  userCategory={userCategory}
                  setUserCategory={setUserCategory}
                  currentCategory={item}
                  setShowCategoryModal={setShowCategoryModal}
                  onPressItem={onPressItem}
                  key={item.id}
                  borderBottom
                />
              )
            } else {
              return (
                <CategoryItem
                  userCategory={userCategory}
                  setUserCategory={setUserCategory}
                  currentCategory={item}
                  setShowCategoryModal={setShowCategoryModal}
                  onPressItem={onPressItem}
                  key={item.id}
                />
              )
            }
          })
        )}
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
