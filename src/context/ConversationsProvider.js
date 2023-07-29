import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SockerProvider'

const ConversationsContext = createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('converstations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()

  const createConversation = (participants) => {
    setConversations(prev => {
      return [...prev, { participants, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ participants, text, sender }) => {
    setConversations(prev => {
      let madeChange = false
      const newMessage = { sender, text}
      const newConversations = prev.map(conversation => {
        if (arrayEquality(conversation.participants, participants)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [...prev, { participants, messages: [newMessage]}]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', (data) => {
      console.log(data)
      addMessageToConversation(data)
    })

    return () => socket?.off('receive-message')
  }, [socket, addMessageToConversation])                 

  const sendMessage = (participants, text) => {
    socket?.emit('send-message', { participants, text })

    addMessageToConversation({ participants, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const participants = conversation.participants.map(p => {
      const contact = contacts.find(contact => {
        return contact.id === p
      })

      const name = (contact && contact.name) || p

      return { id: p, name }
    })
    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })

      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender

      return {...message, senderName: name, fromMe}
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, messages, participants, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a,b) {
  if (a.length !== b.length) return false 

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}