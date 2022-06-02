import React from 'react'
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import {styles as s, black, gray200} from '../../theme'
import AddIcon from '../../assets/icons/add.svg'

const ICON_SIZE = 16

export const AdditionalQuestions = () => {
  return (
    <View style={styles.wrapper}>
      <TextInput style={[s.input, styles.input, {flex: 1}]} placeholder="질문 제목" placeholderTextColor={gray200} />
      <Pressable style={[s.input, {alignItems: 'center', justifyContent: 'center'}]}>
        <AddIcon width={ICON_SIZE} height={ICON_SIZE} fill={black} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    marginRight: 10,
  },
})
