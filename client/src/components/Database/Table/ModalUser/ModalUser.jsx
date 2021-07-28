import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
import { ModalTable } from './ModalTable'
export const ModalUser = ({u}) => {
  useEffect(() => {
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)
    console.log(u)
  }, [])

  return (
    <>
      {/* <!-- Modal Trigger --> */}

      <a class="btn-floating btn-small waves-effect waves-light blue modal-trigger " href={`#${u._id}`} >
      <i class="material-icons">search</i>
      </a>
      {/* <!-- Modal Structure --> */}
      <div id={u._id} class="modal">
        <div class="modal-content">
          <h4>{`${u.lastName} ${u.name} ${u.patronymic}`}</h4>
          {/* {Object.keys(u).map(e=>{
            debugger
            console.log(e)
          })} */}
          <ModalTable u={u}/>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">
            Выйти
          </a>
        </div>
      </div>
    </>
  )
}
