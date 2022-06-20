import React from 'react'
import {Pressable, View, Text, StyleSheet} from 'react-native'
import {CommunicationWhiteIcon, RightArrowIcon} from '../utils'
import * as theme from '../../theme'

export const NoticeBanner = () => {
  return (
    <Pressable style={[theme.styles.rowFlexStart, styles.container]}>
      <View style={{backgroundColor: theme.main, justifyContent: 'center', alignItems: 'center', width: 28, height: 28, borderRadius: 14, marginRight: 8}}>
        <CommunicationWhiteIcon size={20} />
      </View>
      <Text style={styles.text}>우편 발송 공지 사항</Text>
      <RightArrowIcon />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.main50,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  text: {
    flex: 1,
    color: theme.gray700,
  },
})
