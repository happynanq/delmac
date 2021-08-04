import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { AdminContainer } from './Admin/AdminContainer'
import { Login } from './Auth/Login/Login'
import { Register } from './Auth/Register/Register'
import { DatabaseContainer } from './Database/DatabaseContainer'
import { Error404 } from './Error404/Error404'
import { MainPage } from './MainPage/MainPage'
import { AddDriverContainer } from './Profile/AddDriverContainer'
import { ProfileContainer } from './Profile/ProfileContainer'
import { ChangePass } from './Recovery/ChangePass/ChangePass'
export const Body = () => {
  const [toChangeDriver, setToChangeDriver] = useState(false)
  const history = useHistory()
  useEffect(() => {
    const paths = ["/login", "/register", "/profile", "/profile/admin", "/db", "/", "/profile/createDriver"]
    let push = true

    paths.map(p=>{
      if(p===history.location.pathname){
        push = false
      }

      
      return 1
    })
    if(push){
      // history.push("/404")
    }
  }, [history])

  return (
    <Switch>
      <div className="main">
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/login/changePassword/:id?" >
          <ChangePass />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/profile" exact>
          <ProfileContainer toChangeDriver={toChangeDriver}/>
        </Route>
        <Route path="/profile/admin" exact>
          <AdminContainer />
        </Route>
        <Route path="/db">
          <DatabaseContainer />
        </Route>
        {/* <Route path="/profile/createDriver"> <AddDriverContainer/></Route> */}
        <Route path="/" exact>
          <div className=" valign-wrapper ">
            <MainPage setToChangeDriver={setToChangeDriver}/>
          </div>
        </Route>
        <Route path="/404" component={Error404} />
      </div>
    </Switch>
  )
}
