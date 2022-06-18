import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import * as theme from '../../theme'

type FollowItemProps = {
  label: string
  num: number
  onPress?: () => void
}

const FollowItem = ({label, num, onPress}: FollowItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={{color: theme.gray700, marginBottom: 2}}>{label}</Text>
      <Text style={{fontFamily: 'Pretendard-Bold', color: theme.gray700, textAlign: 'center'}}>{num}</Text>
    </Pressable>
  )
}

export const Follow = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FollowItem label="팔로잉" num={23} />
        <FollowItem label="팔로우" num={456} />
        <FollowItem label="후기" num={78} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.gray50,
    borderRadius: 4,
    height: 70,
    justifyContent: 'center',
    alignContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
