import React, {useMemo, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import * as theme from '../../theme'

const NUM_OF_DOTS = 5
const CIRCLE_SIZE = 2

export const StepDots = ({color}: {color: string}) => {
  var dots = useMemo(() => {
    var temp = []
    for (var i = 0; i < NUM_OF_DOTS; i++) {
      temp.push(<View style={[styles.dot, {backgroundColor: color}]} key={i} />)
    }
    return temp
  }, [])

  return <View style={[styles.container]}>{dots}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 34,
    justifyContent: 'space-between',
  },
  dot: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    //backgroundColor: gray300,
    //marginRight: 5,
  },
})
