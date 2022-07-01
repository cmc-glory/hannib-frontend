import React, {useEffect, useState} from 'react'
import {Calendar} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars'
import moment from 'moment'
import {LeftArrowCalendarIcon, RightArrowCalendarIcon} from '../utils'
import {ICalendar, IScheduleItem} from '../../types'
import * as theme from '../../theme'

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
}
LocaleConfig.defaultLocale = 'kr'

type WixCalendarProps = {
  scheduleAll: Object | undefined
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}
const today = moment().format('YYYY-MM-DD')

export const WixCalendar = ({scheduleAll, selectedDate, setSelectedDate}: WixCalendarProps) => {
  const [markedDates, setMarkedStates] = useState<any>({[today]: {selected: true, selectedColor: theme.main}})

  useEffect(() => {
    if (scheduleAll != undefined) {
      Object.keys(scheduleAll).map(item =>
        setMarkedStates((markedDates: any) => {
          const temp = {
            marked: true,
            dotColor: item == today ? theme.white : theme.secondary,
            selected: item == today ? true : false,
            selectedColor: theme.main,
          }

          return {...markedDates, [item]: temp}
        }),
      )
    }
  }, [scheduleAll])

  return (
    <Calendar
      theme={{
        arrowColor: theme.gray700,
        // 위에 title
        textMonthFontWeight: undefined,
        textMonthFontFamily: 'Pretendard-Bold',

        // 달력 날짜들
        textDayFontWeight: undefined,
        textDayFontFamily: 'Pretendard-Bold',

        // 요일들
        textDayHeaderFontWeight: undefined,
        textDayHeaderFontFamily: 'Pretendard-Bold',

        todayTextColor: theme.gray800,
        dayTextColor: theme.gray800,
        monthTextColor: theme.gray800,
        textSectionTitleColor: theme.gray800,
      }}
      headerStyle={{flexDirection: 'column'}}
      style={{marginHorizontal: 0, paddingHorizontal: 0}}
      hideArrows={false}
      minDate={'2012-01-01'}
      maxDate={undefined}
      onDayPress={day => {
        setSelectedDate(day.dateString)
      }}
      onMonthChange={day => {
        // 달이 바뀔 때 포커즈될 날짜 세팅
        if (day.dateString == today) {
          setSelectedDate(today)
        } else {
          setSelectedDate(day.dateString.slice(0, 7) + '01')
        }
      }}
      monthFormat={'yyyy.MM'}
      hideExtraDays={true}
      renderArrow={direction => (direction == 'left' ? <LeftArrowCalendarIcon /> : <RightArrowCalendarIcon />)}
      showWeekNumbers={false}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={true}
      markedDates={markedDates}
    />
  )
}
