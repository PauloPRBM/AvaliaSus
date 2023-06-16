import { useContext } from "react"
import { UserContext } from "../providers"


export const useUser = () => {
  const context = useContext(UserContext)

  if (!context)
    throw new Error("This hook needs be wrapped by UserProvider");

  return context
}