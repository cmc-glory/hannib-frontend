import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const NeccesaryField = () => {
  return <Text style={{color: theme.red, marginBottom: 10, marginLeft: 4, fontSize: 16}}>*</Text>
}

const styles = StyleSheet.create({})
