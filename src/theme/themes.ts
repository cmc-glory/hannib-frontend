import {StyleSheet} from 'react-native'
import {black, gray500, gray300, white, main} from './colors'

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
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 15,
  },
  safeareaview: {
    backgroundColor: white,
    flex: 1,
  },
  button: {
    backgroundColor: main,
    borderRadius: 24,
  },
  bold16: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  bold20: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
})
