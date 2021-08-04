import React, { useState } from 'react'
import 'materialize-css'

export const Recovery = ({clickHandler, submitHandler, radio, setPassword, setData }) => {
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    if(name==='password'){
      setPassword({
        [name]:value.trim()
      })
      return
    }
    setData({
      
      [name]: value.trim()
    })
    
  }
  return (
    <form onSubmit={submitHandler}>
      <p>Восставнить по:</p>

      <p>
        <label>
          <input
            name="group1"
            type="radio"
            onClick={clickHandler}
            value="email"
          />
          <span>Email</span>
        </label>
      </p>
      <p>
        <label>
          <input
            name="group1"
            onClick={clickHandler}
            type="radio"
            value="login"
          />
          <span>Login</span>
        </label>
      </p>
      {!radio ? null : (
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                {radio !== 'login' ? (
                  <>
                    <input
                      name="email"
                      id="email"
                      type="text"
                      className="validate"
                      onChange={handleInput}
                    />
                    <label for="email">Введите емаил</label>
                  </>
                ) : (
                  <>
                    <input
                      name="login"
                      id="login"
                      type="text"
                      className="validate"
                      onChange={handleInput}
                    />
                    <label for="login">Введите логин</label>
                  </>
                )}
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
                <label for="password">Введите новый пароль </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row right">
        <button
          class="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={submitHandler}
        >
          Submit
          <i class="material-icons right">send</i>
        </button>
      </div>
    </form>
  )
}
