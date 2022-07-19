import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet, Pressable, Platform} from 'react-native'
import moment from 'moment'
import uuid from 'react-native-uuid'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import type {INanumDateInfo} from '../../types'
import {PlusIcon, MinusIcon, CalendarIcon, LocationIcon, CheckboxIcon, NeccesaryField} from '../utils'
import * as theme from '../../theme'

// ******************** component prop types  ********************
type SelectTimeLocationProps = {
  nanumDates: INanumDateInfo[]
  setNanumDates: React.Dispatch<React.SetStateAction<INanumDateInfo[]>>
}

type TimeLocationItemProps = {
  item: INanumDateInfo
  onPressRemove: (id: string) => void
}

const TimeLocationItem = ({item, onPressRemove}: TimeLocationItemProps) => {
  const {acceptDate, location, id} = item
  return (
    <View style={styles.wrapper}>
      <View style={{flex: 3}}>
        <TextInput
          value={moment(acceptDate).format('YY.MM.DD HH:mm')}
          style={[theme.styles.input, styles.input]}
          placeholder="수령일 선택"
          placeholderTextColor={theme.gray300}
          editable={false}
        />
      </View>

      <View style={{flex: 2}}>
        <TextInput value={location} style={[theme.styles.input, styles.input]} placeholder="장소 입력" placeholderTextColor={theme.gray300} editable={false} />
      </View>

      <Pressable style={[theme.styles.plusMinusButton]} onPress={() => onPressRemove(id)}>
        <MinusIcon onPress={() => onPressRemove(id)} />
      </Pressable>
    </View>
  )
}

export const SelectTimeLocation = ({nanumDates, setNanumDates}: SelectTimeLocationProps) => {
  // ******************** states ********************
  const [isAllSamePlace, setIsAllSamePlace] = useState<boolean>() // 모두 같은 장소
  const [info, setInfo] = useState<INanumDateInfo>({
    // 사용자가 입력한 위치, 시간 정보
    id: '',
    acceptDate: undefined,
    location: '',
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
    setInfo({...info, acceptDate: date})
    hideDatePicker()
  }

  const onPressAdd = useCallback(() => {
    // 선택한 시간, 위치 정보 추가
    const {acceptDate, location} = info // 현재 state에서 수령일, 수령 장소 가져오고

    if (acceptDate == undefined || location == '') {
      // 날짜와 장소 둘 다 입력 돼야함.
      return
    }

    const id = String(uuid.v1()) // id 생성

    setNanumDates(info => [...info, {id, acceptDate, location}]) // 저장한다.
    setInfo({
      id: '',
      acceptDate: undefined,
      location: '',
    }) // state 초기화 해줌.
  }, [info])

  const onPressRemove = useCallback(
    (id: string) => {
      // 선택한 시간, 위치 정보 삭제
      const temp = nanumDates.filter(item => item.id !== id)

      setNanumDates(temp)

      // 수령일 정보가 없는 경우엔 "모두 같은 장소" 옵션도 초기화
      if (temp.length == 0) {
        setIsAllSamePlace(false)
      }
    },
    [nanumDates],
  )

  const onPressAllSamePlace = useCallback(() => {
    const temp = isAllSamePlace
    setIsAllSamePlace(!temp)
    if (temp == false) {
      setNanumDates(
        nanumDates.map(item => {
          return {...item, location: info.location}
        }),
      )
    } else {
      setNanumDates(
        nanumDates.map(item => {
          return {...item, place: ''}
        }),
      )
    }
  }, [info, nanumDates, isAllSamePlace])

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display={Platform.OS == 'ios' ? 'inline' : 'default'}
        confirmTextIOS="확인"
        cancelTextIOS="취소"
        minimumDate={new Date()}
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
            value={info.acceptDate != undefined ? moment(info.acceptDate).format('YY.MM.D HH:mm') : undefined}
          />
          {info.acceptDate == undefined && <CalendarIcon style={{position: 'absolute', right: 16, top: 12}} />}
        </Pressable>
        <View style={{flex: 2}}>
          <TextInput
            value={info.location}
            onChangeText={text => setInfo({...info, location: text})}
            style={[theme.styles.input, styles.input]}
            placeholder="위치"
            placeholderTextColor={theme.gray300}
            onEndEditing={onPressAdd}
          />
          {info.location == '' && <LocationIcon style={{position: 'absolute', right: 16, top: 12}} />}
        </View>
        <Pressable style={[theme.styles.plusMinusButton]} onPress={onPressAdd}>
          <PlusIcon onPress={onPressAdd} />
        </Pressable>
      </View>
      {nanumDates.map(item => (
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
