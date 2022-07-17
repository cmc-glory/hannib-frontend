import React, {useState, useMemo, useEffect, useCallback} from 'react'
import {View, Text, RefreshControl, ScrollView, StyleSheet, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useQueryClient} from 'react-query'
import {queryKeys, getCalendarAll} from '../../api'
import moment from 'moment'

import {useAppSelector} from '../../hooks'
import {WixCalendar, CalendarItem} from '../../components/CalendarStack'
import {StackHeader, BellIcon, SeparatorLight} from '../../components/utils'
import {IScheduleItem, ICalendarDto, ICalendarApplyGoodsDto} from '../../types'
import * as theme from '../../theme'

export const Calendar = () => {
  // ******************** utils ********************
  const queryClient = useQueryClient()
  // ******************** states ********************
  const [calendars, setCalendars] = useState<ICalendarDto>()
  const today = useMemo(() => moment().format('YYYY-MM-DD'), []) // 오늘
  const [selectedDate, setSelectedDate] = useState<string>(today) // 현재 선택한 날짜
  const [selectedSchedule, setSelectedSchedule] = useState<IScheduleItem[]>([])
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const [participatingList, setParticipatingList] = useState<
    {
      nanumIdx: number
      title: string
      goodsList: string[]
      location: string
    }[]
  >([])

  // ******************** react query ********************
  useQuery(queryKeys.calendar, () => getCalendarAll(accountIdx), {
    onSuccess: data => {
      setRefreshing(false)
      setCalendars(data)
      console.log(calendars)

      const tempParticipatingList: {
        nanumIdx?: number
        title?: string
        goodsList?: string[]
        location?: string
        acceptDate?: string
      }[] = []

      // 굿즈 정보를 nanumIdx 순서로 정렬
      const goodsNameList: ICalendarApplyGoodsDto[] = data.applyGoodsDto.sort((a: ICalendarApplyGoodsDto, b: ICalendarApplyGoodsDto) => {
        if (a.nanumIdx < b.nanumIdx) {
          return -1
        }
        if (a.nanumIdx > b.nanumIdx) {
          return 1
        }
        return 0
      })

      data.calenderDto3.forEach((item: any, index: number) => {
        tempParticipatingList.push({
          nanumIdx: item.nanumIdx,
          title: item.title,
          location: item.location,
          acceptDate: item.acceptDate,
          goodsList: [],
        })

        for (let i = 0; i < data.applyGoodsDto.length; i++) {
          if (data.applyGoodsDto[i].nanumIdx == item.nanumIdx) {
            tempParticipatingList[index].goodsList?.push(data.applyGoodsDto[i].goodsName)
          }
        }
      })
      console.log('tempParlist : ', tempParticipatingList)
    },
    onError(err) {},
  })

  // ******************** callbacks ********************

  const onRefresh = useCallback(() => {
    // 새로고침침 pull up이 일어났을 때
    setRefreshing(true)
    queryClient.invalidateQueries(queryKeys.calendar)
  }, [])

  // useEffect(() => {
  //   if (scheduleAll !== undefined) {
  //     setSelectedSchedule(scheduleAll[selectedDate])
  //   }
  // }, [scheduleAll, selectedDate])

  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      <StackHeader title="일정">
        <BellIcon />
      </StackHeader>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{paddingHorizontal: 10}}>
          <WixCalendar scheduleAll={calendars} setSelectedDate={setSelectedDate} />
        </View>

        <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
          <SeparatorLight style={{marginVertical: 20}} />

          {selectedSchedule !== undefined ? (
            selectedSchedule.map(item => <CalendarItem key={item.sharingid} item={item} />)
          ) : (
            <View style={[theme.styles.rowFlexStart, styles.emptyContainer]}>
              <Text style={{marginRight: 8}}>📅</Text>
              <Text style={{fontFamily: 'Pretendard-Medium'}}>오늘은 일정이 없어요!</Text>
            </View>
          )}
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
  emptyContainer: {
    backgroundColor: theme.gray50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: theme.PADDING_SIZE,
  },
})
