import React from 'react'
import {View, Text, Pressable, StyleSheet, StyleProp, ViewStyle} from 'react-native'
import * as theme from '../../theme'

type ButtonProps = {
  label: string
  selected: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const SelectedButton = ({label, onPress, style}: ButtonProps) => {
  return (
    <Pressable style={[styles.container, styles.selectedContainer, style]} onPress={onPress}>
      <Text style={styles.selectedText}>{label}</Text>
    </Pressable>
  )
}

const UnselectedButton = ({label, onPress, style}: ButtonProps) => {
  return (
    <Pressable style={[styles.container, styles.unselectedContainer, style]} onPress={onPress}>
      <Text style={styles.unselectedText}>{label}</Text>
    </Pressable>
  )
}

export const Button = ({label, selected, onPress, style}: ButtonProps) => {
  if (selected) {
    return <SelectedButton label={label} selected={selected} onPress={onPress} style={style} />
  } else {
    return <UnselectedButton label={label} selected={selected} onPress={onPress} style={style} />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedContainer: {
    backgroundColor: theme.main50,
    borderColor: theme.main,
  },
  unselectedContainer: {
    backgroundColor: theme.white,
    borderColor: theme.gray300,
  },
  selectedText: {
    color: theme.main,
    fontWeight: '700',
  },
  unselectedText: {
    color: theme.gray300,
    fontWeight: '700',
  },
})
