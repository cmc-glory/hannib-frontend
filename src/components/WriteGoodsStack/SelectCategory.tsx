import React from 'react'
import {View, Text, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {black, styles as s} from '../../theme'
import RightIcon from '../../assets/icons/right-arrow-next-svgrepo-com.svg'

const ICON_SIZE = 10

export const SelectCategory = () => {
  return (
    <View style={[styles.container]}>
      <Text>카테고리</Text>
      <TouchableOpacity style={styles.selectContainer}>
        <RightIcon width={ICON_SIZE} height={ICON_SIZE} fill={black} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,

    //width: '100%',
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: black,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
