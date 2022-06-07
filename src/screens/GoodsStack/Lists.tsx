import React, {useState, useCallback} from 'react'
import {RefreshControl, View, Text, FlatList, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {white, black} from '../../theme'
import {StackHeader, Notification} from '../../components/utils'
import {createListItem} from '../../data/createListItem'
import GoodsListItem from '../../components/MainTab/GoodsListItem'
import FloatingButton from '../../components/utils/FloatingButton'
import AddIcon from '../../assets/icons/add.svg'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const listItems = new Array(50).fill(null).map(createListItem)

export const Lists = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])
  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <StackHeader goBack={false} dropdown title="카테고리">
          <Notification />
        </StackHeader>
        <View style={{paddingHorizontal: 15}}>
          <FlatList
            data={listItems}
            renderItem={({item}) => <GoodsListItem item={item}></GoodsListItem>}
            refreshing={refreshing}
            onRefresh={onRefresh}></FlatList>
          <FloatingButton onPress={() => {}}>
            <AddIcon width={24} height={24} fill="#fff" />
          </FloatingButton>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
})
