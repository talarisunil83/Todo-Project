import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // Correct import
import Cookies from 'js-cookie';
import './index.css';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/'); // Redirect to home page
  };

  const onSubmitFailure = (errMsg) => {
    setErrorMessage(errMsg);
    setShowError(true);
    setPassword('');
    setUsername('');
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const onChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeToggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return <Navigate to="/" />; // Redirect if logged in
  }

  return (
    <div className="login-bg-container">
      <form className="login-form-container" onSubmit={submitForm}>
        <h1 className="todo">Todo Application</h1>
        <div className="login-input-container">
          <label className="login-input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            placeholder="rahul"
            id="username"
            className="login-input-fields"
            onChange={onChangeUserName}
          />
          <label className="login-input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="rahul@2021"
            id="password"
            className="login-input-fields"
            onChange={onChangePassword}
          />
          <label className="login-showpassword-label">
            <input type="checkbox" onChange={onChangeToggleShowPassword} />
            <span className="checkbox-name">Show Password</span>
          </label>
        </div>
        <div className="login-button-error-container">
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="login-error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginRoute;
