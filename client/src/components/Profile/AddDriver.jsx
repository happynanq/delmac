import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'

export const AddDriver = ({data, driver, keyboardHandler, handleInput,handleSubmit, createDriver }) => {
  
  
  
  return (
    <div className="container">
    
      <div className="row">
        <form className="col s12" onKeyPress={keyboardHandler}>
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
          

          <button className="btn" onClick={createDriver}>
            Назад
          </button>
          <button className="btn right" onClick={handleSubmit} >
            Добавить
          </button>
        </form>
      </div>
    </div>
  )
}
