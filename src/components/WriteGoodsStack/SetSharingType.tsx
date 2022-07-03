import React, {useCallback, useEffect} from 'react'
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native'
import type {INanumMethod} from '../../types'
import * as theme from '../../theme'

type SetSharingTypeProps = {
  type: INanumMethod
  setType: React.Dispatch<React.SetStateAction<INanumMethod>>
}

const PADDING_SIZE = 15
const MARGIN_SIZE = 10
const BUTTON_WIDTH = Dimensions.get('window').width / 2 - PADDING_SIZE - MARGIN_SIZE

type ButtonProps = {
  label: string
  onPress: () => void
}

const Selected = ({label, onPress}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, styles.selectedButton]} onPress={onPress}>
      <Text style={[theme.styles.bold16, styles.selectedText]}>{label}</Text>
    </Pressable>
  )
}

const Unselected = ({label, onPress}: ButtonProps) => {
  return (
    <Pressable style={[styles.button, styles.unselectedButton]} onPress={onPress}>
      <Text style={[{fontSize: 16}, styles.unselectedText]}>{label}</Text>
    </Pressable>
  )
}

export const SetSharingType = ({type, setType}: SetSharingTypeProps) => {
  const onPressOffline = useCallback(() => {
    setType('offline')
  }, [])
  const onPressOnline = useCallback(() => {
    setType('online')
  }, [])

  useEffect(() => {
    console.log(type)
  }, [type])

  return (
    <>
      {type == 'online' ? (
        <View style={styles.container}>
          <Selected label="우편" onPress={onPressOnline} />
          <Unselected label="오프라인" onPress={onPressOffline} />
        </View>
      ) : (
        <View style={styles.container}>
          <Unselected label="우편" onPress={onPressOnline} />
          <Selected label="오프라인" onPress={onPressOffline} />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  selectedButton: {
    backgroundColor: theme.main50,
    borderColor: theme.main,
  },
  unselectedButton: {
    backgroundColor: theme.white,
    borderColor: theme.gray200,
  },
  selectedText: {
    color: theme.main,
  },
  unselectedText: {
    color: theme.gray300,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_WIDTH,
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
