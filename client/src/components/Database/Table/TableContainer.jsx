import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { Preloader } from '../../Preloader/Preloader'
import { ModalUser } from './ModalUser/ModalUser'
import { Table } from './Table'
export const TableContainer = () => {
  const { request, loading } = useHttp()
  const [data, setData] = useState({}) // То, что мы пишем в инпутах
  const [userData, setUserData] = useState([])// То, что приходит с сервера по запросу инпутов
  const message = useMessage()
  const getUsers = useCallback(async (d) => {
    try {
      const res = await request('/api/get/people', 'POST', d )
      message("complete")
      setUserData(res)

      console.log("GET USERS")
    } catch (e) {
      console.log('ERROR',e)
    }
    
  }, [])

  const handleSubmit = (newData)=>{
    console.log('newData ', newData)
    setData(newData)
    getUsers(newData)

  }
  
  // useEffect(() => {
  //   getUsers()
  // }, [getUsers])

  return (
    
    <Table
        data={data}
        userData={userData}
        getUsers={getUsers}
        loading={loading}
        handleSubmit={handleSubmit}
        
      />
    )
}
