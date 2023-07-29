import React, { useContext, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = socketIOClient(
      'http://localhost:5050',
      { query: { id } }
    )
    setSocket(newSocket)

    newSocket.on('connect', () => {
        // setConnectionStatus('Connected');
        console.log('Connected to the server.');
    });

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}