import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { Preloader } from '../../Preloader/Preloader'
import { Table } from './Table'
export const TableContainer = () => {
  const [type, setType] = useState('unconfirmed')
  const [data, setData] = useState([])
  const { request, loading } = useHttp()
  const message = useMessage()
  const getUsers = useCallback(async () => {
    const res = await request('/api/get/people', 'POST', { accessLevel: type })
    setData(res)
  }, [setData, request, type])
  const handleSubmit = async (e, newData) => {
    const res = await request('/api/change/people', 'POST', {
      accessLevel: type,
      data: newData,
    })
    message(res.message)
    getUsers()
  }
  const handleDelete = async(e, id)=>{
    e.preventDefault()    
    try {
      const res = await request('/api/delete/people', 'POST', {
      
        _id: id,
        accessLevel:type
      })
      message(res.message)
      getUsers()
    } catch (e) {
      message(e)
    }
    
  }
  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    
    <Table
        data={data}
        setType={setType}
        type={type}
        handleSubmit={handleSubmit}
        loading={loading}
        handleDelete={handleDelete}
      />
    
    )
}
