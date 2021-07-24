import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook';
import { Table } from './Table';
export const TableContainer = ()=>{
  const [type, setType] = useState("unconfirmed")
  const [data, setData] = useState([])
  const {request} = useHttp()
  const getUsers = useCallback(async()=>{

    const res = await request("/api/get/users", "POST", {accessLevel:type} )
    setData(res)
  },[setData, request, type])
  useEffect(() => {
    getUsers()
  }, [getUsers]);

  return (
    <Table data={data}/>
  )
}