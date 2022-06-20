import React, {useState} from 'react'

export const useAsyncState = (initialValue: any): [any, (x: any) => Promise<any>] => {
  const [value, setValue] = useState(initialValue)
  const setter = (x: any) =>
    new Promise<any>(resolve => {
      setValue(x)
      resolve(x)
    })
  return [value, setter]
}
