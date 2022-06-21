import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CheckboxIcon, EmptyCheckboxIcon} from '../../components/utils'
import FastImage from 'react-native-fast-image'
import {StackHeader, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

const userList = [
  {id: '1', name: '춤추는 고양이 1', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
  {id: '2', name: '춤추는 고양이 2', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
  {id: '3', name: '춤추는 고양이 3', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
  {id: '4', name: '춤추는 고양이 4', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
  {id: '5', name: '춤추는 고양이 5', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
  {id: '6', name: '춤추는 고양이 6', uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'},
]

const BlockedUserItem = ({
  item,
  index,
  onPress,
}: {
  item: {id: string; name: string; uri: string; checked: boolean}
  index: number
  onPress: (index: number) => void
}) => {
  const {id, name, uri, checked} = item
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 24}]}>
      {checked ? <CheckboxIcon onPress={() => onPress(index)} /> : <EmptyCheckboxIcon onPress={() => onPress(index)} />}
      <FastImage source={{uri: uri}} style={styles.image} />
      <Text style={{color: theme.gray700, fontSize: 16}}>{name}</Text>
    </View>
  )
}

export const BlockedUsers = () => {
  // 차단된 사용자 가져오는 api 필요

  const [blockedUsers, setBlockedUsers] = useState(
    userList.map(item => {
      return {...item, checked: false}
    }),
  )

  const onPressCheckbox = useCallback(
    (index: number) => {
      setBlockedUsers([...blockedUsers.slice(0, index), {...blockedUsers[index], checked: !blockedUsers[index].checked}, ...blockedUsers.slice(index + 1)])
    },
    [blockedUsers],
  )

  const checkEnabled = useCallback(() => {
    if (blockedUsers.map(user => user.checked).includes(true)) {
      return true
    } else {
      return false
    }
  }, [blockedUsers])

  // 선택된 계정 차단 해제 클릭시
  const onPressSubmit = useCallback(() => {}, [])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader goBack title="차단된 계정 리스트" />
      <View style={[{padding: theme.PADDING_SIZE}]}>
        {blockedUsers.map((user, index) => (
          <BlockedUserItem item={user} key={user.id} index={index} onPress={onPressCheckbox} />
        ))}
        <RoundButton label="선택 계정 차단 해제" enabled={checkEnabled()} onPress={onPressSubmit} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 8,
  },
})
