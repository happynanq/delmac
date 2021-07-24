import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom';
import { TableContainer } from './Table/TableContainer';
export const Admin = ()=>{
  
  useEffect(() => {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
  }, [])
  
  return (
    <TableContainer/>
  )
}