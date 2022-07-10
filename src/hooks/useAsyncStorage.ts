import AsyncStorage from '@react-native-async-storage/async-storage'

// usage : storeString(key, stirng value)
export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    console.log('key :', key, ', value :', value, 'has been store successfully')
  } catch (e) {
    console.log('error occured while storing key:', key, 'value:', value)
    console.log('error:', e)
  }
}

// usage : removeString(key, stirng value)
export const removeString = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
    console.log('key :', key, ', has been removed successfully')
  } catch (e) {
    console.log('error occured while removing key : ', key)
    console.log('error:', e)
  }
}

// usage : storeObject(key, object value)
export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    console.log('key :', key, ', value :', value, 'has been store successfully')
  } catch (e) {
    console.log('error occured while storing key:', key, 'value:', value)
    console.log('error:', e)
  }
}

// usage : getString(key)
export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log('key :', key, ', value :', value, 'has been retrieved successfully')
    return value
  } catch (e) {
    console.log('error occured while retrieving string with key:', key)
    console.log('error:', e)
  }
}

// usage : getObject(key)
export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
    console.log('key :', key, ', value :', jsonValue, 'has been retrieved successfully')
  } catch (e) {
    console.log('error occured while retrieving object with key:', key)
    console.log('error:', e)
  }
}
