import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { TableUser } from './TableUser';
export const Table = ({data})=>{
  const [type, setType] = useState();
  const [toChange, setToChange] = useState({});
  const clickhandler = (e)=>{
    debugger
  }
  // useEffect(()=>{
  //   console.log(data)
  //   debugger
  // },[data])
  return (
    
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
          {data.map((u=>{
            return(
              <TableUser u={u}/>
            )
          }))}
        </tbody>
      </table>
  )
}