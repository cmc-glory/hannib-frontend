import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, Pressable, StyleSheet, Dimensions, ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import DaumPostcode from '@actbase/react-daum-postcode'
import Modal from 'react-native-modal'
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'

import type {IRequestForm} from '../../types'
import {useAutoFocus} from '../../contexts'
import * as theme from '../../theme'

const MARGIN_SIZE = 10

const WINDOW_WIDTH = Dimensions.get('window').width
const POSTCODE_BUTTON_WIDTH = 120
const POSTCODE_INPUT_WIDTH = WINDOW_WIDTH - theme.PADDING_SIZE * 2 - MARGIN_SIZE - POSTCODE_BUTTON_WIDTH

type FindAddressProps = {
  requestForm: IRequestForm
  setRequestForm: React.Dispatch<React.SetStateAction<IRequestForm>>
}

export const FindAddress = ({requestForm, setRequestForm}: FindAddressProps) => {
  const focus = useAutoFocus()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const onDetailAddressChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setRequestForm({...requestForm, address: {...requestForm.address, detailedAddress: e.nativeEvent.text}})
  }, [])

  return (
    <View>
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
            <DaumPostcode
              style={{width: WINDOW_WIDTH, height: 600, paddingHorizontal: 25, paddingTop: 15}}
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
          <Text style={styles.disabledText}>{requestForm?.address.postcode}</Text>
        </View>
        <Pressable style={styles.postcodeButton} onPress={() => setModalVisible(true)}>
          <Text style={{color: theme.main}}>우편번호 검색</Text>
        </Pressable>
      </View>
      <View style={[theme.styles.input, styles.disabledInput, styles.inputMargin, {justifyContent: 'center'}]}>
        <Text style={styles.disabledText}>{requestForm?.address.roadAddress}</Text>
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
    borderColor: theme.main,
    borderRadius: 4,
    borderWidth: 1,
    height: theme.INPUT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.main50,
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
