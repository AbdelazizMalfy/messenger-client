import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([])
	const { contacts } = useContacts()
	const { createConversation } = useConversations()

	const handleSubmit = (e) => {
		e.preventDefault()

		createConversation(selectedContactIds)
		closeModal()
	}

	const handleCheckboxChange = (contactId) => {
		setSelectedContactIds(prev => {
			if (prev.includes(contactId)) {
				return prev.filter(prevId => {
					return contactId !== prev
				})
			} else {
				return [...prev, contactId]
			}
		})
	}

  return (
    <>
			<Modal.Header closeButton>create Conversation</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map(contact => (
						<Form.Group controlId={contact.id} key={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContactIds.includes(contact.id)}
								label={contact.name}
								onChange={() => handleCheckboxChange(contact.id)}
								>

							</Form.Check>
						</Form.Group>
					))}

					<Button className='mt-2' type='submit'>Create</Button>
				</Form>
			</Modal.Body>
    </>
  )
}
