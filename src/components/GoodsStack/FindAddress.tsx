import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import DaumPostcode from '@actbase/react-daum-postcode'
import Modal from 'react-native-modal'
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'

import type {IRequestFormOnline} from '../../types'
import {useAutoFocus} from '../../contexts'
import * as theme from '../../theme'

const MARGIN_SIZE = 10

const WINDOW_WIDTH = Dimensions.get('window').width
const POSTCODE_BUTTON_WIDTH = 96
const POSTCODE_INPUT_WIDTH = WINDOW_WIDTH - theme.PADDING_SIZE * 2 - MARGIN_SIZE - POSTCODE_BUTTON_WIDTH

type FindAddressProps = {
  requestForm: IRequestFormOnline
  setRequestForm: React.Dispatch<React.SetStateAction<IRequestFormOnline>>
}

export const FindAddress = ({requestForm, setRequestForm}: FindAddressProps) => {
  const focus = useAutoFocus()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const onDetailAddressChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setRequestForm({...requestForm, address: {...requestForm.address, detailedAddress: e.nativeEvent.text}})
    },
    [requestForm],
  )

  return (
    <View>
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} style={{margin: 0}} backdropOpacity={0.6} backdropColor={theme.gray800}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
            <DaumPostcode
              style={{width: WINDOW_WIDTH, height: 600, paddingTop: 20}}
              jsOptions={{animation: true, hideMapBtn: true}}
              onError={err => {
                console.log(err)
              }}
              onSelected={data => {
                setRequestForm(requestForm => {
                  requestForm.address.roadAddress = data.address
                  requestForm.address.postcode = data.zonecode.toString()
                  return requestForm
                })
                setModalVisible(false)
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <View style={[styles.wrapper, styles.inputMargin]}>
        <View style={[theme.styles.input, styles.disabledInput, {width: POSTCODE_INPUT_WIDTH}, {justifyContent: 'center'}]}>
          <TextInput style={styles.disabledText} editable={false} placeholder="우편번호" value={requestForm?.address.postcode}></TextInput>
        </View>
        <Pressable style={styles.postcodeButton} onPress={() => setModalVisible(true)}>
          <Text style={{color: theme.gray800, fontSize: 16}}>주소 찾기</Text>
        </Pressable>
      </View>
      <View style={[theme.styles.input, styles.disabledInput, styles.inputMargin, {justifyContent: 'center'}]}>
        <TextInput style={styles.disabledText} editable={false} placeholder="도로명 주소" value={requestForm?.address.roadAddress}></TextInput>
      </View>

      <TextInput
        onChange={e => onDetailAddressChange(e)}
        value={requestForm.address.detailedAddress}
        onFocus={focus}
        style={[theme.styles.input, styles.inputMargin]}
        placeholder="상세 주소"
        placeholderTextColor={theme.gray300}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postcodeButton: {
    width: POSTCODE_BUTTON_WIDTH,
    borderColor: theme.gray800,
    borderRadius: 4,
    borderWidth: 1,
    height: theme.INPUT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  disabledInput: {
    backgroundColor: theme.gray50,
  },
  inputMargin: {
    marginTop: 10,
  },
  disabledText: {
    color: theme.gray500,
  },
})
