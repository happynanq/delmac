import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const ProfileChange = ({ ud, handleChange, userID, getUser }) => {
  const { request, loading } = useHttp()
  const [changedUD, setChangedUD] = useState({ ...ud, newPassword:"", oldPassword:"" })
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
    e?.preventDefault()
    const toNew = {}
    for (let base in ud) {
      if (ud[base] === changedUD[base]) {
        continue
      }
      toNew[base] = changedUD[base]
    }

    if (Object.getOwnPropertyNames(toNew).length || changedUD?.newPassword?.trim() !== "") {
      try {
        debugger
        const data = await request('/api/change/user', 'POST', {
          ...ud,
          _id: userID,
          ...toNew,
          newPassword:changedUD.newPassword,
          oldPassword:changedUD.oldPassword,
        })
        message(data.message)
        getUser() // UPDATE USER
      } catch (e) {

        message(e.message)
      }
    } else{
      message("Вы ничего не изменили")
    }
    // console.log("DATA: ", data)
  }
  const clickHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      accept()
    }
  }
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onKeyPress={clickHandler}>
          {Object.keys(ud).map((e, id) => {
            if (e === 'accessLevel') {
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
                    /*if("password"){
                        return "password"
                      else if("tel"){
                        return tel
                      }
                      return "text"
                    }
                    */
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
                /*if("password"){
                        return "password"
                      else if("tel"){
                        return tel
                      }
                      return "text"
                    }
                    */
                    
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

          <button className="btn" onClick={handleChange} disabled={loading}>
            Назад
          </button>
          <button className="btn right" onClick={accept} disabled={loading}>
            Принять
          </button>
        </form>
      </div>
    </div>
  )
}
