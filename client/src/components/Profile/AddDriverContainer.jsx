import React, {  useEffect, useState } from 'react'
import { useMessage } from '../../hooks/message.hook'
import { AddDriver } from './AddDriver'
export const AddDriverContainer = ({auth, request, setToChangeDriver}) => {
  

  const driver = ['name', 'lastName', 'patronymic', 'birthday', 'describe', 'accidentСredit', 'fineСredit', 'leaseСredit', 'otherСredit']
  
  const [data, setData] = useState('changeme')
  const message = useMessage()
  
  useEffect(()=>{
    function toObject(arr){
    
      let newObj = {}
      for(let i = 0; i<arr.length; i++){
        newObj[arr[i]] = ""
      }
      return newObj
    }
  if( data === "changeme"){
    setData(toObject(driver))

  }
  }, [setData, driver, data])
  const keyboardHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(Object.keys(data).length)
    let wrong = false
    Object.keys(data).map(elem=>{
      if(data[elem].trim() === '')
      {
        return wrong = true
      }
    })
    if(wrong){
      return message("Не хватает данных")
    }
    let n = await request("/api/driver/create", "POST", data, {authorization:`Bearer ${auth.token}`})
    message(n.message)
    console.log(data)

  }
  return (
    <>
      {
        data!=="changeme"
      ?
      <AddDriver
        driver={driver}
        keyboardHandler={keyboardHandler}
        data={data}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        setToChangeDriver={setToChangeDriver}
      /> :
      null
      }
    </>
    
  )
}
