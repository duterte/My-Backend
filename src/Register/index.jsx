import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from 'global-components/page-template';
import InputMask from 'global-components/SearchInput/input-mask';
import { FaUser, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import LazyLoad from 'global-components/lazyload';
import './index.css';

function Register() {
  const [eye, setEye] = useState('off');
  const [type, setType] = useState('password');

  function toggleEye() {
    if (eye === 'off') {
      setEye('on');
      setType('text');
    } else {
      setEye('off');
      setType('password');
    }
  }

  function secondaryButton(e) {
    const child = e.currentTarget.firstChild;
    child.click();
  }

  return (
    <PageTemplate className="register">
      <div className="content">
        <h1>Create Account</h1>
        <div className="wrapper">
          <InputMask>
            <FaUser />
            <input type="text" autoComplete="off" placeholder="Username" />
          </InputMask>
          <InputMask>
            <FaKey />
            <input type={type} autoComplete="off" placeholder="Password" />
            <span className="eye" onClick={toggleEye}>
              {eye === 'off' ? <FaEyeSlash /> : <FaEye />}
            </span>
          </InputMask>
          <InputMask>
            <FaKey />
            <input
              type={type}
              autoComplete="off"
              placeholder="Re-enter Password"
            />
            <span className="eye" onClick={toggleEye}>
              {eye === 'off' ? <FaEyeSlash /> : <FaEye />}
            </span>
          </InputMask>
          <InputMask>
            <HiOutlineMail />
            <input type="email" autoComplete="off" placeholder="Email" />
          </InputMask>
          <button className="page-button primary">REGISTER</button>

          <button className="page-button secondary" onClick={secondaryButton}>
            <Link to="/login">Already HAVE AN ACCOUNT</Link>
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}

export default LazyLoad(Register);
