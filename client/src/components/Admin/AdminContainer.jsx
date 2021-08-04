import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { Error404 } from '../Error404/Error404'
import { Admin } from './Admin'

export const AdminContainer = ()=>{
  const auth = useContext(AuthContext)
  const history = useHistory()
  useEffect(()=>{
    
    if(auth.accessLevel!=="admin"){
      
      history.push("/404")
    }
    
  },[auth])
  return (
    <Admin></Admin>
  )
}