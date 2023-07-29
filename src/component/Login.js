import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

export default function Login({ setId }) {
  const idRef = useRef()

	const handleSubmit = (e) => {
		e.preventDefault()
		setId(idRef.current.value)
	}

	const createNewId = () => {
		setId(uuid())
	}

  return (
    <div>
        <Container className='align-items-center d-flex d-grid gap-3' style={{ height: '100vh' }}>
					<Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group>
                <Form.Label>
                    Enter Your Id
                </Form.Label>
                <Form.Control type='text' ref={idRef} />
            </Form.Group>
						<Button type='submit' className='me-2'>Login</Button>
						<Button  onClick={createNewId} variant='secondary'>Create A New Id</Button>
					</Form>
        </Container>
    </div>
  )
}
