import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

type FloatingButtonProps = {
  children: React.ReactNode
  onPress: () => void
  color?: string
}

const FloatingButton = ({onPress, children}: FloatingButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 55,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
