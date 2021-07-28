import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TableUser } from './TableUser'
import M from 'materialize-css'
import { Preloader } from '../../Preloader/Preloader'
import { TableInput } from './TableInput/TableInput'
import { ModalUser } from './ModalUser/ModalUser'

export const Table = ({ data, setType, handleSubmit, loading, userData }) => {
  const [toChange, setToChange] = useState([])
  /* 
    [
      {_id:123123},
      {_id:121}
    ]

  */
  const changeHandler = (data) => {
    setToChange(data)
  }

  const handleClick = (e) => {
    setType(e.target.name)
  }
  useEffect(() => {
    console.log("DATA FROM TABLE:", data)
  }, [data])
  return (
    <div className="container">
      
      
      <TableInput handleSubmit={handleSubmit}/>
      
      <table>
        <thead>
          <tr>
            <th>Фио</th>
            <th>Дата рождения</th>
            <th>Парк</th>
            <th>Причина</th>
            <th>Долг</th>
              
          </tr>
        </thead>

        <tbody>
        {loading || !userData[0]
          ? null
          : userData.map((u) => {
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
