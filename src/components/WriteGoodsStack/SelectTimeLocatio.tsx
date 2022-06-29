import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet, Pressable, Platform} from 'react-native'
import moment from 'moment'
import uuid from 'react-native-uuid'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {useToggle} from '../../hooks'
import type {IReceiveInfo} from '../../types'
import {PlusIcon, MinusIcon, CalendarIcon, LocationIcon, CheckboxIcon, NeccesaryField} from '../utils'
import * as theme from '../../theme'

// ******************** component prop types  ********************
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
      <View style={{flex: 3}}>
        <TextInput
          value={moment(receiveDate).format('YY.MM.D HH:mm')}
          style={[theme.styles.input, styles.input]}
          placeholder="수령일 선택"
          placeholderTextColor={theme.gray300}
          editable={false}
        />
      </View>

      <View style={{flex: 2}}>
        <TextInput
          value={receivePlace}
          style={[theme.styles.input, styles.input]}
          placeholder="장소 입력"
          placeholderTextColor={theme.gray300}
          editable={false}
        />
      </View>

      <Pressable style={[theme.styles.plusMinusButton]} onPress={() => onPressRemove(id)}>
        <MinusIcon onPress={() => onPressRemove(id)} />
      </Pressable>
    </View>
  )
}

export const SelectTimeLocation = ({receiveInfo, setReceiveInfo}: SelectTimeLocationProps) => {
  // ******************** states ********************
  const [isAllSamePlace, setIsAllSamePlace] = useState<boolean>() // 모두 같은 장소
  const [info, setInfo] = useState<IReceiveInfo>({
    // 사용자가 입력한 위치, 시간 정보
    id: '',
    receiveDate: undefined,
    receivePlace: '',
  })
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false) // 나눔 수령일 선택 모달 띄울지

  // ******************** callbacks ********************
  const showDatePicker = () => {
    // date picker 띄우기
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    // date picker 숨기기
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    // date picker에서 날짜 선택시
    setInfo({...info, receiveDate: date})
    hideDatePicker()
  }

  const onPressAdd = useCallback(() => {
    // 선택한 시간, 위치 정보 추가
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
    // 선택한 시간, 위치 정보 삭제
    setReceiveInfo(info => info.filter(item => item.id !== id))
  }, [])

  const onPressAllSamePlace = useCallback(() => {
    const temp = isAllSamePlace
    setIsAllSamePlace(!temp)
    if (temp == false) {
      setReceiveInfo(
        receiveInfo.map(item => {
          return {...item, receivePlace: info.receivePlace}
        }),
      )
    } else {
      setReceiveInfo(
        receiveInfo.map(item => {
          return {...item, place: ''}
        }),
      )
    }
  }, [info, receiveInfo, isAllSamePlace])

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display={Platform.OS == 'ios' ? 'inline' : 'default'}
      />

      <View style={[theme.styles.rowSpaceBetween]}>
        <View style={[theme.styles.rowFlexStart]}>
          <Text style={[theme.styles.label]}>수령일 선택</Text>
          <NeccesaryField />
        </View>

        <View style={[theme.styles.rowFlexStart, {marginBottom: 10}]}>
          {isAllSamePlace ? (
            <CheckboxIcon onPress={onPressAllSamePlace} style={{marginRight: 8}} />
          ) : (
            <Pressable style={styles.unchecked} onPress={onPressAllSamePlace} />
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
