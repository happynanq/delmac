import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const TableUser = ({ u, changeHandler, toChange }) => {
  const [color, setColor] = useState(u.accessLevel === "unconfirmed" ? "red" : 'green');
  const clickhandler = () => {
    
    let newArray
    if(color === "red"){
      newArray = [...toChange, u._id]

    } else{
      newArray = [...toChange].filter(e=>e!==u._id)

    }
    console.log(u)
    console.log(newArray)
    changeHandler(newArray)
    setColor(color ==="red" ? 'green' : "red")

  }


  return (
    <>
      <tr>
        <td>{`${u.name} ${u.lastName} ${u.patronymic}`}</td>
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
    </>
  )
}
