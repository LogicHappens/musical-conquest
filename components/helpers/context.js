import { createContext, useState } from 'react'
export const Context = createContext()

export const Provider = ({ children }) => {
  const [currentSongHash, setCurrentSongHash] = useState('')

  const value = {
    currentSongHash,
    setCurrentSongHash,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
