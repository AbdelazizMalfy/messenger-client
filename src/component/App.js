import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import useLocalStorage from '../hooks/useLocalStorage'
import { SocketProvider } from '../context/SockerProvider'
import { ContactsProvider } from '../context/ContactsProvider'
import { ConversationsProvider } from '../context/ConversationsProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login setId={setId}/>
  )
}

export default App;
