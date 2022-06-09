import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {StepDots} from '../utils'
import RightArrowIcon from '../../assets/icons/right-arrow-next-svgrepo-com.svg'
import {black, white, gray300, gray700} from '../../theme'

const ICON_SIZE = 9
type stepIndicatorProps = {
  step: number
}

export const StepIndicator = ({step}: stepIndicatorProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.itemContainer]}>
        <View style={[styles.circle, step == 1 ? styles.selectedCircle : styles.unselectedCircle]}>
          <Text style={{color: step == 1 ? white : gray300}}>1</Text>
        </View>
        <Text style={[{fontFamily: 'Pretendard-Bold'}, step == 1 ? styles.selectedText : styles.unselectedText]}>기본 정보</Text>
      </View>
      <StepDots />
      <View style={[styles.itemContainer]}>
        <View style={[styles.circle, step == 2 ? styles.selectedCircle : styles.unselectedCircle]}>
          <Text style={{color: step == 2 ? white : gray300}}>2</Text>
        </View>
        <Text style={[{fontFamily: 'Pretendard-Bold'}, step == 2 ? styles.selectedText : styles.unselectedText]}>입력폼</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedText: {
    color: gray700,
  },
  unselectedText: {
    color: gray300,
  },
  unselectedCircle: {
    backgroundColor: white,
    borderColor: gray300,
  },
  selectedCircle: {
    backgroundColor: gray700,
    borderColor: gray700,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderWidth: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
