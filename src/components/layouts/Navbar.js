import {NavLink} from 'react-router-dom';

import './Navbar.css';

const getLinkStyle = ({isActive}) => (isActive ? 'navSelected' : null);

function Navbar ()  {
  return (
    <nav>
        <div className="navItem">
            <NavLink to='./' className={getLinkStyle}>Student Page</NavLink>
        </div>
        <div className="navItem">
            <NavLink to='./lectures' className={getLinkStyle}>Administrator Page</NavLink>
        </div>
        <div className="navItem">
            <NavLink to='./teacher' className={getLinkStyle}>Teacher Page</NavLink>
        </div>
        <div className="navItem">
            <NavLink to='./signin' className={getLinkStyle}>Sign In</NavLink>
        </div>
        {/*<div className="navItem">
            <NavLink to='./signin1' className={getLinkStyle}>Sign In</NavLink>
  </div>*/}
    </nav>
  )
}

export default Navbar;