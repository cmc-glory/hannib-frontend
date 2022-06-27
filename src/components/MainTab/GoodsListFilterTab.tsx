import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'
import {DownArrowIcon} from '../../components/utils'
import {ISharingType} from '../../types'

type GoodsFilterTabProps = {
  locationFilter: 'all' | 'offline' | 'online'
  setLocationFilter: React.Dispatch<React.SetStateAction<'all' | 'offline' | 'online'>>
  itemFilter: '최신순' | '인기순' | '추천순'
  setShowItemFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  onPressLocationFilter: (type: ISharingType | 'all') => void
}

type ButtonProps = {
  text: '우편' | '오프라인' | '전체'
  locationFilter: 'all' | 'offline' | 'online'
  setLocationFilter: React.Dispatch<React.SetStateAction<'all' | 'offline' | 'online'>>
  index: 0 | 1 | 2
  onPressLocationFilter: (type: ISharingType | 'all') => void
}

const locationMap: {
  우편: 'online'
  오프라인: 'offline'
  전체: 'all'
} = {
  우편: 'online',
  오프라인: 'offline',
  전체: 'all',
}

const Button = ({text, locationFilter, setLocationFilter, index, onPressLocationFilter}: ButtonProps) => {
  const locationValue = locationMap[text]
  const buttonStyle = useMemo(() => (locationValue == locationFilter ? styles.selectedButton : styles.unselectedButton), [locationFilter])
  const textStyle = useMemo(() => (locationValue == locationFilter ? styles.selectedText : styles.unselectedText), [locationFilter])

  const onPressButton = useCallback(() => {
    setLocationFilter(locationValue)
    onPressLocationFilter(locationValue)
  }, [])

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPressButton}>
      <Text style={[textStyle]}>{text}</Text>
    </Pressable>
  )
}

export const GoodsFilterTab = ({locationFilter, setLocationFilter, itemFilter, setShowItemFilterBottomSheet, onPressLocationFilter}: GoodsFilterTabProps) => {
  const onPressItemFilter = useCallback(() => {
    setShowItemFilterBottomSheet(showItemFilterBottomSheet => !showItemFilterBottomSheet)
  }, [])
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          text="전체"
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          index={0}
          onPressLocationFilter={onPressLocationFilter}></Button>
        <Button
          text="우편"
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          index={1}
          onPressLocationFilter={onPressLocationFilter}></Button>
        <Button
          text="오프라인"
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          index={2}
          onPressLocationFilter={onPressLocationFilter}></Button>
      </View>

      <View>
        <Pressable style={[styles.sortButton]} onPress={onPressItemFilter}>
          <Text style={[styles.sortText]}>{itemFilter}</Text>
          <DownArrowIcon size={20} style={{marginLeft: 3}} />
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
    marginVertical: 16,
    paddingHorizontal: theme.PADDING_SIZE,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
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
