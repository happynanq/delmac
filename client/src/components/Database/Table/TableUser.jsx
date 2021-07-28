import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ModalUser } from './ModalUser/ModalUser'
export const TableUser = ({ u, changeHandler, toChange }) => {
  const clickhandler = () => {
    //!Дополнительная информация
    console.log(u)
  }

  return (
    <>
    <tr>
      <td>{`${u.lastName} ${u.name} ${u.patronymic}`}</td>
      <td>{`${u.birthday.slice(0, 10)}`}</td>
      <td>{`${u.parkName}`}</td>
      <td>{`${u.describe}`}</td>
      <td>{`${u.allCredit}`}</td>
      <td>
        {/* <Link
          to="#"
          className={'btn-floating btn-small waves-effect waves-light blue modal-trigger '}
          id={u._id}
          onClick={clickhandler}
        >
          <i className="material-icons">search</i>
        </Link> */}
        <ModalUser u={u}/>
        
      </td>
      <td>
        {
          u.accessLevel === 'driver'
          ?
          
          <Link
          to="#"
          className={'btn-floating btn-small waves-effect waves-light green  '}
          title="Этот водитель подтверждённый"
          id={u._id}
          onClick={clickhandler}
        >
          <i class="material-icons ">check</i>
        </Link>
          :
          <Link
          to="#"
          className={'btn-floating btn-small waves-effect waves-light red'}
          title="Этот водитель неподтверждённый"
          id={u._id}
          onClick={clickhandler}
        >
          <i class="material-icons ">close</i>
        </Link>

        }
      </td>
    </tr>
    
    </>
  )
}
