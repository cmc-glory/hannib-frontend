import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {StepDots, CheckboxIcon} from '../utils'
import * as theme from '../../theme'

type stepIndicatorProps = {
  step: number
}

type StepProps = {
  label: string
  index?: number
  key?: number
}

const steps = [{label: '기본 정보'}, {label: '입력폼'}, {label: '완료'}]

const PreviousStep = ({label}: StepProps) => {
  return (
    <View style={[styles.itemContainer]}>
      <CheckboxIcon size={24} style={{marginRight: 8}} />
      <Text style={{color: theme.gray800}}>{label}</Text>
    </View>
  )
}

const CurrentStep = ({label, index}: StepProps) => {
  return (
    <View style={[styles.itemContainer]}>
      <View style={[styles.circle, styles.selectedCircle]}>
        <Text style={{color: theme.white, fontSize: 12}}>{index}</Text>
      </View>
      <Text style={{color: theme.gray800}}>{label}</Text>
    </View>
  )
}

const PostStep = ({label, index}: StepProps) => {
  return (
    <View style={[styles.itemContainer]}>
      <View style={[styles.circle, styles.unselectedCircle]}>
        <Text style={{color: theme.white, fontSize: 12}}>{index}</Text>
      </View>
      <Text style={{color: theme.gray300}}>{label}</Text>
    </View>
  )
}

export const StepIndicator = ({step}: stepIndicatorProps) => {
  return (
    <View style={[styles.container]}>
      {step == 1 ? <CurrentStep label={steps[0].label} index={1} /> : <PreviousStep label={steps[0].label} />}
      <StepDots color={step == 1 ? theme.gray300 : theme.gray800} />
      {step == 2 ? (
        <CurrentStep label={steps[1].label} index={2} />
      ) : step < 2 ? (
        <PostStep label={steps[1].label} index={2} />
      ) : (
        <PreviousStep label={steps[1].label} />
      )}
      <StepDots color={step == 3 ? theme.gray800 : theme.gray300} />
      {step == 3 ? <CurrentStep label={steps[2].label} index={3} /> : <PostStep label={steps[2].label} index={3} />}
    </View>
  )
}

const styles = StyleSheet.create({
  selectedText: {
    color: theme.gray700,
    fontFamily: 'Pretendard-Medium',
  },
  unselectedText: {
    color: theme.gray300,
    fontFamily: 'Pretendard-Medium',
  },
  unselectedCircle: {
    backgroundColor: theme.gray300,
    //borderColor: theme.gray300,
  },
  selectedCircle: {
    backgroundColor: theme.secondary,
    //borderColor: theme.gray700,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    //borderWidth: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
