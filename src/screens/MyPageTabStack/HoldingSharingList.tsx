import React, {useState, useCallback, useEffect} from 'react'
import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native'
import Modal from 'react-native-modal'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useQueryClient} from 'react-query'

import {EditDeleteModal} from '../../components/MyPageStack/EditDeleteModal'
import {useAppSelector, useToggle} from '../../hooks'
import {EmptyIcon, MenuIcon, StackHeader} from '../../components/utils'
import {HoldingSharingItem} from '../../components/MyPageTabStack'
import * as theme from '../../theme'
import {ISharingInfo, IHoldingSharingList} from '../../types'
import {getMyNanumList, queryKeys} from '../../api'

const STATUSBAR_HEIGHT = getStatusBarHeight()

export const HoldingSharingList = () => {
  // ******************** utils ********************

  const user = useAppSelector(state => state.auth.user) // user.id로 이 user가 진행한 나눔 목록 불러옴
  const queryClient = useQueryClient()
  // ******************** states ********************
  const [list, setList] = useState<IHoldingSharingList[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [moreVisible, toggleMoreVisible] = useToggle() //수정, 삭제하기 모달 띄울지

  const {data} = useQuery([queryKeys.holdingNanumList], () => getMyNanumList(user.accountIdx), {
    onSuccess: data => {
      setRefreshing(false)
      console.log('success')
      console.log(data)
      setList(data)
    },
    onError(err) {
      console.log('err')
      console.log(err)
    },
  })
  // pull up refresh event가 발생하면 진행 목록 가져옴
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.holdingNanumList])
  }, [])

  //api 나오기 전 사용했던것
  const [sharings, setSharings] = useState<ISharingInfo[]>([])

  // // 컴포넌트가 마운트 되면 진행한 나눔 목록 가져옴
  // useEffect(() => {
  //   fetch('http://localhost:8081/src/data/dummySharings.json')
  //     .then(res => res.json())
  //     .then(result => {
  //       //setSharings(result)
  //       setSharings([])
  //     })
  // }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview} edges={['top', 'left', 'right']}>
      <StackHeader title="진행한 나눔" goBack />
      <View style={styles.container}>
        {list.length == 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <EmptyIcon style={{marginBottom: 32}} />
            <View>
              <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>아직 진행한 나눔이 없어요.</Text>
              <View>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>리스트 페이지에서 + 버튼을 통해</Text>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>나눔을 진행해 보세요!</Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
            data={list}
            renderItem={({item}) => <HoldingSharingItem item={item}></HoldingSharingItem>}
            refreshing={refreshing}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
            onRefresh={onRefresh}
          />
        )}
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
