import React, { useCallback, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useHttp } from '../../hooks/http.hook'

import svg from "../../common/logo.svg"
export const Header = () => {
  const auth = useContext(AuthContext)
  const { request} = useHttp()
  const history = useHistory()
  const out = useCallback(() => {
    auth.logout()
    history.push('/')
  }, [auth, history])
  
  return (
    <nav>
      <div className="nav-wrapper ">
        <Link to="/" className="brand-logo black-text">
        <img src={svg} alt="Logo" style={{width:64}}/>

        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {auth.token ? (
            <>
              <li>
                <Link to="/profile" className="black-text">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <Link to="/" className="black-text" onClick={out}>
                  Выйти
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="black-text">
                Войти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
