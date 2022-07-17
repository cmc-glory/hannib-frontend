import React, {useCallback} from 'react'
import {Pressable, View, Text, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {CommunicationWhiteIcon, RightArrowIcon} from '../utils'
import * as theme from '../../theme'

type NoticeBannerProps = {
  nanumIdx: number
}

export const NoticeBanner = ({nanumIdx}: NoticeBannerProps) => {
  const navigation = useNavigation()
  const onPressNotice = useCallback(() => {
    navigation.navigate('NoticeList', {
      nanumIdx: nanumIdx,
    })
  }, [])
  return (
    <Pressable style={[theme.styles.rowFlexStart, styles.container]}>
      <View style={{backgroundColor: theme.main, justifyContent: 'center', alignItems: 'center', width: 28, height: 28, borderRadius: 14, marginRight: 8}}>
        <CommunicationWhiteIcon size={20} />
      </View>
      <Text style={styles.text}>공지 사항</Text>
      <RightArrowIcon onPress={onPressNotice} />
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
