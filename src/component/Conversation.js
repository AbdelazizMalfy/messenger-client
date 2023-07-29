import React from 'react'
import { useConverstations } from '../context/ConverstationsProvider'

export default function Conversation() {
	const { conversations } =  useConverstations() 
	console.log(conversations)
  return (
    <div>
			Conversations
    </div>
  )
}
