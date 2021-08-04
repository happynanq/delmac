import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import svg from '../../common/logo.svg'
import { AuthContext } from '../../Context/AuthContext'
export const MainPage = ({setToChangeDriver})=>{
  const {accessLevel, isAuthenticated} = useContext(AuthContext)

  const history = useHistory()
  const redirectDatabase = () => {
    history.push('/db')
  }
  const createDriver = async (e) => {
    e.preventDefault()
    // setIsDriver(!isDriver)
    setToChangeDriver(true)
    history.push("/profile")
  }
  return (
    <div className="center">
      <img src={svg} alt="Logo" />
      {accessLevel !== 'unconfirmed' && isAuthenticated  ? (
            <>
              <div className="section ">
                <button
                  className="btn blue darken-2"
                  onClick={redirectDatabase}
                >
                  Посмотреть базу данных
                </button>
              </div>
              <div className="section ">
                <button className="btn black darken-2" 
                  onClick={createDriver}
                >
                  Создать водителя
                </button>
              </div>
            </>
          ) : null}
    </div>
  )
}