import React, { useContext, useEffect, useState } from 'react'

import M from 'materialize-css'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import { AuthContext } from '../../../Context/AuthContext'
import { RecoveryContainer } from '../../Recovery/RecoveryContainer'
export const Login = () => {
  const auth = useContext(AuthContext)

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
      if (!res.errors) {
        
        auth.login(res.token, res.userID, res.accessLevel) // todo - add res.access level
        history.push('/')
      }
    } catch (e) {}
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
  }, [error, clearError, message])
  useEffect(() => {
    var elems = document.querySelectorAll('.modal')
    M.Modal.init(elems)
  }, [])
  return (
    <div className="container">
      <div className="row">
        <form className="col s12 registerpad" onSubmit={loginHandler}>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="userLogin"
                id="userLogin"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="userLogin">Логин</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="password"
                id="password"
                type="password"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="password">Пароль</label>
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
        <div className="">
            <a className="modal-trigger black-text " href="#modal12">
              Забыли пароль?
            </a>

            <div id="modal12" className="modal black-text">
              <div className="modal-content left-align">
                <h4>Восстановелие пароля</h4>
                <RecoveryContainer />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
