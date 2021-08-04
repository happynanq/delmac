import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import 'materialize-css'
import { useHttp } from '../../../hooks/http.hook'
import { Preloader } from '../../Preloader/Preloader'
import { useMessage } from '../../../hooks/message.hook'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const ChangePass = (props) => {
  let query = useQuery()
  const { loading, error, request, clearError } = useHttp()
  const message = useMessage()
  const history = useHistory()
  const p = useParams()
  
  const handleClick = async () => {
    let res = await request('/api/change/password', 'POST', {
      _id: query.get('id'),
      pass: query.get('newPassword'),
    })
    message(res.message)
    history.push("/login")
  }

  return (
    <div className="container center">
      {!loading ? (
        <button className="btn" onClick={handleClick}>
          Сбросить пароль
        </button>
      ) : (
        <Preloader />
      )}
    </div>
  )
}
