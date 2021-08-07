import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import 'materialize-css'
import { AuthContext } from '../../../Context/AuthContext'

// ! Доделать регистрацию
export const Register = () => {
  const auth = useContext(AuthContext)
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
    if(!data.checked){
      
      return message("Вы не согласны с наешй политикой, пожалуйста ознакомтесь с ней и подтвердите согласие")
    }
    
    try {
      
      if(!data.lastName || !data.name || !data.patronymic){
        
        return message("Введите полное ФИО")
      }
      const res = await request('/api/auth/register', 'POST', { ...data })
      if (!res.errors) {
        history.push('/login')
        message(res.message)
        
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'fullName') {
      let [lastName, name, patronymic] = value.split(' ')
      
      return setData({ ...data, lastName, name, patronymic })
    }
    setData({
      ...data,
      [name]: value.trim(),
    })
  }
  const clickhandler = (e)=>{
    setData({...data, checked: e.target.checked})
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
                name="fullName"
                id="fullName"
                type="text"
                className="validate"
                onChange={handleSubmit}
              />
              <label htmlFor="fullName">ФИО</label>
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
              <label htmlFor="tel">Контактный телефон</label>
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
              <label htmlFor="email">Ваш email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="userLogin"
                id="userLogin"
                type="text"
                className="validate"
                onChange={handleSubmit}
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
                onChange={handleSubmit}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <p>
                <label>
                  <input type="checkbox" onClick={clickhandler}/>
                  <span>Я согласен с политикой конфиденциальности</span>
                </label>
              </p>
            </div>
          </div>

          <button className="btn" disabled={loading}>
            Регистрация
          </button>
          <button className="btn right" disabled={loading} onClick={goToLogin}>
            Вход
          </button>
        </form>
      </div>
    </div>
  )
}
