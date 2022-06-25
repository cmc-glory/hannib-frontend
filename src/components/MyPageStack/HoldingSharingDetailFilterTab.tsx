import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'
import {DownArrowIcon} from '../../components/utils'

type HoldingSharingDetailFilterTabProps = {
  locationFilter: 0 | 1 | 2
  setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
  stateFilter: '전체보기' | '수령완료' | '미수령'
  setStateFilter: React.Dispatch<React.SetStateAction<'전체보기' | '수령완료' | '미수령'>>
  showStateFilterBottomSheet: boolean
  setShowStateFilterBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
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

export const HoldingSharingFilterTab = ({
  locationFilter,
  setLocationFilter,
  showStateFilterBottomSheet,
  setShowStateFilterBottomSheet,
  stateFilter,
  setStateFilter,
}: HoldingSharingDetailFilterTabProps) => {
  const onPressStateFilter = useCallback(() => {
    setShowStateFilterBottomSheet(showStateFilterBottomSheet => !showStateFilterBottomSheet)
  }, [])
  return (
    <View style={[styles.container]}>
      <View>
        <Pressable style={[styles.sortButton]} onPress={onPressStateFilter}>
          <Text style={[styles.sortText]}>{stateFilter}</Text>
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

    marginVertical: 16,
    //paddingHorizontal: theme.PADDING_SIZE,
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
