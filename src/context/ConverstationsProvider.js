import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConverstationsContext = createContext()

export function useConverstations() {
  return useContext(ConverstationsContext)
}

export function ConverstationsProvider({ children }) {
  const [converstations, setConverstations] = useLocalStorage('converstations', [])

  const createConverstation = (participants) => {
    setConverstations(prev => {
      return [...prev, { participants, messages: [] }]
    })
  }

  return (
    <ConverstationsContext.Provider value={{ converstations, createConverstation}}>
      {children}
    </ConverstationsContext.Provider>
  )
}
