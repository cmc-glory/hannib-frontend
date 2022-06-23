import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {LeftArrowIcon, XIcon, Icon} from './Icon'
import * as theme from '../../theme'

// 사용밥 : <StackHeader title="상단 제목 이름" onPressTitle="상단 제목 눌렀을 때 수행할 일">{오른쪽에 들어갈 아이콘 컴포넌트}</StackHeader>
type StackHeaderParams = {
  goBack?: boolean // 뒤로가기 버튼 띄울지.
  title: string // 상단 제목
  onPressTitle?: () => void // 상단 제목을 눌렀을 때
  dropdown?: boolean
  children?: React.ReactNode | React.ReactNode[] // 오른쪽에 띄울 아이콘
  x?: boolean
}

export const StackHeader = ({goBack = false, title, onPressTitle, dropdown = false, x, children}: StackHeaderParams) => {
  const navigation = useNavigation()
  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])
  return (
    <View style={[styles.container]}>
      {goBack && navigation.canGoBack() && x == true ? (
        <XIcon onPress={onPressGoback} style={{marginRight: 10}} />
      ) : (
        <LeftArrowIcon onPress={onPressGoback} style={{marginRight: 10}} />
        // <Pressable onPress={onPressGoback} style={{marginRight: 10}}>
        //   <Icon uri="http://localhost:8081/src/assets/Icon/Left arrow.png" />
        // </Pressable>
      )}
      <Pressable style={[styles.titleContainer]}>
        <Text style={styles.title}>{title}</Text>
        {dropdown && <Icon uri="http://localhost:8081/src/assets/Icon/Bottom_arrow.png" />}
      </Pressable>
      <View style={{flex: 1, alignItems: 'flex-end'}}>{children}</View>
    </View>
  )
}
export default StackHeader

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: theme.PADDING_SIZE,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: theme.gray800,
  },
})
