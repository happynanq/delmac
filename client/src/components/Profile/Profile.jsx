import React from 'react'
export const Profile = ({
  ud,
  handleChange,
  redirectAdminPanel,
  createDriver,
  redirectDatabase,
}) => {
  return (
    <div className="container center">
      <div className="center">
         {ud.accessLevel !== 'unconfirmed' ? null : <span className="red">Ваш уровень доступа - неподтверждённый, подождите, пока админ повысит ваш доступ</span> }
        <div className="divider"></div>
        <div className="col s9 ">
          <div className="section">
            <h5>Ваше ФИО</h5>
            <p>{ud.lastName + ' ' + ud.name + ' ' + ud.patronymic}</p>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Ваш емаил</h5>
            <p>{ud.email}</p>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Ваш телефон</h5>
            <p>{ud.tel}</p>
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Ваш парк</h5>
            <p>{ud.parkName}</p>
          </div>
          <div className="divider"></div>
          <div className="section">
            <button className="btn green darken-2" onClick={handleChange}>
              Изменить данные
            </button>
          </div>
          
          {ud.accessLevel === 'admin' ? (
            <div className="section ">
              <button
                className="btn blue darken-2"
                onClick={redirectAdminPanel}
              >
                Админ-панель
              </button>
            </div>
          ) : null}

          
        </div>
      </div>
    </div>
  )
}
