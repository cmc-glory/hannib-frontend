import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'

type GoodsFilterTabProps = {
  locationFilter: 0 | 1 | 2
  setLocationFilter: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
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

export const GoodsFilterTab = ({locationFilter, setLocationFilter}: GoodsFilterTabProps) => {
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button text="전체" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={0}></Button>
        <Button text="우편" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={1}></Button>
        <Button text="오프라인" locationFilter={locationFilter} setLocationFilter={setLocationFilter} index={2}></Button>
      </View>

      <View>
        <Pressable style={[styles.sortButton]}>
          <Text style={[styles.sortText]}>최신순</Text>
          <View style={[styles.iconContainer]}>
            <FastImage source={{uri: 'http://localhost:8081/src/assets/Icon/Bottom_arrow.png'}} style={[styles.icon]} />
          </View>
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
    backgroundColor: theme.gray700,
    borderColor: theme.gray700,
  },
  unselectedButton: {
    backgroundColor: theme.white,
    borderColor: theme.gray300,
  },
  selectedText: {
    fontFamily: 'Pretendard-Bold',
    color: theme.white,
  },
  unselectedText: {
    fontFamily: 'Pretendard-Regular',
    color: theme.gray300,
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
