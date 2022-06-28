import React, {useCallback, useState} from 'react'
import {View, ScrollView, Text, Pressable, TextInput, TouchableOpacity, Platform, StyleSheet, Animated} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import moment from 'moment'
import {useQuery} from 'react-query'
import KeyboardManager from 'react-native-keyboard-manager'
import {StackHeader, FloatingBottomButton, CheckboxIcon, DownArrowIcon, SeparatorBold} from '../../components/utils'
import * as theme from '../../theme'
import {useAnimatedValue, useToggle, useAnimatedStyle} from '../../hooks'
import {IRequestForm, IProductInfo, ISharingRequestInfo} from '../../types'
import {queryKeys, getGoodsRequestInfo} from '../../api'

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true)
  KeyboardManager.setEnableDebugging(false)
  KeyboardManager.setKeyboardDistanceFromTextField(10)
  KeyboardManager.setLayoutIfNeededOnUpdate(true)
  KeyboardManager.setEnableAutoToolbar(false)
  KeyboardManager.setToolbarDoneBarButtonItemText('확인')
  KeyboardManager.setToolbarManageBehaviourBy('subviews') // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false)
  KeyboardManager.setToolbarTintColor('#007aff') // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF') // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true)
  KeyboardManager.setOverrideKeyboardAppearance(false)
  KeyboardManager.setKeyboardAppearance('default') // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true)
  KeyboardManager.setShouldPlayInputClicks(true)
  KeyboardManager.resignFirstResponder()
}

const BUTTON_SIZE = 24
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
  // ***************************** states *****************************
  const [info, setInfo] = useState<ISharingRequestInfo>({
    products: [],
    schedule: [],
    title: '',
  })
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]) // 선택한 상품들
  const [scheduleLength, setScheduleLength] = useState<number>(1)
  const [requestForm, setRequestForm] = useState<IRequestForm>({
    receiveDate: '',
    twitterid: '',
    name: '',
    phonenumber: '',
  })

  // ***************************** react query *****************************
  useQuery(queryKeys.goodsRequestInfo, getGoodsRequestInfo, {
    onSuccess: data => {
      setInfo(data)
      setRequestForm({...requestForm, receiveDate: data.schedule[0].time})
      setScheduleLength(data.schedule ? data.schedule.length : 1)
      setSelectedItems(new Array(data.products.length).fill(false))
    },
  })

  // ***************************** animations *****************************
  const [opened, toggleOpened] = useToggle()
  const animatedValue = useAnimatedValue()
  const open = Animated.timing(animatedValue, {
    // Select box 토글 애니메이션
    toValue: opened == true ? 0 : 1,
    duration: 200,
    useNativeDriver: false,
  })
  const animatedHeight = animatedValue.interpolate({
    // select box 높이
    inputRange: [0, 1],
    outputRange: [0, theme.INPUT_HEIGHT * scheduleLength],
    extrapolate: 'clamp',
  })
  const animatedInputHeight = animatedValue.interpolate({
    // select box 높이
    inputRange: [0, 1],
    outputRange: [0, theme.INPUT_HEIGHT],
    extrapolate: 'clamp',
  })
  const animatedRotation = animatedValue.interpolate({
    // select arrow 회전 애니메이션
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })
  const animatedArrowStyle = useAnimatedStyle({transform: [{rotate: animatedRotation}]})
  const animatedSelectionBoxStyle = useAnimatedStyle({height: animatedHeight, borderWidth: animatedValue}, [animatedHeight])
  const animatedSelectionInputStyle = useAnimatedStyle({height: animatedInputHeight, opacity: animatedValue})

  // ***************************** callbacks *****************************
  const onPressOpen = useCallback(() => {
    // select box누르면 애니메이션 시작
    open.start(toggleOpened)
  }, [opened])

  const onPressDate = useCallback(
    (date: Date | undefined) => {
      // 카테고리 선택하면, set하고 닫음
      open.start(toggleOpened)
      setRequestForm({...requestForm, receiveDate: date})
      //setMainCategory(mainCategory => (mainCategory == '가수' ? '배우' : '가수'))
    },
    [opened],
  )

  const onPressRequest = useCallback(() => {}, [])

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <ScrollView>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Text style={[theme.styles.wrapper, styles.title]}>{info.title}</Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            {info.products.map((item, index) => (
              <ItemQuantity item={item} key={item.id} index={index} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            ))}
          </View>
        </View>
        <SeparatorBold />

        <View style={[{padding: theme.PADDING_SIZE}]}>
          <Text style={[theme.styles.bold16]}>정보 입력</Text>
          <View style={[styles.spacing]}>
            <Text style={styles.inputLabel}>나눔 수령일</Text>
            <Pressable
              onPress={onPressOpen}
              style={[
                styles.input,
                theme.styles.rowSpaceBetween,
                {height: theme.INPUT_HEIGHT},
                styles.borderTopRadius,
                opened == false && styles.borderBottomRadius,
              ]}>
              <Text style={{marginLeft: 16}}>{moment(requestForm.receiveDate).format('YYYY.MM.DD HH:mm')}</Text>
              <Animated.View style={{...animatedArrowStyle, marginRight: 16}}>
                <DownArrowIcon onPress={onPressOpen} />
              </Animated.View>
            </Pressable>
            <Animated.View style={[{marginTop: -1, borderColor: theme.gray300}, animatedSelectionBoxStyle, styles.borderBottomRadius]}>
              {info.schedule?.map((schedule, index) => (
                <Animated.View
                  key={index}
                  style={[{...animatedSelectionInputStyle, justifyContent: 'center'}, index !== scheduleLength - 1 && styles.inputItemSeparator]}>
                  <Pressable onPress={() => onPressDate(schedule.time)}>
                    <Animated.Text style={{marginLeft: 16}}>{moment(schedule.time).format('YYYY.MM.DD HH:mm')}</Animated.Text>
                  </Pressable>
                </Animated.View>
              ))}
            </Animated.View>
          </View>
          <View style={[styles.spacing]}>
            <Text style={styles.inputLabel}>이름</Text>
            <TextInput
              value={requestForm.name}
              onChange={(e: any) => setRequestForm({...requestForm, name: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="이름"
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
              placeholderTextColor={theme.gray200}
            />
          </View>

          <View style={[{marginBottom: 30}, styles.spacing]}>
            <Text style={styles.inputLabel}>전화번호</Text>
            <TextInput
              keyboardType="number-pad"
              value={requestForm.phonenumber}
              onChange={(e: any) => setRequestForm({...requestForm, phonenumber: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="- 제외하고 입력"
              placeholderTextColor={theme.gray200}
            />
          </View>
        </View>
      </ScrollView>

      <FloatingBottomButton label="제출하기" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputItemSeparator: {
    borderBottomColor: theme.gray100,
    borderBottomWidth: 1,
  },
  borderTopRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  borderBottomRadius: {
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    //borderBottomRightRadius: 40,
  },
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
  input: {
    borderColor: theme.gray300,
    borderWidth: 1,
  },
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
