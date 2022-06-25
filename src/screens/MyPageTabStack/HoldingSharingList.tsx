import React, {useState, useCallback, useEffect} from 'react'
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native'
import Modal from 'react-native-modal'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {SafeAreaView} from 'react-native-safe-area-context'
import {EditDeleteModal} from '../../components/MyPageStack/EditDeleteModal'
import {useAppSelector, useToggle} from '../../hooks'
import {MenuIcon, StackHeader} from '../../components/utils'
import {HoldingSharingItem} from '../../components/MyPageTabStack'
import * as theme from '../../theme'
import {ISharingInfo} from '../../types'

const STATUSBAR_HEIGHT = getStatusBarHeight()

export const HoldingSharingList = () => {
  const [sharings, setSharings] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [moreVisible, toggleMoreVisible] = useToggle() //수정, 삭제하기 모달 띄울지

  const user = useAppSelector(state => state.auth.user) // user.id로 이 user가 진행한 나눔 목록 불러옴

  // 컴포넌트가 마운트 되면 진행한 나눔 목록 가져옴
  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
      })
  }, [])

  // pull up refresh event가 발생하면 진행 목록 가져옴
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetch('http://localhost:8081/src/data/dummySharings.json')
      .then(res => res.json())
      .then(result => {
        setSharings(result)
        setRefreshing(false)
      })
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview} edges={['top', 'left', 'right']}>
      <StackHeader title="진행한 나눔" goBack>
        <MenuIcon onPress={toggleMoreVisible}></MenuIcon>
      </StackHeader>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
          data={sharings}
          renderItem={({item}) => <HoldingSharingItem item={item}></HoldingSharingItem>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
          onRefresh={onRefresh}
        />
      </View>
      <EditDeleteModal isVisible={moreVisible} toggleIsVisible={toggleMoreVisible} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuModal: {
    backgroundColor: theme.white,
    position: 'absolute',
    width: 144,
    //height: 40,
    padding: 10,
    justifyContent: 'center',
    zIndex: 1,
    right: 0,
    borderRadius: 4,
    top: STATUSBAR_HEIGHT + 28,
  },
})
