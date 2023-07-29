import React, { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactsProvider } from '../context/ContactsProvider'
import { ConverstationsProvider } from '../context/ConverstationsProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <ConverstationsProvider>
        <Dashboard id={id} />
      </ConverstationsProvider>
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login setId={setId}/>
  )
}

export default App;
