import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export const Header = ()=>{
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper ">
        <Link to="/" className="brand-logo black-text">О проекте</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            auth.token 
            ? <li><Link to="/profile" className="black-text">Личный кабинет</Link></li> 
            :<li><Link to="/login" className="black-text">Войти</Link></li> 
          }
        </ul>
      </div>
    </nav>
  )
}