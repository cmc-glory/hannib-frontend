import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet, Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {black, white, gray300} from '../../theme'

type NextButtonProps = {
  to: 'WriteGoodsOffline' | 'WriteGoodsOnline'
}

export const NextButton = ({to}: NextButtonProps) => {
  const navigation = useNavigation()
  const onPressNext = useCallback(() => {
    navigation.navigate(to)
  }, [])
  return (
    <View style={styles.container}>
      <Pressable style={[styles.button]} onPress={onPressNext}>
        <Text style={styles.buttonText}>다음</Text>
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
    paddingVertical: 10,
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
