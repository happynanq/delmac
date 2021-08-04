import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { Database } from './Database'

export const DatabaseContainer = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  useEffect(()=>{
    
    if(auth.accessLevel==="unconfirmed" || !auth.accessLevel){
      
      
      history.push("/404")
    }
    
  },[auth])
  return (
    <>
    {
      auth.accessLevel==="unconfirmed" || !auth.accessLevel
      ?
      null:
    <Database/>

    }
    </> 
  )
}
