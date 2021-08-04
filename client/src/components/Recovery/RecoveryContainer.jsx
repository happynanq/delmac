import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

import { Recovery } from './Recovery'

import 'materialize-css'

export const RecoveryContainer = () => {
  const [radio, setRadio] = useState()
  const [data, setData] = useState()
  const [password, setPassword] = useState()
  const message = useMessage()
  const { request } = useHttp()
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await request('/api/auth/changePassword', 'POST', { ...data, ...password, link:window.location.host })
      message(res.message)
    } catch (e) {
      message(e.message)
    }
  }
  const clickHandler = (e) => {
    setRadio(e.target.value)
  }
  return (
    <Recovery
      submitHandler={submitHandler}
      clickHandler={clickHandler}
      radio={radio}
      setPassword={setPassword}
      setData={setData}
    />
  )
}
