import React, { createContext, useEffect, useState } from 'react'
import { User } from '../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProviderState {
  isLoadingUserData: boolean
  user: User
}

interface UserProviderActions {
  onLogin: (data: User) => void
  onLogout: () => void
}

type UserProviderData = [
  state: UserProviderState,
  actions: UserProviderActions
]

export const UserContext = createContext<UserProviderData>({} as UserProviderData)

interface UserProviderProps {
  children: React.ReactNode
}

const INITIAL_VALUE: User = {
  cpf: "",
  id: "",
  name: "",
  token: "",
  isLogged: false,
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(INITIAL_VALUE)
  const [isLoadingUserData, setIsLoadingUserData] = useState(false)

  useEffect(() => {
    setIsLoadingUserData(true)
    AsyncStorage.getItem("USER")
      .then(userStr => {
        const savedUser: User = JSON.parse(userStr)
        setUser(savedUser)
        setIsLoadingUserData(false)
      })
      .catch(() => {
        setIsLoadingUserData(false)
      })
  }, [])


  const onLogin = (data: User) => {
    const loggedUser = { ...data, isLogged: true }
    setUser(loggedUser)
    AsyncStorage.setItem("USER", JSON.stringify(loggedUser))
  }

  const onLogout = () => {
    setUser(INITIAL_VALUE)
    AsyncStorage.setItem("USER", JSON.stringify(INITIAL_VALUE))
  }

  return <UserContext.Provider
    children={children}
    value={[{ isLoadingUserData, user }, { onLogin, onLogout }]}
  />

}