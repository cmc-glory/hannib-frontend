import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet, Pressable, Platform} from 'react-native'
import moment from 'moment'
import {useToggle} from '../../hooks'
import type {IReceiveInfo} from '../../types'
import uuid from 'react-native-uuid'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {PlusIcon, MinusIcon, CalendarIcon, LocationIcon, CheckboxIcon} from '../utils'
import * as theme from '../../theme'

type SelectTimeLocationProps = {
  receiveInfo: IReceiveInfo[]
  setReceiveInfo: React.Dispatch<React.SetStateAction<IReceiveInfo[]>>
}

type TimeLocationItemProps = {
  item: IReceiveInfo
  onPressRemove: (id: string) => void
}

const TimeLocationItem = ({item, onPressRemove}: TimeLocationItemProps) => {
  const {receiveDate, receivePlace, id} = item
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={moment(receiveDate).format('YY.MM.D HH:mm')}
        style={[theme.styles.input, styles.input, {flex: 3}]}
        placeholder="수령일 선택"
        placeholderTextColor={theme.gray300}
        editable={false}
      />
      <TextInput
        value={receivePlace}
        style={[theme.styles.input, styles.input, {flex: 2}]}
        placeholder="장소 입력"
        placeholderTextColor={theme.gray300}
        editable={false}
      />
      <Pressable style={[theme.styles.plusMinusButton]} onPress={() => onPressRemove(id)}>
        <MinusIcon onPress={() => onPressRemove(id)} />
      </Pressable>
    </View>
  )
}

export const SelectTimeLocation = ({receiveInfo, setReceiveInfo}: SelectTimeLocationProps) => {
  const [isAllSamePlace, toggleIsAllSamePlace] = useToggle() // 모두 같은 장소
  const [info, setInfo] = useState<IReceiveInfo>({
    id: '',
    receiveDate: undefined,
    receivePlace: '',
  })
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false) // 나눔 수령일 선택 모달 띄울지
  const showDatePicker = () => {
    //console.log('here')
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    setInfo({...info, receiveDate: date})
    hideDatePicker()
  }
  const onPressAdd = useCallback(() => {
    const {receiveDate, receivePlace} = info // 현재 state에서 수령일, 수령 장소 가져오고

    if (receiveDate == undefined || receivePlace == '') {
      // 날짜와 장소 둘 다 입력 돼야함.
      return
    }

    const id = String(uuid.v1()) // id 생성

    setReceiveInfo(info => [...info, {id, receiveDate, receivePlace}]) // 저장한다.
    setInfo({
      id: '',
      receiveDate: undefined,
      receivePlace: '',
    }) // state 초기화 해줌.
  }, [info])
  const onPressRemove = useCallback((id: string) => {
    setReceiveInfo(info => info.filter(item => item.id !== id))
  }, [])
  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display={Platform.OS == 'ios' ? 'inline' : 'default'}
      />

      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 10}]}>
        <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16}]}>수령일 선택</Text>
        <View style={[theme.styles.rowFlexStart]}>
          {isAllSamePlace ? (
            <CheckboxIcon onPress={toggleIsAllSamePlace} style={{marginRight: 8}} />
          ) : (
            <Pressable style={styles.unchecked} onPress={toggleIsAllSamePlace} />
          )}
          <Text>모두 동일 장소</Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Pressable style={{flex: 3}} onPress={showDatePicker}>
          <TextInput
            onPressIn={showDatePicker}
            style={[theme.styles.input, styles.input]}
            editable={false}
            placeholder="수령일 선택"
            placeholderTextColor={theme.gray300}
            value={info.receiveDate != undefined ? moment(info.receiveDate).format('YY.MM.D HH:mm') : undefined}
          />
          {info.receiveDate == undefined && <CalendarIcon style={{position: 'absolute', right: 16, top: 12}} />}
        </Pressable>
        <View style={{flex: 2}}>
          <TextInput
            value={info.receivePlace}
            onChangeText={text => setInfo({...info, receivePlace: text})}
            style={[theme.styles.input, styles.input]}
            placeholder="위치"
            placeholderTextColor={theme.gray300}
          />
          {info.receivePlace == '' && <LocationIcon style={{position: 'absolute', right: 16, top: 12}} />}
        </View>
        <Pressable style={[theme.styles.plusMinusButton]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </Pressable>
      </View>
      {receiveInfo.map(item => (
        <TimeLocationItem key={item.id} onPressRemove={onPressRemove} item={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    marginRight: 8,
  },
  unchecked: {
    alignSelf: 'center',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 8,
    borderColor: theme.gray300,
  },
})
