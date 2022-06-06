import React from 'react'
import {Pressable, Text, StyleSheet} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MegaphoneIcon from '../../assets/icons/megaphone.svg'
import {main50, main, gray500} from '../../theme'

export const NoticeBanner = () => {
  return (
    <Pressable style={[styles.container]}>
      <MegaphoneIcon width={20} height={20} fill={main} />
      <Text style={styles.text}>우편 발송 공지사항</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: main50,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: gray500,
    marginLeft: 15,
  },
})
