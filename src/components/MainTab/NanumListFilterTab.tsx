import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'
import {DownArrowIcon} from '../utils'
import {ISharingType, INanumMethod} from '../../types'

type GoodsFilterTabProps = {
  locationFilter: '전체' | INanumMethod
  setLocationFilter: React.Dispatch<React.SetStateAction<'전체' | INanumMethod>>
  itemFilter: '최신순' | '인기순' | '추천순'
  setShowItemFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  onPressLocationFilter: (type: INanumMethod | '전체') => void
}

type ButtonProps = {
  text: '우편' | '오프라인' | '전체'
  locationFilter: '전체' | INanumMethod
  setLocationFilter: React.Dispatch<React.SetStateAction<'전체' | INanumMethod>>
  index: 0 | 1 | 2
  onPressLocationFilter: (type: INanumMethod | '전체') => void
}

const locationMap: {
  우편: 'M'
  오프라인: 'O'
  전체: '전체'
} = {
  우편: 'M',
  오프라인: 'O',
  전체: '전체',
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

export const NanumListFilterTab = ({
  locationFilter,
  setLocationFilter,
  itemFilter,
  setShowItemFilterBottomSheet,
  onPressLocationFilter,
}: GoodsFilterTabProps) => {
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
          <DownArrowIcon size={20} style={{marginLeft: 3}} onPress={onPressItemFilter} />
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
    paddingVertical: 10,
    paddingHorizontal: theme.PADDING_SIZE,
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  button: {
    height: 32,
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
    height: 32,
  },
  sortText: {
    color: theme.gray800,
    fontFamily: 'Pretendard-Medium',
  },
})
