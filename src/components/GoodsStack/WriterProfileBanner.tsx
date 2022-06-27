import React, {useCallback, useMemo} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {RightArrowIcon} from '../utils'
import * as theme from '../../theme'

type WriterProfileBannerProps = {
  writerid: string
  writerProfileImageUri: string
  writername: string
}

export const WriterProfileBanner = ({writerid, writerProfileImageUri, writername}: WriterProfileBannerProps) => {
  const navigation = useNavigation()

  const imageUri = useMemo(() => (writerProfileImageUri == '' ? require('../../assets/images/no_user.jpeg') : {uri: writerProfileImageUri}), [])

  // 문의글 리스트로 이동하는 네비게이션
  const onPressQnA = useCallback(() => {
    navigation.navigate('QnAList', {
      id: '11111', // 해당 게시글 id
    })
  }, [])

  const onPressWriterProfile = useCallback(() => {
    navigation.navigate('WriterProfile', {
      writerid: '111111', // 해당 나눔 게시글 작성자의 id를 넘겨줌
    })
  }, [])

  return (
    <View style={[theme.styles.rowSpaceBetween, styles.container]}>
      <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressWriterProfile}>
        <FastImage source={imageUri} style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}></FastImage>
        <Text style={[theme.styles.bold16, {color: theme.gray700}]}>{writername}</Text>
      </Pressable>
      <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressQnA}>
        <Text style={{fontSize: 16}}>문의글</Text>
        <Text style={{color: theme.main, marginLeft: 8, fontSize: 16}}></Text>
        <RightArrowIcon size={20} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: theme.gray50,
  },
})
