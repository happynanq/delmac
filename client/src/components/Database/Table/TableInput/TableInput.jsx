import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
export const TableInput = ({handleSubmit }) => {
  const [find, setFind] = useState({})

  
  const handleInput = (e) => {
    console.log('handle')
    if(e.target.value.trim() ===""){
      delete find[e.target.name] 
      return  setFind({ ...find})
    }
    setFind({ ...find, [e.target.name]: e.target.value.trim() })
    
  }
  const submitHandler = (e) => {
    e.preventDefault()
    handleSubmit(find)
  }
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={submitHandler}>
          <div className="row">
            <div className="input-field col s4">
              <input
                name="lastName"
                id="lastName"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="lastName">Фамилия</label>
            </div>
            <div className="input-field col s4">
              <input
                name="name"
                id="name"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="name">Имя</label>
            </div>
            <div className="input-field col s4">
              <input
                name="patronymic"
                id="patronymic"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="patronymic">Отчество</label>
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col s6">
              <input
                name="birthday"
                id="birthday"
                type="date"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="birthday">День рождения</label>
            </div>
            
            <div className="input-field col s6">
              <input
                name="parkName"
                id="parkName"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="parkName">Парк</label>
            </div>
          </div>
          

          <button
            className="btn waves-effect waves-light right deep-orange lighten-3"
            type="submit"
            name="action"
            
          >
            Искать
            <i className="material-icons right">search</i>
          </button>
        </form>
      </div>
    </div>
  )
}
