import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import 'materialize-css'
import { AuthContext } from '../../../Context/AuthContext'

// ! Доделать регистрацию
export const Register = () => {
  const auth = useContext(AuthContext);
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const history = useHistory()
  const [data, setData] = useState()
  const goToLogin = (e) => {
    history.push('/login')
    e.preventDefault()
  }
  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await request('/api/auth/register', 'POST', { ...data })
      message(res.message)
      history.push('/login')
    } catch (e) {}

  }

  const handleSubmit = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value.trim(),
    })
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={registerHandler}>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="name"
                id="name"
                type="text"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="name">Имя</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="lastName"
                id="lastName"
                type="text"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="lastName">Фамилия</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="patronymic"
                id="patronymic"
                type="text"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="patronymic">Отчество</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="parkName"
                id="parkName"
                type="text"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="parkName">Наименование парка</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="tel"
                id="tel"
                type="tel"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="tel">Телефон</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                id="password"
                type="password"
                className="validate"
                onChange={handleSubmit}
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
                onChange={handleSubmit}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <button className="btn" disabled={loading}>Регистрация</button>
          <button className="btn right" disabled={loading} onClick={goToLogin}>
            Войти в систему
          </button>
        </form>
      </div>
    </div>
  )
}
