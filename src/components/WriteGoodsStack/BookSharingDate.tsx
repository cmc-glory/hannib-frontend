import React, {useState} from 'react'
import {View, Text, Pressable, StyleSheet, TextInput, Platform} from 'react-native'
import moment from 'moment'
import {Switch} from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {CalendarIcon} from '../utils'
import {useToggle} from '../../hooks'

import * as theme from '../../theme'

export const BookSharingDate = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false) // 나눔 수령일 선택 모달 띄울지
  const [date, setDate] = useState<string>('')

  const showDatePicker = () => {
    // 나눔 시작일 예약 버튼이 활성화 됐을 때만 달력 띄움
    if (isBooked) {
      setDatePickerVisibility(true)
    }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    //console.warn('A date has been picked: ', date)
    setDate(moment(date).format('YYYY MM D HH:mm'))
    hideDatePicker()
  }

  const [isBooked, toggleBooked] = useToggle()
  return (
    <View style={[styles.container]}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display={Platform.OS == 'ios' ? 'inline' : 'default'}
      />
      <View style={[theme.styles.rowSpaceBetween, {marginBottom: 10}]}>
        <Text style={[{fontFamily: 'Pretendard-Medium', fontSize: 16}]}>나눔 시작일 예약</Text>
        <Switch value={isBooked} onValueChange={toggleBooked} color={theme.secondary} />
      </View>
      <Pressable onPress={showDatePicker}>
        {date == '' && <CalendarIcon style={{position: 'absolute', right: 16, top: 12}} />}
        <TextInput
          onPressIn={() => Platform.OS == 'ios' && showDatePicker()}
          editable={false}
          underlineColorAndroid="transparent"
          value={date}
          style={[theme.styles.input]}
          placeholder="나눔 수령일 선택"
          placeholderTextColor={theme.gray200}></TextInput>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
})
