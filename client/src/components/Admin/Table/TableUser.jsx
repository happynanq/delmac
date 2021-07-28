import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const TableUser = ({ u, changeHandler, toChange }) => {
  const [color, setColor] = useState(
    u.accessLevel === 'confirmed' ||  u.accessLevel === 'driver'  ? 'green' : 'red'
  )
  const clickhandler = () => {
    //!ДОБАВИТЬ В БАЗУ
    let newArray
    if (color === 'red') {
      newArray = [...toChange, u._id]
    } else {
      newArray = [...toChange].filter((e) => e !== u._id)
    }
    changeHandler(newArray)
    setColor(color === 'red' ? 'green' : 'red')
  }

  return (
    <>
      {u.accessLevel === 'unconfirmed' ? (
        <tr>
          <td>{`${u.lastName} ${u.name} ${u.patronymic}`}</td>
          <td>{`${u.email}`}</td>
          <td>{`${u.tel}`}</td>
          <td>{`${u.parkName}`}</td>
          <td>
            <Link
              to="#"
              className={
                'btn-floating btn-small waves-effect waves-light ' + color
              }
              id={u._id}
              onClick={clickhandler}
            >
              <i className="material-icons">check</i>
            </Link>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{`${u.lastName} ${u.name} ${u.patronymic}`}</td>
          <td>{`${u.birthday.slice(0, 10)}`}</td>
          <td>{`${u.parkName}`}</td>
          <td>{`${u.describe}`}</td>
          <td>{`${u.allCredit}`}</td>
          <td>
            {u.accessLevel === 'driver' ? (
              <Link
                to="#"
                className={
                  'btn-floating btn-small waves-effect waves-light ' + color
                }
                id={u._id}
                onClick={clickhandler}
              >
                <i className="material-icons">check</i>
              </Link>
            ) : (
              <Link
                to="#"
                className={
                  'btn-floating btn-small waves-effect waves-light ' + color
                }
                id={u._id}
                onClick={clickhandler}
              >
                <i className="material-icons">check</i>
              </Link>
            )}
          </td>
        </tr>
      )}
    </>
  )
}
