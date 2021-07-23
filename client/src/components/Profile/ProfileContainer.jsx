import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Profile } from './Profile'
import { ProfileChange } from './ProfileChange'
export const ProfileContainer = () => {
  const auth = useContext(AuthContext)
  const [ud, setUd] = useState({});
  const [change, setChange] = useState(false);
  const { request } = useHttp()
  const history = useHistory()

  const getUser = useCallback(async()=>{
    try {

      let d = await request('/api/get/user', 'POST', null, {authorization:`Bearer ${auth.token}`})

      setUd(d)

     return d
      
    } catch (e) {
      
    }
  }, [setUd, request, auth.token]) 
  useEffect(() => {
    getUser()
  }, [getUser])

  const handleChange = (e)=>{
    e.preventDefault()
    setChange(!change)
    
  }
  const out = ()=>{
    auth.logout()
    history.push("/")
  }
  const redirectAdminPanel = ()=>{
    history.push("/profile/admin")
  }
  return (
    <>
    {
      change
      ?
      <ProfileChange ud={ud} handleChange={handleChange} userID = {auth.userID} getUser={getUser}/>
      :
      <Profile ud={ud} handleChange={handleChange} out={out} redirectAdminPanel={redirectAdminPanel}/>
    }
    </>
    
  )
}