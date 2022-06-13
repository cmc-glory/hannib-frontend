import React, {useMemo, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {gray300} from '../../theme'

const NUM_OF_DOTS = 5
const CIRCLE_SIZE = 2

export const StepDots = () => {
  var dots = useMemo(() => {
    var temp = []
    for (var i = 0; i < NUM_OF_DOTS; i++) {
      temp.push(<View style={styles.dot} key={i} />)
    }
    return temp
  }, [])

  return <View style={styles.container}>{dots}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dot: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: gray300,
    marginRight: 5,
  },
})
