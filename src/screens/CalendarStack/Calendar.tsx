import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {WixCalendar} from '../../components/CalendarStack'

import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

export const Calendar = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StackHeader title="일정" />
      <View style={{paddingHorizontal: 10}}>
        <WixCalendar />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
})
