import React, {useState, useMemo, useEffect, useCallback} from 'react'
import {View, Text, RefreshControl, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useQueryClient} from 'react-query'
import {queryKeys, getCalendarAll} from '../../api'
import moment from 'moment'
import {WixCalendar, CalendarItem} from '../../components/CalendarStack'
import {StackHeader, BellIcon, SeparatorLight} from '../../components/utils'
import {ICalendar, IScheduleItem} from '../../types'
import * as theme from '../../theme'

export const Calendar = () => {
  // ******************** utils ********************
  const queryClient = useQueryClient()
  // ******************** states ********************
  const [scheduleAll, setScheduleAll] = useState<any>()
  const today = useMemo(() => moment().format('YYYY-MM-DD'), [])
  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [selectedSchedule, setSelectedSchedule] = useState<IScheduleItem[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state

  // ******************** react query ********************
  useQuery(queryKeys.calendar, getCalendarAll, {
    onSuccess: data => {
      var temp: any = {}
      // temp : [date] :
      data.forEach((calendarItem: ICalendar) => {
        calendarItem.schedule.forEach(item => {
          const {time, place} = item
          const date = moment(time).format('YYYY-MM-DD')
          const {sharingid, type, title, products} = calendarItem
          if (temp[date] == undefined) {
            temp[date] = [{sharingid, type, time, place, title, products}]
          } else {
            temp[date].push({sharingid, type, time, place, title, products})
          }
        })
      })
      setScheduleAll(temp)
      setSelectedSchedule(temp[today])
      setRefreshing(false)
    },
  })

  // ******************** callbacks ********************

  const onRefresh = useCallback(() => {
    // 새로고침침 pull up이 일어났을 때
    setRefreshing(true)
    queryClient.invalidateQueries(queryKeys.calendar)
  }, [])

  useEffect(() => {
    if (scheduleAll !== undefined) {
      setSelectedSchedule(scheduleAll[selectedDate])
    }
  }, [scheduleAll, selectedDate])

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      <StackHeader title="일정">
        <BellIcon />
      </StackHeader>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{paddingHorizontal: 10}}>
          <WixCalendar scheduleAll={scheduleAll} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </View>

        <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
          <SeparatorLight style={{marginVertical: 20}} />

          {selectedSchedule?.map(item => (
            <CalendarItem key={item.sharingid} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
})
