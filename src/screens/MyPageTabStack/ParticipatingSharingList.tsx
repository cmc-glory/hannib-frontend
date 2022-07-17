import React, {useState, useCallback, useEffect} from 'react'
import {View, FlatList, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useAppSelector} from '../../hooks'
import {EmptyIcon, StackHeader} from '../../components/utils'
import {ParticipatingSharingItem} from '../../components/MyPageTabStack'
import * as theme from '../../theme'
import {IParticipatingSharingList} from '../../types'
import {useQuery, useQueryClient} from 'react-query'
import {getParticipatingNanumList, queryKeys} from '../../api'

export const ParticipatingSharingList = () => {
  // ******************** utils ********************
  const user = useAppSelector(state => state.auth.user) // user.id로 이 user가 진행한 나눔 목록 불러옴
  const queryClient = useQueryClient()

  // ******************** states ********************
  const [list, setList] = useState<IParticipatingSharingList[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false)

  useQuery([queryKeys.appliedNanumList], () => getParticipatingNanumList(user.accountIdx), {
    onSuccess: data => {
      console.log(data)
      setRefreshing(false)
      setList(data.nanumDtoList)
    },
    onError(err) {
      console.log(err)
    },
  })

  // pull up refresh event가 발생하면 진행 목록 가져옴
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.appliedNanumList])
  }, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview} edges={['top', 'left', 'right']}>
      <StackHeader title="참여한 나눔" goBack />
      <View style={styles.container}>
        {list.length == 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <EmptyIcon style={{marginBottom: 32}} />
            <View>
              <Text style={[theme.styles.bold20, {marginBottom: 8, textAlign: 'center'}]}>아직 참여한 나눔이 없어요.</Text>
              <View>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>리스트 페이지에서 나눔을 구경하고 </Text>
                <Text style={[{color: theme.gray700, fontSize: 16, textAlign: 'center'}, theme.styles.text16]}>참여하여 굿즈를 수령해보세요!</Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{paddingHorizontal: theme.PADDING_SIZE, paddingVertical: 10}}
            data={list}
            renderItem={({item}) => <ParticipatingSharingItem item={item}></ParticipatingSharingItem>}
            refreshing={refreshing}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
