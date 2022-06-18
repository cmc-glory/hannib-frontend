import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'
import {DownArrowIcon} from '../../components/utils'

type GoodsFilterTabProps = {
  locationFilter: 0 | 1 | 2
  setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
  itemFilter: '최신순' | '인기순' | '추천순'
  setItemFilter: React.Dispatch<React.SetStateAction<'최신순' | '인기순' | '추천순'>>
  showItemFilterBottomSheet: boolean
  setShowItemFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

type ButtonProps = {
  text: string
  locationFilter: 0 | 1 | 2
  setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
  index: 0 | 1 | 2
}

const Button = ({text, locationFilter, setLocationFilter, index}: ButtonProps) => {
  const buttonStyle = useMemo(() => (index == locationFilter ? styles.selectedButton : styles.unselectedButton), [locationFilter])
  const textStyle = useMemo(() => (index == locationFilter ? styles.selectedText : styles.unselectedText), [locationFilter])

  const onPressButton = useCallback(() => {
    setLocationFilter(index)
  }, [])

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPressButton}>
      <Text style={[textStyle]}>{text}</Text>
    </Pressable>
  )
}

export const GoodsFilterTab = ({
  locationFilter,
  setLocationFilter,
  itemFilter,
  setItemFilter,
  showItemFilterBottomSheet,
  setShowItemFilterBottomSheet,
}: GoodsFilterTabProps) => {
  const onPressItemFilter = useCallback(() => {
    setShowItemFilterBottomSheet(showItemFilterBottomSheet => !showItemFilterBottomSheet)
  }, [])
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button text="전체" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={0}></Button>
        <Button text="우편" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={1}></Button>
        <Button text="오프라인" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={2}></Button>
      </View>

      <View>
        <Pressable style={[styles.sortButton]} onPress={onPressItemFilter}>
          <Text style={[styles.sortText]}>{itemFilter}</Text>
          <DownArrowIcon size={16} style={{marginLeft: 5}} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: theme.secondary,
    borderColor: theme.secondary,
  },
  unselectedButton: {
    backgroundColor: theme.white,
    borderColor: theme.gray500,
  },
  selectedText: {
    fontFamily: 'Pretendard-Bold',
    color: theme.white,
  },
  unselectedText: {
    fontFamily: 'Pretendard-Regular',
    color: theme.gray500,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  button: {
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: theme.gray800,
    fontFamily: 'Pretendard-Medium',
  },
})
