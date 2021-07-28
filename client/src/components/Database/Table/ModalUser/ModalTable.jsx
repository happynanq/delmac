import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
export const ModalTable = ({ u }) => {
  useEffect(()=>{
    console.log("U:", u)
  },[])
  return (
    <table>
      <tbody>
        <tr>
          <td>Дата рождения</td>
          <td>{u.birthday.slice(0, 10)}</td>
        </tr>
        <tr>
          <td>Парк</td>
          <td>{u.parkName}</td>
        </tr>
        <tr>
          <td>Добавлен</td>
          <td>{u.entryDate.slice(0, 10)}</td>
        </tr>
        <tr>
          <td>Штрафы</td>
          <td>{u.fineСredit}</td>
        </tr>
        <tr>
          <td>Долг аренды</td>
          <td>{u.leaseСredit}</td>
        </tr>
        <tr>
          <td>Другие задолжности</td>
          <td>{u.otherСredit}</td>
        </tr>
        <tr>
          <td>Общий долг</td>
          <td>{u.allCredit}</td>
        </tr>
        <tr>
          <td>Описание</td>
          <td>{u.describe}</td>
        </tr>
      </tbody>
    </table>
  )
}
