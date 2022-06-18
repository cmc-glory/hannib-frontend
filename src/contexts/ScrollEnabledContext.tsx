import React, {createContext, useContext, useState} from 'react'

export type ScrollEnabledContextType = {
  scrollEnabled: boolean
  setScrollEnabled: (enabled: boolean) => void
}

const defaultScrollEnabledContext = {
  scrollEnabled: true,
  setScrollEnabled: (enable: boolean) => {},
}

const scrollEnabledContext = createContext<ScrollEnabledContextType>(defaultScrollEnabledContext)

type ScrollEnabledContextProps = {
  children: any
}

export const ScrollEnabledProvider = ({children}: ScrollEnabledContextProps) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true)
  const value = {scrollEnabled, setScrollEnabled}

  return <scrollEnabledContext.Provider value={value}>{children}</scrollEnabledContext.Provider>
}

export const useScrollEnabled = (): [boolean, (enabled: boolean) => void] => {
  const {scrollEnabled, setScrollEnabled} = useContext(scrollEnabledContext)
  return [scrollEnabled, setScrollEnabled]
}
