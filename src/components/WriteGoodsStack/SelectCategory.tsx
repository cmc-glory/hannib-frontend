import React from 'react'
import {View, Text, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {black} from '../../theme'
import RightIcon from '../../assets/icons/right-arrow-next-svgrepo-com.svg'

const ICON_SIZE = 10

export const SelectCategory = () => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>카테고리</Text>
      <TouchableOpacity style={styles.selectContainer}>
        <Text style={{color: black, marginRight: 10}}>배우명 그룹명</Text>
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
    marginVertical: 10,

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
