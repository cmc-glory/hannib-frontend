import React, {useState, useCallback, useEffect} from 'react'
import {View, FlatList, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useAppSelector} from '../../hooks'
import {StackHeader} from '../../components/utils'
import {ParticipatingSharingItem} from '../../components/MyPageTabStack'
import * as theme from '../../theme'
import {ISharingInfo} from '../../types'

export const ParticipatingSharingList = () => {
  const [sharings, setSharings] = useState<ISharingInfo[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

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
      <StackHeader title="참여한 나눔" goBack />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
          data={sharings}
          renderItem={({item}) => <ParticipatingSharingItem item={item}></ParticipatingSharingItem>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
