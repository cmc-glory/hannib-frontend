import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {View, Text, StyleSheet, Dimensions, ButtonProps, TextInput} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Modal from 'react-native-modal'
import {CancelModal} from '../../components/MyPageStack'
import {useNavigation, useRoute} from '@react-navigation/native'
import {IParticipatingOnlineDetail} from '../../types'

import {StackHeader, SharingPreview, GoodsListItem, Button, Tag, RoundButton, XIcon} from '../../components/utils'

import * as theme from '../../theme'
import {useToggle} from '../../hooks'
const BUTTON_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 10) / 2

type ButtonsProps = {
  onPressWriteQnA: () => void
  toggleCancelModalVisible: () => void
  state: string
}
type ModalProps = {
  isVisible: boolean
  toggleIsVisible: () => void
}

const Buttons = ({toggleCancelModalVisible, onPressWriteQnA, state}: ButtonsProps) => {
  switch (state) {
    case 'proceeding':
      return (
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Button label="취소하기" selected={false} style={{width: BUTTON_WIDTH}} onPress={toggleCancelModalVisible} isDefault={true} />
          <Button label="문의하기" selected={true} style={{width: BUTTON_WIDTH}} onPress={onPressWriteQnA} />
        </View>
      )
    case 'completed':
      return <Button label="후기 작성" selected={true} style={{width: '100%'}} />
  }
}

export const ParticipatingSharingOnline = () => {
  const route = useRoute()
  const [participateState, setParticipateState] = useState<string>()
  const [detail, setDetail] = useState<IParticipatingOnlineDetail>()
  const [cancelModalVisible, toggleCancelModalVisible] = useToggle() // 취소 모달창 띄울지
  const navigation = useNavigation()

  //list 페이지에서 보낸 id
  const id = useMemo(() => route.params, [])

  // 컴포넌트가 마운트 되면 참여 나눔 상세 정보 가져옴
  useEffect(() => {
    fetch('http://localhost:8081/src/data/dummyParticipateOnlineDetail.json')
      .then(res => res.json())
      .then(result => {
        setDetail(result)
      })
  }, [])

  useEffect(() => {
    setParticipateState(detail?.state)
  }, [detail])

  const onPressWriteQnA = useCallback(() => {
    navigation.navigate('WriteQnA', {
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
          category={detail?.category ? detail.category : 'BTS'}
          title={detail?.title ? detail.title : 'BTS 키링 나눔'}
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
            <View style={[theme.styles.rowSpaceBetween, {marginBottom: 20}]}>
              <Text style={{color: theme.gray500}}>2022.06.30 22:01:52</Text>
              {participateState == 'completed' ? <Tag label="수령 완료"></Tag> : null}
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령자명</Text>
              <Text style={styles.requestInfoText}>{detail?.receiverName}</Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주문 목록</Text>
              <View>
                {detail?.products.map(item => (
                  <Text key={item.id} style={{...styles.requestInfoText, marginBottom: 8}}>
                    {item.name}({item.quantity}개)
                  </Text>
                ))}
              </View>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>주소</Text>
              <Text style={styles.requestInfoText}>
                {detail?.address.roadAddress} {detail?.address.detailedAddress}
              </Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>연락처</Text>
              <Text style={styles.requestInfoText}>
                {detail?.phonenumber.first}-{detail?.phonenumber.second}-{detail?.phonenumber.third}
              </Text>
            </View>
            <View style={[theme.styles.rowSpaceBetween, styles.requestInfoWrapper]}>
              <Text style={styles.requestInfoLabel}>수령 현황</Text>
              <Text style={styles.requestInfoText}>{detail?.postState}</Text>
            </View>
          </View>
        </View>
        <View style={{...theme.styles.rowSpaceBetween, width: '100%'}}>
          <Buttons
            toggleCancelModalVisible={toggleCancelModalVisible}
            onPressWriteQnA={onPressWriteQnA}
            state={participateState ? participateState : 'proceeding'}
          />
        </View>

        <CancelModal isVisible={cancelModalVisible} toggleIsVisible={toggleCancelModalVisible} />
      </View>
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
  shareModal: {
    backgroundColor: theme.white,
    borderRadius: 8,
    padding: theme.PADDING_SIZE,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: theme.gray200,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
})
