import React, { useContext, useEffect, useState } from 'react'

import 'materialize-css'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { AuthContext } from '../../../Context/AuthContext'
export const Login = () => {
  const auth = useContext(AuthContext);

  const history = useHistory()
  const [data, setData] = useState()
  const { loading, error, request, clearError } = useHttp()
  const message = useMessage()
  const goToRegister = (e) => {
    history.push('/register')
    e.preventDefault()
  }
  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await request('/api/auth/login', 'POST', { ...data })
      message(res.message)
      
      auth.login(res.token, res.userID)
      history.push('/')

    } catch (e) {

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
  useEffect(() => {
    message(error)
    clearError()
  }, [error, clearError,message])
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={loginHandler}>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                id="password"
                type="password"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                id="email"
                type="email"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <button className="btn" disabled={loading}>
            Войти
          </button>
          <button
            className="btn right"
            onClick={goToRegister}
            disabled={loading}
          >
            Регистрация
          </button>
        </form>
      </div>
    </div>
  )
}
