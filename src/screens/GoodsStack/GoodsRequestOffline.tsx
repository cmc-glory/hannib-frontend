import React, {useCallback, useState} from 'react'
import {View, Text, Pressable, TextInput, TouchableOpacity, Platform, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {StackHeader, FloatingBottomButton, CheckboxIcon, DownArrowIcon} from '../../components/utils'
import * as theme from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'
import {IRequestForm, IProductInfo} from '../../types'

const BUTTON_SIZE = 24

const items: IProductInfo[] = [
  {id: '0', name: 'BTS 뷔 컨셉의 하트 키링', quantity: 30},
  {id: '1', name: 'BTS 지민 컨셉의 스페이드 키링', quantity: 30},
  {id: '2', name: 'BTS 진 컨셉의 클로버 키링', quantity: 30},
]

type ItemQuantityProps = {
  item: IProductInfo
  key: string
  index: number
  selectedItems: boolean[]
  setSelectedItems: React.Dispatch<React.SetStateAction<boolean[]>>
}

const ItemQuantity = ({item, index, selectedItems, setSelectedItems}: ItemQuantityProps) => {
  const selected = selectedItems[index]
  const onPressCheckbox = useCallback(() => {
    setSelectedItems([...selectedItems.slice(0, index), !selectedItems[index], ...selectedItems.slice(index + 1)])
  }, [selectedItems])
  return (
    <View style={[styles.flexRow, {marginTop: 16}]}>
      {selected ? <CheckboxIcon onPress={onPressCheckbox} style={{marginRight: 8}} /> : <TouchableOpacity onPress={onPressCheckbox} style={styles.checkbox} />}
      <Text style={[styles.itemName]}>{item.name}</Text>
      <View style={[styles.flexRow]}>
        <Text style={{marginRight: 5, color: theme.gray500}}>잔여 수량</Text>
        <Text style={{color: theme.main}}>{item.quantity}</Text>
      </View>
    </View>
  )
}

export const GoodsRequestOffline = () => {
  const [requestForm, setRequestForm] = useState<IRequestForm>({
    recieveDate: '',
    twitterid: '',
    name: '',
    address: {
      postcode: '',
      roadAddress: '',
      detailedAddress: '',
    },
    phonenumber: '',
  })

  const [selectedItems, setSelectedItems] = useState<boolean[]>(new Array(items.length).fill(false)) // 선택한 상품들
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false) // 나눔 수령일 선택 모달 띄울지
  const [selectedDate, setSelectedDate] = useState(null)

  const showDatePicker = () => {
    //console.log('here')
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    //console.warn('A date has been picked: ', date)
    setRequestForm({...requestForm, recieveDate: moment(date).format('YYYY MM D HH:mm')})
    hideDatePicker()
  }

  const [date, setDate] = useState(new Date())
  const onChangeText = useCallback(() => {}, [])

  const onPressRequest = useCallback(() => {}, [])
  const focus = useAutoFocus()
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <AutoFocusProvider>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Text style={[theme.styles.wrapper, styles.title]}>BTS 키링 나눔</Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            {items.map((item, index) => (
              <ItemQuantity item={item} key={item.id} index={index} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            ))}
          </View>
        </View>

        <View style={[{padding: theme.PADDING_SIZE}]}>
          <Text style={[theme.styles.bold16]}>정보 입력</Text>
          <View style={[styles.spacing]}>
            <Text style={styles.inputLabel}>나눔 수령일</Text>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              display={Platform.OS == 'ios' ? 'inline' : 'default'}
            />

            <Pressable onPress={showDatePicker}>
              {requestForm.recieveDate == '' && <DownArrowIcon style={{position: 'absolute', right: 16, top: 12}} />}
              <TextInput
                onPressIn={() => Platform.OS == 'ios' && showDatePicker()}
                editable={false}
                underlineColorAndroid="transparent"
                value={requestForm.recieveDate}
                onChange={(e: any) => setRequestForm({...requestForm, recieveDate: e.nativeEvent.text})}
                style={[theme.styles.input, styles.input]}
                placeholder="나눔 수령일 선택"
                onFocus={focus}
                placeholderTextColor={theme.gray200}></TextInput>
            </Pressable>
          </View>
          <View style={[styles.spacing]}>
            <Text style={styles.inputLabel}>이름</Text>
            <TextInput
              value={requestForm.name}
              onChange={(e: any) => setRequestForm({...requestForm, name: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="이름"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={[styles.spacing]}>
            <Text style={styles.inputLabel}>트위터 아이디</Text>
            <TextInput
              value={requestForm.twitterid}
              onChange={(e: any) => setRequestForm({...requestForm, twitterid: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="트위터 아이디"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>

          <View style={[{marginBottom: 30}, styles.spacing]}>
            <Text style={styles.inputLabel}>전화번호</Text>
            <TextInput
              value={requestForm.phonenumber}
              onChange={(e: any) => setRequestForm({...requestForm, phonenumber: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="전화번호"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>
        </View>
      </AutoFocusProvider>
      <FloatingBottomButton label="제출하기" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.gray300,
    marginRight: 8,
  },
  spacing: {
    marginTop: 24,
  },
  input: {},
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    fontFamily: 'Pretendard-Medium',
    color: theme.gray700,
    fontSize: 16,
    flex: 1,
  },
  ItemQuantity: {
    color: theme.gray500,
    marginRight: 5,
  },
  quantityButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderColor: theme.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
})
