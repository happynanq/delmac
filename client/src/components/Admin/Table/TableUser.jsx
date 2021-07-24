import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export const TableUser = ({ u }) => {
  const [color, setColor] = useState(u.accessLevel === "unconfirmed" ? "red" : 'green');
  const clickhandler = () => {
    setColor(color ==="red" ? 'green' : "red")
    console.log(u)
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
            className={
              'btn-floating btn-small waves-effect waves-light ' + color
            }
            id={u._id}
            onClick={clickhandler}
          >
            <i class="material-icons">check</i>
          </Link>
        </td>
      </tr>
    </>
  )
}
