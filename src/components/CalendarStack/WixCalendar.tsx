import React, {useState} from 'react'
import {Text} from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars'
import moment from 'moment'
import {CalendarHeader} from './CalendarHeader'
import {Icon} from '../utils'
import LeftArrow from '../../assets/Icon/Left arrow.svg'
import * as theme from '../../theme'
import RightArrow from '../../assets/Icon/Right arrow.svg'

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
}
LocaleConfig.defaultLocale = 'fr'

export const WixCalendar = () => {
  const today = moment().format('YYYY-MM-DD')
  const [markedDates, setMarkedStates] = useState([today])

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
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2012-05-10'}
      // Maximum date that can be selected, date,s after maxDate will be grayed out. Default = undefined
      maxDate={undefined}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day)
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day)
      }}
      monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {
        console.log('month changed', month)
      }}
      hideExtraDays={true}
      renderArrow={direction =>
        direction == 'left' ? (
          <LeftArrow width={theme.ICON_SIZE} height={theme.ICON_SIZE} fill={theme.gray700} />
        ) : (
          <RightArrow width={theme.ICON_SIZE} height={theme.ICON_SIZE} fill={theme.gray700} />
        )
      }
      // Show week numbers to the left. Default = false
      showWeekNumbers={false}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false

      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter

      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={true}
      markedDates={{
        [markedDates[0]]: {
          selected: true,
          selectedColor: theme.main,
        },
      }}
    />
  )
}
