import React, {useCallback} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {main} from '../../theme'
import {GoBack} from '../utils'
// 사용밥 : <StackHeader title="상단 제목 이름" onPressTitle="상단 제목 눌렀을 때 수행할 일">{오른쪽에 들어갈 아이콘 컴포넌트}</StackHeader>

type StackHeaderParams = {
  goBack?: boolean // 뒤로가기 버튼 띄울지.
  title: string // 상단 제목
  onPressTitle?: () => void // 상단 제목을 눌렀을 때
  dropdown?: boolean
  children?: React.ReactNode | React.ReactNode[] // 오른쪽에 띄울 아이콘
}

const ICON_SIZE = 12

const GoodsDetailHeader = ({goBack, title, onPressTitle, dropdown, children}: StackHeaderParams) => {
  const navigation = useNavigation()
  const onPressGoback = useCallback(() => {
    navigation.goBack()
  }, [])
  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={onPressGoback} style={{marginRight: 10}}>
        <GoBack />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  )
}
export default GoodsDetailHeader

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
