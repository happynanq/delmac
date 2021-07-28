import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { AdminContainer } from './Admin/AdminContainer'
import { Login } from './Auth/Login/Login'
import { Register } from './Auth/Register/Register'
import { DatabaseContainer } from './Database/DatabaseContainer'
import { MainPage } from './MainPage/MainPage'
import { ProfileContainer } from './Profile/ProfileContainer'
export const Body = ()=>{
  return (
      <Switch>
        <div className="main">
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/register" exact>
            <Register/>
          </Route>
          <Route path="/profile" exact>
              <ProfileContainer/>
          </Route>
          <Route path="/profile/admin" exact>
              <AdminContainer/>
          </Route>
          <Route path="/db" >
              <DatabaseContainer/>
          </Route>
          <Route path="/" exact>
            <div className=" valign-wrapper ">
              <MainPage/>
            </div>
          </Route>
        </div>
      </Switch>
  )
}