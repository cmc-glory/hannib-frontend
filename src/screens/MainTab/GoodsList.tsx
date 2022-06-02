import React, {useState, useCallback} from 'react'
import {RefreshControl, View, Text, FlatList, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'

import {white, black} from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import Notification from '../../components/utils/Notification'
import {createListItem} from '../../data/createListItem'
import GoodsListItem from '../../components/GoodsListItem'
import FloatingButton from '../../components/utils/FloatingButton'
import AddIcon from '../../assets/icons/add.svg'
import {NavigationRouteContext} from '@react-navigation/native'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const listItems = new Array(50).fill(null).map(createListItem)

const GoodsLists = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteGoodsStackNavigator')
  }, [])

  return (
    <SafeAreaView style={[styles.container]}>
      <StackHeader goBack={false} dropdown title="카테고리">
        <Notification />
      </StackHeader>

      <FlatList data={listItems} renderItem={({item}) => <GoodsListItem item={item}></GoodsListItem>} refreshing={refreshing} onRefresh={onRefresh}></FlatList>
      <FloatingButton onPress={onPressWrite}>
        <AddIcon width={24} height={24} fill="#fff" />
      </FloatingButton>
    </SafeAreaView>
  )
}

export default GoodsLists

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
})
