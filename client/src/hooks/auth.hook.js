import { useCallback, useEffect, useState } from 'react'
const storageName = 'userData'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userID, setUserID] = useState(null)

  const login = useCallback((jwtToken, ID) => {
    setToken(jwtToken)
    setUserID(ID)
    localStorage.setItem(storageName, JSON.stringify({ token:jwtToken }))
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserID(null)
    localStorage.removeItem(storageName)
  }, [])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if(data && data.token){
      login(data.token, data.userID)
    }
  }, [login])
  return { login, logout, token, userID }
}
