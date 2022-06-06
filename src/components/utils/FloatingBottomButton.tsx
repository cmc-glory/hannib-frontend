import React from 'react'
import {Pressable, Text, StyleSheet} from 'react-native'
import {main, white, styles as s} from '../../theme'

type FloatingBottoButtonProps = {
  label: string
  onPress?: () => void
}

export const FloatingBottomButton = ({label, onPress}: FloatingBottoButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[s.wrapper, styles.container, s.button]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  label: {
    color: white,
    fontFamily: 'Pretendard-SemiBold',
  },
})
