import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet, Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {black, white, gray300} from '../../theme'

type NextButtonProps = {
  onPressNext: () => void
  text: string
}

export const NextButton = ({text, onPressNext}: NextButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button]} onPress={onPressNext}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 10 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    padding: 15,
    backgroundColor: black,
    width: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
  },
})
