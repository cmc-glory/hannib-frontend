import React, {useCallback} from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import moment from 'moment'
import {useMutation} from 'react-query'

import {Tag, StarFilledIcon, StarUnfilledIcon, LockIcon} from '../utils'
import {NoticeBanner} from './NoticeBanner'
import {RelatedSharing} from './RelatedSharing'
import {GoodsContentDetail} from './GoodsContentDetail'
import {SharingTimeLocation} from './SharingTimeLocation'
import {WriterProfileBanner} from './WriterProfileBanner'
import {SharingGoodsInfo} from './SharingGoodsInfo'
import {INanum} from '../../types'
import {addFavorite, removeFavorite} from '../../api'
import * as theme from '../../theme'

type ContentProps = {
  headerHeight: number
  nanumDetail: INanum
  numInquires: number
}

const window = Dimensions.get('screen')

export function GoodsDetailContent({headerHeight, nanumDetail, numInquires}: ContentProps) {
  console.log(nanumDetail)
  const addFavoriteQuery = useMutation(addFavorite, {
    onSuccess: () => {},
  })
  // 찜 해제
  const removeFavoriteQuery = useMutation(removeFavorite, {
    onSuccess: () => {},
  })

  const onPressAddFavorite = useCallback(() => {
    // 즐겨찾기 버튼 클릭했을 때
    nanumDetail.isFavorite = 'Y' // 프론트 단에서만 즐겨찾기 여부 수정.
    nanumDetail.favorites += 1
    addFavoriteQuery.mutate({
      accountIdx: 0,
      nanumIdx: 0,
    }) // 인자에는 query params 넣기
  }, [])

  const onPressRemoveFavorite = useCallback(() => {
    // 즐겨찾기 버튼 클릭했을 때
    nanumDetail.isFavorite = 'N' //  프론트 단에서만 즐겨찾기 여부 수정. (invalidate query로 새로 가져오기 X)
    nanumDetail.favorites -= 1
    removeFavoriteQuery.mutate({
      accountIdx: 0,
      nanumIdx: 0,
    }) // 인자에는 query params 넣기
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          minHeight: window.height - headerHeight,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: -24,
          zIndex: 1,
        },
      ]}>
      <View style={styles.padding}>
        <View style={[theme.styles.rowFlexStart]}>
          <Tag label={nanumDetail?.nanumMethod == 'O' ? '오프라인' : '우편'}></Tag>
          {nanumDetail.secretForm && <LockIcon />}
        </View>
        <View style={[{marginVertical: 16}, theme.styles.rowSpaceBetween]}>
          <Text style={[styles.title]}>{nanumDetail?.title}</Text>
          <View style={{alignItems: 'center'}}>
            {nanumDetail?.isFavorite ? (
              <StarFilledIcon size={30} onPress={onPressRemoveFavorite} />
            ) : (
              <StarUnfilledIcon size={30} onPress={onPressAddFavorite} />
            )}
            <Text style={{color: theme.gray500, fontSize: 12, fontFamily: 'Pretendard-Medium'}}>{nanumDetail.favorites}</Text>
          </View>
        </View>
        <Text style={[styles.date]}>{moment(nanumDetail.firstDate).format('YYYY.MM.DD')}</Text>
        <SharingGoodsInfo products={nanumDetail.nanumGoodslist} />
        {nanumDetail.nanumMethod == 'O' && <SharingTimeLocation schedules={nanumDetail.nanumDateList} />}
      </View>
      <NoticeBanner postid="1111" />
      <GoodsContentDetail description={nanumDetail.contents} />
      <WriterProfileBanner writername={nanumDetail.creatorId} nanumIdx={nanumDetail.nanumIdx} writerProfileImageUri={'http://'} askNum={numInquires} />

      <View style={[styles.padding]}>
        <RelatedSharing />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
