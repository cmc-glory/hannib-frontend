import {useNavigation, useRoute} from '@react-navigation/native'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Asset} from 'react-native-image-picker'
import {IParticipatingOfflineDetail} from '../../types'
import {CancelModal} from '../../components/MyPageStack'
import {StackHeader, SharingPreview, GoodsListItem, Button, Tag} from '../../components/utils'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {WriteReviewPropsNavigationProps} from '../../navigation/ParticipatingSharingStackNavigator'
import moment from 'moment'
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2

//const participateState: string = 'notTaken'

type Buttons = {
  onPressWriteQnA: () => void
  toggleCancelModalVisible: () => void
  onPressWriteReview: () => void
  participateState: string
}
const Buttons = ({onPressWriteQnA, toggleCancelModalVisible, onPressWriteReview, participateState}: Buttons) => {
  switch (participateState) {
    case 'proceeding':
      return (
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} isDefault={true} />
          <Button label="문의하기" selected={true} style={{width: BUTTON_WIDTH}} onPress={onPressWriteQnA} />
        </View>
      )
    case 'completed':
      return <Button label="후기 작성" selected={true} style={{width: '100%'}} onPress={onPressWriteReview} />
    case 'reviewFinished':
      return <Button label="후기 작성 완료" selected={false} style={{width: '100%'}} onPress={onPressWriteReview} isDefault={true} />
    case 'notTaken':
      return <Button label="미수령" selected={false} style={{width: '100%'}}></Button>
  }
}

export const ParticipatingSharingOffline = () => {
  const route = useRoute()
  const [openDate, setOpenDate] = useState<string>()
  const [expectedReceiveDate, setExpectedReceiveDate] = useState<string>()
  const [finalReceiveDate, setFinalReceiveDate] = useState<string>()
  const [detail, setDetail] = useState<IParticipatingOfflineDetail>()
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
  const navigation = useNavigation()
  const writeReviewNavigation = useNavigation<WriteReviewPropsNavigationProps>()
  const [participateState, setParticipateState] = useState()

  //list 페이지에서 보낸 id
  const id = useMemo(() => route.params, [])

  // 컴포넌트가 마운트 되면 참여 나눔 상세 정보 가져옴
  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummyParticipateOfflineDetail.json')
      .then(res => res.json())
      .then(result => {
        setDetail(result)
        setParticipateState(result.state)
      })
  }, [])

  useEffect(() => {
    //console.log('detail : ', detail)'
    setOpenDate(moment(detail?.openDate).format('YYYY.MM.DD HH.MM.SS'))
    setExpectedReceiveDate(moment(detail?.expectedReceiveDate).format('YYYY.MM.DD HH.MM.SS'))
    setFinalReceiveDate(moment(detail?.finalReceiveDate).format('YYYY.MM.DD HH.MM.SS'))
  }, [detail, participateState])

  console.log(detail)
  const onPressWriteQnA = useCallback(() => {
    navigation.navigate('WriteQnA', {
      postid: '1', // 해당 나눔 게시글의 id
      userid: '1', // 문의글을 남기는 사용자의 id,
      imageuri: 'http://localhost:8081/src/assets/images/detail_image_example.png', // 썸네일 uri
      category: 'bts', // 카테고리
      title: 'BTS 키링 나눔', // 나눔 제목
    })
  }, [])

  const onPressWriteReview = useCallback(() => {
    writeReviewNavigation.navigate('WriteReview', {
      postid: '1', // 해당 나눔 게시글의 id
      userid: '1', // 문의글을 남기는 사용자의 id,
      imageuri: 'http://localhost:8081/src/assets/images/detail_image_example.png', // 썸네일 uri
      category: 'bts', // 카테고리
      title: 'BTS 키링 나눔', // 나눔 제목
    })
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="참여한 나눔" goBack />
      <View style={[styles.container, theme.styles.wrapper]}>
        <SharingPreview
          uri={detail?.uri ? detail.uri : 'http://localhost:8081/src/assets/images/detail_image_example.png'}
          category={detail?.category ? detail.category : 'error'}
          title={detail?.title ? detail.title : 'error'}
        />
        <View style={{marginTop: 16}}>
          {detail?.products.map(item => (
            <GoodsListItem key={item.id} type="participating" title={item.name} quantity={item.quantity} />
          ))}
        </View>
        <View style={{width: '100%', height: 1, backgroundColor: theme.gray200, marginVertical: 10}} />
        <View style={{marginVertical: 16}}>
          <Text style={[theme.styles.bold16, {marginBottom: 16}]}>신청 내역</Text>

          <View>
            <Text style={{marginBottom: 24, color: theme.gray500}}>{openDate}</Text>
            {/* <View style={{paddingVertical: 16, alignSelf: 'center'}}>
              <View style={{backgroundColor: theme.main50, width: 104, height: 104}} />
            </View> */}
            {/* {participateState == 'completed' || 'reviewFinished' ? <Tag label="수령 완료"></Tag> : null} */}
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령자명</Text>
              <Text style={styles.requestInfoText}>{detail?.receiverName}</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>{participateState == 'proceeding' ? '수령 예정일' : '최종 수령일'}</Text>
              <Text style={styles.requestInfoText}>{participateState == 'proceeding' ? expectedReceiveDate : finalReceiveDate}</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>장소</Text>
              <Text style={styles.requestInfoText}>{detail?.location}</Text>
            </View>
          </View>
        </View>

        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Buttons
            onPressWriteQnA={onPressWriteQnA}
            toggleCancelModalVisible={toggleCancelModalVisible}
            onPressWriteReview={onPressWriteReview}
            participateState={participateState ? participateState : 'proceeding'}
          />
        </View>
      </View>
      <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
  requestInfoContainer: {
    flex: 1,
  },
  requestInfoWrapper: {
    marginBottom: 20,
  },
  requestInfoLabel: {
    fontSize: 16,
    color: theme.gray500,
    alignSelf: 'flex-start',
  },
  requestInfoText: {
    fontSize: 16,
    color: theme.gray700,
    alignSelf: 'flex-end',
  },
})
