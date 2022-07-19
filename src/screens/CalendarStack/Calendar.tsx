import React, {useState, useMemo, useEffect, useCallback} from 'react'
import {View, Text, RefreshControl, ScrollView, StyleSheet, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useQuery, useQueryClient} from 'react-query'
import {queryKeys, getCalendarAll} from '../../api'
import moment from 'moment'

import {useAppSelector} from '../../hooks'
import {WixCalendar, CalendarItem} from '../../components/CalendarStack'
import {StackHeader, BellIcon, SeparatorLight} from '../../components/utils'
import {IScheduleItem, ICalendarDto, ICalendarApplyGoodsDto, ICalendarShow, ICanlendarShowInfoList, ICalendarNanumGoodsDto} from '../../types'
import * as theme from '../../theme'

export const Calendar = () => {
  // ******************** utils ********************
  const queryClient = useQueryClient()
  // ******************** states ********************
  const user = useAppSelector(state => state.auth.user)
  const [calendars, setCalendars] = useState<ICalendarDto>()
  const today = useMemo(() => moment().format('YYYY-MM-DD'), []) // 오늘
  const [selectedDate, setSelectedDate] = useState<string>(today) // 현재 선택한 날짜
  const [selectedSchedule, setSelectedSchedule] = useState<Array<ICalendarShow>>([]) //선택한 날짜의 스케줄
  const [refreshing, setRefreshing] = useState<boolean>(false) // 새로고침 state
  const accountIdx = useAppSelector(state => state.auth.user.accountIdx)
  const [participatingList, setParticipatingList] = useState<ICalendarShow[]>([])
  const [holdingList, setHoldingList] = useState<ICalendarShow[]>([])
  //const [schedulePerDay, setSchedulePerDay] = useState<Array<ICalendarShow>>([])
  const [calendarScheduleList, setcalendarScheduleList] = useState<ICanlendarShowInfoList>({
    participatingList: participatingList,
    holdingList: holdingList,
  })

  // ******************** react query ********************
  useQuery([queryKeys.calendar, accountIdx], () => getCalendarAll(accountIdx), {
    onSuccess: data => {
      console.log(accountIdx)
      setRefreshing(false)
      setCalendars(data)
      console.log('calendars : ', calendars)

      //******************** api로 오는 데이터 가공. ********************
      //참여한 나눔 가공
      const tempParticipatingList: {
        nanumIdx: number
        title: string
        goodsList: {goodsName: string; goodsNumber?: number}[]
        location: string
        acceptDate: string
        type: 'participating' | 'holding'
      }[] = []
      // 굿즈 정보를 nanumIdx 순서로 정렬
      const applyGoodsNameList: ICalendarApplyGoodsDto[] = data.applyGoodsDto.sort((a: ICalendarApplyGoodsDto, b: ICalendarApplyGoodsDto) => {
        if (a.nanumIdx < b.nanumIdx) {
          return -1
        }
        if (a.nanumIdx > b.nanumIdx) {
          return 1
        }
        return 0
      })
      data.calenderDto3.forEach((item: any, index: number) => {
        if (item.location == null) return

        tempParticipatingList.push({
          type: 'participating',
          nanumIdx: item.nanumIdx,
          title: item.title,
          location: item.location,
          acceptDate: item.acceptDate,
          goodsList: [],
        })
        const lastIdx = tempParticipatingList.length - 1

        for (let i = 0; i < applyGoodsNameList.length; i++) {
          if (applyGoodsNameList[i].nanumIdx == item.nanumIdx) {
            tempParticipatingList[lastIdx]?.goodsList?.push({goodsName: applyGoodsNameList[i].goodsName})
          }
        }
      })
      //console.log('tempParlist : ', tempParticipatingList)
      setParticipatingList(tempParticipatingList)

      //진행한 나눔 가공
      const tempHoldingList: {
        nanumIdx: number
        title: string
        goodsList: {
          goodsName: string
          goodsNumber: number
        }[]
        location: string
        acceptDate: string
        type: 'participating' | 'holding'
      }[] = []
      // 굿즈 정보를 nanumIdx 순서로 정렬
      const holdingGoodsList: ICalendarNanumGoodsDto[] = data.nanumGoodsDto.sort((a: ICalendarNanumGoodsDto, b: ICalendarNanumGoodsDto) => {
        if (a.nanumIdx < b.nanumIdx) {
          return -1
        }
        if (a.nanumIdx > b.nanumIdx) {
          return 1
        }
        return 0
      })
      data.calenderDto2.forEach((item: any, index: number) => {
        if (item.location == null) return

        tempHoldingList.push({
          type: 'holding',
          nanumIdx: item.nanumIdx,
          title: item.title,
          location: item.location,
          acceptDate: item.acceptDate,
          goodsList: [],
        })
        const lastIdx = tempHoldingList.length - 1

        for (let i = 0; i < holdingGoodsList.length; i++) {
          if (holdingGoodsList[i].nanumIdx == item.nanumIdx) {
            tempHoldingList[lastIdx]?.goodsList?.push({
              goodsName: holdingGoodsList[i].goodsName,
              goodsNumber: holdingGoodsList[i].goodsNumber,
            })
          }
        }
      })
      //console.log('tempHoldingList : ', tempHoldingList)
      setHoldingList(tempHoldingList)

      //holding 나오면 코드 추가
      setcalendarScheduleList({
        participatingList: participatingList,
        holdingList: holdingList,
      })
      console.log('calendarScheduleList 가공 완료된 데이터 : ', calendarScheduleList)
    },
    onError(err) {},
  })

  // ******************** callbacks ********************

  const onRefresh = useCallback(() => {
    // 새로고침침 pull up이 일어났을 때
    setRefreshing(true)
    queryClient.invalidateQueries([queryKeys.calendar])
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
          <WixCalendar
            selectedSchedule={selectedSchedule}
            scheduleAll={calendarScheduleList}
            setSelectedDate={setSelectedDate}
            setSelectedSchedule={setSelectedSchedule}
          />
        </View>

        <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
          <SeparatorLight style={{marginVertical: 20}} />

          {selectedSchedule == undefined || selectedSchedule.length == 0 ? (
            <View style={[theme.styles.rowFlexStart, styles.emptyContainer]}>
              <Text style={{marginRight: 8}}>📅</Text>
              <Text style={{fontFamily: 'Pretendard-Medium'}}>일정이 없어요!</Text>
            </View>
          ) : (
            selectedSchedule.map(item => <CalendarItem key={item.nanumIdx} item={item} />)
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
