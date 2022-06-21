import React, {useState} from 'react'
import {View, Text, Pressable, StyleSheet, TextInput, Platform} from 'react-native'
import moment from 'moment'
import {Switch} from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {CalendarIcon} from '../utils'
import {useToggle} from '../../hooks'

import * as theme from '../../theme'

type BookSharingDateProps = {
  isOpenDateBooked: boolean
  toggleOpenDate: () => void
  openDate: Date | undefined
  setOpenDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const BookSharingDate = ({isOpenDateBooked, toggleOpenDate, openDate, setOpenDate}: BookSharingDateProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false) // 나눔 수령일 선택 모달 띄울지

  const showDatePicker = () => {
    // 나눔 시작일 예약 버튼이 활성화 됐을 때만 달력 띄움
    if (isOpenDateBooked) {
      setDatePickerVisibility(true)
    }
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    //console.warn('A date has been picked: ', date)
    setOpenDate(date)
    hideDatePicker()
  }

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
        <Switch value={isOpenDateBooked} onValueChange={toggleOpenDate} color={theme.secondary} />
      </View>
      <Pressable onPress={showDatePicker}>
        {openDate == undefined && <CalendarIcon style={{position: 'absolute', right: 16, top: 12}} />}
        <TextInput
          onPressIn={() => Platform.OS == 'ios' && showDatePicker()}
          editable={false}
          underlineColorAndroid="transparent"
          value={openDate == undefined ? undefined : moment(openDate).format('YYYY.MM.D HH:mm')}
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
