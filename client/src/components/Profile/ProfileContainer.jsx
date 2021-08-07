import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { Preloader } from '../Preloader/Preloader'
import { AddDriverContainer } from './AddDriverContainer'
import { Profile } from './Profile'
import { ProfileChange } from './ProfileChange'
export const ProfileContainer = ({ toChangeDriver, setToChangeDriver }) => {
  const auth = useContext(AuthContext)
  const [ud, setUd] = useState({})
  const [change, setChange] = useState(false)
  const [isDriver, setIsDriver] = useState(toChangeDriver)
  const { request, loading } = useHttp()
  const history = useHistory()
  const message = useMessage()

  const out = useCallback(() => {
    auth.logout()
    history.push('/')
  }, [auth, history])

  const getUser = useCallback(async () => {
    try {
      if (auth.token) {
        let d = await request('/api/get/user', 'POST', null, {
          authorization: `Bearer ${auth.token}`,
        })
        setUd(d)
      }
    } catch (e) {
      message(e.message)

      if (e.message === 'JWT истёк') {
        out()
      }
    }
  }, [setUd, request, auth.token, out, message])
  useEffect(() => {
    getUser()
  }, [getUser])

  const handleChange = (e) => {
    e.preventDefault()
    setChange(!change)
  }

  const redirectAdminPanel = () => {
    history.push('/profile/admin')
  }
  const redirectDatabase = () => {
    history.push('/db')
  }
  const createDriver = async (e) => {
    e.preventDefault()
    // setIsDriver(!isDriver)
    history.push('/profile/')
  }
  window.out = out

  return (
    <>
      {loading || ud.name === undefined ? (
        <div className="center">
          <Preloader />
        </div>
      ) : isDriver ? (
        <AddDriverContainer auth={auth}  request={request} setToChangeDriver={setToChangeDriver}/>
      ) : change ? (
        <ProfileChange
          ud={ud}
          handleChange={handleChange}
          token={auth.token}
          getUser={getUser}
        />
      ) : (
        <Profile
          ud={ud}
          handleChange={handleChange}
          redirectAdminPanel={redirectAdminPanel}
          createDriver={createDriver}
          redirectDatabase={redirectDatabase}
        />
      )}
    </>
  )
}
