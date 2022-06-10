import React, {useState, useCallback} from 'react'
import {RefreshControl, View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

import {white, black, styles as s} from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import {Notification, FloatingButton} from '../../components/utils'
import {createListItem} from '../../data/createListItem'
import {GoodsListItem, GoodsFilterTab, GoodsListItemVer2} from '../../components/MainTab'
import AddIcon from '../../assets/icons/add.svg'

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const listItems = new Array(50).fill(null).map(createListItem)

const GoodsLists = () => {
  const navigation = useNavigation()

  // states
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const [locationFilter, setLocationFilter] = useState<0 | 1 | 2>(0) // 전체(0), 우편(1), 오프라인(2)

  // callbacks
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const onPressWrite = useCallback(() => {
    navigation.navigate('WriteGoodsStackNavigator')
  }, [])

  return (
    <SafeAreaView style={[styles.container]} edges={['top', 'left', 'right']}>
      <StackHeader goBack={false} dropdown title="카테고리">
        <View style={{flexDirection: 'row', alignItems: 'center', width: 65, justifyContent: 'space-between'}}>
          <TouchableOpacity>
            <Icon name="search-outline" size={24} color={black} />
          </TouchableOpacity>
          <Notification />
        </View>
      </StackHeader>
      <View style={[s.wrapper]}>
        <GoodsFilterTab locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
        <FlatList
          data={listItems}
          renderItem={({item}) => <GoodsListItemVer2 item={item}></GoodsListItemVer2>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          onRefresh={onRefresh}></FlatList>

        <FloatingButton onPress={onPressWrite}>
          <AddIcon width={24} height={24} fill="#fff" />
        </FloatingButton>
      </View>
    </SafeAreaView>
  )
}

export default GoodsLists

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
})
