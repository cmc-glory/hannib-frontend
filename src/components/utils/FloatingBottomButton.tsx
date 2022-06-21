import React from 'react'
import {Pressable, Text, StyleSheet, Platform} from 'react-native'
import * as theme from '../../theme'

type FloatingBottoButtonProps = {
  label: string
  onPress?: () => void
  enabled?: boolean
}

export const FloatingBottomButton = ({label, onPress, enabled = false}: FloatingBottoButtonProps) => {
  return (
    <Pressable
      onPress={enabled ? onPress : undefined}
      style={[theme.styles.wrapper, styles.container, enabled ? theme.styles.button : theme.styles.disabledButton]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: Platform.OS == 'android' ? 10 : 0,
  },
  label: {
    color: theme.white,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
})
