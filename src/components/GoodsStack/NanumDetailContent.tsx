import React, {useCallback} from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import moment from 'moment'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {Tag, StarFilledIcon, StarUnfilledIcon, LockIcon} from '../utils'
import {NoticeBanner} from './NoticeBanner'
import {RelatedSharing} from './RelatedSharing'
import {GoodsContentDetail} from './GoodsContentDetail'
import {SharingTimeLocation} from './SharingTimeLocation'
import {WriterProfileBanner} from './WriterProfileBanner'
import {SharingGoodsInfo} from './SharingGoodsInfo'
import {INanum} from '../../types'
import {addFavorite, removeFavorite} from '../../api'
import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'

type ContentProps = {
  headerHeight: number
  nanumDetail: INanum
  numInquires: number
}

export function NanumDetailContent({headerHeight, nanumDetail, numInquires}: ContentProps) {
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)

  console.log(nanumDetail.firstDate)

  const addFavoriteQuery = useMutation(addFavorite, {
    onSuccess: () => {
      showMessage({
        // 에러 안내 메세지
        message: '찜 목록에 추가되었습니다.',
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
  // 찜 해제
  const removeFavoriteQuery = useMutation(removeFavorite, {
    onSuccess: () => {
      showMessage({
        // 에러 안내 메세지
        message: '찜 목록에서 삭제되었습니다.',
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

  const onPressAddFavorite = useCallback(() => {
    if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading) {
      return
    }
    // 즐겨찾기 버튼 클릭했을 때
    nanumDetail.favorites_yn = 'Y' // 프론트 단에서만 즐겨찾기 여부 수정.
    nanumDetail.favorites += 1
    addFavoriteQuery.mutate({
      accountIdx: accountIdx,
      nanumIdx: nanumDetail.nanumIdx,
    }) // 인자에는 query params 넣기
  }, [nanumDetail, accountIdx, addFavoriteQuery, removeFavoriteQuery])

  const onPressRemoveFavorite = useCallback(() => {
    if (addFavoriteQuery.isLoading || removeFavoriteQuery.isLoading || nanumDetail.favorites == 0) {
      return
    }
    // 즐겨찾기 버튼 클릭했을 때
    nanumDetail.favorites_yn = 'N' //  프론트 단에서만 즐겨찾기 여부 수정. (invalidate query로 새로 가져오기 X)
    nanumDetail.favorites -= 1
    removeFavoriteQuery.mutate({
      accountIdx: accountIdx,
      nanumIdx: nanumDetail.nanumIdx,
    }) // 인자에는 query params 넣기
  }, [nanumDetail, accountIdx, addFavoriteQuery, removeFavoriteQuery])

  return (
    <View
      style={[
        styles.container,
        {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -24,
          zIndex: 1,
        },
      ]}>
      <View style={styles.padding}>
        <View style={[theme.styles.rowFlexStart]}>
          <Tag label={nanumDetail?.nanumMethod == 'O' ? '오프라인' : '우편'}></Tag>
          {nanumDetail.secretForm == 'Y' && <LockIcon />}
        </View>
        <View style={[{marginVertical: 16}, theme.styles.rowSpaceBetween]}>
          <Text style={[styles.title]}>{nanumDetail?.title}</Text>
          <View style={{alignItems: 'center'}}>
            {nanumDetail?.favorites_yn == 'Y' ? (
              <StarFilledIcon size={30} onPress={onPressRemoveFavorite} />
            ) : (
              <StarUnfilledIcon size={30} onPress={onPressAddFavorite} />
            )}
            <Text style={{color: theme.gray500, fontSize: 12, fontFamily: 'Pretendard-Medium'}}>{nanumDetail.favorites}</Text>
          </View>
        </View>
        <Text style={[styles.date]}>{nanumDetail.firstDate.slice(0, 10)}</Text>
        <SharingGoodsInfo products={nanumDetail.nanumGoodslist} />
        {nanumDetail.nanumMethod == 'O' && <SharingTimeLocation schedules={nanumDetail.nanumDatelist} />}
      </View>
      <NoticeBanner postid="1111" />
      <View style={{padding: theme.PADDING_SIZE, justifyContent: 'center'}}>
        <Text style={theme.styles.bold16}>상세 설명</Text>
        <View style={[styles.descriptionContainer, {minHeight: 120}]}>
          <Text style={{fontSize: 16}}>{nanumDetail.contents}</Text>
        </View>
      </View>
      <WriterProfileBanner
        writername={nanumDetail.creatorId}
        nanumIdx={nanumDetail.nanumIdx}
        writerProfileImageUri={nanumDetail.accountDto?.accountImg}
        writerAccountIdx={nanumDetail.accountDto?.accountIdx}
        askNum={numInquires}
      />

      <View style={[styles.padding]}>{/* <RelatedSharing /> */}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingTop: theme.PADDING_SIZE,
    //justifyContent: 'center',
    flex: 1,
  },
  userName: {
    color: theme.gray800,
    fontFamily: 'Pretendard-SemiBold',
  },
  userImage: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 15,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  followText: {
    color: theme.white,
  },

  date: {
    color: theme.gray700,
    fontFamily: 'Pretendard-Medium',
  },
  starText: {
    fontFamily: 'Pretendard-Medium',
    color: theme.gray500,
    marginTop: 5,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: theme.gray800,
  },

  rootContainer: {
    flex: 1,
    zIndex: 99,
  },
  container: {
    backgroundColor: 'white',
  },
  itemContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 25,
    color: '#FFD800',
  },
  padding: {padding: 20},
})
