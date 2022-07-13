import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Shadow} from 'react-native-shadow-2'

import {main} from '../../theme'

type FloatingButtonProps = {
  children: React.ReactNode
  onPress: () => void
  color?: string
}

export const FloatingButton = ({onPress, children}: FloatingButtonProps) => {
  return (
    <Shadow distance={10} startColor="rgba(0,0,0,0.9)">
      <Pressable onPress={onPress}>
        <FastImage source={require('../../assets/images/FloatingButton.png')} style={styles.container} />
      </Pressable>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: main,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',

    // shadow options below
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
