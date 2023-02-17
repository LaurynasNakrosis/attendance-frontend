
import { Link } from 'react-router-dom';
import './Header.css';

function Header  ()  {
  return (
    <header>
      <Link to='/'>
        <img src="https://img.icons8.com/pastel-glyph/64/null/estimated-growth.png" alt="Icon showing group"/>
      </Link>
      <Link to='/'>
        <h1>Student Attendance Monitoring System</h1>
      </Link>
      <Link to='/signin'>
        <div className="login">
          <h2>Welcome Guest</h2>
        </div>
      </Link>
    </header>
  )
}

export default Header;

