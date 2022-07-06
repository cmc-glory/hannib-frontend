import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {RightArrowIcon, NeccesaryField} from '../utils'
import {SetCategoryNanumForm} from '../../screens/WriteNanumFormStack'
import * as theme from '../../theme'

type SelectCategoryBannerProps = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  categoryModalOpened: boolean
  setCategoryModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const SelectCategoryBanner = ({category, setCategory, categoryModalOpened, setCategoryModalOpened}: SelectCategoryBannerProps) => {
  const navigation = useNavigation()
  const onPressSetCategory = useCallback(() => {
    // navigation.navigate('SetCategoryNanumForm')
    setCategoryModalOpened(categoryModalOpened => !categoryModalOpened)
  }, [])

  return (
    <View style={[styles.container]}>
      <SetCategoryNanumForm
        categoryModalOpened={categoryModalOpened}
        setCategoryModalOpened={setCategoryModalOpened}
        category={category}
        setCategory={setCategory}
      />
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={[theme.styles.label]}>카테고리</Text>
        <NeccesaryField />
      </View>

      <Pressable style={styles.selectContainer} onPress={onPressSetCategory}>
        <RightArrowIcon onPress={onPressSetCategory} />
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
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
})
