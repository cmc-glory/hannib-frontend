import AsyncStorage from '@react-native-async-storage/async-storage'

// usage : storeString(key, stirng value)
export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('error occured while storing key:', key, 'value:', value)
    console.log('error:', e)
  }
}

// usage : storeObject(key, object value)
export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('error occured while storing key:', key, 'value:', value)
    console.log('error:', e)
  }
}

// usage : getString(key)
export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)

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
  } catch (e) {
    console.log('error occured while retrieving object with key:', key)
    console.log('error:', e)
  }
}
