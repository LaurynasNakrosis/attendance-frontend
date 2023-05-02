
import { Link } from 'react-router-dom';
import './Header.css';

function Header  ()  {
  return (
    <header>
      <Link to='/'>
        <img src="https://img.icons8.com/pastel-glyph/64/null/estimated-growth.png" alt="Icon showing group"/>
      </Link>
      <Link to='/'>
        <h1>AttendEase</h1>
      </Link>
      <Link to='/signin'>

      </Link>
    </header>
  )
}

export default Header;

