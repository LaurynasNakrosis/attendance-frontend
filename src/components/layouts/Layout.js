
import Modal from '../UI/Modal';
import Header from './Header.js';
import Footer from './Footer.js';
import Navbar from './Navbar.js';
import './Layout.css';

function Layout  (props)  {
  return (
    <Modal.Provider>
      <div className="centerpane ">
          <Header />
          <Navbar />
          <main>
              {props.children}
          </main>
          <Footer />
      </div>
    </Modal.Provider>
  )
}

export default Layout;