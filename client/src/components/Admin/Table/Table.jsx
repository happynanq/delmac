import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TableUser } from './TableUser'
export const Table = ({ data, setType }) => {
  const [toChange, setToChange] = useState([])
  /* 
    [
      {_id:123123},
      {_id:121}
    ]

  */
  const changeHandler = (data)=>{
    setToChange(data)
    console.log("toChange!!: ", toChange)
  }
  const handleSubmit = ()=>{
    console.log(toChange)
  }
  const handleClick = (e)=>{
    console.log(e.target.name)
    setType(e.target.name)
  }
  return (
    <div className="container">
      <ul id="dropdown2" className="dropdown-content">
        <li>
          <Link to="#" onClick={handleClick} name="unconfirmed">неподтверждённые пользователи</Link>
        </li>
        <li>
          <Link to="#" onClick={handleClick} name="unconfirmedDrivers">неподтверждённые водители</Link>
        </li>
        <li>
          <Link to="#" onClick={handleClick} name="confirmedDrivers">подтверждённые водители</Link>
        </li>
      </ul>
      <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">
        база данных<i className="material-icons right">arrow_drop_down</i>
      </a>
      <button class="btn waves-effect waves-light right" type="submit" name="action" onClick={handleSubmit} >Submit
        <i class="material-icons right">send</i>
      </button>
      <table>
        <thead>
          <tr>
            <th>Фио</th>
            <th>email</th>
            <th>Телефон</th>
            <th>Парк</th>
            <th>Подтвердить</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => {
            return <TableUser u={u} changeHandler={changeHandler} toChange={toChange} key = {u._id}/>
          })}
        </tbody>
      </table>
    </div>
  )
}
