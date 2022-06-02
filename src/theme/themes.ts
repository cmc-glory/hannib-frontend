import {StyleSheet} from 'react-native'
import {black, gray500, gray300} from './colors'

export const styles = StyleSheet.create({
  label: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: black,
    marginBottom: 10,
  },
  wrapper: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    borderColor: gray300,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 15,
  },
})
