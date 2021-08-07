import React from 'react'
import { useHistory } from 'react-router-dom'

export const AddDriver = ({
  data,
  driver,
  keyboardHandler,
  handleInput,
  handleSubmit,
  setToChangeDriver,
}) => {
  const history = useHistory()

  const handleC = (e) => {
    history.push('/')
    setToChangeDriver(false)
  }

  return (
    <div className="container">
      <div className="row">
        <form
          className="col s12"
          onKeyPress={keyboardHandler}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="row">
            <div className="input-field col s12">
              <input
                name="lastName"
                id="lastName"
                type="text"
                value={data.lastName}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="lastName">Фамилия</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="name"
                id="name"
                type="text"
                value={data.name}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="name">Имя</label>
            </div>
          </div>

          

          <div className="row">
            <div className="input-field col s12">
              <input
                name="patronymic"
                id="patronymic"
                type="text"
                value={data.patronymic}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="patronymic">Отчество</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="birthday"
                id="birthday"
                type="date"
                value={data.birthday}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="birthday">Дата рождения</label>
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col s12">
              <input
                name="describe"
                id="describe"
                type="text"
                value={data.describe}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="describe">Описание проблемы</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="leaseСredit"
                id="leaseСredit"
                type="number"
                value={data.leaseСredit}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="leaseСredit">Задолжность аренды</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="accidentСredit"
                id="accidentСredit"
                type="number"
                value={data.accidentСredit}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="accidentСredit">Задолжность аварии</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="fineСredit"
                id="fineСredit"
                type="number"
                value={data.fineСredit}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="fineСredit">Задолжность штрафов</label>
            </div>
          </div>
          
          <div className="row">
            <div className="input-field col s12">
              <input
                name="otherСredit"
                id="otherСredit"
                type="number"
                value={data.otherСredit}
                className="validate"
                onChange={handleInput}
              />
              <label htmlFor="otherСredit">Другие задолжности</label>
            </div>
          </div>

          <button className="btn" onClick={handleC}>
            Назад
          </button>
          <button className="btn right" onClick={handleSubmit}>
            Добавить
          </button>
        </form>
      </div>
    </div>
  )
}
