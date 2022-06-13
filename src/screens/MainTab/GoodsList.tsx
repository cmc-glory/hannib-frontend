import React, {useState, useCallback} from 'react'
import {RefreshControl, View, Text, FlatList, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import IconIcons from 'react-native-vector-icons/Ionicons'

import * as theme from '../../theme'
import StackHeader from '../../components/utils/StackHeader'
import {FloatingButton} from '../../components/utils'
import {createListItem} from '../../data/createListItem'
import {GoodsListItem, GoodsFilterTab, GoodsListItemVer2} from '../../components/MainTab'
import {Icon} from '../../components/utils/Icon'

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
        <View style={{flexDirection: 'row', alignItems: 'center', width: 64, justifyContent: 'space-between'}}>
          <Pressable>
            <Icon uri="http://localhost:8081/src/assets/Icon/Magnifier.png" />
          </Pressable>
          <Pressable>
            <Icon uri="http://localhost:8081/src/assets/Icon/Bell.png" />
          </Pressable>
        </View>
      </StackHeader>
      <View>
        <GoodsFilterTab locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
        <FlatList
          contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE}}
          data={listItems}
          renderItem={({item}) => <GoodsListItemVer2 item={item}></GoodsListItemVer2>}
          refreshing={refreshing}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          onRefresh={onRefresh}></FlatList>

        <FloatingButton onPress={onPressWrite}>
          <IconIcons name="add-outline" color={theme.white} size={32} />
        </FloatingButton>
      </View>
    </SafeAreaView>
  )
}

export default GoodsLists

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    flex: 1,
  },
})
