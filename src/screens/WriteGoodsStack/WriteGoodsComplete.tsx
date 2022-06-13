import React from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {StackHeader} from '../../components/utils'
import {StepIndicator} from '../../components/WriteGoodsStack'
import * as theme from '../../theme'

type ButtonProps = {
  label: string
  onPress?: () => void
  enabled?: boolean
}

export const Button = ({label, onPress, enabled = false}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[theme.styles.wrapper, styles.buttonContainer, enabled ? theme.styles.button : theme.styles.disabledButton]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

export const WriteGoodsComplete = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StackHeader title="모집폼 작성" goBack />
      <View style={[theme.styles.wrapper, {flex: 1}]}>
        <StepIndicator step={3} />
        <View style={styles.container}>
          <View style={styles.illustration}></View>
          <Text style={[styles.text, theme.styles.bold20]}>모집글 등록이 완료되었습니다.</Text>
          <Button label="게시글 보기" enabled />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
  },
  label: {
    color: theme.white,
    fontFamily: 'Pretendard-SemiBold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -46,
  },
  illustration: {
    position: 'relative',
    width: 240,
    height: 240,
    backgroundColor: theme.main50,
  },
  text: {
    marginVertical: 32,
  },
})
