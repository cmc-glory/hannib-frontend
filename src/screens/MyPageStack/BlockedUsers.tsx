import React, {useCallback, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CheckboxIcon, EmptyCheckboxIcon} from '../../components/utils'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {useQuery, useQueryClient, useMutation, QueryCache, QueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'
import {StackHeader, RoundButton} from '../../components/utils'
import * as theme from '../../theme'
import {getBlockedUsers, queryKeys, unblockUser} from '../../api'
import {IBlockedUserDto, IBlockDto} from '../../types'
import {useAppSelector} from '../../hooks'
import NoUserSvg from '../../assets/Icon/noUser.svg'
import NotExistsSvg from '../../assets/Icon/NotExists.svg'

const BlockedUserItem = ({
  item,
  index,
  onPress,
  selectedAccountIdx,
}: {
  item: IBlockDto
  index: number
  onPress: (index: number) => void
  selectedAccountIdx: number
}) => {
  const {creatorId, accountImg, accountIdxBlocked} = item
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 24}]}>
      {selectedAccountIdx == accountIdxBlocked ? (
        <CheckboxIcon onPress={() => onPress(accountIdxBlocked)} />
      ) : (
        <EmptyCheckboxIcon onPress={() => onPress(accountIdxBlocked)} />
      )}
      {accountImg == '' || accountImg == undefined || accountImg == null ? (
        <View style={[styles.image, {justifyContent: 'center', alignItems: 'center', backgroundColor: theme.gray50}]}>
          <NoUserSvg width={12} height={12} />
        </View>
      ) : (
        <FastImage source={{uri: accountImg}} style={styles.image} />
      )}

      <Text style={{color: theme.gray700, fontSize: 16}}>{creatorId}</Text>
    </View>
  )
}

export const BlockedUsers = () => {
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx) // 현재 사용자의 accountIdx
  const [blockedUsers, setBlockedUsers] = useState<IBlockDto[]>([]) // 차단된 사용자 리스트
  const [selectedAccountIdx, setSelectedAcountIdx] = useState<number>(0)
  const queryClient = useQueryClient()
  const navigation = useNavigation()

  useQuery(queryKeys.block, () => getBlockedUsers(accountIdx), {
    onSuccess(data) {
      setBlockedUsers(data)
    },
  })

  const unblockUserQuery = useMutation(queryKeys.block, unblockUser, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(queryKeys.block)
      queryClient.invalidateQueries([queryKeys.nanumList])

      navigation.goBack()
      // 에러 발생
      showMessage({
        // 에러 안내 메세지
        message: '차단 해제가 완료됐습니다.',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })

  // const onPressCheckbox = useCallback(
  //   (index: number) => {
  //     setBlockedUsers([...blockedUsers.slice(0, index), {...blockedUsers[index], checked: !blockedUsers[index].checked}, ...blockedUsers.slice(index + 1)])
  //   },
  //   [blockedUsers],
  // )

  const onPressCheckbox = useCallback(
    (accountIdxBlocked: number) => {
      if (selectedAccountIdx == accountIdxBlocked) {
        setSelectedAcountIdx(0)
      } else {
        setSelectedAcountIdx(accountIdxBlocked)
      }
    },
    [selectedAccountIdx],
  )

  const checkEnabled = useCallback(() => {
    return selectedAccountIdx == 0 ? false : true
  }, [selectedAccountIdx])

  // 선택된 계정 차단 해제 클릭시
  const onPressUnblock = useCallback(() => {
    if (unblockUserQuery.isLoading) {
      return
    }

    console.log(
      JSON.stringify({
        accountIdxBlocked: selectedAccountIdx,
        accountIdxBlock: accountIdx,
      }),
    )

    unblockUserQuery.mutate({
      accountIdxBlocked: selectedAccountIdx,
      accountIdxBlock: accountIdx,
    })
  }, [blockedUsers, unblockUserQuery, selectedAccountIdx, accountIdx])

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader goBack title="차단된 계정 리스트" x />
      <View style={[{padding: theme.PADDING_SIZE, flex: 1}, blockedUsers.length == 0 && {justifyContent: 'center', alignItems: 'center'}]}>
        {blockedUsers.length == 0 ? (
          <View style={styles.emptyResultContainer}>
            <NotExistsSvg />
            <View style={styles.textContainer}>
              <Text style={[theme.styles.bold20]}>차단된 계정이 없습니다</Text>
            </View>
          </View>
        ) : (
          <View>
            {blockedUsers.map((user, index) => (
              <BlockedUserItem item={user} key={user.accountIdxBlocked} index={index} onPress={onPressCheckbox} selectedAccountIdx={selectedAccountIdx} />
            ))}
            <RoundButton label="선택 계정 차단 해제" enabled={checkEnabled()} onPress={onPressUnblock} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 32,
  },
  emptyResultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 16,
    marginRight: 8,
  },
})
