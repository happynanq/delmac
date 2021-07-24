import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom';
import { TableContainer } from './Table/TableContainer';
export const Admin = ()=>{
  const [type, setType] = useState();
  const clickhandler = (e)=>{
    debugger
  }
  useEffect(() => {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }, [])
  
  return (
    <div className="container">
      <ul id="dropdown2" className="dropdown-content">
        <li><Link to="#">неподтверждённые пользователи</Link></li>
        <li><Link to="#">неподтверждённые водители</Link></li>
        <li><Link to="#">подтверждённые водители</Link></li>
        
      </ul>
      <a className="btn dropdown-trigger" href="#!" data-target="dropdown2">база данных<i className="material-icons right">arrow_drop_down</i></a>
      <TableContainer/>
    </div>
  )
}