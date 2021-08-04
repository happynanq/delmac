import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TableUser } from './TableUser'
import M from 'materialize-css'
import { Preloader } from '../../Preloader/Preloader'
export const Table = ({ data, setType, handleSubmit, loading }) => {
  const [toChange, setToChange] = useState([])
  /* 
    [
      {_id:123123},
      {_id:121}
    ]

  */
  const changeHandler = (data) => {
    // 
    setToChange(data)
  }

  const handleClick = (e) => {
    setType(e.target.name)
  }
  
  return (
    <div className="container">
      <ul id="dropdown2" className="dropdown-content">
        <li>
          <Link to="#" onClick={handleClick} name="unconfirmed">
            неподтверждённые пользователи
          </Link>
        </li>
        <li>
          <Link to="#" onClick={handleClick} name="unconfirmedDriver">
            неподтверждённые водители
          </Link>
        </li>
        <li>
          <Link to="#" onClick={handleClick} name="driver">
            подтверждённые водители
          </Link>
        </li>
      </ul>
      <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">
        база данных<i className="material-icons right">arrow_drop_down</i>
      </a>
      <button
        className="btn waves-effect waves-light right"
        type="submit"
        name="action"
        onClick={(e) => handleSubmit(e, toChange)}
      >
        Submit
        <i className="material-icons right">send</i>
      </button>
      <table>
        <thead>
          <tr>
            <th>Фио</th>
            {data[0]?.accessLevel==="unconfirmed" ? (
              <>
                <th>email</th>
                <th>Телефон</th>
                <th>Парк</th>
                <th>Подтвердить</th>
              </>
            ) : (
              <>
                <th>Дата рождения</th>
                <th>Парк</th>
                <th>Причина</th>
                <th>Долг</th>
                <th>{data[0]?.accessLevel ==="driver" ? 'Опровергнуть' : 'Подтвердить'}</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
        {loading
          ? null
          : data.map((u) => {
              return (
                  <TableUser
                    u={u}
                    changeHandler={changeHandler}
                    toChange={toChange}
                    key={u._id}
                  />
              )
          })
        }
        </tbody>
      </table>
      {loading ? (
        <div className="center">
          <Preloader />
        </div>
      ) : null}
    </div>
  )
}
