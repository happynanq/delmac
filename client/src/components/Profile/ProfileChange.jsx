import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import M from 'materialize-css'
import { RecoveryContainer } from '../Recovery/RecoveryContainer'

export const ProfileChange = ({ ud, handleChange, token, getUser }) => {
  const { request, loading } = useHttp()
  const [changedUD, setChangedUD] = useState({
    ...ud,
    newPassword: '',
    oldPassword: '',
  })
  const storageName = 'userData'

  const message = useMessage()
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setChangedUD({
      ...changedUD,
      [name]: value,
    })
  }
  const accept = async (e) => {
    // e?.preventDefault()
    const toNew = {}
    for (let base in ud) {
      if (ud[base] === changedUD[base]) {
        continue
      }
      toNew[base] = changedUD[base]
    }

    if (
      Object.getOwnPropertyNames(toNew).length ||
      changedUD?.newPassword?.trim() !== ''
    ) {
      try {
        const data = await request(
          '/api/change/user',
          'POST',
          {
            ...ud,
            ...toNew,
            newPassword: changedUD.newPassword,
            oldPassword: changedUD.oldPassword,
          },
          {
            authorization: `Bearer ${token}`,
          }
        )
        message(data.message)
        getUser() // UPDATE USER
        localStorage.setItem(storageName, JSON.stringify({...JSON.parse(localStorage.getItem(storageName)), accessLevel:"unconfirmed"}))
      } catch (e) {
        message(e.message)
      }
    } else {
      message('Вы ничего не изменили')
    }
  }
  const clickHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      accept()
    }
  }
  useEffect(() => {
    var elems = document.querySelectorAll('.modal')
    M.Modal.init(elems)
  }, [])
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onKeyPress={clickHandler}>
          {Object.keys(ud).map((e, id) => {
            if (e === 'accessLevel' || e === 'drivers') {
              return null
            }
            return (
              <div className="row" key={id}>
                <div className="input-field col s12">
                  <input
                    name={e}
                    id={e}
                    type={
                      e === 'password'
                        ? 'password'
                        : e === 'tel'
                        ? 'tel'
                        : 'text'
                    }
                    value={changedUD[e]}
                    className="validate"
                    onChange={handleInput}
                  />
                  <label htmlFor={e}></label>
                </div>
              </div>
            )
          })}
          <div className="row">
            <div className="input-field col s12">
              <input
                name={'oldPassword'}
                id={'oldPassword'}
                type="password"
                className="validate"
                onChange={handleInput}
                value={changedUD.oldPassword}
              />
              <label htmlFor="oldPassword"> Введите старый пароль</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                name={'newPassword'}
                id={'newPassword'}
                type="password"
                value={changedUD.newPassword}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="newPassword"> Введите новый пароль</label>
            </div>
          </div>
          <div className="row">
            <div className="center">
              Внимание, после изменения данных, аккаунт будет иметь
              неподтверждённый статус!
            </div>
          </div>
          <div className="row">
            <div className=" black-text">
              <a className="modal-trigger black-text" href="#modal12">
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

          <button
            className="btn amber darken-3"
            onClick={handleChange}
            disabled={loading}
          >
            Назад
          </button>

          <button
            className="btn right light-green lighten-1"
            onClick={accept}
            disabled={loading}
          >
            Принять
          </button>
        </form>
      </div>
    </div>
  )
}
