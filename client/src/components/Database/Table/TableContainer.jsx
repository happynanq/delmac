import React, { useCallback, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { Table } from './Table'
export const TableContainer = () => {
  const { request, loading } = useHttp()
  const [data, setData] = useState({}) // То, что мы пишем в инпутах
  const [userData, setUserData] = useState([])// То, что приходит с сервера по запросу инпутов
  const getUsers = useCallback(async (d) => {
    try {
      const res = await request('/api/get/people', 'POST', d )
      setUserData(res)

    } catch (e) {
      console.log('ERROR',e)
    }
    
  }, [request])

  const handleSubmit = (newData)=>{
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
