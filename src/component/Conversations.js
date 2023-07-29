import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import { ListGroup } from 'react-bootstrap'

export default function Conversations() {
	const { conversations, setSelectedConversationIndex } =  useConversations()

  return (
    <ListGroup variant='flush'>
			{conversations.map((conversation, index) => (
				<ListGroup.Item 
					key={index}
					action
					onClick={() => setSelectedConversationIndex(index)}
					active={conversation.selected}
				>
					{conversation.participants.map(p => p.name).join(', ')}
				</ListGroup.Item>
			))}
    </ListGroup>
  )
}
