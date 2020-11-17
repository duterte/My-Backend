import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {
  FaUser,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaTwitterSquare,
} from 'react-icons/fa';
import { AiFillGoogleSquare } from 'react-icons/ai';
import PageTemplate from 'global-components/page-template';
import InputMask from 'global-components/SearchInput/input-mask';
import { FBLogin } from 'global-components/thirdparty-login';
import LazyLoad from 'global-components/lazyload';

function Main() {
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

  return (
    <div className="login-wrapper">
      <h1>Login with your Account</h1>
      <form action="POST">
        <InputMask>
          <FaUser />
          <input
            type="text"
            name="uid"
            autoComplete="off"
            placeholder="Username"
          />
        </InputMask>
        <InputMask>
          <FaKey />
          <input
            type={type}
            name="pwd"
            autoComplete="off"
            placeholder="Password"
          />
          <span className="eye" onClick={toggleEye}>
            {eye === 'off' ? <FaEyeSlash /> : <FaEye />}
          </span>
        </InputMask>
        <label className="checkbox">
          <input type="checkbox" name="save" /> Remember me
        </label>
        <label className="submit">
          <button className="page-button primary">login</button>
        </label>
        <div>
          <Link to="/register">Register Now</Link>
        </div>
        <div>Forgot Password?</div>
      </form>
      <div className="hr">
        <hr />
      </div>
      <div className="other-login">
        <div
          className="fb-login-button"
          data-size="large"
          data-button-type="login_with"
          data-layout="default"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-width=""
        ></div>
        <div className="twitter">
          <FaTwitterSquare />
          <span>Login with Twitter</span>
        </div>
        <div className="google">
          <AiFillGoogleSquare />
          <span>Login with Google</span>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <>
      <FBLogin />
      <PageTemplate className="login-body">
        <Main />
      </PageTemplate>
    </>
  );
}

export default LazyLoad(Login);
