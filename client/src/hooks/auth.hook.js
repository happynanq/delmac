import { useCallback, useEffect, useState } from 'react'
import { useHttp } from './http.hook'
const storageName = 'userData'
export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userID, setUserID] = useState(null)
  const [accessLevel, setAccessLevel] = useState(null)
  const {request} = useHttp()
  const login = useCallback((jwtToken, userID, accessLevel) => {

    setToken(jwtToken)
    setUserID(userID)
    setAccessLevel(accessLevel)
    localStorage.setItem(storageName, JSON.stringify({ token:jwtToken, userID, accessLevel }))
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setAccessLevel(null)
    setUserID(null)
    localStorage.removeItem(storageName)
  }, [])
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if(!data){

      return
    }
    const w = async()=>{
    
      try {
        
        let d = await request('/api/get/user', 'POST', null, {
          authorization: `Bearer ${data.token}`,
        })
         
        if(data && data.token){
          login(data.token, data.userID, d.accessLevel)
        }
      } catch (e) {
        console.log(e)
      }
      
    }
    w()
    
  }, [login, request])
  return { login, logout, token, userID, accessLevel }
}
