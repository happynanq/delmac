import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const AddDriver = () => {
  const [data, setData] = useState([])
  const clickHandler = (e)=>{
    if (e.key === 'Enter') {
      e.preventDefault()
      
    }
  }
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value,
    })
  }
  const driver = ['name', 'lastname', 'patronymic', 'birthday', 'region']
  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onKeyPress={clickHandler}>
          {driver.map((e, id) => {
            
            return (
              <div className="row" key={id}>
                <div className="input-field col s12">
                  <input
                    name={e}
                    id={e}
                    type={
                      e === 'birthday'
                        ? 'date'
                        : e==='region' ?
                        'number':
                        'text'
                    }
                    /*if("birthday"){
                        return "date"
                      else if("region"){
                        return number
                      }
                      return "text"
                    }
                    */
                    value={data[e]}
                    className="validate"
                    onChange={handleInput}
                  />
                  <label htmlFor={e}>{e}</label>
                </div>
              </div>
            )
          })}
          

          {/* <button className="btn" onClick={handleChange} disabled={loading}>
            Назад
          </button>
          <button className="btn right" onClick={accept} disabled={loading}>
            Принять
          </button> */}
        </form>
      </div>
    </div>
  )
}
