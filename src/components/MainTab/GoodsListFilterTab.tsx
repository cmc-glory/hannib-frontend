import React, {useMemo} from 'react'
import {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {gray50, gray300, gray700, white, gray800, styles as s} from '../../theme'

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
  const buttonStyle = useMemo(() => {
    return {
      backgroundColor: index == locationFilter ? gray800 : white,
      borderColor: index == locationFilter ? gray800 : gray300,
    }
  }, [locationFilter])
  const textStyle = useMemo(() => {
    return {color: index == locationFilter ? gray50 : gray700}
  }, [locationFilter])

  const onPressButton = useCallback(() => {
    setLocationFilter(index)
  }, [])

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPressButton}>
      <Text style={[textStyle, {fontFamily: 'Pretendard-Medium'}]}>{text}</Text>
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
          <FontAwesome name="chevron-down" size={12} color={gray800}></FontAwesome>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: gray800,
    fontFamily: 'Pretendard-Medium',
    marginRight: 15,
  },
})
