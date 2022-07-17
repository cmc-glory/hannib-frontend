import React from 'react'
import {Pressable, Text, StyleSheet, Dimensions} from 'react-native'
import {isIphoneX} from 'react-native-iphone-x-helper'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import * as theme from '../../theme'

const iphoneX = isIphoneX()
const BOTTOM_SPACE = getBottomSpace()
const BUTTON_WIDTH = Dimensions.get('window').width - theme.PADDING_SIZE * 2

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
    position: 'absolute',

    zIndex: 10,
    bottom: iphoneX ? BOTTOM_SPACE : BOTTOM_SPACE + 10,
    width: BUTTON_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    //marginTop: 10,
    //marginBottom: iphoneX ? 0 : 10,
  },
  label: {
    color: theme.white,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
})
